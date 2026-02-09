import { SideBar } from "@/components/side_bar";
import JourneyRightPanel from "@/components/JourneyRightPanel";
import CourseContents from "@/components/CourseContents"; // 1️⃣ Import the roadmap
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";

const JourneyPage = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-[#f8fafc] text-neutral-900 flex">
      <aside className="w-64 bg-white border-r border-neutral-200 hidden lg:block sticky top-0 h-screen">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-sky-600 mb-8 uppercase tracking-widest">Dev-Buddy</h1>
          <SideBar />
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8 flex justify-center bg-white shadow-inner">
        <div className="w-full max-w-2xl space-y-8">
           <div className="flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-40 py-2 border-b border-neutral-100 mb-8">
            <Button variant="ghost" className="text-neutral-500 hover:text-neutral-900 p-0">
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span className="font-semibold text-lg">Introduction</span> {/* Updated title */}
            </Button>
          </div>
          {/* 2️⃣ Use the Roadmap component here instead of CourseSections */}
          <CourseContents courseId={id} />
        </div>
      </main>
      <aside className="w-[350px] bg-white px-6 py-8 hidden xl:block sticky top-0 h-screen overflow-y-auto border-l border-neutral-200">
        <JourneyRightPanel />
      </aside>
    </div>
  );
};
export default JourneyPage;
