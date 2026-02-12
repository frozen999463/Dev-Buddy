import express from "express";
import { verifyFirebaseToken } from "../middleware/auth";
import * as ProgressController from "../controllers/progress.controller";

const router = express.Router();

// All routes require authentication
router.get("/:courseId", verifyFirebaseToken, ProgressController.getCourseProgress);
router.post("/complete", verifyFirebaseToken, ProgressController.completeNode);
router.get("/stats/me", verifyFirebaseToken, ProgressController.getUserStats);

export default router;
