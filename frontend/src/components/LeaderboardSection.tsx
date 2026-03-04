import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { User as UserIcon, Trophy, Medal, Star, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface LeaderboardEntry {
    _id: string;
    uid: string;
    name: string;
    profilePicture?: string;
    totalXP: number;
    completedNodes: number;
}

interface LeaderboardSectionProps {
    courseId: string;
}

const rankColors: Record<number, string> = {
    1: "from-yellow-300 to-amber-400 text-white",
    2: "from-slate-200 to-slate-300 text-slate-700",
    3: "from-orange-200 to-amber-300 text-amber-800",
};

const rankIcons: Record<number, React.ReactNode> = {
    1: <Trophy size={22} className="text-yellow-300" />,
    2: <Medal size={22} className="text-slate-400" />,
    3: <Medal size={22} className="text-amber-500" />,
};

const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ courseId }) => {
    const { user } = useAuth();
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/progress/leaderboard/${courseId}`);
                const data = await res.json();
                setEntries(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to fetch leaderboard:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, [courseId]);

    const myEntry = entries.find((e) => e.uid === user?.uid);
    const myRank = myEntry ? entries.indexOf(myEntry) + 1 : null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black text-[#373F6E] uppercase tracking-widest font-['Bebas_Neue']">
                Course Leaderboard
            </h2>

            {/* Your rank banner */}
            {myEntry && myRank && (
                <div className="flex items-center justify-between bg-gradient-to-r from-[#373F6E] to-[#5a67d8] text-white rounded-3xl p-6 shadow-xl shadow-[#373F6E]/20">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center font-black text-2xl">
                            #{myRank}
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest opacity-75">Your Rank</p>
                            <p className="text-xl font-black">{myEntry.name || "You"}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                            <Zap size={20} className="text-yellow-300" />
                            <span className="text-3xl font-black">{myEntry.totalXP}</span>
                        </div>
                        <p className="text-xs font-bold opacity-75 uppercase tracking-widest">XP Earned</p>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#373F6E]"></div>
                    <p className="text-[#373F6E]/60 font-black uppercase tracking-widest">Loading ranks...</p>
                </div>
            ) : entries.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
                    <div className="h-20 w-20 bg-[#373F6E]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Trophy className="h-10 w-10 text-[#373F6E]/40" />
                    </div>
                    <h3 className="text-2xl font-black text-[#373F6E] uppercase tracking-widest font-['Bebas_Neue'] mb-2">No rankings yet</h3>
                    <p className="text-gray-400 font-medium">Be the first to complete lessons and earn XP!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {entries.map((entry, idx) => {
                        const rank = idx + 1;
                        const isMe = entry.uid === user?.uid;
                        const gradient = rankColors[rank];
                        return (
                            <Card
                                key={entry._id}
                                className={`overflow-hidden border-none shadow-sm transition-all duration-300 hover:shadow-xl ${isMe ? "ring-2 ring-[#373F6E] shadow-lg shadow-[#373F6E]/10" : ""
                                    } rounded-[1.5rem]`}
                            >
                                <CardContent className="p-0">
                                    <div className="flex items-center gap-5 p-5">
                                        {/* Rank badge */}
                                        <div
                                            className={`h-14 w-14 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-xl ${gradient ? `bg-gradient-to-br ${gradient}` : "bg-[#f1f3ff] text-[#373F6E]/60"
                                                }`}
                                        >
                                            {rankIcons[rank] ?? <span>#{rank}</span>}
                                        </div>

                                        {/* Avatar */}
                                        <div className="h-12 w-12 rounded-xl overflow-hidden bg-[#373F6E]/5 border flex-shrink-0 flex items-center justify-center">
                                            {entry.profilePicture ? (
                                                <img src={entry.profilePicture} alt={entry.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <UserIcon size={22} className="text-[#373F6E]/30" />
                                            )}
                                        </div>

                                        {/* Name */}
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-black text-lg truncate ${isMe ? "text-[#373F6E]" : "text-neutral-800"}`}>
                                                {entry.name || "Anonymous"}
                                                {isMe && (
                                                    <span className="ml-2 text-[10px] font-black uppercase tracking-widest bg-[#373F6E] text-white px-2 py-0.5 rounded-full">
                                                        You
                                                    </span>
                                                )}
                                            </p>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                {entry.completedNodes} nodes completed
                                            </p>
                                        </div>

                                        {/* XP */}
                                        <div className="flex items-center gap-1.5 bg-amber-50 px-4 py-2 rounded-2xl">
                                            <Star size={16} className="text-amber-400 fill-amber-400" />
                                            <span className="font-black text-amber-700 text-lg">{entry.totalXP}</span>
                                            <span className="text-xs font-bold text-amber-500 uppercase">XP</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default LeaderboardSection;
