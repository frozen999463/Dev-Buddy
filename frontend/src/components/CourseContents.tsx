import React from "react";
import { Check, Star, Trophy } from "lucide-react";
import { RoadmapNode } from "../types/section";
// Dummy data for testing the roadmap
const roadmapNodes: RoadmapNode[] = [
  { id: "1", title: "Intro", type: "lesson", status: "completed", chapterId: "c1" },
  { id: "2", title: "Setup", type: "lesson", status: "completed", chapterId: "c1" },
  { id: "3", title: "Hello World", type: "lesson", status: "active", chapterId: "c1" },
  { id: "4", title: "Basics Quiz", type: "quiz", status: "locked", chapterId: "c1" },
  { id: "5", title: "Practice 1", type: "challenge", status: "locked", chapterId: "c2" },
];
const CourseContents = () => {
  return (
    <div className="flex flex-col items-center py-2 bg-white min-h-screen content-center">
      <div className="relative w-full max-w-sm flex flex-col items-center">
        
        {roadmapNodes.map((node, index) => {
          // Logic to show a divider if the chapter changes
          const showDivider = index === 0 || roadmapNodes[index - 1].chapterId !== node.chapterId;
          const chapterTitle = node.chapterId === "c1" ? "Introduction" : "Variables";
          return (
            <React.Fragment key={node.id}>
              {showDivider && (
                <div className="w-full flex items-center gap-4 my-12">
                  <div className="h-[1px] flex-1 bg-neutral-200" />
                  <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">
                    {chapterTitle}
                  </span>
                  <div className="h-[1px] flex-1 bg-neutral-200" />
                </div>
              )}
              <div className="relative flex flex-col items-center w-full">
                {/* 📏 Connecting Pipe */}
                {index !== 0 && !showDivider && (
                   <div className={`w-3 h-16 -mt-2 mb-2 rounded-full ${
                     node.status === "locked" ? "bg-neutral-100" : "bg-green-100"
                   }`}>
                       <div className={`h-full w-full rounded-full transition-all duration-1000 ${
                           node.status === "completed" ? "bg-green-500" : "bg-transparent"
                       }`} />
                   </div>
                )}
                {/* ⬢ The Hexagon Node */}
                <RoadmapNodeItem node={node} index={index} />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
/* ⬢ Helper component for the individual nodes */
const RoadmapNodeItem = ({ node, index }: { node: RoadmapNode; index: number }) => {
  // 🐍 "Snake" stagger offsets: center -> right -> center-right -> center -> left -> center-left -> center
  const offsets = ["0px", "40px", "70px", "40px", "0px", "-40px", "-70px", "-40px"];
  const currentOffset = offsets[index % offsets.length];
  const getColors = () => {
    if (node.status === "locked") return "bg-neutral-200 text-neutral-400 border-neutral-300 shadow-[0_6px_0_0_#d4d4d4]";
    if (node.type === "lesson") return "bg-green-500 text-white shadow-[0_8px_0_0_#16a34a] border-green-600";
    if (node.type === "challenge") return "bg-orange-500 text-white shadow-[0_8px_0_0_#9a3412] border-orange-600";
    return "bg-purple-500 text-white shadow-[0_8px_0_0_#7c3aed] border-purple-600"; // Quiz
  };
  return (
    <div 
      className="relative z-10 py-4 group cursor-pointer" 
      style={{ transform: `translateX(${currentOffset})` }}
    >
      {/* 3D Button Style */}
      <div className={`${getColors()} w-16 h-16 rounded-2xl flex items-center justify-center border-b-4 transition-all active:translate-y-1 active:shadow-none`}>
         {node.status === "completed" && <Check size={32} strokeWidth={3} />}
         {node.status === "active" && node.type === "lesson" && <div className="w-4 h-4 rounded-full bg-white animate-pulse" />}
         {node.type === "challenge" && <Star size={28} fill="currentColor" />}
         {node.type === "quiz" && <Trophy size={28} fill="currentColor" />}
      </div>
      
      {/* Tooltip Label */}
      <div className="absolute top-1/2 -translate-y-1/2 left-20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
        <span className="bg-neutral-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xl">
          {node.title}
        </span>
      </div>
    </div>
  );
};
export default CourseContents;