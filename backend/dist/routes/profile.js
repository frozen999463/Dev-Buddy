"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.get("/profile", auth_1.verifyFirebaseToken, async (req, res) => {
    try {
        const { uid, email, name, firebase } = req.user;
        let user = await User_1.User.findOne({ uid });
        if (!user) {
            user = await User_1.User.create({
                uid,
                email,
                name: name || null,
                provider: firebase.sign_in_provider,
                onboarded: false,
            });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch profile" });
    }
});
router.patch("/onboarding", auth_1.verifyFirebaseToken, async (req, res) => {
    try {
        const { uid, email, name: firebaseName, firebase } = req.user;
        const { name, selectedCourse, experienceLevel, learningGoal } = req.body;
        console.log("📝 Onboarding request received for uid:", uid);
        console.log("📦 Data:", { name, selectedCourse, experienceLevel, learningGoal });
        // First, check if user exists in MongoDB
        let user = await User_1.User.findOne({ uid });
        if (!user) {
            // Create user if they don't exist
            console.log("👤 User not found in MongoDB, creating new user...");
            user = await User_1.User.create({
                uid,
                email,
                name: firebaseName || null,
                provider: firebase.sign_in_provider,
                onboarded: false,
            });
            console.log("✅ User created in MongoDB:", user._id);
        }
        // Now update with onboarding data
        user = await User_1.User.findOneAndUpdate({ uid }, {
            name,
            selectedCourse,
            experienceLevel,
            learningGoal,
            onboarded: true,
        }, { new: true });
        console.log("✅ User updated successfully with onboarding data. selectedCourse:", user?.selectedCourse);
        res.json(user);
    }
    catch (err) {
        console.error("❌ Onboarding error:", err);
        res.status(500).json({ message: "Failed to update onboarding data" });
    }
});
router.patch("/select-course", auth_1.verifyFirebaseToken, async (req, res) => {
    try {
        const { uid } = req.user;
        const { courseId } = req.body;
        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }
        const user = await User_1.User.findOneAndUpdate({ uid }, { selectedCourse: courseId }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("✅ Primary course updated for user:", uid, "to:", courseId);
        res.json({ message: "Primary course updated", user });
    }
    catch (err) {
        console.error("❌ Error updating selected course:", err);
        res.status(500).json({ message: "Failed to update selected course" });
    }
});
exports.default = router;
