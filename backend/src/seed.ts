import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { pythonMasterclass } from "./data/python_masterclass_course";
import { cMasterclass } from "./data/c_masterclass_course";
import { dartMasterclass } from "./data/dart_masterclass_course";
import { cCourse } from "./data/c_course";
import { pythonCourse } from "./data/python_course";
import { dartCourse } from "./data/dart_course";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/devbuddy"; // fallback URI

// -------------------------------------------------------------
// 1. Defining Models Locally to Keep This Script Independent
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
const coursesData = [
    pythonMasterclass,
    cMasterclass,
    dartMasterclass,
    {
        course: {
            title: "Programming Basics with C",
            slug: "c-programming-basics",
            description: "Learn the fundamentals of programming using the C language.",
            status: "published"
        },
        sections: [
            {
                title: "Introduction", order: 1,
                chapters: [
                    {
                        title: "Getting Started", order: 1,
                        nodes: [
                            { title: "Hello World in C", type: "lesson", order: 1, content: "## Hello World\\n`#include <stdio.h>\\nint main() { printf('Hello World\\\\n'); return 0; }`" },
                            { title: "Basic C Quiz", type: "quiz", order: 2, questions: [{ question: "Which function is the entry point of a C program?", options: ["start()", "main()", "init()", "run()"], correctAnswer: 1 }] }
                        ]
                    }
                ]
            },
            {
                title: "Core Concepts", order: 2,
                chapters: [
                    {
                        title: "Variables and Data Types", order: 1,
                        nodes: [
                            { title: "Ints, Floats, and Chars", type: "lesson", order: 1, content: "Learn about `int`, `float`, `char`, and memory allocation." }
                        ]
                    },
                    {
                        title: "Control Flow", order: 2,
                        nodes: [
                            { title: "If-Else Statements", type: "lesson", order: 1, content: "Learn how to make decisions using `if`, `else if`, and `else`." },
                            { title: "Loops (For, While)", type: "lesson", order: 2, content: "Repeat actions using `for` and `while` loops." }
                        ]
                    }
                ]
            },
            {
                title: "Advanced C", order: 3,
                chapters: [
                    {
                        title: "Pointers and Memory", order: 1,
                        nodes: [
                            { title: "Introduction to Pointers", type: "lesson", order: 1, content: "Pointers store memory addresses of variables." }
                        ]
                    },
                    {
                        title: "Structures (Structs)", order: 2,
                        nodes: [
                            { title: "Using Structs", type: "lesson", order: 1, content: "Structs group related variables. A precursor to classes in OOP!" }
                        ]
                    }
                ]
            }
        ]
    },
    {
        course: {
            title: "Python for Beginners",
            slug: "python-for-beginners",
            description: "Start your coding journey with Python, a beginner-friendly and powerful language.",
            status: "published"
        },
        sections: [
            {
                title: "Python Basics", order: 1,
                chapters: [
                    {
                        title: "Introduction to Python", order: 1,
                        nodes: [
                            { title: "Hello World in Python", type: "lesson", order: 1, content: "## Hello Python\\n`print('Hello World')`" }
                        ]
                    },
                    {
                        title: "Data Structures", order: 2,
                        nodes: [
                            { title: "Lists and Dictionaries", type: "lesson", order: 1, content: "Lists `[]` are ordered, Dictionaries `{}` store key-value pairs." }
                        ]
                    }
                ]
            },
            {
                title: "Object-Oriented Programming", order: 2,
                chapters: [
                    {
                        title: "Classes and Objects", order: 1,
                        nodes: [
                            { title: "Creating a Class", type: "lesson", order: 1, content: "Use the `class` keyword. `class Dog:\\n  def __init__(self, name):\\n    self.name = name`" },
                            { title: "OOP Quiz", type: "quiz", order: 2, questions: [{ question: "What is `self` in Python?", options: ["A language keyword", "A reference to the current instance", "A function", "A global variable"], correctAnswer: 1 }] }
                        ]
                    },
                    {
                        title: "Inheritance", order: 2,
                        nodes: [
                            { title: "Inheriting Methods", type: "lesson", order: 1, content: "Classes can inherit traits from other classes." }
                        ]
                    }
                ]
            }
        ]
    },
    {
        course: {
            title: "Dart Basics",
            slug: "dart-basics",
            description: "Learn Dart, the language behind popular frameworks like Flutter.",
            status: "published"
        },
        sections: [
            {
                title: "Intro to Dart", order: 1,
                chapters: [
                    {
                        title: "Hello Dart", order: 1,
                        nodes: [
                            { title: "Printing Output", type: "lesson", order: 1, content: "`void main() { print('Hello Dart!'); }`" }
                        ]
                    },
                    {
                        title: "Variables and Types", order: 2,
                        nodes: [
                            { title: "Final vs Const", type: "lesson", order: 1, content: "`final` is runtime constant, `const` is compile-time constant." }
                        ]
                    }
                ]
            },
            {
                title: "Dart Object-Oriented", order: 2,
                chapters: [
                    {
                        title: "Classes in Dart", order: 1,
                        nodes: [
                            { title: "Constructors and Mixins", type: "lesson", order: 1, content: "Dart supports powerful OOP features including mixins for multiple inheritance-like behavior." }
                        ]
                    }
                ]
            }
        ]
    }
];

// -------------------------------------------------------------
// 3. Execution Function
// -------------------------------------------------------------
async function seedDatabase() {
    try {
        console.log("Connecting to MongoDB at:", MONGO_URI);
        await mongoose.connect(MONGO_URI);
        console.log("Connected successfully!");

        console.log("Clearing old course data for these slugs...");
        const slugs = coursesData.map(c => c.course.slug);
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

        console.log("Inserting new courses...");

        for (const courseData of coursesData) {
            const newCourse = await Course.create(courseData.course);
            console.log(`Created Course: ${newCourse.title}`);

            for (const secData of courseData.sections) {
                const newSection = await Section.create({
                    title: secData.title,
                    order: secData.order,
                    courseId: newCourse._id
                });

                for (const chapData of secData.chapters) {
                    const newChapter = await Chapter.create({
                        title: chapData.title,
                        order: chapData.order,
                        sectionId: newSection._id
                    });

                    for (const nodeData of chapData.nodes) {
                        await Node.create({
                            ...nodeData,
                            chapterId: newChapter._id
                        });
                    }
                }
            }
        }

        console.log("✅ Seeding Complete!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();
