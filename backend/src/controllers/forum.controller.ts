import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { Question } from "../models/Question";
import { User } from "../models/User";

// Create a new question
export const createQuestion = async (req: AuthRequest, res: Response) => {
    try {
        const { courseId, title, content } = req.body;
        const userId = req.user?.uid;

        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const user = await User.findOne({ uid: userId });
        if (!user) return res.status(404).json({ message: "User not found" });

        const newQuestion = await Question.create({
            userId: user._id,
            userName: user.name || "Anonymous",
            userPicture: user.profilePicture || undefined,
            courseId,
            title,
            content,
            comments: [],
        });

        res.status(201).json(newQuestion);
    } catch (err) {
        console.error("❌ Error creating question:", err);
        res.status(500).json({ message: "Failed to create question" });
    }
};

// Get all questions for a specific course
export const getCourseQuestions = async (req: AuthRequest, res: Response) => {
    try {
        const { courseId } = req.params;
        const questions = await Question.find({ courseId }).sort({ createdAt: -1 });
        res.json(questions);
    } catch (err) {
        console.error("❌ Error fetching questions:", err);
        res.status(500).json({ message: "Failed to fetch questions" });
    }
};

// Add a comment to a question
export const addComment = async (req: AuthRequest, res: Response) => {
    try {
        const { questionId } = req.params;
        const { content } = req.body;
        const userId = req.user?.uid;

        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const user = await User.findOne({ uid: userId });
        if (!user) return res.status(404).json({ message: "User not found" });

        const question = await Question.findById(questionId);
        if (!question) return res.status(404).json({ message: "Question not found" });

        question.comments.push({
            userId: user._id,
            userName: user.name || "Anonymous",
            userPicture: user.profilePicture || undefined,
            content,
            createdAt: new Date(),
        });

        await question.save();
        res.json(question);
    } catch (err) {
        console.error("❌ Error adding comment:", err);
        res.status(500).json({ message: "Failed to add comment" });
    }
};
