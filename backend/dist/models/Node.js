"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const nodeSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    type: {
        type: String,
        enum: ["lesson", "quiz", "challenge"],
        required: true
    },
    content: { type: String }, // Markdown or video URL
    order: { type: Number, required: true },
    chapterId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.Node = mongoose_1.default.model("Node", nodeSchema);
