import { Request, Response } from "express";
import { Review } from "../models/Review";

// GET all reviews (public)
export const getAllReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reviews" });
    }
};

// CREATE a review (authenticated user)
export const createReview = async (req: Request, res: Response) => {
    try {
        const { name, rating, text } = req.body;
        const uid = req.user?.uid;

        if (!uid) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!name || !rating || !text) {
            return res.status(400).json({ message: "Name, rating, and text are required" });
        }

        const review = await Review.create({ uid, name, rating, text });
        res.status(201).json(review);
    } catch (error) {
        console.error("Review creation error:", error);
        res.status(500).json({ message: "Failed to create review" });
    }
};

// DELETE a review (admin only)
export const deleteReview = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete review" });
    }
};
