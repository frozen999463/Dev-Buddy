import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookOpen, Clock, Award, CheckCircle2, ArrowLeft, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const CourseLanding = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);

    const handleStartLearning = async () => {
        try {
            setEnrolling(true);
            const token = await user?.getIdToken();
            console.log("🚀 [handleStartLearning] Starting enrollment for ID:", id, "User:", user?.uid);

            // Set as primary course if logged in
            if (token) {
                const response = await fetch("http://localhost:5000/api/profile/select-course", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ courseId: id }),
                });

                if (response.ok) {
                    const resData = await response.json();
                    console.log("✅ [handleStartLearning] Successfully enrolled:", resData);
                } else {
                    const errData = await response.json();
                    console.warn("⚠️ [handleStartLearning] Enrollment request failed:", errData);
                }
            } else {
                console.log("ℹ️ [handleStartLearning] No token found, user might not be logged in.");
            }

            console.log("🏁 [handleStartLearning] Navigating to journey roadmap...");
            navigate(`/journey/${id}`);
        } catch (error) {
            console.error("❌ [handleStartLearning] Error starting course:", error);
            toast.error("Failed to start course. Moving you to the roadmap anyway!");
            navigate(`/journey/${id}`);
        } finally {
            setEnrolling(false);
        }
    };

    useEffect(() => {
        if (id) fetchCourseDetails();
    }, [id]);

    const fetchCourseDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/course/${id}`);
            const data = await response.json();
            setCourse(data);
        } catch (error) {
            console.error("Error fetching course details:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    if (!course) return <div className="p-20 text-center">Course not found.</div>;

    return (
        <div className="min-h-screen bg-background">
            {/* Minimal Back Button */}
            <div className="max-w-6xl mx-auto px-6 py-4">
                <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" /> Back to Catalog
                </Button>
            </div>

            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">Development</Badge>
                            <Badge variant="outline">English</Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                            {course.title}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {course.description || "Master these skills with our structured, hands-on learning path."}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-6 py-4 border-y">
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            <span className="font-medium">4.5 Hours</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <span className="font-medium">{course.sections?.length || 0} Sections</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" />
                            <span className="font-medium">Certification</span>
                        </div>
                    </div>

                    {/* Syllabus */}
                    <div className="space-y-6 pt-6">
                        <h2 className="text-2xl font-bold">Course Syllabus</h2>
                        <div className="space-y-4">
                            {course.sections?.map((section: any, sIdx: number) => (
                                <div key={sIdx} className="border rounded-2xl overflow-hidden bg-muted/5">
                                    <div className="bg-muted/30 p-5 font-bold flex justify-between items-center">
                                        <span className="text-lg">Section {sIdx + 1}: {section.title}</span>
                                        <Badge variant="ghost" className="text-muted-foreground font-mono">{section.chapters?.length} Chapters</Badge>
                                    </div>
                                    <div className="p-4 space-y-2">
                                        {section.chapters?.map((chapter: any, cIdx: number) => (
                                            <div key={cIdx} className="flex items-center gap-3 p-3 text-sm text-muted-foreground hover:bg-primary/5 rounded-xl transition-colors group">
                                                <CheckCircle2 className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                                                <span className="flex-1 font-medium">{chapter.title}</span>
                                                <span className="text-[10px] uppercase font-bold tracking-widest bg-muted px-2 py-0.5 rounded">Lesson</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sticky Enrollment Card */}
                <div className="lg:relative">
                    <Card className="sticky top-24 border-primary/20 shadow-2xl overflow-hidden">
                        <div className="aspect-video bg-slate-900 overflow-hidden group relative">
                            {course.thumbnail ? (
                                <img src={course.thumbnail} alt="thumb" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-60" />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                                <div className="h-16 w-16 rounded-full bg-white/95 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                    <PlayCircle className="h-10 w-10 text-primary ml-1" />
                                </div>
                            </div>
                        </div>
                        <CardContent className="p-8 space-y-6">
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-primary">FREE</span>
                                <span className="text-muted-foreground line-through text-lg">$89.99</span>
                            </div>

                            <Button
                                onClick={handleStartLearning}
                                disabled={enrolling}
                                className="w-full py-7 text-lg font-bold shadow-lg hover:shadow-primary/20 group"
                            >
                                {enrolling ? "Enrolling..." : "Start Learning Now"}
                                {!enrolling && <ArrowLeft className="h-5 w-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />}
                            </Button>

                            <div className="space-y-3 pt-4">
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">What's included</p>
                                <ul className="space-y-2.5">
                                    {[
                                        "Full lifetime access",
                                        "Access on mobile and TV",
                                        "Certificate of completion"
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground font-medium">
                                            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CourseLanding;