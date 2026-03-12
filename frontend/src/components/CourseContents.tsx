import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
              status: "locked" // Will be updated based on progress
            });
          });
        });
      });

      // Fetch user's progress for this course
      try {
        const token = await getAuthToken();
        if (token) {
          const progressRes = await fetch(`http://localhost:5000/api/progress/${courseId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (progressRes.ok) {
            const progressData = await progressRes.json();
            const completedNodeIds = new Set(
              progressData.completedNodes.map((p: any) => p.nodeId)
            );

            // Update node statuses based on progress
            flatNodes.forEach((node, index) => {
              if (completedNodeIds.has(node._id)) {
                node.status = "completed";
              } else if (index === 0 || completedNodeIds.has(flatNodes[index - 1]._id)) {
                // First node or previous node completed
                node.status = "active";
              } else {
                node.status = "locked";
              }
            });
          }
        }
      } catch (progressError) {
        console.error("Failed to load progress:", progressError);
        // Fallback: first node active, rest locked
        if (flatNodes.length > 0) flatNodes[0].status = "active";
      }

      setNodes(flatNodes);
    } catch (error) {
      console.error("Failed to load roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to get Firebase auth token
  const getAuthToken = async () => {
    try {
      const { getAuth } = await import("firebase/auth");
      const auth = getAuth();
      const user = auth.currentUser;
      return user ? await user.getIdToken() : null;
    } catch {
      return null;
    }
  };

  // 🎯 Unified numeric offsets for the wavy path
  const pathOffsets = [0, 40, 70, 40, 0, -40, -70, -40];

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
    <div className="flex flex-col items-center py-2 bg-white min-h-screen content-center overflow-x-hidden">
      <div className="relative w-full max-w-sm flex flex-col items-center">
        {nodes.map((node, index) => {
          const showDivider = index === 0 || nodes[index - 1].chapterId !== node.chapterId;

          const currOffset = pathOffsets[index % pathOffsets.length];
          const prevOffset = index > 0 ? pathOffsets[(index - 1) % pathOffsets.length] : 0;

          // Geometry for calculation
          const vDist = 96; // Precise vertical distance between node centers
          const hDist = currOffset - prevOffset;
          const angle = Math.atan2(hDist, vDist) * (180 / Math.PI);
          const lineLength = Math.sqrt(hDist * hDist + vDist * vDist);

          return (
            <React.Fragment key={node._id || index}>
              {showDivider && (
                <div className="w-full flex items-center justify-center gap-6 my-16 animate-in slide-in-from-bottom-2">
                  <div className="h-[2px] w-20 bg-neutral-100" />
                  <span className="text-[11px] font-black text-black uppercase tracking-[0.3em] whitespace-nowrap">
                    {node.chapterTitle || "NEW CHAPTER"}
                  </span>
                  <div className="h-[2px] w-20 bg-neutral-100" />
                </div>
              )}
              <div className="relative flex flex-col items-center w-full">
                {/* 📏 Connecting Line (Diagonal) */}
                {index !== 0 && !showDivider && (
                  <div
                    className="absolute border-l-2 border-dotted border-neutral-300 origin-top pointer-events-none"
                    style={{
                      height: `${lineLength}px`,
                      top: "-48px", // Center of the previous node
                      left: "50%",
                      transform: `translateX(${prevOffset}px) rotate(${-angle}deg)`,
                      zIndex: 0
                    }}
                  />
                )}
                <RoadmapNodeItem node={node} index={index} courseId={courseId} offsets={pathOffsets} />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

/* ⬢ Helper component for individual nodes */
const RoadmapNodeItem = ({ node, index, courseId, offsets }: { node: Node; index: number; courseId?: string; offsets: number[] }) => {
  const currentOffset = `${offsets[index % offsets.length]}px`;

  const getColors = () => {
    if (node.status === "completed") return "bg-orange-500 text-white shadow-[0_8px_0_0_#c2410c] border-[#ea580c]";
    if (node.status === "active") return "bg-purple-500 text-white shadow-[0_8px_0_0_#6d28d9] border-[#7c3aed]";
    return "bg-neutral-200 text-neutral-400 border-neutral-300 shadow-[0_6px_0_0_#d4d4d4]";
  };

  return (
    <Link to={`/course/${courseId}/learn/${node._id}`}>
      <div
        className="relative z-10 py-4 group cursor-pointer transition-all hover:scale-110 active:scale-95"
        style={{ transform: `translateX(${currentOffset})` }}
      >
        <div className={`${getColors()} w-16 h-16 rounded-2xl flex items-center justify-center border-b-4 transition-all active:translate-y-1 active:shadow-none`}>
          {node.status === "completed" && (
            <div className="flex items-center justify-center gap-1">
              <Check size={24} strokeWidth={4} />
              <Star size={20} fill="white" />
            </div>
          )}
          {node.status === "active" && <Trophy size={32} fill="white" />}
          {node.status === "locked" && <div className="w-8 h-8 rounded-lg bg-neutral-100" />}
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none translate-x-4 group-hover:translate-x-0 duration-300">
          <span className="bg-neutral-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xl flex items-center gap-2">
            {node.title}
            <Badge className="bg-white/20 text-[10px] py-0 border-none">{node.type}</Badge>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseContents;