import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, ArrowUp, Inbox } from "lucide-react";
import { getAuth } from "firebase/auth";
import StreakCard from "./StreakCard";

const JourneyRightPanel = () => {
  const [showStreak, setShowStreak] = useState(false);
  const [stats, setStats] = useState({
    totalXP: 0,
    currentStreak: 0,
    totalCompleted: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const res = await fetch("http://localhost:5000/api/progress/stats/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  return (
    <div className="space-y-8 bg-white relative">

      {/* 📊 Perfectly Aligned Header Icons */}
      <div className="flex items-center justify-end gap-3 h-12 mb-4">

        {/* Streak Trigger */}
        <div
          className={`relative flex items-center gap-2 px-3 py-2 rounded-2xl cursor-pointer transition-all active:scale-95 ${showStreak ? "bg-orange-50" : "hover:bg-neutral-50"
            }`}
          onClick={() => setShowStreak(!showStreak)}
        >
          <span className="text-lg font-bold text-neutral-800 tabular-nums">{stats.currentStreak}</span>
          <Flame size={24} className="text-orange-500 fill-orange-500" />

          {/* 🔥 The interactive Streak Card Popup */}
          {showStreak && <StreakCard />}
        </div>
      </div>
      {/* 🏆 Starter League Card */}
      <Card className="bg-white border-neutral-100 shadow-sm overflow-hidden rounded-3xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-neutral-800 text-lg">Starter League</h3>
            <button className="text-sky-500 text-sm font-bold hover:underline">View</button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-100">
              <ArrowUp size={32} strokeWidth={3} />
            </div>
            <div>
              <p className="font-bold text-xl text-neutral-900 leading-tight">Ranked <span className="text-red-500">#33</span></p>
              <p className="text-sm text-neutral-500 font-medium tracking-tight">35 XP earned this week</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* ✅ Daily Goals Card */}
      <Card className="bg-white border-neutral-100 shadow-sm rounded-3xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-neutral-800 text-lg">Daily Goals</h3>
            <button className="text-sky-500 text-sm font-bold hover:underline">View</button>
          </div>

          <div className="space-y-8">
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
  <div className="space-y-3 group cursor-pointer">
    <div className="flex justify-between items-end">
      <p className="text-sm font-semibold text-neutral-600 group-hover:text-neutral-900 transition-colors tracking-tight">{label}</p>
      <span className="text-xs text-neutral-400 font-bold tabular-nums">{progress}/{total}</span>
    </div>
    <div className="flex items-center gap-4">
      <Progress value={(progress / total) * 100} className="h-2 flex-1 bg-neutral-100" />
      <div className="w-9 h-9 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-orange-500 shadow-sm group-hover:bg-white group-hover:border-orange-200 transition-all">
        <Inbox size={16} />
      </div>
    </div>
  </div>
);
export default JourneyRightPanel;