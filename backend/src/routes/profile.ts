import { Router } from "express";
import { verifyFirebaseToken, AuthRequest } from "../middleware/auth";
import { User } from "../models/User";
import { Course } from "../models/Course";
import { Progress } from "../models/Progress";
import { Section } from "../models/Section";
import { Chapter } from "../models/Chapter";
import { Node } from "../models/Node";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

// Configure Multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|svg|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only images are allowed!"));
  }
});

router.get("/", verifyFirebaseToken, async (req: AuthRequest, res) => {
  try {
    const { uid, email, name, firebase } = req.user!;

    let user = await User.findOne({ uid }).populate("selectedCourse").populate("enrolledCourses");

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
        $addToSet: { enrolledCourses: selectedCourse } // Ensure it's in enrolledCourses
      },
      { new: true }
    );

    console.log("✅ User updated successfully with onboarding data. selectedCourse:", user?.selectedCourse);
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
      {
        selectedCourse: courseId,
        $addToSet: { enrolledCourses: courseId } // Add to enrollment list if not present
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ Primary course updated for user:", uid, "to:", courseId);
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

router.post("/upload-avatar", verifyFirebaseToken, upload.single("avatar"), async (req: AuthRequest, res) => {
  try {
    const { uid } = req.user!;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    const user = await User.findOneAndUpdate(
      { uid },
      { profilePicture: imageUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Avatar uploaded successfully", profilePicture: imageUrl, user });
  } catch (err) {
    console.error("❌ Avatar upload error:", err);
    res.status(500).json({ message: "Failed to upload avatar" });
  }
});

export default router;
