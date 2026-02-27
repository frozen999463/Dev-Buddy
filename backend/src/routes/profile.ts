import { Router } from "express";
import { verifyFirebaseToken, AuthRequest } from "../middleware/auth";
import { User } from "../models/User";
import { Course } from "../models/Course";
import { Progress } from "../models/Progress";
import { Section } from "../models/Section";
import { Chapter } from "../models/Chapter";
import { Node } from "../models/Node";

const router = Router();

router.get("/profile", verifyFirebaseToken, async (req: AuthRequest, res) => {
  try {
    const { uid, email, name, firebase } = req.user!;

    let user = await User.findOne({ uid }).populate("selectedCourse");

    if (!user) {
      user = await User.create({
        uid,
        email,
        name: name || null,
        provider: firebase.sign_in_provider,
        onboarded: false,
      });
    }

    // Calculate progress if a course is selected
    let progressData = null;
    if (user.selectedCourse) {
      const courseId = (user.selectedCourse as any)._id || user.selectedCourse;

      // Calculate total nodes in course
      const sections = await Section.find({ courseId });
      const sectionIds = sections.map(s => s._id);
      const chapters = await Chapter.find({ sectionId: { $in: sectionIds } });
      const chapterIds = chapters.map(c => c._id);
      const totalNodes = await Node.countDocuments({ chapterId: { $in: chapterIds } });

      // Count completed nodes
      const completedNodes = await Progress.countDocuments({
        userId: user._id,
        courseId,
        completed: true
      });

      progressData = {
        courseName: (user.selectedCourse as any).title,
        totalNodes,
        completedNodes,
        percent: totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0
      };
    }

    res.json({
      ...user.toObject(),
      progress: progressData
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

router.patch("/onboarding", verifyFirebaseToken, async (req: AuthRequest, res) => {
  try {
    const { uid, email, name: firebaseName, firebase } = req.user!;
    const { name, selectedCourse, experienceLevel, learningGoal } = req.body;

    console.log("📝 Onboarding request received for uid:", uid);
    console.log("📦 Data:", { name, selectedCourse, experienceLevel, learningGoal });

    // First, check if user exists in MongoDB
    let user = await User.findOne({ uid });

    if (!user) {
      // Create user if they don't exist
      console.log("👤 User not found in MongoDB, creating new user...");
      user = await User.create({
        uid,
        email,
        name: firebaseName || null,
        provider: firebase.sign_in_provider,
        onboarded: false,
      });
      console.log("✅ User created in MongoDB:", user._id);
    }

    // Now update with onboarding data
    user = await User.findOneAndUpdate(
      { uid },
      {
        name,
        selectedCourse,
        experienceLevel,
        learningGoal,
        onboarded: true,
      },
      { new: true }
    );

    console.log("✅ User updated successfully:", user);
    res.json(user);
  } catch (err) {
    console.error("❌ Onboarding error:", err);
    res.status(500).json({ message: "Failed to update onboarding data" });
  }
});

router.patch("/select-course", verifyFirebaseToken, async (req: AuthRequest, res) => {
  try {
    const { uid } = req.user!;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const user = await User.findOneAndUpdate(
      { uid },
      { selectedCourse: courseId },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Primary course updated", user });
  } catch (err) {
    console.error("❌ Error updating selected course:", err);
    res.status(500).json({ message: "Failed to update selected course" });
  }
});

router.patch("/update", verifyFirebaseToken, async (req: AuthRequest, res) => {
  try {
    const { uid } = req.user!;
    const { name, profilePicture } = req.body;

    const user = await User.findOneAndUpdate(
      { uid },
      { name, profilePicture },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("❌ Error updating profile:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

export default router;
