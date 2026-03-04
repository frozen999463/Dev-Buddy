import express from "express";
import { verifyFirebaseToken } from "../middleware/auth";
import * as ProgressController from "../controllers/progress.controller";

const router = express.Router();

// All routes require authentication
router.get("/enrolled", verifyFirebaseToken, ProgressController.getEnrolledCourses);
router.get("/stats/me", verifyFirebaseToken, ProgressController.getUserStats);
router.get("/leaderboard/:courseId", ProgressController.getLeaderboard); // Public
router.get("/:courseId", verifyFirebaseToken, ProgressController.getCourseProgress);
router.post("/complete", verifyFirebaseToken, ProgressController.completeNode);

export default router;
