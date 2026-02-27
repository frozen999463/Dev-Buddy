import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/codeEditor/codeEditor";

const ChallengeContent = ({ node }: { node: any }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            containerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <div
            ref={containerRef}
            className={`flex flex-col gap-1 animate-in fade-in duration-700 bg-white ${isFullscreen ? "h-screen p-4" : "h-[calc(100vh-280px)]"
                }`}
        >
            <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                    <Badge className="bg-orange-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-none">CHALLENGE</Badge>
                    <h1 className="text-xl font-black text-neutral-800 tracking-tight">{node.title}</h1>
                    {!isFullscreen && (
                        <p className="text-neutral-400 text-sm font-medium hidden md:block">{node.content || "Follow the instructions to complete this challenge."}</p>
                    )}
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFullscreen}
                    className="text-neutral-400 hover:text-neutral-800 transition-colors gap-2"
                >
                    {isFullscreen ? (
                        <>
                            <Minimize2 className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase">Exit Fullscreen</span>
                        </>
                    ) : (
                        <>
                            <Maximize2 className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase">Full Screen</span>
                        </>
                    )}
                </Button>
            </div>

            <div className="flex-1 rounded-2xl overflow-hidden border border-neutral-200 shadow-xl">
                <CodeEditor />
            </div>
        </div>
    );
};

export default ChallengeContent;
