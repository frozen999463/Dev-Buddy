import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Eye, Plus, Trash2, CheckCircle2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Editor from "@monaco-editor/react";
import { useAuth } from "../../context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const NodeEditor = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");
    const title = searchParams.get("title");
    const nodeId = searchParams.get("id");

    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const [questions, setQuestions] = useState<any[]>([]);
    const [starterCode, setStarterCode] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (nodeId) {
            fetchNodeContent();
        }
    }, [nodeId]);

    const fetchNodeContent = async () => {
        if (!nodeId) return;
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/node/${nodeId}`);
            if (!response.ok) throw new Error("Failed to fetch");
            const data = await response.json();

            if (type === "lesson") setContent(data.content || "");
            if (type === "quiz") setQuestions(data.questions || []);
            if (type === "challenge") setStarterCode(data.starterCode || "");
        } catch (error) {
            console.error("Failed to fetch node content:", error);
            toast.error("Failed to load content");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveNode = async () => {
        if (!user || !nodeId) return;
        try {
            setIsSaving(true);
            const token = await user.getIdToken();
            const payload: any = {};
            if (type === "lesson") payload.content = content;
            if (type === "quiz") payload.questions = questions;
            if (type === "challenge") payload.starterCode = starterCode;

            const response = await fetch(`http://localhost:5000/api/node/${nodeId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                toast.success("Content saved successfully!");
            } else {
                toast.error("Failed to save content");
            }
        } catch (error) {
            console.error("Save error:", error);
            toast.error("An error occurred while saving");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            <p className="text-muted-foreground animate-pulse">Loading editor...</p>
        </div>
    );

    return (
        <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto pb-20">
            {/* Action Bar */}
            <div className="flex items-center justify-between sticky top-0 z-30 bg-background/95 backdrop-blur py-4 border-b">
                <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 group">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Curriculum
                </Button>
                <div className="flex gap-3">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="gap-2 hidden sm:flex">
                                <Eye className="h-4 w-4" /> Preview
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 overflow-hidden">
                            <DialogHeader className="p-4 border-b bg-muted/30">
                                <DialogTitle className="flex items-center gap-2">
                                    <Eye className="h-4 w-4 text-primary" />
                                    Student View: {title}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="flex-1 overflow-auto p-8 bg-background">
                                <div className="max-w-3xl mx-auto space-y-8">
                                    <div className="space-y-2">
                                        <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Badge variant="outline" className="capitalize">{type}</Badge>
                                            <span>•</span>
                                            <span className="text-sm">5 mins read</span>
                                        </div>
                                    </div>

                                    {type === "lesson" && (
                                        <div className="prose dark:prose-invert max-w-none">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {content}
                                            </ReactMarkdown>
                                        </div>
                                    )}

                                    {type === "quiz" && (
                                        <div className="space-y-8">
                                            {questions.map((q, qIdx) => (
                                                <div key={qIdx} className="space-y-4">
                                                    <h3 className="text-xl font-bold">{qIdx + 1}. {q.text}</h3>
                                                    <div className="grid grid-cols-1 gap-3">
                                                        {q.options.map((opt: string, oIdx: number) => (
                                                            <div key={oIdx} className="p-4 rounded-xl border border-muted-foreground/20 hover:border-primary/50 cursor-pointer transition-all bg-muted/5">
                                                                {opt}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                            <Button className="w-full py-6 text-lg font-bold">Submit Answers</Button>
                                        </div>
                                    )}

                                    {type === "challenge" && (
                                        <div className="space-y-6">
                                            <div className="p-6 rounded-2xl bg-muted/20 border border-dashed text-center space-y-4">
                                                <Trophy className="h-12 w-12 text-primary mx-auto opacity-50" />
                                                <h3 className="text-xl font-bold">Coding Environment</h3>
                                                <p className="text-muted-foreground max-w-sm mx-auto text-sm">In the student view, this will be replaced by a split-screen editor where they can run their code and pass tests.</p>
                                                <div className="p-4 rounded-lg bg-black text-left font-mono text-xs overflow-hidden">
                                                    <code className="text-green-400">{starterCode.substring(0, 200)}...</code>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button onClick={handleSaveNode} disabled={isSaving} className="gap-2 min-w-[120px]">
                        {isSaving ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        {isSaving ? "Saving..." : "Save Content"}
                    </Button>
                </div>
            </div>

            {/* Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="capitalize px-2 py-0 text-[10px] font-bold tracking-wider">
                            {type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Node ID: {nodeId}</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
                </div>
            </div>

            {/* Lesson Editor */}
            {type === "lesson" && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 min-h-[70vh]">
                    <Card className="flex flex-col border-muted/40 shadow-sm overflow-hidden">
                        <CardHeader className="py-3 px-4 bg-muted/30 border-b flex flex-row items-center justify-between">
                            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Markdown Source</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 p-0">
                            <textarea
                                className="w-full h-full p-6 bg-background font-mono text-sm resize-none focus:outline-none leading-relaxed"
                                placeholder="# Start typing your lesson content here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </CardContent>
                    </Card>
                    <Card className="hidden xl:flex flex-col border-muted/40 shadow-sm overflow-hidden text-foreground">
                        <CardHeader className="py-3 px-4 bg-muted/30 border-b flex flex-row items-center justify-between">
                            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live Preview</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 p-8 overflow-auto bg-muted/10">
                            <div className="prose dark:prose-invert max-w-none font-sans leading-relaxed">
                                {content ? (
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {content}
                                    </ReactMarkdown>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground/50 italic py-20">
                                        Nothing to preview yet...
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Quiz Editor */}
            {type === "quiz" && (
                <div className="space-y-6 max-w-3xl mx-auto">
                    {questions.map((q, qIdx) => (
                        <Card key={qIdx} className="border-muted/40 shadow-sm hover:border-primary/20 transition-colors">
                            <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b bg-muted/20">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 text-primary text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {qIdx + 1}
                                    </div>
                                    <CardTitle className="text-sm font-medium">Question {qIdx + 1}</CardTitle>
                                </div>
                                <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0" onClick={() => {
                                    const nq = [...questions];
                                    nq.splice(qIdx, 1);
                                    setQuestions(nq);
                                }}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <textarea
                                    className="w-full p-3 border rounded-lg text-sm bg-background/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="Enter your question here..."
                                    rows={3}
                                    value={q.text}
                                    onChange={(e) => {
                                        const nq = [...questions];
                                        nq[qIdx].text = e.target.value;
                                        setQuestions(nq);
                                    }}
                                />
                                <div className="space-y-3">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-2 block">Options & Correct Answer</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {q.options.map((opt: string, oIdx: number) => (
                                            <div key={oIdx} className={`flex gap-3 items-center p-2 rounded-lg border transition-all ${q.correctIndex === oIdx ? 'bg-primary/5 border-primary/30 ring-1 ring-primary/20' : 'bg-background border-muted hover:border-muted-foreground/30'}`}>
                                                <input
                                                    type="radio"
                                                    name={`q-${qIdx}`}
                                                    className="w-4 h-4 accent-primary cursor-pointer"
                                                    checked={q.correctIndex === oIdx}
                                                    onChange={() => {
                                                        const nq = [...questions];
                                                        nq[qIdx].correctIndex = oIdx;
                                                        setQuestions(nq);
                                                    }}
                                                />
                                                <input
                                                    className="flex-1 bg-transparent text-sm outline-none"
                                                    placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                                                    value={opt}
                                                    onChange={(e) => {
                                                        const nq = [...questions];
                                                        nq[qIdx].options[oIdx] = e.target.value;
                                                        setQuestions(nq);
                                                    }}
                                                />
                                                {q.correctIndex === oIdx && <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    <Button variant="outline" className="w-full border-dashed py-8 bg-muted/10 hover:bg-muted/30 group" onClick={() => setQuestions([...questions, { text: "", options: ["", "", "", ""], correctIndex: 0 }])}>
                        <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" /> Add a new question
                    </Button>
                </div>
            )}

            {/* Challenge Editor */}
            {type === "challenge" && (
                <div className="space-y-6">
                    <Card className="h-[75vh] flex flex-col border-muted/40 shadow-sm overflow-hidden">
                        <CardHeader className="py-3 px-4 bg-muted/30 border-b flex flex-row items-center justify-between">
                            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Starter Code Configuration</CardTitle>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-[10px] font-mono">javascript</Badge>
                                <Badge variant="outline" className="text-[10px]">main.js</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-0 overflow-hidden relative">
                            <Editor
                                height="100%"
                                defaultLanguage="javascript"
                                theme="vs-dark"
                                value={starterCode}
                                onChange={(value: string | undefined) => setStarterCode(value || "")}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: "on",
                                    roundedSelection: false,
                                    scrollBeyondLastLine: false,
                                    readOnly: false,
                                    cursorStyle: "line",
                                    automaticLayout: true,
                                    padding: { top: 20 }
                                }}
                            />
                        </CardContent>
                    </Card>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="col-span-1 border-muted/40 shadow-sm bg-primary/5">
                            <CardContent className="p-4 flex gap-4 items-center">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Trophy className="h-5 w-5 text-primary" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-xs font-bold uppercase tracking-wide">Test Cases</p>
                                    <p className="text-[10px] text-muted-foreground italic">Coming soon: Automated evaluation logic</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NodeEditor;
