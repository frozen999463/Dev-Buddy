
"use client";

import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiBookOpen, HiChartPie, HiInbox, HiUser, HiViewBoards } from "react-icons/hi";

export function SideBar() {
  return (
    <Sidebar aria-label="Sidebar">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiChartPie}>
            Journey
          </SidebarItem>
          <SidebarItem href="#" icon={HiViewBoards}>
            Daily Challenges
          </SidebarItem>
          <SidebarItem href="#" icon={HiInbox}>
            LeaderBoard
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            Profile
          </SidebarItem>
          <SidebarItem href="/courses" icon={HiBookOpen}>
            View other courses
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
