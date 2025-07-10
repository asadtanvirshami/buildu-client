"use client";

import * as React from "react";
import {
  Award,
  Book,
  BookOpen,
  Calculator,
  CandlestickChart,
  Dock,
  Frame,
  LifeBuoy,
  Send,
  Settings2,
  Target,
} from "lucide-react";

import { NavMain } from "@/components/ui/app-layout/nav-main";
import { NavSecondary } from "@/components/ui/app-layout/nav-secondary";
import { NavUser } from "@/components/ui/app-layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "../theme-provider/toggle-button";

// import dark_logo from "../../../../public/assets/dark.png";
// import light_logo from "../../../../public/assets/light.png";
import Image from "next/image";
import { useTheme } from "next-themes";

const data = {
  user: {
    name: "John Davis",
    email: "john@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: Dock,
      // isActive: true,
      // items: [
      //   {
      //     title: "History",
      //     url: "#",
      //   },
      //   {
      //     title: "Starred",
      //     url: "#",
      //   },
      //   {
      //     title: "Settings",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Operations",
      url: "#",
      icon: Target,
      items: [
        {
          title: "Orders", url: "#",
        },
        {
          title: "Portfolios", url: "#",
        }
      ]
    },
    {
      title: "Strategy",
      url: "#",
      icon: Frame,
    },
    {
      title: "Trading Journal",
      url: "#",
      icon: Book,
    },
    {
      title: "Patterns",
      url: "#",
      icon: CandlestickChart,
    },
    {
      title: "Learning",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Rewards",
      url: "#",
      icon: Award,
    },
    {
      title: "Tools",
      url: "#",
      icon: Calculator,
      items: [
        { title: "Lot Size Calculator", url: "#" },
      ]
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],

};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const theme = useTheme()
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                {/* <Image src={theme.theme === "dark" ? dark_logo : light_logo} alt="Logo" width={50} height={50} /> */}
                <div className="grid flex-1 text-left text-sm leading-tight font-[family-name:var(--font-poppins)]">
                  <span className="font-semibold">BackTrading</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="row gap-2 flex justify-evenly">
          <ModeToggle />
          <ModeToggle />
          <ModeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
