import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Gem, Zap, ArrowUp, Inbox } from "lucide-react";
const JourneyRightPanel = () => {
  return (
    <div className="space-y-8">
      {/* 📊 Top Stats Bar */}
      <div className="flex items-center justify-between bg-neutral-900/50 p-3 rounded-2xl border border-neutral-800">
        <div className="flex items-center gap-1.5"><div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center text-[10px] font-bold">Py</div></div>
        <div className="flex items-center gap-1 text-orange-400 font-bold"><span className="text-sm">1</span><Flame size={18} fill="currentColor" /></div>
        <div className="flex items-center gap-1 text-yellow-500 font-bold"><span className="text-sm">11</span><Gem size={16} fill="currentColor" /></div>
        <div className="flex items-center gap-1 text-purple-400 font-bold"><span className="text-sm">5</span><Zap size={18} fill="currentColor" /></div>
      </div>
      {/* 🏆 Starter League Card */}
      <Card className="bg-neutral-900/50 border-neutral-800 overflow-hidden">
        <CardContent className="p-5 space-y-4">
          <div className="flex justify-between items-center"><h3 className="font-bold text-neutral-300">Starter League</h3><button className="text-sky-500 text-xs font-bold">View</button></div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white"><ArrowUp size={32} strokeWidth={3} /></div>
            <div><p className="font-bold text-lg">Ranked <span className="text-red-500">#33</span></p><p className="text-xs text-neutral-400">35 XP earned this week</p></div>
          </div>
        </CardContent>
      </Card>
      {/* ✅ Daily Goals */}
      <Card className="bg-neutral-900/50 border-neutral-800">
        <CardContent className="p-5 space-y-4">
          <h3 className="font-bold text-neutral-300">Daily Goals</h3>
          <div className="space-y-6">
            <GoalItem label="Earn 60 XP" progress={0} total={60} />
            <GoalItem label="Complete 3 exercises" progress={0} total={3} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
/* Helper component for each goal row */
const GoalItem = ({ label, progress, total }: { label: string, progress: number, total: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end"><p className="text-xs font-medium text-neutral-300">{label}</p><span className="text-[10px] text-neutral-500 font-bold">{progress}/{total}</span></div>
    <div className="flex items-center gap-3">
        <Progress value={(progress/total) * 100} className="h-1.5 flex-1 bg-neutral-800" />
        <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-orange-400"><Inbox size={14} /></div>
    </div>
  </div>
);
export default JourneyRightPanel;