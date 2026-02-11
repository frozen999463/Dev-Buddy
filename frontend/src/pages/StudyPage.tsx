import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import LessonContent from "@/components/learning/LessonContent";
import QuizContent from "@/components/learning/QuizContent";
import ChallengeContent from "@/components/learning/ChallengeContent";

const StudyPage = () => {
    const { courseId, nodeId } = useParams();
    const navigate = useNavigate();
    const [node, setNode] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (nodeId) fetchNode();
    }, [nodeId]);

    const fetchNode = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/node/${nodeId}`);
            const data = await res.json();
            setNode(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
    if (!node) return <div className="p-20 text-center">Node not found</div>;

    return (
        <div className="h-screen flex flex-col bg-white">
            {/* Upper Header: Progress & Close */}
            <header className="px-6 py-4 border-b flex items-center gap-6">
                <Button variant="ghost" size="icon" onClick={() => navigate(`/journey/${courseId}`)}>
                    <X className="h-6 w-6 text-neutral-400" />
                </Button>
                <div className="flex-1">
                    <Progress value={45} className="h-3 bg-neutral-100" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-orange-500 text-white px-3 py-1 rounded-2xl text-xs font-black uppercase tracking-tighter">STREAK 5</div>
                </div>
            </header>

            <main className="flex-1 overflow-auto flex justify-center">
                <div className="w-full max-w-4xl p-8">
                    {node.type === "lesson" && <LessonContent node={node} />}
                    {node.type === "quiz" && <QuizContent node={node} onComplete={() => navigate(`/journey/${courseId}`)} />}
                    {node.type === "challenge" && <ChallengeContent node={node} />}
                </div>
            </main>

            {/* Footer Navigation */}
            <footer className="p-6 border-t flex justify-center sticky bottom-0 bg-white">
                <div className="w-full max-w-4xl flex justify-between gap-4">
                    <Button variant="outline" size="lg" className="px-12 py-7 text-lg font-bold border-b-4 hover:border-b-2 active:translate-y-1 active:border-b-0 transition-all text-neutral-400">
                        SKIP
                    </Button>
                    <Button
                        size="lg"
                        className="px-16 py-7 text-lg font-bold bg-green-500 hover:bg-green-600 text-white border-b-4 border-green-700 active:translate-y-1 active:border-b-0 transition-all rounded-2xl"
                        onClick={() => navigate(`/journey/${courseId}`)} // Simple navigation for now
                    >
                        CONTINUE
                    </Button>
                </div>
            </footer>
        </div>
    );
};

export default StudyPage;
