// types/section.ts
export interface Section {
  id: string;
  title: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  locked: boolean;
}
