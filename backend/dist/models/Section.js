"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Section = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const sectionSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String },
    order: { type: Number, required: true },
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
}, { timestamps: true });
exports.Section = mongoose_1.default.model("Section", sectionSchema);
