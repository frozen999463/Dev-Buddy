import LeaderboardSection from "@/components/LeaderboardSection";
import { useParams } from "react-router-dom";
import JourneyRightPanel from "@/components/JourneyRightPanel";

const LeaderboardPage = () => {
    const { id } = useParams();

    return (
        <div className="flex min-h-screen bg-[#f8fafc] text-neutral-900">
            <main className="flex-1 px-4 md:px-8 py-10 flex justify-center">
                <div className="w-full max-w-2xl">
                    <LeaderboardSection courseId={id!} />
                </div>
            </main>
            <aside className="w-[350px] bg-white px-6 py-8 hidden xl:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-l border-neutral-200">
                <JourneyRightPanel />
            </aside>
        </div>
    );
};

export default LeaderboardPage;
