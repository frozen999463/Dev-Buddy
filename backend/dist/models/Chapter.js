"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chapter = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chapterSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    order: { type: Number, required: true },
    sectionId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Section",
        required: true
    },
}, { timestamps: true });
exports.Chapter = mongoose_1.default.model("Chapter", chapterSchema);
