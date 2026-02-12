import { useState } from "react";
import { Check, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuizContent = ({ node, onComplete }: { node: any, onComplete: (score: number) => void }) => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [isChecked, setIsChecked] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);

    const questions = node.questions || [];
    if (questions.length === 0) return (
        <div className="text-center py-20 bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200">
            <p className="text-neutral-500 font-medium">No questions found for this quiz.</p>
        </div>
    );

    const q = questions[currentIdx];
    const isCorrect = selected === q.correctAnswer;

    const handleCheck = () => {
        if (selected !== null) {
            setIsChecked(true);
            if (isCorrect) {
                setCorrectCount(correctCount + 1);
            }
        }
    };

    const handleNext = () => {
        if (currentIdx < questions.length - 1) {
            setCurrentIdx(currentIdx + 1);
            setSelected(null);
            setIsChecked(false);
        } else {
            // Calculate final score as percentage
            const finalScore = Math.round((correctCount / questions.length) * 100);
            onComplete(finalScore);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-10 animate-in fade-in duration-500">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <span className="bg-sky-100 text-sky-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">QUIZ</span>
                    <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest">Question {currentIdx + 1} of {questions.length}</span>
                </div>
                <h2 className="text-3xl font-black text-neutral-800 leading-tight">{q.question}</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {q.options.map((option: string, idx: number) => {
                    const isSelected = selected === idx;
                    const isRightAnswer = idx === q.correctAnswer;

                    let variantClasses = "border-neutral-200 hover:bg-neutral-50 text-neutral-600";
                    if (isSelected) {
                        if (isChecked) {
                            variantClasses = isRightAnswer
                                ? "border-green-500 bg-green-50 text-green-700 shadow-[0_4px_0_0_#22c55e]"
                                : "border-red-500 bg-red-50 text-red-700 shadow-[0_4px_0_0_#ef4444]";
                        } else {
                            variantClasses = "border-sky-500 bg-sky-50 text-sky-700 shadow-[0_4px_0_0_#0ea5e9]";
                        }
                    } else if (isChecked && isRightAnswer) {
                        variantClasses = "border-green-500 bg-green-50 text-green-700";
                    }

                    return (
                        <button
                            key={idx}
                            disabled={isChecked}
                            onClick={() => setSelected(idx)}
                            className={`p-6 rounded-2xl border-2 text-left transition-all font-bold text-lg flex items-center justify-between group active:scale-[0.98] ${variantClasses}`}
                        >
                            <span className="flex-1">{option}</span>
                            <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${isSelected ? "bg-white border-transparent" : "border-neutral-100 group-hover:border-neutral-300"
                                }`}>
                                {isChecked && isRightAnswer && <Check className="h-5 w-5 text-green-600" strokeWidth={4} />}
                                {isChecked && isSelected && !isRightAnswer && <XCircle className="h-5 w-5 text-red-600" strokeWidth={4} />}
                                {!isChecked && isSelected && <div className="w-3 h-3 rounded-full bg-sky-500" />}
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="pt-12 sticky bottom-0 bg-white pb-8">
                {isChecked ? (
                    <div className={`p-6 rounded-3xl flex items-center justify-between animate-in slide-in-from-bottom-4 duration-500 ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isCorrect ? "bg-green-500" : "bg-red-500"} text-white`}>
                                {isCorrect ? <Check strokeWidth={4} /> : <XCircle strokeWidth={4} />}
                            </div>
                            <div>
                                <p className="font-black text-xl">{isCorrect ? "Excellent!" : "Not quite!"}</p>
                                <p className="text-sm font-bold opacity-80">{isCorrect ? "Keep it up!" : `The correct answer was: ${q.options[q.correctAnswer]}`}</p>
                            </div>
                        </div>
                        <Button onClick={handleNext} size="lg" className="bg-white text-neutral-900 border-b-4 border-neutral-200 hover:bg-neutral-50 px-8 py-6 font-black rounded-2xl">
                            {currentIdx < questions.length - 1 ? "NEXT" : "FINISH"} <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                ) : (
                    <Button
                        disabled={selected === null}
                        onClick={handleCheck}
                        size="lg"
                        className="w-full py-8 text-xl font-black bg-neutral-900 hover:bg-neutral-800 text-white border-b-4 border-black active:translate-y-1 active:border-b-0 transition-all rounded-2xl disabled:opacity-30 disabled:pointer-events-none"
                    >
                        CHECK ANSWER
                    </Button>
                )}
            </div>
        </div>
    );
};

export default QuizContent;
