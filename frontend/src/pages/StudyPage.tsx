import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getAuth } from "firebase/auth";
import LessonContent from "@/components/learning/LessonContent";
import QuizContent from "@/components/learning/QuizContent";
import ChallengeContent from "@/components/learning/ChallengeContent";

const StudyPage = () => {
    const { courseId, nodeId } = useParams();
    const navigate = useNavigate();
    const [node, setNode] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [xpEarned, setXpEarned] = useState(0);
    const [showXP, setShowXP] = useState(false);

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

    const handleComplete = async (score?: number) => {
        if (completed) {
            // Already completed, just navigate
            navigate(`/journey/${courseId}`);
            return;
        }

        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) return;

            const token = await user.getIdToken();

            const res = await fetch("http://localhost:5000/api/progress/complete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nodeId,
                    courseId,
                    score: score || 0,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setCompleted(true);
                setXpEarned(data.xpEarned);

                // Show XP animation
                if (data.xpEarned > 0) {
                    setShowXP(true);
                    setTimeout(() => {
                        setShowXP(false);
                        navigate(`/journey/${courseId}`);
                    }, 2000);
                } else {
                    // Already completed, navigate immediately
                    navigate(`/journey/${courseId}`);
                }
            }
        } catch (err) {
            console.error("Failed to complete node:", err);
            // Navigate anyway
            navigate(`/journey/${courseId}`);
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
    if (!node) return <div className="p-20 text-center">Node not found</div>;

    return (
        <div className="h-screen flex flex-col bg-white relative">
            {/* XP Earned Animation */}
            {showXP && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in">
                    <div className="bg-white rounded-3xl p-12 shadow-2xl animate-in zoom-in flex flex-col items-center gap-4">
                        <Sparkles className="h-16 w-16 text-yellow-500 animate-pulse" />
                        <h2 className="text-4xl font-black text-green-600">+{xpEarned} XP</h2>
                        <p className="text-neutral-600 font-medium">Great job!</p>
                    </div>
                </div>
            )}

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
                    {node.type === "quiz" && <QuizContent node={node} onComplete={(score) => handleComplete(score)} />}
                    {node.type === "challenge" && <ChallengeContent node={node} />}
                </div>
            </main>

            {/* Footer Navigation */}
            <footer className="p-6 border-t flex justify-center sticky bottom-0 bg-white">
                <div className="w-full max-w-4xl flex justify-between gap-4">
                    <Button variant="outline" size="lg" className="px-12 py-7 text-lg font-bold border-b-4 hover:border-b-2 active:translate-y-1 active:border-b-0 transition-all text-neutral-400"
                        onClick={() => navigate(`/journey/${courseId}`)}>
                        SKIP
                    </Button>
                    <Button
                        size="lg"
                        className="px-16 py-7 text-lg font-bold bg-green-500 hover:bg-green-600 text-white border-b-4 border-green-700 active:translate-y-1 active:border-b-0 transition-all rounded-2xl"
                        onClick={() => handleComplete()}
                    >
                        CONTINUE
                    </Button>
                </div>
            </footer>
        </div>
    );
};

export default StudyPage;
