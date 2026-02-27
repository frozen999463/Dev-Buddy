"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStats = exports.completeNode = exports.getEnrolledCourses = exports.getCourseProgress = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Progress_1 = require("../models/Progress");
const User_1 = require("../models/User");
const Node_1 = require("../models/Node");
const Course_1 = require("../models/Course");
const Section_1 = require("../models/Section");
const Chapter_1 = require("../models/Chapter");
// XP rewards by node type
const XP_REWARDS = {
    lesson: 10,
    quiz: 20,
    challenge: 30,
};
// Get user's progress for a specific course
const getCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user?.uid;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Find user's MongoDB document
        const user = await User_1.User.findOne({ uid: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Get all completed nodes for this course
        const completedNodes = await Progress_1.Progress.find({
            userId: user._id,
            courseId,
            completed: true,
        });
        res.json({
            completedNodes: completedNodes.map((p) => ({
                nodeId: p.nodeId,
                score: p.score,
                xpEarned: p.xpEarned,
                completedAt: p.completedAt,
            })),
        });
    }
    catch (err) {
        console.error("❌ Error fetching progress:", err);
        res.status(500).json({ message: "Failed to fetch progress" });
    }
};
exports.getCourseProgress = getCourseProgress;
// Get all courses user has progress in
const getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user?.uid;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        const user = await User_1.User.findOne({ uid: userId });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        // Get all unique courses where user has progress
        const progressRecords = await Progress_1.Progress.find({ userId: user._id });
        const courseIds = new Set(progressRecords.map(p => p.courseId.toString()));
        console.log("🔍 [getEnrolledCourses] User:", user.uid, "Progress found in:", Array.from(courseIds));
        // Also include selectedCourse if not already present
        if (user.selectedCourse && user.selectedCourse.trim() !== "") {
            const isId = mongoose_1.default.Types.ObjectId.isValid(user.selectedCourse);
            const primaryCourse = await Course_1.Course.findOne({
                $or: [
                    ...(isId ? [{ _id: user.selectedCourse }] : []),
                    { slug: user.selectedCourse }
                ]
            });
            if (primaryCourse) {
                const primaryId = primaryCourse._id.toString();
                if (!courseIds.has(primaryId)) {
                    courseIds.add(primaryId);
                    console.log("🔍 [getEnrolledCourses] Added selectedCourse to list:", primaryCourse.title);
                }
            }
            else {
                console.log("⚠️ [getEnrolledCourses] User has selectedCourse", user.selectedCourse, "but it matches no Course in DB.");
            }
        }
        const enrolledCourses = [];
        for (const courseId of courseIds) {
            const course = await Course_1.Course.findById(courseId);
            if (!course)
                continue;
            // Calculate total nodes in this course
            const sections = await Section_1.Section.find({ courseId: course._id });
            const sectionIds = sections.map(s => s._id);
            const chapters = await Chapter_1.Chapter.find({ sectionId: { $in: sectionIds } });
            const chapterIds = chapters.map(c => c._id);
            const totalNodes = await Node_1.Node.countDocuments({ chapterId: { $in: chapterIds } });
            const completedNodes = await Progress_1.Progress.countDocuments({
                userId: user._id,
                courseId: course._id,
                completed: true
            });
            enrolledCourses.push({
                _id: course._id,
                title: course.title,
                slug: course.slug,
                thumbnail: course.thumbnail,
                description: course.description,
                totalNodes,
                completedNodes,
                progress: totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0,
                isPrimary: user.selectedCourse === course._id.toString() || user.selectedCourse === course.slug
            });
        }
        res.json(enrolledCourses);
    }
    catch (err) {
        console.error("❌ Error fetching enrolled courses:", err);
        res.status(500).json({ message: "Failed to fetch enrolled courses" });
    }
};
exports.getEnrolledCourses = getEnrolledCourses;
// Mark a node as completed
const completeNode = async (req, res) => {
    try {
        const { nodeId, courseId, score } = req.body;
        const userId = req.user?.uid;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Find user's MongoDB document
        const user = await User_1.User.findOne({ uid: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Get node details to determine XP
        const node = await Node_1.Node.findById(nodeId);
        if (!node) {
            return res.status(404).json({ message: "Node not found" });
        }
        const xpEarned = XP_REWARDS[node.type] || 10;
        // Check if already completed
        let progress = await Progress_1.Progress.findOne({ userId: user._id, nodeId });
        if (progress) {
            // Already completed, just return existing progress
            return res.json({
                message: "Node already completed",
                xpEarned: 0,
                totalXP: user.totalXP,
                progress,
            });
        }
        // Create new progress entry
        progress = await Progress_1.Progress.create({
            userId: user._id,
            courseId,
            nodeId,
            completed: true,
            score: score || 0,
            xpEarned,
        });
        // Update user's total XP
        user.totalXP = (user.totalXP || 0) + xpEarned;
        // Update streak
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (user.lastActivityDate) {
            const lastActivity = new Date(user.lastActivityDate);
            lastActivity.setHours(0, 0, 0, 0);
            const daysDiff = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
            if (daysDiff === 1) {
                // Consecutive day
                user.currentStreak = (user.currentStreak || 0) + 1;
            }
            else if (daysDiff > 1) {
                // Streak broken
                user.currentStreak = 1;
            }
            // If daysDiff === 0, same day, don't change streak
        }
        else {
            // First activity
            user.currentStreak = 1;
        }
        user.lastActivityDate = new Date();
        await user.save();
        console.log(`✅ Node completed: ${node.title}, XP: ${xpEarned}`);
        res.json({
            message: "Node completed successfully",
            xpEarned,
            totalXP: user.totalXP,
            currentStreak: user.currentStreak,
            progress,
        });
    }
    catch (err) {
        console.error("❌ Error completing node:", err);
        res.status(500).json({ message: "Failed to complete node" });
    }
};
exports.completeNode = completeNode;
// Get user stats (XP, streak, etc.)
const getUserStats = async (req, res) => {
    try {
        const userId = req.user?.uid;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await User_1.User.findOne({ uid: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Get total completed nodes
        const totalCompleted = await Progress_1.Progress.countDocuments({
            userId: user._id,
            completed: true,
        });
        res.json({
            totalXP: user.totalXP || 0,
            currentStreak: user.currentStreak || 0,
            totalCompleted,
            lastActivityDate: user.lastActivityDate,
        });
    }
    catch (err) {
        console.error("❌ Error fetching stats:", err);
        res.status(500).json({ message: "Failed to fetch stats" });
    }
};
exports.getUserStats = getUserStats;
