import React from "react";
import { Flame } from "lucide-react";
const StreakCard = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDay = "F"; // We can make this dynamic later
  return (
    <div className="absolute top-12 right-0 w-80 bg-orange-600 rounded-3xl p-6 shadow-2xl z-50 animate-in zoom-in-95 duration-200 origin-top-right">
      {/* 🔼 Little Arrow at top */}
      <div className="absolute -top-2 right-4 w-4 h-4 bg-orange-600 rotate-45" />
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white tracking-tight">0 day streak</h3>
          <p className="text-orange-100 text-sm leading-snug">
            Do a lesson today to start a new streak!
          </p>
        </div>
        <Flame size={64} className="text-white fill-white opacity-90 -mr-2" />
      </div>
      {/* Weekly Tracker */}
      <div className="bg-orange-700/40 rounded-2xl p-4">
        <div className="flex justify-between items-center px-1">
          {days.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <span className="text-[10px] font-bold text-orange-200/60 uppercase">{day}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${day === currentDay
                  ? "border-2 border-orange-400 bg-orange-800/40 shadow-inner"
                  : "bg-orange-800/20"
                }`}>
                {/* This would be a check or flame if completed */}
                {day === "S" && i === 6 ? <Flame size={14} className="text-orange-900/40" /> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default StreakCard;