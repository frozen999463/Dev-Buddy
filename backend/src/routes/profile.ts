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
    const { uid } = req.user!;
    const { name, selectedCourse, experienceLevel, learningGoal } = req.body;

    const user = await User.findOneAndUpdate(
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

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to update onboarding data" });
  }
});

export default router;
