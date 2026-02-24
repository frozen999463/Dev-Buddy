import { useState, useEffect } from "react";
import { SideBar } from "@/components/side_bar";
import JourneyRightPanel from "@/components/JourneyRightPanel";
import CourseContents from "@/components/CourseContents";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";

const JourneyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseTitle, setCourseTitle] = useState("Loading...");

  useEffect(() => {
    const fetchCourseTitle = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/course/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCourseTitle(data.title || "Course Roadmap");
        }
      } catch (error) {
        console.error("Failed to fetch course title:", error);
        setCourseTitle("Journey");
      }
    };

    if (id) fetchCourseTitle();
  }, [id]);

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-neutral-900">
      <aside className="w-64 bg-white border-r border-neutral-200 hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-6">
          <SideBar />
        </div>
      </aside>
      <main className="flex-1 px-4 md:px-8 py-8 flex justify-center bg-white shadow-inner">
        <div className="w-full max-w-2xl space-y-8">
          <div className="flex items-center gap-4 sticky top-16 bg-white/80 backdrop-blur-md z-40 py-2 border-b border-neutral-100 mb-8">
            <Button
              variant="ghost"
              className="text-neutral-500 hover:text-neutral-900 p-0"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span className="font-semibold text-lg">{courseTitle}</span>
            </Button>
          </div>
          <CourseContents courseId={id} />
        </div>
      </main>
      <aside className="w-[350px] bg-white px-6 py-8 hidden xl:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-l border-neutral-200">
        <JourneyRightPanel />
      </aside>
    </div>
  );
};

export default JourneyPage;
