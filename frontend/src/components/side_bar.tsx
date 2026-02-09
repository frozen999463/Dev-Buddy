
"use client";

import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarLogo } from "flowbite-react";
import { HiChartPie, HiInbox, HiShoppingBag, HiUser, HiViewBoards } from "react-icons/hi";

export function SideBar() {
  return (
    <Sidebar aria-label="Sidebar with logo branding example">
      <SidebarLogo href="#" img="/favicon.svg" imgAlt="Flowbite logo">
        Flowbite
      </SidebarLogo>
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
          <SidebarItem href="#" icon={HiShoppingBag}>
            More
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
