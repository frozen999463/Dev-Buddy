import mongoose, { Schema, Document } from "mongoose";

export interface IComment {
    userId: mongoose.Types.ObjectId;
    userName: string;
    userPicture?: string;
    content: string;
    createdAt: Date;
}

export interface IQuestion extends Document {
    userId: mongoose.Types.ObjectId;
    userName: string;
    userPicture?: string;
    courseId: mongoose.Types.ObjectId | string;
    title: string;
    content: string;
    comments: IComment[];
    createdAt: Date;
}

const commentSchema = new Schema<IComment>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    userPicture: { type: String },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const questionSchema = new Schema<IQuestion>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    userPicture: { type: String },
    courseId: { type: Schema.Types.Mixed, required: true }, // Can be ObjectId or string ID
    title: { type: String, required: true },
    content: { type: String, required: true },
    comments: [commentSchema],
    createdAt: { type: Date, default: Date.now },
});

export const Question = mongoose.model<IQuestion>("Question", questionSchema);
