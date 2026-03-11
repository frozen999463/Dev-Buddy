import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { pythonCourse } from "../data/python_course";
import { cCourse } from "../data/c_course";
import { dartCourse } from "../data/dart_course";

// Load environment variables from the backend folder to get MONGO_URI
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/devbuddy";

// -------------------------------------------------------------
// 1. Models
// -------------------------------------------------------------
const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    thumbnail: { type: String },
    status: { type: String, enum: ["draft", "published"], default: "published" },
    createdBy: { type: String },
}, { timestamps: true });

const sectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    order: { type: Number, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
}, { timestamps: true });

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    order: { type: Number, required: true },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
}, { timestamps: true });

const nodeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ["lesson", "quiz", "challenge"], required: true },
    content: { type: String },
    order: { type: Number, required: true },
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
    questions: [{ question: String, options: [String], correctAnswer: Number }],
    starterCode: { type: String },
    solution: { type: String },
    testCases: [{ input: String, expectedOutput: String }],
}, { timestamps: true });

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
const Section = mongoose.models.Section || mongoose.model("Section", sectionSchema);
const Chapter = mongoose.models.Chapter || mongoose.model("Chapter", chapterSchema);
const Node = mongoose.models.Node || mongoose.model("Node", nodeSchema);

// -------------------------------------------------------------
// 2. Data to Insert
// -------------------------------------------------------------
const allCourses = [pythonCourse, cCourse, dartCourse];

// -------------------------------------------------------------
// 3. Execution Function
// -------------------------------------------------------------
async function seedDatabase() {
    try {
        console.log("Connecting to MongoDB at:", MONGO_URI);
        await mongoose.connect(MONGO_URI);
        console.log("Connected successfully!");

        console.log("Clearing old course data for these comprehensive slugs...");
        const slugs = allCourses.map(c => c.course.slug);
        const existingCourses = await Course.find({ slug: { $in: slugs } });

        for (const ec of existingCourses) {
            const sections = await Section.find({ courseId: ec._id });
            for (const sec of sections) {
                const chapters = await Chapter.find({ sectionId: sec._id });
                for (const chap of chapters) {
                    await Node.deleteMany({ chapterId: chap._id });
                }
                await Chapter.deleteMany({ sectionId: sec._id });
            }
            await Section.deleteMany({ courseId: ec._id });
            await Course.deleteOne({ _id: ec._id });
        }

        console.log("Inserting highly detailed new courses...");

        for (const courseData of allCourses) {
            const newCourse = await Course.create(courseData.course);
            console.log(`Created Course: ${newCourse.title}`);

            for (const secData of courseData.sections) {
                const newSection = await Section.create({
                    title: secData.title,
                    order: secData.order,
                    courseId: newCourse._id
                });

                for (const chapData of secData.chapters || []) {
                    const newChapter = await Chapter.create({
                        title: chapData.title,
                        order: chapData.order,
                        sectionId: newSection._id
                    });

                    for (const nodeData of chapData.nodes || []) {
                        await Node.create({
                            ...nodeData,
                            chapterId: newChapter._id
                        });
                    }
                }
            }
        }

        console.log("✅ Comprehensive Seeding Complete!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();
