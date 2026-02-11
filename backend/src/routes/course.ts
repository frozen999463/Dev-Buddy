import express from "express";
import { verifyFirebaseToken } from "../middleware/auth";
import { isAdmin } from "../middleware/admin";
import * as CourseController from "../controllers/course.controller";
const router = express.Router();
// All course routes require authentication and admin role
// Public course routes for browsing and landing pages
router.get("/", CourseController.getAllCourses);
router.get("/:id", CourseController.getCourseById);

// Admin-only course management
router.post("/", verifyFirebaseToken, isAdmin, CourseController.createCourse);
router.put("/:id", verifyFirebaseToken, isAdmin, CourseController.updateCourse);
router.delete("/:id", verifyFirebaseToken, isAdmin, CourseController.deleteCourse);
export default router;
