import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Plus, Send, User as UserIcon, Keyboard } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface Comment {
    userId: string;
    userName: string;
    userPicture?: string;
    content: string;
    createdAt: string;
}

interface Question {
    _id: string;
    userId: string;
    userName: string;
    userPicture?: string;
    title: string;
    content: string;
    comments: Comment[];
    createdAt: string;
}

interface ForumSectionProps {
    courseId: string;
}

const ForumSection: React.FC<ForumSectionProps> = ({ courseId }) => {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAskForm, setShowAskForm] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

    const fetchQuestions = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/forum/course/${courseId}`);
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            console.error("Failed to fetch questions:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [courseId]);

    const handleCreateQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim() || !newContent.trim()) return;

        try {
            setSubmitting(true);
            const token = await user?.getIdToken();
            const response = await fetch("http://localhost:5000/api/forum", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    courseId,
                    title: newTitle,
                    content: newContent,
                }),
            });

            if (response.ok) {
                toast.success("Question posted successfully!");
                setNewTitle("");
                setNewContent("");
                setShowAskForm(false);
                fetchQuestions();
            } else {
                toast.error("Failed to post question");
            }
        } catch (error) {
            console.error("Error creating question:", error);
            toast.error("An error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    const handleAddComment = async (questionId: string) => {
        const content = commentInputs[questionId];
        if (!content?.trim()) return;

        try {
            const token = await user?.getIdToken();
            const response = await fetch(`http://localhost:5000/api/forum/${questionId}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content }),
            });

            if (response.ok) {
                setCommentInputs({ ...commentInputs, [questionId]: "" });
                fetchQuestions();
            } else {
                toast.error("Failed to add comment");
            }
        } catch (error) {
            console.error("Error adding comment:", error);
            toast.error("An error occurred");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black text-[#373F6E] uppercase tracking-widest font-['Bebas_Neue']">
                    Community Q&A
                </h2>
                <Button
                    onClick={() => setShowAskForm(!showAskForm)}
                    className="bg-[#373F6E] hover:bg-[#2d3454] text-white rounded-xl px-6 py-6 font-bold shadow-lg shadow-[#373F6E]/20 transition-all hover:scale-105"
                >
                    {showAskForm ? "Close Form" : (
                        <>
                            <Plus className="mr-2 h-5 w-5" /> Ask a Question
                        </>
                    )}
                </Button>
            </div>

            {showAskForm && (
                <Card className="border-2 border-dashed border-[#373F6E]/20 bg-[#373F6E]/5 rounded-[2rem] overflow-hidden">
                    <CardContent className="p-8">
                        <form onSubmit={handleCreateQuestion} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-black uppercase tracking-widest text-[#373F6E]/60 ml-1">Title</label>
                                <Input
                                    placeholder="What's your question?"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="rounded-xl border-2 border-[#373F6E]/10 bg-white p-6 text-lg font-bold text-[#373F6E] placeholder:text-gray-300 focus-visible:ring-[#373F6E]"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black uppercase tracking-widest text-[#373F6E]/60 ml-1">Description</label>
                                <Textarea
                                    placeholder="Tell us more about what you're stuck on..."
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                    className="rounded-xl border-2 border-[#373F6E]/10 bg-white p-6 min-h-[150px] font-medium text-[#373F6E] placeholder:text-gray-300 focus-visible:ring-[#373F6E]"
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-8 rounded-xl bg-orange-400 hover:bg-orange-500 text-white font-black text-xl uppercase tracking-widest shadow-xl shadow-orange-400/20"
                            >
                                {submitting ? "Posting..." : "Post Question"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#373F6E]"></div>
                    <p className="text-[#373F6E]/60 font-black uppercase tracking-widest">Loading forum...</p>
                </div>
            ) : questions.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
                    <div className="h-20 w-20 bg-[#373F6E]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MessageSquare className="h-10 w-10 text-[#373F6E]/40" />
                    </div>
                    <h3 className="text-2xl font-black text-[#373F6E] uppercase tracking-widest font-['Bebas_Neue'] mb-2">No questions yet</h3>
                    <p className="text-gray-400 font-medium">Be the first to ask something about this course!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8">
                    {questions.map((question) => (
                        <Card key={question._id} className="border-none bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                            <CardContent className="p-8 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="h-14 w-14 rounded-2xl bg-[#373F6E]/5 overflow-hidden border-2 border-[#151934]/10 flex items-center justify-center">
                                            {question.userPicture ? (
                                                <img src={question.userPicture} alt={question.userName} className="w-full h-full object-cover" />
                                            ) : (
                                                <UserIcon className="h-7 w-7 text-[#373F6E]/40" />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-[#373F6E] uppercase tracking-widest leading-none mb-1">{question.userName}</h4>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                {formatDistanceToNow(new Date(question.createdAt), { addSuffix: true })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-2xl font-black text-[#151934] leading-tight group-hover:text-[#373F6E] transition-colors">{question.title}</h3>
                                    <p className="text-gray-600 font-medium leading-relaxed bg-[#f8f9ff] p-6 rounded-2xl border border-blue-50/50">
                                        {question.content}
                                    </p>
                                </div>

                                <div className="space-y-6 border-t pt-8">
                                    <h5 className="text-sm font-black text-[#373F6E] uppercase tracking-widest flex items-center gap-2">
                                        <MessageSquare size={16} /> {question.comments.length} Comments
                                    </h5>

                                    {question.comments.length > 0 && (
                                        <div className="space-y-4 max-h-[300px] overflow-auto pr-4 custom-scrollbar">
                                            {question.comments.map((comment, idx) => (
                                                <div key={idx} className="flex gap-4 group/comment">
                                                    <div className="h-10 w-10 rounded-xl bg-gray-50 flex-shrink-0 flex items-center justify-center overflow-hidden border">
                                                        {comment.userPicture ? (
                                                            <img src={comment.userPicture} alt={comment.userName} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <UserIcon size={18} className="text-gray-300" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 bg-gray-50 p-4 rounded-xl rounded-tl-none group-hover/comment:bg-white transition-colors border border-transparent group-hover/comment:border-gray-100">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-[11px] font-black uppercase tracking-widest text-[#373F6E]">{comment.userName}</span>
                                                            <span className="text-[9px] font-bold text-gray-400 uppercase">
                                                                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 font-medium">{comment.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex gap-4 items-center">
                                        <Input
                                            placeholder="Write a comment..."
                                            value={commentInputs[question._id] || ""}
                                            onChange={(e) => setCommentInputs({ ...commentInputs, [question._id]: e.target.value })}
                                            onKeyDown={(e) => e.key === 'Enter' && handleAddComment(question._id)}
                                            className="rounded-xl border-gray-200 bg-gray-50/50 p-6 h-14 font-medium"
                                        />
                                        <Button
                                            onClick={() => handleAddComment(question._id)}
                                            className="h-14 w-14 rounded-xl bg-orange-400 hover:bg-orange-500 text-white p-0 shadow-lg shadow-orange-400/20 transition-all hover:scale-110 active:scale-95"
                                        >
                                            <Send size={20} />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ForumSection;
