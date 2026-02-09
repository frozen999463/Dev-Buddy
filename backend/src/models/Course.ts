import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    thumbnail: { type: String }, // URL to image
    status: { 
      type: String, 
      enum: ["draft", "published"], 
      default: "draft" 
    },
    createdBy: { type: String }, // Admin UID
  },
  { timestamps: true }
);
export const Course = mongoose.model("Course", courseSchema);