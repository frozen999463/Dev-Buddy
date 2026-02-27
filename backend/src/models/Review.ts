import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        uid: { type: String, required: true },
        name: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        text: { type: String, required: true },
        adminReply: { type: String },
        repliedAt: { type: Date },
    },
    { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
