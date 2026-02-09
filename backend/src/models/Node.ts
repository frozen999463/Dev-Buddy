import mongoose from "mongoose";
const nodeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { 
      type: String, 
      enum: ["lesson", "quiz", "challenge"], 
      required: true 
    },
    content: { type: String }, // Markdown or video URL
    order: { type: Number, required: true },
    chapterId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Chapter", 
      required: true 
    },
    
    // For quizzes
    questions: [{ 
      question: String,
      options: [String],
      correctAnswer: Number
    }],
    
    // For challenges
    starterCode: { type: String },
    solution: { type: String },
    testCases: [{ input: String, expectedOutput: String }],
  },
  { timestamps: true }
);
export const Node = mongoose.model("Node", nodeSchema);