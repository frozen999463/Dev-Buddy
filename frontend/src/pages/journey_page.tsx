import CourseSections from "@/components/main_content";
import { SideBar } from "@/components/side_bar";
import { dummySections } from "@/data/dummySection";
import JourneyRightPanel from "@/components/JourneyRightPanel";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
const JourneyPage = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-neutral-900 flex"> {/* 1️⃣ Light background, dark text */}
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 hidden lg:block sticky top-0 h-screen"> {/* 2️⃣ White BG, Light border */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-sky-600 mb-8 uppercase tracking-widest">Dev-Buddy</h1>
          <SideBar />
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8 flex justify-center">
        <div className="w-full max-w-2xl space-y-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-neutral-500 hover:text-neutral-900 p-0">
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span className="font-semibold">Back</span>
            </Button>
          </div>
          <CourseSections sections={dummySections} />
        </div>
      </main>
      {/* Right Panel */}
      <aside className="w-[350px] bg-white px-6 py-8 hidden xl:block sticky top-0 h-screen overflow-y-auto border-l border-neutral-200">
        <JourneyRightPanel />
      </aside>
    </div>
  );
};
export default JourneyPage;
