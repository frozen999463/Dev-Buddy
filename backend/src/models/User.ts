import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {type: String,enum: ["user", "admin"],default: "user", },
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String },
    provider: { type: String }, // password / google
    onboarded: { type: Boolean, default: false },
    selectedCourse: { type: String },
    experienceLevel: { type: String },
    learningGoal: { type: String },
    totalXP: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    lastActivityDate: { type: Date },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
