import ReactMarkdown from 'react-markdown';

const LessonContent = ({ node }: { node: any }) => {
    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700 max-w-3xl mx-auto">
            <h1 className="text-4xl font-black text-neutral-800 tracking-tight leading-tight">{node.title}</h1>
            <div className="prose prose-neutral prose-lg max-w-none text-neutral-600 leading-relaxed">
                <ReactMarkdown>
                    {node.content || "No content available for this lesson."}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default LessonContent;
