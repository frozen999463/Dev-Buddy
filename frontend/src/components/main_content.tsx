import { Section } from "../types/section";

type Props = {
  sections: Section[];
};

const CourseSections = ({ sections }: Props) => {
  return (
    <div className="space-y-6">
      {sections.map((section) => {
        const progress =
          (section.completedLessons / section.totalLessons) * 100;

        return (
          <div
            key={section.id}
            className={`bg-neutral-800 border border-neutral-700 rounded-xl p-6 ${
              section.locked ? "opacity-60" : ""
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">
              {section.title}
            </h2>

            <p className="text-neutral-400 mb-4">
              {section.description}
            </p>

            {!section.locked && (
              <>
                <div className="w-full bg-neutral-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-sky-500 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="text-sm text-neutral-400 mb-4">
                  {section.completedLessons} / {section.totalLessons} lessons
                </p>
              </>
            )}

            <button
              className={`px-5 py-2 rounded-md font-medium ${
                section.locked
                  ? "border border-neutral-600 text-neutral-400"
                  : "bg-sky-600 hover:bg-sky-500"
              }`}
            >
              {section.locked ? "Jump to section" : "Continue"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CourseSections;
