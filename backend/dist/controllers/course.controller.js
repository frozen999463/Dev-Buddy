"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.getCourseById = exports.getAllCourses = exports.createCourse = void 0;
const Course_1 = require("../models/Course");
const Section_1 = require("../models/Section");
const Chapter_1 = require("../models/Chapter");
const Node_1 = require("../models/Node");
// CREATE a new course
const createCourse = async (req, res) => {
    try {
        const { title, description, thumbnail, curriculum } = req.body;
        // 1. Create the Course
        const slug = title.toLowerCase().replace(/\s+/g, "-");
        const course = await Course_1.Course.create({
            title,
            slug,
            description,
            thumbnail,
            status: "draft",
            createdBy: req.user?.uid
        });
        // 2. If curriculum exists, save sections, chapters, and nodes
        if (curriculum && Array.isArray(curriculum)) {
            for (let sIdx = 0; sIdx < curriculum.length; sIdx++) {
                const sectionData = curriculum[sIdx];
                // Create Section
                const section = await Section_1.Section.create({
                    title: sectionData.title,
                    order: sIdx,
                    courseId: course._id
                });
                if (sectionData.chapters && Array.isArray(sectionData.chapters)) {
                    for (let cIdx = 0; cIdx < sectionData.chapters.length; cIdx++) {
                        const chapterData = sectionData.chapters[cIdx];
                        // Create Chapter
                        const chapter = await Chapter_1.Chapter.create({
                            title: chapterData.title,
                            order: cIdx,
                            sectionId: section._id
                        });
                        if (chapterData.nodes && Array.isArray(chapterData.nodes)) {
                            for (let nIdx = 0; nIdx < chapterData.nodes.length; nIdx++) {
                                const nodeData = chapterData.nodes[nIdx];
                                // Create Node
                                await Node_1.Node.create({
                                    title: nodeData.title,
                                    type: nodeData.type,
                                    order: nIdx,
                                    chapterId: chapter._id,
                                    // Add default empty content for now
                                    content: nodeData.type === 'lesson' ? "" : undefined,
                                    questions: nodeData.type === 'quiz' ? [] : undefined,
                                    starterCode: nodeData.type === 'challenge' ? "" : undefined
                                });
                            }
                        }
                    }
                }
            }
        }
        res.status(201).json(course);
    }
    catch (error) {
        console.error("Save Error:", error);
        res.status(500).json({ message: "Failed to create course" });
    }
};
exports.createCourse = createCourse;
// GET all courses (for admin dashboard)
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course_1.Course.find().sort({ createdAt: -1 });
        res.json(courses);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch courses" });
    }
};
exports.getAllCourses = getAllCourses;
// GET single course with FULL structure (sections -> chapters -> nodes)
const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course_1.Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        // Get all sections for this course
        const sections = await Section_1.Section.find({ courseId: id }).sort({ order: 1 });
        // For each section, get chapters and nodes
        const sectionsWithContent = await Promise.all(sections.map(async (section) => {
            const chapters = await Chapter_1.Chapter.find({ sectionId: section._id }).sort({ order: 1 });
            const chaptersWithNodes = await Promise.all(chapters.map(async (chapter) => {
                const nodes = await Node_1.Node.find({ chapterId: chapter._id }).sort({ order: 1 });
                return { ...chapter.toObject(), nodes };
            }));
            return { ...section.toObject(), chapters: chaptersWithNodes };
        }));
        res.json({
            ...course.toObject(),
            sections: sectionsWithContent
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch course" });
    }
};
exports.getCourseById = getCourseById;
// UPDATE a course (including curriculum structure)
const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, thumbnail, curriculum } = req.body;
        // 1. Update the Course info
        const slug = title ? title.toLowerCase().replace(/\s+/g, "-") : undefined;
        const course = await Course_1.Course.findByIdAndUpdate(id, { title, slug, description, thumbnail }, { new: true });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        // 2. If curriculum is provided, we sync it
        // SIMPLE APPROACH: Delete old structure and create new
        if (curriculum && Array.isArray(curriculum)) {
            // Cascade delete old structure
            const sections = await Section_1.Section.find({ courseId: id });
            for (const section of sections) {
                const chapters = await Chapter_1.Chapter.find({ sectionId: section._id });
                for (const chapter of chapters) {
                    await Node_1.Node.deleteMany({ chapterId: chapter._id });
                }
                await Chapter_1.Chapter.deleteMany({ sectionId: section._id });
            }
            await Section_1.Section.deleteMany({ courseId: id });
            // Recreate structure
            for (let sIdx = 0; sIdx < curriculum.length; sIdx++) {
                const sectionData = curriculum[sIdx];
                const section = await Section_1.Section.create({
                    title: sectionData.title,
                    order: sIdx,
                    courseId: course._id
                });
                if (sectionData.chapters && Array.isArray(sectionData.chapters)) {
                    for (let cIdx = 0; cIdx < sectionData.chapters.length; cIdx++) {
                        const chapterData = sectionData.chapters[cIdx];
                        const chapter = await Chapter_1.Chapter.create({
                            title: chapterData.title,
                            order: cIdx,
                            sectionId: section._id
                        });
                        if (chapterData.nodes && Array.isArray(chapterData.nodes)) {
                            for (let nIdx = 0; nIdx < chapterData.nodes.length; nIdx++) {
                                const nodeData = chapterData.nodes[nIdx];
                                await Node_1.Node.create({
                                    title: nodeData.title,
                                    type: nodeData.type,
                                    order: nIdx,
                                    chapterId: chapter._id,
                                    // Preserve content if node already has an ID (diffing would be better, but for now we assume new nodes)
                                    content: nodeData.content || "",
                                    questions: nodeData.questions || [],
                                    starterCode: nodeData.starterCode || ""
                                });
                            }
                        }
                    }
                }
            }
        }
        res.json(course);
    }
    catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Failed to update course" });
    }
};
exports.updateCourse = updateCourse;
// DELETE a course (cascade delete all related data)
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course_1.Course.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        // CASCADE DELETE: Remove all related data
        const sections = await Section_1.Section.find({ courseId: id });
        for (const section of sections) {
            const chapters = await Chapter_1.Chapter.find({ sectionId: section._id });
            for (const chapter of chapters) {
                await Node_1.Node.deleteMany({ chapterId: chapter._id });
            }
            await Chapter_1.Chapter.deleteMany({ sectionId: section._id });
        }
        await Section_1.Section.deleteMany({ courseId: id });
        res.json({ message: "Course deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete course" });
    }
};
exports.deleteCourse = deleteCourse;
