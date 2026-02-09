import React, { useState, useEffect } from "react";
import { Check, Star, Trophy, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// 1. Define the interface for our Flattened Nodes
interface Node {
  _id: string;
  title: string;
  type: "lesson" | "quiz" | "challenge";
  status?: "completed" | "active" | "locked";
  chapterTitle?: string;
  chapterId: string;
}

// 2. Accept courseId as a prop
const CourseContents = ({ courseId }: { courseId?: string }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) fetchCurriculum();
  }, [courseId]);

  const fetchCurriculum = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/course/${courseId}`);
      const data = await response.json();

      // 🛠️ Transformation Logic: Convert Sections -> Chapters -> Nodes into a flat array
      const flatNodes: Node[] = [];

      data.sections?.forEach((section: any) => {
        section.chapters?.forEach((chapter: any) => {
          chapter.nodes?.forEach((node: any) => {
            flatNodes.push({
              ...node,
              chapterTitle: chapter.title,
              chapterId: chapter._id || chapter.title,
              // Set first lesson to active, others to locked for now
              status: (flatNodes.length === 0) ? "active" : "locked"
            });
          });
        });
      });

      setNodes(flatNodes);
    } catch (error) {
      console.error("Failed to load roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in">
      <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
      <p className="text-muted-foreground font-medium italic">Unrolling your path...</p>
    </div>
  );

  if (nodes.length === 0) return (
    <div className="text-center py-20 border-2 border-dashed rounded-3xl bg-muted/20">
      <p className="text-muted-foreground italic">This path is empty. Check back later!</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center py-2 bg-white min-h-screen content-center">
      <div className="relative w-full max-w-sm flex flex-col items-center">
        {nodes.map((node, index) => {
          const showDivider = index === 0 || nodes[index - 1].chapterId !== node.chapterId;

          return (
            <React.Fragment key={node._id || index}>
              {showDivider && (
                <div className="w-full flex items-center gap-4 my-12 animate-in slide-in-from-bottom-2">
                  <div className="h-[1px] flex-1 bg-neutral-200" />
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] whitespace-nowrap">
                    {node.chapterTitle}
                  </span>
                  <div className="h-[1px] flex-1 bg-neutral-200" />
                </div>
              )}
              <div className="relative flex flex-col items-center w-full">
                {/* 📏 Connecting Pipe */}
                {index !== 0 && !showDivider && (
                  <div className={`w-3 h-16 -mt-2 mb-2 rounded-full ${node.status === "locked" ? "bg-neutral-100" : "bg-green-100"
                    }`}>
                    <div className={`h-full w-full rounded-full transition-all duration-1000 ${node.status === "completed" ? "bg-green-500" : "bg-transparent"
                      }`} />
                  </div>
                )}
                <RoadmapNodeItem node={node} index={index} />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

/* ⬢ Helper component for individual nodes */
const RoadmapNodeItem = ({ node, index }: { node: Node; index: number }) => {
  const offsets = ["0px", "40px", "70px", "40px", "0px", "-40px", "-70px", "-40px"];
  const currentOffset = offsets[index % offsets.length];

  const getColors = () => {
    if (node.status === "locked") return "bg-neutral-200 text-neutral-400 border-neutral-300 shadow-[0_6px_0_0_#d4d4d4]";
    if (node.type === "lesson") return "bg-green-500 text-white shadow-[0_8px_0_0_#16a34a] border-green-600";
    if (node.type === "challenge") return "bg-orange-500 text-white shadow-[0_8px_0_0_#9a3412] border-orange-600";
    return "bg-purple-500 text-white shadow-[0_8px_0_0_#7c3aed] border-purple-600";
  };

  return (
    <div
      className="relative z-10 py-4 group cursor-pointer transition-all hover:scale-110 active:scale-95"
      style={{ transform: `translateX(${currentOffset})` }}
    >
      <div className={`${getColors()} w-16 h-16 rounded-2xl flex items-center justify-center border-b-4 transition-all active:translate-y-1 active:shadow-none`}>
        {node.status === "completed" && <Check size={32} strokeWidth={3} />}
        {node.status === "active" && node.type === "lesson" && <div className="w-4 h-4 rounded-full bg-white animate-pulse" />}
        {node.type === "challenge" && <Star size={28} fill="currentColor" />}
        {node.type === "quiz" && <Trophy size={28} fill="currentColor" />}
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none translate-x-4 group-hover:translate-x-0 duration-300">
        <span className="bg-neutral-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xl flex items-center gap-2">
          {node.title}
          <Badge className="bg-white/20 text-[10px] py-0 border-none">{node.type}</Badge>
        </span>
      </div>
    </div>
  );
};

export default CourseContents;