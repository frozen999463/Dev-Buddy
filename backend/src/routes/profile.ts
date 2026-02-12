import { Router } from "express";
import { verifyFirebaseToken, AuthRequest } from "../middleware/auth";
import { User } from "../models/User";

const router = Router();

router.get("/profile", verifyFirebaseToken, async (req: AuthRequest, res) => {
  try {
    const { uid, email, name, firebase } = req.user!;

    let user = await User.findOne({ uid });

    if (!user) {
      user = await User.create({
        uid,
        email,
        name: name || null,
        provider: firebase.sign_in_provider,
        onboarded: false,
      });
    }

    res.json(user);
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

export default router;
