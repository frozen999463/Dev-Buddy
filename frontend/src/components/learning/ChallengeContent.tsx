import { Badge } from "@/components/ui/badge";
import CodeEditor from "@/codeEditor/codeEditor";

const ChallengeContent = ({ node }: { node: any }) => {
    return (
        <div className="h-[calc(100vh-180px)] flex flex-col gap-6 animate-in fade-in duration-700">
            <div className="space-y-2">
                <Badge className="bg-orange-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-none">CHALLENGE</Badge>
                <h1 className="text-3xl font-black text-neutral-800 tracking-tight leading-tight">{node.title}</h1>
                <p className="text-neutral-500 font-medium">{node.content || "Follow the instructions to complete this challenge."}</p>
            </div>

            <div className="flex-1 rounded-[32px] overflow-hidden border-8 border-neutral-50 shadow-2xl relative">
                {/* 
                    Assuming CodeEditor will be refactored to accept these props.
                    For now, it will render the default Online Compiler UI.
                */}
                <div className="absolute inset-0">
                    <CodeEditor />
                </div>
            </div>
        </div>
    );
};

export default ChallengeContent;
