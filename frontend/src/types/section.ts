// types/section.ts

export type NodeStatus = "completed" | "active" | "locked";
export type NodeType = "lesson" | "challenge" | "quiz";

export interface RoadmapNode {
  id: string;
  title: string;
  type: NodeType;
  status: NodeStatus;
  chapterId: string;
}

export interface Chapter {
  id: string;
  title: string;
  nodes: RoadmapNode[];
}

export interface Section {
  id: string;
  title: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  locked: boolean;
  chapters?: Chapter[]; // Optional: List of chapters for the roadmap view
}
