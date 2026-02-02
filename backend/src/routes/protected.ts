import { Router } from "express";
import { verifyFirebaseToken, AuthRequest } from "../middleware/auth";
import {User} from "../models/User";

const router = Router();

router.post("/signup", verifyFirebaseToken, async (req: AuthRequest, res) => {
  try {
    const { uid, email } = req.user!;

    // Check if user exists
    let user = await User.findOne({ uid });
    if (!user) {
      user = await User.create({ uid, email });
    }

    res.json({ message: "User saved ✅", user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
