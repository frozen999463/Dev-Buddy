import { Response } from "express";
import mongoose from "mongoose";
import { AuthRequest } from "../middleware/auth";
import { Progress } from "../models/Progress";
import { User } from "../models/User";
import { Node } from "../models/Node";
import { Course } from "../models/Course";
import { Section } from "../models/Section";
import { Chapter } from "../models/Chapter";

// XP rewards by node type
const XP_REWARDS = {
  lesson: 10,
  quiz: 20,
  challenge: 30,
};

// Get user's progress for a specific course
export const getCourseProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find user's MongoDB document
    const user = await User.findOne({ uid: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get all completed nodes for this course
    const completedNodes = await Progress.find({
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
  } catch (err) {
    console.error("❌ Error fetching progress:", err);
    res.status(500).json({ message: "Failed to fetch progress" });
  }
};

// Get all courses user has progress in
export const getEnrolledCourses = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.uid;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findOne({ uid: userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Get all unique courses where user has progress
    const progressRecords = await Progress.find({ userId: user._id });
    const courseIds = new Set(progressRecords.map(p => p.courseId.toString()));

    // Add courses from the new enrolledCourses field
    if (user.enrolledCourses && Array.isArray(user.enrolledCourses)) {
      user.enrolledCourses.forEach((cId: any) => {
        if (cId) courseIds.add(cId.toString());
      });
    }

    // Also include selectedCourse if not already present (legacy support)
    if (user.selectedCourse) {
      const selectedId = user.selectedCourse.toString();
      if (selectedId && !courseIds.has(selectedId)) {
        courseIds.add(selectedId);
      }
    }

    const enrolledCourses = [];

    for (const courseId of courseIds) {
      const course = await Course.findById(courseId);
      if (!course) continue;

      // Calculate total nodes in this course
      const sections = await Section.find({ courseId: course._id });
      const sectionIds = sections.map(s => s._id);

      const chapters = await Chapter.find({ sectionId: { $in: sectionIds } });
      const chapterIds = chapters.map(c => c._id);

      const totalNodes = await Node.countDocuments({ chapterId: { $in: chapterIds } });
      const completedNodes = await Progress.countDocuments({
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
        isPrimary: user.selectedCourse && user.selectedCourse.toString() === course._id.toString()
      });
    }

    res.json(enrolledCourses);
  } catch (err) {
    console.error("❌ Error fetching enrolled courses:", err);
    res.status(500).json({ message: "Failed to fetch enrolled courses" });
  }
};

// Mark a node as completed
export const completeNode = async (req: AuthRequest, res: Response) => {
  try {
    const { nodeId, courseId, score } = req.body;
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find user's MongoDB document
    const user = await User.findOne({ uid: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get node details to determine XP
    const node = await Node.findById(nodeId);
    if (!node) {
      return res.status(404).json({ message: "Node not found" });
    }

    const xpEarned = XP_REWARDS[node.type as keyof typeof XP_REWARDS] || 10;

    // Check if already completed
    let progress = await Progress.findOne({ userId: user._id, nodeId });

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
    progress = await Progress.create({
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

      const daysDiff = Math.floor(
        (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff === 1) {
        // Consecutive day
        user.currentStreak = (user.currentStreak || 0) + 1;
      } else if (daysDiff > 1) {
        // Streak broken
        user.currentStreak = 1;
      }
      // If daysDiff === 0, same day, don't change streak
    } else {
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
  } catch (err) {
    console.error("❌ Error completing node:", err);
    res.status(500).json({ message: "Failed to complete node" });
  }
};

// Get user stats (XP, streak, etc.)
export const getUserStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ uid: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get total completed nodes
    const totalCompleted = await Progress.countDocuments({
      userId: user._id,
      completed: true,
    });

    res.json({
      totalXP: user.totalXP || 0,
      currentStreak: user.currentStreak || 0,
      totalCompleted,
      lastActivityDate: user.lastActivityDate,
    });
  } catch (err) {
    console.error("❌ Error fetching stats:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

// Get leaderboard for a specific course (top 20 users by XP)
export const getLeaderboard = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const id = Array.isArray(courseId) ? courseId[0] : courseId;

    // Aggregate total XP per user for this course
    const leaderboard = await Progress.aggregate([
      { $match: { courseId: new mongoose.Types.ObjectId(id), completed: true } },
      {
        $group: {
          _id: "$userId",
          totalXP: { $sum: "$xpEarned" },
          completedNodes: { $sum: 1 },
        },
      },
      { $sort: { totalXP: -1 } },
      { $limit: 20 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          _id: 1,
          totalXP: 1,
          completedNodes: 1,
          name: "$userInfo.name",
          profilePicture: "$userInfo.profilePicture",
          uid: "$userInfo.uid",
        },
      },
    ]);

    res.json(leaderboard);
  } catch (err) {
    console.error("❌ Error fetching leaderboard:", err);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};

