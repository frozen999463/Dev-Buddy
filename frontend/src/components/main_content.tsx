import { Section } from "../types/section";
import { Progress } from "@/components/ui/progress"; // Shadcn Progress
import { Button } from "@/components/ui/button"; // Shadcn Button
import { ScrollText } from "lucide-react"; // Matching icon
type Props = {
  sections: Section[];
};
const CourseSections = ({ sections }: Props) => {
  return (
    <div className="space-y-8">
      {sections.map((section, index) => {
        const progress = (section.completedLessons / section.totalLessons) * 100;
        return (
          <div
            key={section.id}
            className={`relative group bg-white border border-neutral-200 rounded-3xl p-8 transition-all duration-300 ${
              section.locked ? "opacity-50 grayscale" : "hover:border-sky-200 hover:bg-sky-50/30 shadow-sm hover:shadow-md"
            }`}
          >
            {/* 📜 Icon */}
            <div className="absolute top-6 right-8 text-neutral-300 group-hover:text-sky-400">
              <ScrollText size={24} />
            </div>
            <span className="text-sky-600 text-xs font-bold uppercase tracking-widest mb-3 block">
              Section {index + 1}
            </span>
            <h2 className="text-2xl font-bold mb-3 tracking-tight text-neutral-900">
              {section.title}
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed mb-8 max-w-[85%]">
              {section.description}
            </p>
            {!section.locked && (
              <div className="space-y-3 mb-8">
                <Progress value={progress} className="h-3 bg-neutral-100" /> {/* 3️⃣ Light progress track */}
                <p className="text-xs font-bold text-neutral-400 tabular-nums">
                  {section.completedLessons} / {section.totalLessons} lessons
                </p>
              </div>
            )}
            <Button
              className={`w-[220px] h-12 rounded-2xl font-bold text-sm tracking-wide transition-all ${
                section.locked
                  ? "bg-transparent border border-neutral-200 text-neutral-400"
                  : "bg-sky-500 hover:bg-sky-600 text-white shadow-lg active:scale-[0.98]"
              }`}
            >
              {section.locked ? "JUMP TO SECTION" : "CONTINUE"}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default CourseSections;