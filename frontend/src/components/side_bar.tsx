
"use client";

import { useNavigate } from "react-router-dom";
import { HiChartPie, HiUser, HiViewBoards, HiBookOpen } from "react-icons/hi";
import { Trophy, Terminal, ArrowUpRight } from "lucide-react";

interface SideBarProps {
  courseId?: string;
}

export function SideBar({ courseId }: SideBarProps) {
  const navigate = useNavigate();

  const items = [
    { label: "Journey", icon: <HiChartPie className="h-5 w-5" />, href: courseId ? `/journey/${courseId}` : "#" },
    { label: "Daily Challenges", icon: <HiViewBoards className="h-5 w-5" />, href: "#" },
    { label: "Leaderboard", icon: <Trophy className="h-5 w-5" />, href: courseId ? `/leaderboard/${courseId}` : "#" },
    { label: "Profile", icon: <HiUser className="h-5 w-5" />, href: "/profile" },
    { label: "More Courses", icon: <HiBookOpen className="h-5 w-5" />, href: "/courses" },
  ];

  return (
    <nav className="flex flex-col gap-1 h-full">
      {items.map((item) => (
        <button
          key={item.label}
          onClick={() => item.href !== "#" && navigate(item.href)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-left font-bold text-[#373F6E]/70 hover:bg-[#373F6E]/5 hover:text-[#373F6E] transition-all w-full group"
        >
          <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
          <span className="text-sm uppercase tracking-wide">{item.label}</span>
        </button>
      ))}

      {/* Open IDE Button */}
      <div className="mt-auto pt-4 border-t border-neutral-100">
        <button
          onClick={() => navigate("/ide")}
          className="relative w-full overflow-hidden rounded-2xl p-[2px] group"
        >
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center gap-3 px-4 py-3.5 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-[14px] text-white group-hover:from-[#16213e] group-hover:to-[#0f3460] transition-all duration-300">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
              <Terminal className="h-4 w-4 text-cyan-300" />
            </div>
            <div className="text-left flex-1">
              <p className="text-xs font-black uppercase tracking-widest text-white/90">Open IDE</p>
              <p className="text-[10px] text-white/50 font-medium">Code Playground</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </div>
        </button>
      </div>
    </nav>
  );
}
