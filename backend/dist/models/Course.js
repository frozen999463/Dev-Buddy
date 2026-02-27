"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const courseSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
exports.Course = mongoose_1.default.model("Course", courseSchema);
