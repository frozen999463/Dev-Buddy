import mongoose from "mongoose";
const chapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    order: { type: Number, required: true },
    sectionId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Section", 
      required: true 
    },
  },
  { timestamps: true }
);
export const Chapter = mongoose.model("Chapter", chapterSchema);