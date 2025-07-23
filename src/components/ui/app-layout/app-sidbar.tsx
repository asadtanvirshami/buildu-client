"use client";

import * as React from "react";
import { LifeBuoy, Send } from "lucide-react";

import { NavMain } from "@/components/ui/app-layout/nav-main";
import { NavSecondary } from "@/components/ui/app-layout/nav-secondary";
import { NavUser } from "@/components/ui/app-layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "../theme-provider/toggle-button";

// import dark_logo from "../../../../public/assets/dark.png";
// import light_logo from "../../../../public/assets/light.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/user-type/type";

const data = {
  user: {
    name: "John Davis",
    email: "john@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [],
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
  const user = useSelector((state: RootState) => state.user);

  console.log(user);

  return (
    <Sidebar className="shadow-md" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {user && "user" in user && (
              <NavUser
                user={{
                  firstName: (user.user as User).firstName ?? "",
                  lastName: (user.user as User).lastName ?? "",
                  email: (user.user as User).email ?? "",
                  avatar: (user.user as User).avatar ?? "",
                }}
              />
            )}
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
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}

// {
//       title: "Dashboard",
//       url: "#",
//       icon: Dock,
//       // isActive: true,
//       // items: [
//       //   {
//       //     title: "History",
//       //     url: "#",
//       //   },
//       //   {
//       //     title: "Starred",
//       //     url: "#",
//       //   },
//       //   {
//       //     title: "Settings",
//       //     url: "#",
//       //   },
//       // ],
//     },
//     {
//       title: "Operations",
//       url: "#",
//       icon: Target,
//       items: [
//         {
//           title: "Orders", url: "#",
//         },
//         {
//           title: "Portfolios", url: "#",
//         }
//       ]
//     },
//     {
//       title: "Strategy",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       title: "Trading Journal",
//       url: "#",
//       icon: Book,
//     },
//     {
//       title: "Patterns",
//       url: "#",
//       icon: CandlestickChart,
//     },
//     {
//       title: "Learning",
//       url: "#",
//       icon: BookOpen,
//     },
//     {
//       title: "Rewards",
//       url: "#",
//       icon: Award,
//     },
//     {
//       title: "Tools",
//       url: "#",
//       icon: Calculator,
//       items: [
//         { title: "Lot Size Calculator", url: "#" },
//       ]
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//   ],
