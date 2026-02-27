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
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className="border rounded-xl p-4 bg-card shadow-sm flex items-start justify-between gap-4"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
                                    <span className="font-bold">{review.name}</span>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                className={`text-sm ${star <= review.rating ? "text-orange-400" : "text-gray-300"}`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-xs text-muted-foreground ml-auto">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">{review.text}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(review._id)}
                                className="text-red-500 hover:text-red-700 text-sm font-bold px-3 py-1 rounded-lg hover:bg-red-50 transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
