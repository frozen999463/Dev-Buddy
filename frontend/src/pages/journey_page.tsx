import CourseSections from "@/components/main_content";
import { SideBar } from "@/components/side_bar";
import { dummySections } from "@/data/dummySection";
import { Sidebar } from "flowbite-react/components/Sidebar";

const JourneyPage = () => {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-950 border-r border-neutral-800">
        <SideBar></SideBar>
      </aside>

      {/* Main content area */}
      <main className="flex-1 flex justify-center px-6 py-6">
        <div className="w-full max-w-3xl">
          <CourseSections sections={dummySections}></CourseSections>
        </div>
      </main>

      {/* Right panel */}
      <aside className="w-80 px-4 py-6 hidden xl:block">
        Right panel
      </aside>

    </div>
  );
};

export default JourneyPage;
