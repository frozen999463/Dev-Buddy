import express from "express";
import { verifyFirebaseToken } from "../middleware/auth";
import { isAdmin } from "../middleware/admin";
import {User } from "../models/User";

const router = express.Router();

router.get(
  "/adminDashboard",
  verifyFirebaseToken,
  isAdmin,
  async (req, res) => {
    const usersCount = await User.countDocuments();

    res.json({
      usersCount,
    });
  }
);

export default router;
