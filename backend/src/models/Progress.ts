import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    courseId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Course", 
      required: true 
    },
    nodeId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Node", 
      required: true 
    },
    completed: { 
      type: Boolean, 
      default: true 
    },
    score: { 
      type: Number, 
      default: 0 
    }, // For quizzes
    xpEarned: { 
      type: Number, 
      default: 0 
    },
    completedAt: { 
      type: Date, 
      default: Date.now 
    },
  },
  { timestamps: true }
);

// Compound index to ensure one progress entry per user per node
progressSchema.index({ userId: 1, nodeId: 1 }, { unique: true });

export const Progress = mongoose.model("Progress", progressSchema);
