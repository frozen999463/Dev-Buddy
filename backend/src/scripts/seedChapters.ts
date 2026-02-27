import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { Course } from "../models/Course";
import { Section } from "../models/Section";
import { Chapter } from "../models/Chapter";
import { Node } from "../models/Node";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/devbuddy";

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        const course = await Course.findOne();
        if (!course) {
            console.log("No course found to seed chapters for.");
            process.exit(0);
        }

        console.log(`Seeding chapters for course: ${course.title} (${course._id})`);

        // Delete existing curriculum structure for this course
        const sections = await Section.find({ courseId: course._id });
        for (const section of sections) {
            const chapters = await Chapter.find({ sectionId: section._id });
            for (const chapter of chapters) {
                await Node.deleteMany({ chapterId: chapter._id });
            }
            await Chapter.deleteMany({ sectionId: section._id });
        }
        await Section.deleteMany({ courseId: course._id });

        // Create 1 Section with 4 Chapters
        const section = await Section.create({
            title: "Main Curriculum",
            order: 0,
            courseId: course._id,
        });

        const chapterTitles = ["Introduction", "Fundamentals", "Advanced Concepts", "Final Project"];

        for (let i = 0; i < 4; i++) {
            const chapter = await Chapter.create({
                title: chapterTitles[i],
                order: i,
                sectionId: section._id,
            });

            // Add 3 nodes per chapter
            await Node.create([
                {
                    title: `${chapterTitles[i]} - Lesson`,
                    type: "lesson",
                    order: 0,
                    chapterId: chapter._id,
                    content: "Welcome to this lesson! Today we will learn about " + chapterTitles[i],
                },
                {
                    title: `${chapterTitles[i]} - Challenge`,
                    type: "challenge",
                    order: 1,
                    chapterId: chapter._id,
                    starterCode: "// Solve the challenge here",
                },
                {
                    title: `${chapterTitles[i]} - Quiz`,
                    type: "quiz",
                    order: 2,
                    chapterId: chapter._id,
                    questions: [
                        {
                            question: "What is " + chapterTitles[i] + "?",
                            options: ["Option A", "Option B", "Option C", "Option D"],
                            correctAnswer: "Option A",
                        },
                    ],
                },
            ]);
        }

        console.log("Successfully seeded 4 chapters with nodes!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
}

seed();
