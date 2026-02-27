"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Course_1 = require("./models/Course");
const Section_1 = require("./models/Section");
const Chapter_1 = require("./models/Chapter");
const Node_1 = require("./models/Node");
dotenv_1.default.config();
async function testModels() {
    try {
        // Connect to MongoDB
        console.log("🔌 Connecting to MongoDB...");
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB!\n");
        // 1. Create a Course
        console.log("📚 Creating a course...");
        const course = await Course_1.Course.create({
            title: "Python Basics",
            slug: "python-basics",
            description: "Learn Python programming from scratch",
            status: "draft",
            createdBy: "test-admin"
        });
        console.log("✅ Course created:", course.title, `(ID: ${course._id})\n`);
        // 2. Create a Section
        console.log("📂 Creating a section...");
        const section = await Section_1.Section.create({
            title: "Getting Started",
            description: "Your first steps in Python",
            order: 1,
            courseId: course._id
        });
        console.log("✅ Section created:", section.title, `(ID: ${section._id})\n`);
        // 3. Create a Chapter
        console.log("📖 Creating a chapter...");
        const chapter = await Chapter_1.Chapter.create({
            title: "Introduction",
            order: 1,
            sectionId: section._id
        });
        console.log("✅ Chapter created:", chapter.title, `(ID: ${chapter._id})\n`);
        // 4. Create Nodes (Lessons, Quiz, Challenge)
        console.log("📝 Creating nodes...");
        const lesson1 = await Node_1.Node.create({
            title: "Hello World",
            type: "lesson",
            content: "# Hello World\n\nYour first Python program!",
            order: 1,
            chapterId: chapter._id
        });
        console.log("✅ Lesson created:", lesson1.title);
        const lesson2 = await Node_1.Node.create({
            title: "Variables",
            type: "lesson",
            content: "# Variables\n\nLearn about Python variables",
            order: 2,
            chapterId: chapter._id
        });
        console.log("✅ Lesson created:", lesson2.title);
        const quiz = await Node_1.Node.create({
            title: "Basics Quiz",
            type: "quiz",
            order: 3,
            chapterId: chapter._id,
            questions: [
                {
                    question: "What is the output of print('Hello')?",
                    options: ["Hello", "hello", "HELLO", "Error"],
                    correctAnswer: 0
                }
            ]
        });
        console.log("✅ Quiz created:", quiz.title);
        const challenge = await Node_1.Node.create({
            title: "FizzBuzz Challenge",
            type: "challenge",
            order: 4,
            chapterId: chapter._id,
            starterCode: "# Write your FizzBuzz solution here\n",
            solution: "for i in range(1, 101):\n    if i % 15 == 0:\n        print('FizzBuzz')\n    elif i % 3 == 0:\n        print('Fizz')\n    elif i % 5 == 0:\n        print('Buzz')\n    else:\n        print(i)"
        });
        console.log("✅ Challenge created:", challenge.title, "\n");
        // 5. Query the full structure
        console.log("🔍 Querying the full course structure...\n");
        const fullCourse = await Course_1.Course.findById(course._id);
        const sections = await Section_1.Section.find({ courseId: course._id });
        console.log("📚 Course:", fullCourse?.title);
        for (const sec of sections) {
            console.log(`  📂 Section: ${sec.title}`);
            const chapters = await Chapter_1.Chapter.find({ sectionId: sec._id });
            for (const chap of chapters) {
                console.log(`    📖 Chapter: ${chap.title}`);
                const nodes = await Node_1.Node.find({ chapterId: chap._id }).sort({ order: 1 });
                for (const node of nodes) {
                    const icon = node.type === "lesson" ? "📝" : node.type === "quiz" ? "❓" : "⭐";
                    console.log(`      ${icon} ${node.type}: ${node.title}`);
                }
            }
        }
        console.log("\n✅ All tests passed! Your models are working correctly! 🎉");
    }
    catch (error) {
        console.error("❌ Error:", error);
    }
    finally {
        await mongoose_1.default.disconnect();
        console.log("\n🔌 Disconnected from MongoDB");
    }
}
testModels();
