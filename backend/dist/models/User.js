"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    role: { type: String, enum: ["user", "admin"], default: "user", },
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
}, { timestamps: true });
exports.User = mongoose_1.default.model("User", userSchema);
