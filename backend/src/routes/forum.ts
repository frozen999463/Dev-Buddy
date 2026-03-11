import express from "express";
import { verifyFirebaseToken } from "../middleware/auth";
import * as ForumController from "../controllers/forum.controller";

const router = express.Router();

// Get questions for a specific course (Public/Protected depending on preference)
router.get("/course/:courseId", ForumController.getCourseQuestions);

// Protected routes (Require login)
router.post("/", verifyFirebaseToken, ForumController.createQuestion);
router.post("/:questionId/comment", verifyFirebaseToken, ForumController.addComment);

export default router;
