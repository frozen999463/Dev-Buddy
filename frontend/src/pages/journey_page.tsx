import { useState, useEffect } from "react";
import { SideBar } from "@/components/side_bar";
import JourneyRightPanel from "@/components/JourneyRightPanel";
import CourseContents from "@/components/CourseContents";
import ForumSection from "@/components/ForumSection";
import { ChevronLeft, BookOpen, MessageSquare, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";

type Tab = "roadmap" | "forum";

const JourneyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("roadmap");
  const [courseName, setCourseName] = useState<string>("");

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/api/course/${id}`)
      .then((res) => res.json())
      .then((data) => setCourseName(data.title || ""))
      .catch(() => {});
  }, [id]);

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-neutral-900">
      <aside className="w-64 bg-white border-r border-neutral-200 hidden lg:flex flex-col sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-6 flex flex-col h-full">
          <SideBar courseId={id} />
        </div>
      </aside>

      <main className="flex-1 px-4 md:px-8 py-8 flex justify-center bg-white shadow-inner">
        <div className="w-full max-w-2xl space-y-8">
          {/* Header Row */}
          <div className="flex items-center justify-between sticky top-16 bg-white/80 backdrop-blur-md z-40 py-2 border-b border-neutral-100">
            <div className="flex flex-col">
              <Button
                variant="ghost"
                className="text-neutral-500 hover:text-neutral-900 p-0 self-start"
                onClick={() => navigate("/my-courses")}
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                <span className="font-semibold text-lg text-primary uppercase">My Courses</span>
              </Button>
              {courseName && (
                <div className="flex items-center gap-2 mt-1 ml-1">
                  <GraduationCap className="h-3.5 w-3.5 text-violet-500" />
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    {courseName}
                  </span>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex items-center bg-[#f1f3ff] rounded-2xl p-1 gap-1">
              <button
                onClick={() => setActiveTab("roadmap")}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-black uppercase tracking-wide transition-all ${activeTab === "roadmap"
                  ? "bg-[#373F6E] text-white shadow-lg"
                  : "text-[#373F6E]/60 hover:text-[#373F6E]"
                  }`}
              >
                <BookOpen size={15} />
                Roadmap
              </button>
              <button
                onClick={() => setActiveTab("forum")}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-black uppercase tracking-wide transition-all ${activeTab === "forum"
                  ? "bg-[#373F6E] text-white shadow-lg"
                  : "text-[#373F6E]/60 hover:text-[#373F6E]"
                  }`}
              >
                <MessageSquare size={15} />
                Q&A
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "roadmap" ? (
            <CourseContents courseId={id} />
          ) : (
            <ForumSection courseId={id!} />
          )}
        </div>
      </main>

      <aside className="w-[350px] bg-white px-6 py-8 hidden xl:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-l border-neutral-200">
        <JourneyRightPanel />
      </aside>
    </div>
  );
};

export default JourneyPage;

