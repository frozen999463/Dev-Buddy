import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ArrowRight, Play, Bookmark, LayoutGrid } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface EnrolledCourse {
    _id: string;
    title: string;
    slug: string;
    thumbnail?: string;
    description: string;
    totalNodes: number;
    completedNodes: number;
    progress: number;
    isPrimary: boolean;
}

const MyCourses = () => {
    const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetchEnrolledCourses();
        }
    }, [user]);

    const fetchEnrolledCourses = async () => {
        try {
            const token = await user?.getIdToken();
            const response = await fetch("http://localhost:5000/api/progress/enrolled", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setEnrolledCourses(data);
            } else {
                setEnrolledCourses([]);
                console.error("Expected array from enrolled API, got:", data);
            }
        } catch (error) {
            console.error("Error fetching enrolled courses:", error);
            toast.error("Failed to load your courses");
        } finally {
            setLoading(false);
        }
    };

    const handleSetPrimary = async (courseId: string) => {
        try {
            const token = await user?.getIdToken();
            const response = await fetch("http://localhost:5000/api/profile/select-course", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ courseId }),
            });

            if (response.ok) {
                toast.success("Primary course updated!");
                fetchEnrolledCourses(); // Refresh list to update badge
            }
        } catch (error) {
            console.error("Error updating primary course:", error);
            toast.error("Failed to update primary course");
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-20">
            {/* Header section */}
            <div className="bg-white border-b pt-12 pb-10 px-6 shadow-sm">
                <div className="max-w-6xl mx-auto space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                        <LayoutGrid className="h-6 w-6" />
                        <h1 className="text-3xl font-black tracking-tight text-neutral-900 uppercase">My Learning Path</h1>
                    </div>
                    <p className="text-neutral-500 text-lg max-w-2xl font-medium">
                        Continue where you left off and master your selected technologies.
                    </p>
                </div>
            </div>

            {/* Course Grid */}
            <div className="max-w-6xl mx-auto px-6 mt-12">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[1, 2].map(i => <div key={i} className="h-64 rounded-3xl bg-white border animate-pulse" />)}
                    </div>
                ) : enrolledCourses.length === 0 ? (
                    <div className="bg-white rounded-[32px] p-16 text-center border-2 border-dashed border-neutral-200 space-y-6">
                        <div className="bg-primary/10 h-20 w-20 rounded-full flex items-center justify-center mx-auto text-primary">
                            <BookOpen className="h-10 w-10" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-neutral-900">No courses started yet!</h2>
                            <p className="text-neutral-500 max-w-sm mx-auto">
                                Explore our curriculum and start your first coding lesson today.
                            </p>
                        </div>
                        <Button
                            onClick={() => navigate("/courses")}
                            size="lg"
                            className="bg-primary hover:bg-primary/90 rounded-2xl px-8"
                        >
                            Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {enrolledCourses.map((course) => (
                            <Card key={course._id} className="group overflow-hidden border-neutral-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-[32px] flex flex-col">
                                <CardContent className="p-8 flex-1 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-2xl font-black text-neutral-800 tracking-tight leading-tight">{course.title}</h3>
                                                {course.isPrimary && (
                                                    <Badge className="bg-green-500 hover:bg-green-600 text-white border-none px-2 py-0 text-[10px] font-black uppercase">Active</Badge>
                                                )}
                                            </div>
                                            <p className="text-neutral-500 line-clamp-2 font-medium">{course.description}</p>
                                        </div>
                                        <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                                            <Play className="h-6 w-6 ml-1" />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <span className="text-sm font-black text-neutral-900 uppercase">Progress</span>
                                            <span className="text-sm font-black text-primary">{course.progress}%</span>
                                        </div>
                                        <Progress value={course.progress} className="h-3 bg-neutral-100" />
                                        <div className="flex justify-between text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                                            <span>{course.completedNodes} Nodes completed</span>
                                            <span>{course.totalNodes} Total nodes</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="px-8 pb-8 pt-0 flex gap-3">
                                    <Button
                                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-2xl gap-2 shadow-lg shadow-primary/20"
                                        onClick={() => navigate(`/journey/${course._id}`)}
                                    >
                                        Continue <ArrowRight className="h-4 w-4" />
                                    </Button>
                                    {!course.isPrimary && (
                                        <Button
                                            variant="outline"
                                            className="h-12 w-12 rounded-2xl border-neutral-200 text-neutral-400 hover:text-primary hover:border-primary transition-all p-0"
                                            onClick={() => handleSetPrimary(course._id)}
                                            title="Set as My Primary Course"
                                        >
                                            <Bookmark className="h-5 w-5" />
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}

                {enrolledCourses.length > 0 && (
                    <div className="mt-16 text-center p-12 bg-white rounded-[32px] border border-neutral-100 shadow-sm space-y-4">
                        <h3 className="text-xl font-bold text-neutral-900">Want to learn something new?</h3>
                        <p className="text-neutral-500">Explore our other learning paths and expand your skill set.</p>
                        <Button
                            variant="outline"
                            onClick={() => navigate("/courses")}
                            className="mt-2 rounded-2xl px-8 border-2"
                        >
                            Browse All Courses
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCourses;
