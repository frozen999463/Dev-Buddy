"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Progress = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const progressSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    nodeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
// Compound index to ensure one progress entry per user per node
progressSchema.index({ userId: 1, nodeId: 1 }, { unique: true });
exports.Progress = mongoose_1.default.model("Progress", progressSchema);
