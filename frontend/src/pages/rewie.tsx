import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

interface Review {
    _id: string;
    uid: string;
    name: string;
    rating: number;
    text: string;
    adminReply?: string;
    repliedAt?: string;
    createdAt: string;
}

function StarRating({
    rating,
    onRate,
    interactive = false,
}: {
    rating: number;
    onRate?: (r: number) => void;
    interactive?: boolean;
}) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => interactive && onRate?.(star)}
                    className={`text-2xl ${interactive ? "cursor-pointer" : ""} ${star <= rating ? "text-orange-400" : "text-gray-300"
                        }`}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

export default function ReviewPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [newReview, setNewReview] = useState({ name: "", text: "", rating: 0 });

    // Fetch reviews from backend
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

    const handleSubmit = async () => {
        if (!newReview.name.trim() || !newReview.text.trim() || newReview.rating === 0) return;

        try {
            setSubmitting(true);
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                alert("You must be logged in to submit a review");
                return;
            }

            const token = await user.getIdToken();

            const response = await fetch("http://localhost:5000/api/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newReview),
            });

            if (!response.ok) {
                throw new Error("Failed to submit review");
            }

            const savedReview = await response.json();
            setReviews([savedReview, ...reviews]);
            setNewReview({ name: "", text: "", rating: 0 });
            setShowForm(false);
        } catch (error) {
            console.error("Failed to submit review:", error);
            alert("Failed to submit review. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#fdfdfd] font-sans py-10 px-4">
            <div className="max-w-3xl mx-auto space-y-6">
                {loading ? (
                    <div className="text-center py-12 text-gray-400 text-lg">Loading reviews...</div>
                ) : reviews.length === 0 && !showForm ? (
                    <div className="text-center py-12 text-gray-400 text-lg">No reviews yet. Be the first to add one!</div>
                ) : (
                    reviews.map((review) => (
                        <div
                            key={review._id}
                            className="border-2 border-gray-300 rounded-2xl p-6 bg-white shadow-sm"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(review.name)}`}
                                        alt={review.name}
                                        className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"
                                    />
                                    <span className="font-bold text-[#373F6E] text-lg">{review.name}</span>
                                </div>
                                <StarRating rating={review.rating} />
                            </div>
                            <p className="text-gray-500 leading-relaxed">{review.text}</p>

                            {/* Admin Reply */}
                            {review.adminReply && (
                                <div className="mt-6 p-4 bg-[#f8fafc] border-l-4 border-[#373F6E] rounded-r-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#373F6E]" />
                                        <span className="text-xs font-black uppercase tracking-widest text-[#373F6E]">DevBuddy Response</span>
                                    </div>
                                    <p className="text-sm text-gray-600 italic">"{review.adminReply}"</p>
                                </div>
                            )}
                        </div>
                    ))
                )}

                {/* Add Review Form */}
                {showForm && (
                    <div className="border-2 border-gray-300 rounded-2xl p-6 bg-white shadow-sm space-y-4">
                        <input
                            type="text"
                            placeholder="Your name"
                            value={newReview.name}
                            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:border-[#373F6E] transition-all"
                        />
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-[#373F6E]">Rating:</span>
                            <StarRating
                                rating={newReview.rating}
                                onRate={(r) => setNewReview({ ...newReview, rating: r })}
                                interactive
                            />
                        </div>
                        <textarea
                            placeholder="Write your review..."
                            value={newReview.text}
                            onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                            rows={4}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:border-[#373F6E] transition-all resize-none"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowForm(false)}
                                className="px-6 py-2 rounded-xl font-bold text-gray-500 hover:text-gray-700 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="px-6 py-2 rounded-xl bg-[#e08a5e] hover:bg-[#d07a4e] text-white font-bold shadow transition-all disabled:opacity-50"
                            >
                                {submitting ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Add Review Button */}
                <div className="flex justify-end">
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-8 py-3 rounded-xl bg-[#e08a5e] hover:bg-[#d07a4e] text-white font-bold text-lg shadow-md transition-all"
                    >
                        Add Review
                    </button>
                </div>
            </div>
        </div>
    );
}
