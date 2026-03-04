
"use client";

import { useNavigate } from "react-router-dom";
import { HiChartPie, HiUser, HiViewBoards, HiBookOpen } from "react-icons/hi";
import { Trophy } from "lucide-react";

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
    <nav className="flex flex-col gap-1">
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
    </nav>
  );
}
