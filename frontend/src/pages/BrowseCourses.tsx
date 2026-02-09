import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, BookOpen, Clock, Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


const BrowseCourses = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            // We'll fetch all courses. We can later filter for "Published" on the backend.
            const response = await fetch("http://localhost:5000/api/course");
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredCourses = courses.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Header */}
            <div className="bg-primary/5 border-b py-16 px-6">
                <div className="max-w-6xl mx-auto space-y-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Explore Your Journey</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Discover curated paths designed to take you from beginner to expert in Dev-Buddy's most popular tech stacks.
                    </p>
                    <div className="relative max-w-md mx-auto pt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            className="pl-10 h-12 rounded-full border-primary/20 bg-background shadow-lg"
                            placeholder="Find a course..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Course Grid */}
            <div className="max-w-6xl mx-auto px-6 pt-12">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => <div key={i} className="h-80 rounded-2xl bg-muted animate-pulse" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => (
                            <Link key={course._id} to={`/course/${course._id}`}>
                                <Card className="group overflow-hidden border-muted/40 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                    <div className="aspect-video relative overflow-hidden bg-muted">
                                        {course.thumbnail ? (
                                            <img src={course.thumbnail} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={course.title} />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                                <BookOpen className="h-12 w-12 text-primary/40" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3">
                                            <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none">Intermediate</Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-6 space-y-3">
                                        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{course.title}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {course.description || "Start your learning adventure with this comprehensive path."}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1 font-medium">
                                            <Clock className="h-3 w-3" /> 4h 20m
                                        </div>
                                        <div className="flex items-center gap-1 font-bold text-primary">
                                            Begin <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowseCourses;