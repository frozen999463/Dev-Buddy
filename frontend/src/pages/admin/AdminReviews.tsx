import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

interface Review {
    _id: string;
    uid: string;
    name: string;
    rating: number;
    text: string;
    createdAt: string;
}

export default function AdminReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState("");

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/review");
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleReply = async (id: string) => {
        if (!replyText.trim()) return;

        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) return;

            const token = await user.getIdToken();
            const response = await fetch(`http://localhost:5000/api/review/${id}/reply`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ reply: replyText }),
            });

            if (response.ok) {
                const updatedReview = (await response.json()).review;
                setReviews(reviews.map(r => r._id === id ? updatedReview : r));
                setReplyingTo(null);
                setReplyText("");
                alert("Reply sent! 💬");
            }
        } catch (error) {
            console.error("Failed to send reply:", error);
            alert("Failed to send reply");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this review?")) return;

        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) return;

            const token = await user.getIdToken();
            const response = await fetch(`http://localhost:5000/api/review/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                setReviews(reviews.filter((r) => r._id !== id));
            }
        } catch (error) {
            console.error("Failed to delete review:", error);
        }
    };

    if (loading) {
        return <div className="text-center py-12 text-muted-foreground">Loading reviews...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">User Reviews</h2>
                <span className="text-muted-foreground">{reviews.length} total</span>
            </div>

            {reviews.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No reviews yet.</div>
            ) : (
                <div className="space-y-3">
                    {reviews.map((review: any) => (
                        <div
                            key={review._id}
                            className="border rounded-xl p-4 bg-card shadow-sm space-y-4"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
                                        <div className="flex flex-col">
                                            <span className="font-bold">{review.name}</span>
                                            <span className="text-[10px] text-muted-foreground">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex gap-0.5 ml-4">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={star}
                                                    className={`text-sm ${star <= review.rating ? "text-orange-400" : "text-gray-300"}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{review.text}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setReplyingTo(review._id);
                                            setReplyText(review.adminReply || "");
                                        }}
                                        className="text-primary hover:text-primary/80 text-sm font-bold px-3 py-1 rounded-lg hover:bg-primary/10 transition-all"
                                    >
                                        {review.adminReply ? "Edit Reply" : "Reply"}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="text-red-500 hover:text-red-700 text-sm font-bold px-3 py-1 rounded-lg hover:bg-red-50 transition-all"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* Reply Input */}
                            {replyingTo === review._id && (
                                <div className="mt-4 p-4 bg-muted/30 rounded-lg space-y-3 animate-in slide-in-from-top-2">
                                    <textarea
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Write your response..."
                                        className="w-full bg-white border border-input rounded-md p-2 text-sm focus:ring-1 focus:ring-primary outline-none min-h-[80px]"
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setReplyingTo(null)}
                                            className="px-4 py-1.5 text-xs font-bold text-muted-foreground"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleReply(review._id)}
                                            className="px-4 py-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-lg"
                                        >
                                            Send Response
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Display existing reply */}
                            {review.adminReply && replyingTo !== review._id && (
                                <div className="mt-3 p-3 bg-primary/5 border-l-2 border-primary rounded-r-lg">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">DevBuddy Support</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground italic">"{review.adminReply}"</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
