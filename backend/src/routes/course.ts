import express from "express";
import { verifyFirebaseToken } from "../middleware/auth";
import { isAdmin } from "../middleware/admin";
import * as CourseController from "../controllers/course.controller";
const router = express.Router();
// All course routes require authentication and admin role
router.post("/", verifyFirebaseToken, isAdmin, CourseController.createCourse);
router.get("/", verifyFirebaseToken, isAdmin, CourseController.getAllCourses);
router.get("/:id", verifyFirebaseToken, isAdmin, CourseController.getCourseById);
router.put("/:id", verifyFirebaseToken, isAdmin, CourseController.updateCourse);
router.delete("/:id", verifyFirebaseToken, isAdmin, CourseController.deleteCourse);
export default router;
