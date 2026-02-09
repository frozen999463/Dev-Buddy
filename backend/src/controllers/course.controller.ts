import { Request, Response } from "express";
import { Course } from "../models/Course";
import { Section } from "../models/Section";
import { Chapter } from "../models/Chapter";
import { Node } from "../models/Node";

// CREATE a new course
export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, thumbnail, curriculum } = req.body;

    // 1. Create the Course
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    const course = await Course.create({
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
        const section = await Section.create({
          title: sectionData.title,
          order: sIdx,
          courseId: course._id
        });

        if (sectionData.chapters && Array.isArray(sectionData.chapters)) {
          for (let cIdx = 0; cIdx < sectionData.chapters.length; cIdx++) {
            const chapterData = sectionData.chapters[cIdx];

            // Create Chapter
            const chapter = await Chapter.create({
              title: chapterData.title,
              order: cIdx,
              sectionId: section._id
            });

            if (chapterData.nodes && Array.isArray(chapterData.nodes)) {
              for (let nIdx = 0; nIdx < chapterData.nodes.length; nIdx++) {
                const nodeData = chapterData.nodes[nIdx];

                // Create Node
                await Node.create({
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
  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({ message: "Failed to create course" });
  }
};

// GET all courses (for admin dashboard)
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

// GET single course with FULL structure (sections -> chapters -> nodes)
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Get all sections for this course
    const sections = await Section.find({ courseId: id }).sort({ order: 1 });

    // For each section, get chapters and nodes
    const sectionsWithContent = await Promise.all(
      sections.map(async (section) => {
        const chapters = await Chapter.find({ sectionId: section._id }).sort({ order: 1 });

        const chaptersWithNodes = await Promise.all(
          chapters.map(async (chapter) => {
            const nodes = await Node.find({ chapterId: chapter._id }).sort({ order: 1 });
            return { ...chapter.toObject(), nodes };
          })
        );

        return { ...section.toObject(), chapters: chaptersWithNodes };
      })
    );

    res.json({
      ...course.toObject(),
      sections: sectionsWithContent
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch course" });
  }
};

// UPDATE a course (including curriculum structure)
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, thumbnail, curriculum } = req.body;

    // 1. Update the Course info
    const slug = title ? title.toLowerCase().replace(/\s+/g, "-") : undefined;
    const course = await Course.findByIdAndUpdate(
      id,
      { title, slug, description, thumbnail },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 2. If curriculum is provided, we sync it
    // SIMPLE APPROACH: Delete old structure and create new
    if (curriculum && Array.isArray(curriculum)) {
      // Cascade delete old structure
      const sections = await Section.find({ courseId: id });
      for (const section of sections) {
        const chapters = await Chapter.find({ sectionId: section._id });
        for (const chapter of chapters) {
          await Node.deleteMany({ chapterId: chapter._id });
        }
        await Chapter.deleteMany({ sectionId: section._id });
      }
      await Section.deleteMany({ courseId: id });

      // Recreate structure
      for (let sIdx = 0; sIdx < curriculum.length; sIdx++) {
        const sectionData = curriculum[sIdx];
        const section = await Section.create({
          title: sectionData.title,
          order: sIdx,
          courseId: course._id
        });

        if (sectionData.chapters && Array.isArray(sectionData.chapters)) {
          for (let cIdx = 0; cIdx < sectionData.chapters.length; cIdx++) {
            const chapterData = sectionData.chapters[cIdx];
            const chapter = await Chapter.create({
              title: chapterData.title,
              order: cIdx,
              sectionId: section._id
            });

            if (chapterData.nodes && Array.isArray(chapterData.nodes)) {
              for (let nIdx = 0; nIdx < chapterData.nodes.length; nIdx++) {
                const nodeData = chapterData.nodes[nIdx];
                await Node.create({
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
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Failed to update course" });
  }
};

// DELETE a course (cascade delete all related data)
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // CASCADE DELETE: Remove all related data
    const sections = await Section.find({ courseId: id });

    for (const section of sections) {
      const chapters = await Chapter.find({ sectionId: section._id });

      for (const chapter of chapters) {
        await Node.deleteMany({ chapterId: chapter._id });
      }

      await Chapter.deleteMany({ sectionId: section._id });
    }

    await Section.deleteMany({ courseId: id });

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course" });
  }
};