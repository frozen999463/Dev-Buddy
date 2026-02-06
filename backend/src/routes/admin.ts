import express from "express";
import { verifyFirebaseToken } from "../middleware/auth";
import { isAdmin } from "../middleware/admin";
import * as AdminController from "../controllers/admin.controller";

const router = express.Router();

// Define paths and middleware, but let the controller do the work


router.get("/adminDashboard", verifyFirebaseToken, isAdmin, AdminController.getAdminStats);
router.get("/users", verifyFirebaseToken, isAdmin, AdminController.getUsersList);
router.patch("/users/:id/role", verifyFirebaseToken, isAdmin, AdminController.updateUserRole);
router.delete("/users/:id", verifyFirebaseToken, isAdmin, AdminController.deleteUser);
export default router;