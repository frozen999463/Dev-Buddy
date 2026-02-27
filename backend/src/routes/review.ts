import express from "express";
import { verifyFirebaseToken } from "../middleware/auth";
import { isAdmin } from "../middleware/admin";
import * as ReviewController from "../controllers/review.controller";

const router = express.Router();

// Public: get all reviews
router.get("/", ReviewController.getAllReviews);

// Authenticated: create a review
router.post("/", verifyFirebaseToken, ReviewController.createReview);

// Admin: reply to a review
router.patch("/:id/reply", verifyFirebaseToken, isAdmin, ReviewController.replyToReview);

// Admin: delete a review
router.delete("/:id", verifyFirebaseToken, isAdmin, ReviewController.deleteReview);

export default router;
