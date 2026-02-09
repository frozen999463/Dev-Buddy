import { useState, useEffect } from "react";
import {
    ArrowLeft, Save, Globe, Plus, Trash2, Edit,
    BookOpen, HelpCircle, Trophy
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "../../context/AuthContext";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

// --- Types ---
interface CourseNode {
    _id?: string;
    title: string;
    type: "lesson" | "quiz" | "challenge";
}

interface Chapter {
    _id?: string;
    title: string;
    nodes: CourseNode[];
}

interface Section {
    _id?: string;
    title: string;
    chapters: Chapter[];
}

const CourseEditor = () => {
    const { user } = useAuth(); // 2. Get auth user
    const [searchParams] = useSearchParams();
    const courseId = searchParams.get("id");

    const [courseData, setCourseData] = useState({
        title: "",
        description: "",
        thumbnail: "",
    });

    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (courseId) {
            fetchCourseDetails();
        }
    }, [courseId]);

    const fetchCourseDetails = async () => {
        try {
            setLoading(true);
            const token = await user?.getIdToken();
            if (!token) return;

            const response = await fetch(`http://localhost:5000/api/course/${courseId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();

            setCourseData({
                title: data.title,
                description: data.description,
                thumbnail: data.thumbnail || "",
            });
            setSections(data.sections || []);
        } catch (error) {
            console.error("Failed to fetch course:", error);
        } finally {
            setLoading(false);
        }
    };

    // Curriculum Helper Functions
    const addSection = () => setSections([...sections, { title: "New Section", chapters: [] }]);
    const removeSection = (sIdx: number) => setSections(sections.filter((_, i) => i !== sIdx));
    const addChapter = (sIdx: number) => {
        const nextArr = [...sections];
        nextArr[sIdx].chapters.push({ title: "New Chapter", nodes: [] });
        setSections(nextArr);
    };
    const removeChapter = (sIdx: number, cIdx: number) => {
        const nextArr = [...sections];
        nextArr[sIdx].chapters = nextArr[sIdx].chapters.filter((_, i) => i !== cIdx);
        setSections(nextArr);
    };
    const addNode = (sIdx: number, cIdx: number, type: "lesson" | "quiz" | "challenge") => {
        const nextArr = [...sections];
        nextArr[sIdx].chapters[cIdx].nodes.push({ title: `New ${type}`, type });
        setSections(nextArr);
    };
    const removeNode = (sIdx: number, cIdx: number, nIdx: number) => {
        const nextArr = [...sections];
        nextArr[sIdx].chapters[cIdx].nodes = nextArr[sIdx].chapters[cIdx].nodes.filter((_, i) => i !== nIdx);
        setSections(nextArr);
    };

    const handleSave = async () => {
        if (!user) return alert("You must be logged in!");

        try {
            setLoading(true);
            const token = await user.getIdToken();
            const fullPayload = { ...courseData, curriculum: sections };

            const url = courseId
                ? `http://localhost:5000/api/course/${courseId}`
                : "http://localhost:5000/api/course";

            const method = courseId ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(fullPayload),
            });

            if (response.ok) {
                alert(courseId ? "🎉 Course updated successfully!" : "🎉 Course created successfully!");
            } else {
                const errorData = await response.json();
                alert(`❌ Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error saving course:", error);
            alert("❌ Failed to save course.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-6 max-w-5xl mx-auto">
            {loading && (
                <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            )}

            {/* Header Actions */}
            <div className="flex items-center justify-between sticky top-0 z-10 bg-background/95 backdrop-blur py-4 border-b">
                <Button variant="ghost" asChild className="gap-2">
                    <Link to="/adminDashboard?view=courses">
                        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                    </Link>
                </Button>
                <h1 className="text-xl font-bold">
                    {courseId ? "Edit Course" : "Create New Course"}
                </h1>
                <div className="flex gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <Globe className="h-4 w-4" /> Preview
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 overflow-hidden">
                            <DialogHeader className="p-6 border-b bg-muted/30">
                                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                                    <Globe className="h-6 w-6 text-primary" />
                                    Course Landing Page Preview
                                </DialogTitle>
                            </DialogHeader>
                            <div className="flex-1 overflow-auto">
                                {/* Hero Section */}
                                <div className="relative h-64 bg-slate-900 overflow-hidden">
                                    {courseData.thumbnail ? (
                                        <img src={courseData.thumbnail} alt="hero" className="w-full h-full object-cover opacity-60" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-40" />
                                    )}
                                    <div className="absolute inset-0 flex flex-col justify-center px-12 space-y-4">
                                        <Badge className="w-fit bg-primary text-primary-foreground">NEW COURSE</Badge>
                                        <h1 className="text-4xl font-extrabold text-white tracking-tight max-w-2xl">
                                            {courseData.title || "Untitled Course"}
                                        </h1>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-12 grid grid-cols-1 lg:grid-cols-3 gap-12 bg-background">
                                    <div className="lg:col-span-2 space-y-8">
                                        <div className="space-y-4">
                                            <h2 className="text-2xl font-bold border-b pb-2">About this course</h2>
                                            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                                {courseData.description || "No description provided yet."}
                                            </p>
                                        </div>

                                        <div className="space-y-6">
                                            <h2 className="text-2xl font-bold border-b pb-2">Course Curriculum</h2>
                                            <div className="space-y-4">
                                                {sections.map((section, sIdx) => (
                                                    <div key={sIdx} className="border rounded-xl overflow-hidden bg-muted/5">
                                                        <div className="bg-muted/20 p-4 font-bold flex justify-between items-center">
                                                            <span>Section {sIdx + 1}: {section.title}</span>
                                                            <Badge variant="outline">{section.chapters.length} Chapters</Badge>
                                                        </div>
                                                        <div className="p-4 space-y-2">
                                                            {section.chapters.map((chapter, cIdx) => (
                                                                <div key={cIdx} className="flex items-center gap-3 p-2 text-sm text-muted-foreground hover:text-foreground">
                                                                    <BookOpen className="h-4 w-4" />
                                                                    {chapter.title}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <Card className="sticky top-0 border-primary/20 shadow-xl overflow-hidden">
                                            <div className="aspect-video bg-muted relative">
                                                {courseData.thumbnail && <img src={courseData.thumbnail} className="w-full h-full object-cover" />}
                                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                                    <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                                                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-primary border-b-[8px] border-b-transparent ml-1" />
                                                    </div>
                                                </div>
                                            </div>
                                            <CardContent className="p-6 space-y-4">
                                                <div className="text-3xl font-bold text-primary">FREE</div>
                                                <Button className="w-full py-6 text-lg font-bold">Enroll Now</Button>
                                                <ul className="space-y-2 text-xs text-muted-foreground">
                                                    <li className="flex items-center gap-2">✓ Lifetime Access</li>
                                                    <li className="flex items-center gap-2">✓ Certificate of Completion</li>
                                                    <li className="flex items-center gap-2">✓ 24/7 Support</li>
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button onClick={handleSave} className="gap-2">
                        <Save className="h-4 w-4" /> Save Course
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="info">1. Course Information</TabsTrigger>
                    <TabsTrigger value="curriculum">2. Curriculum Builder</TabsTrigger>
                </TabsList>

                <TabsContent value="info">
                    <Card>
                        <CardHeader>
                            <CardTitle>Core Details</CardTitle>
                            <CardDescription>Configure the landing page visibility for this course.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Course Title</Label>
                                <Input
                                    placeholder="Mastering Python..."
                                    value={courseData.title}
                                    onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Detailed Description</Label>
                                <Textarea
                                    placeholder="What will students learn?"
                                    rows={6}
                                    value={courseData.description}
                                    onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Thumbnail Image URL</Label>
                                <Input
                                    placeholder="https://..."
                                    value={courseData.thumbnail}
                                    onChange={(e) => setCourseData({ ...courseData, thumbnail: e.target.value })}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="curriculum" className="space-y-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Course Roadmap</h2>
                        <Button onClick={addSection} variant="outline" className="gap-2">
                            <Plus className="h-4 w-4" /> Add Section
                        </Button>
                    </div>

                    {sections.length === 0 && (
                        <div className="text-center py-20 border-2 border-dashed rounded-lg bg-muted/50">
                            <p className="text-muted-foreground">No sections created yet. Start building your roadmap!</p>
                            <Button onClick={addSection} variant="link" className="mt-2">Add your first section</Button>
                        </div>
                    )}

                    {sections.map((section, sIdx) => (
                        <Card key={sIdx} className="border-l-4 border-l-primary">
                            <CardHeader className="flex flex-row items-center justify-between py-4 bg-muted/20">
                                <div className="flex-1 mr-4">
                                    <Input
                                        value={section.title}
                                        onChange={(e) => {
                                            const narr = [...sections];
                                            narr[sIdx].title = e.target.value;
                                            setSections(narr);
                                        }}
                                        className="font-bold border-none bg-transparent hover:bg-background focus:bg-background text-lg p-0 h-auto"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => removeSection(sIdx)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" onClick={() => addChapter(sIdx)} variant="outline">
                                        + Add Chapter
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                {section.chapters.map((chapter, cIdx) => (
                                    <div key={cIdx} className="pl-6 border-l-2 border-muted-foreground/20 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 mr-4">
                                                <Input
                                                    value={chapter.title}
                                                    onChange={(e) => {
                                                        const narr = [...sections];
                                                        narr[sIdx].chapters[cIdx].title = e.target.value;
                                                        setSections(narr);
                                                    }}
                                                    className="font-medium border-none bg-transparent hover:bg-background focus:bg-background p-0 h-auto"
                                                />
                                            </div>
                                            <div className="flex gap-1 items-center">
                                                <Badge variant="outline" className="mr-2">Chapter {cIdx + 1}</Badge>
                                                <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => removeChapter(sIdx, cIdx)}>
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-2 pl-4">
                                            {chapter.nodes.map((node, nIdx) => (
                                                <div key={nIdx} className="flex items-center gap-3 p-2 bg-muted/30 rounded-md group">
                                                    {node.type === "lesson" && <BookOpen className="h-4 w-4 text-blue-500" />}
                                                    {node.type === "quiz" && <HelpCircle className="h-4 w-4 text-orange-500" />}
                                                    {node.type === "challenge" && <Trophy className="h-4 w-4 text-yellow-500" />}
                                                    <Input
                                                        value={node.title}
                                                        onChange={(e) => {
                                                            const narr = [...sections];
                                                            narr[sIdx].chapters[cIdx].nodes[nIdx].title = e.target.value;
                                                            setSections(narr);
                                                        }}
                                                        className="text-sm border-none bg-transparent p-0 h-auto focus-visible:ring-0"
                                                    />
                                                    {node._id && (
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="h-6 w-6 opacity-0 group-hover:opacity-100 duration-200 text-primary"
                                                            asChild
                                                        >
                                                            <Link to={`/adminDashboard?view=node-editor&id=${node._id}&type=${node.type}&title=${encodeURIComponent(node.title)}`}>
                                                                <Edit className="h-3 w-3" />
                                                            </Link>
                                                        </Button>
                                                    )}
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-6 w-6 ml-auto opacity-0 group-hover:opacity-100 duration-200"
                                                        onClick={() => removeNode(sIdx, cIdx, nIdx)}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            ))}

                                            <div className="flex gap-2 mt-2">
                                                <Button size="sm" variant="ghost" className="h-7 text-[10px] uppercase" onClick={() => addNode(sIdx, cIdx, "lesson")}>+ Lesson</Button>
                                                <Button size="sm" variant="ghost" className="h-7 text-[10px] uppercase text-orange-600" onClick={() => addNode(sIdx, cIdx, "quiz")}>+ Quiz</Button>
                                                <Button size="sm" variant="ghost" className="h-7 text-[10px] uppercase text-yellow-600" onClick={() => addNode(sIdx, cIdx, "challenge")}>+ Code</Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CourseEditor;