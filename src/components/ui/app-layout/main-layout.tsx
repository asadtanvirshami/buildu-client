"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-layout/app-sidbar";
import React from "react";
import { usePathname } from "next/navigation";
import ReactQueryClientProvider from "@/provider/react-query";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const isAuthPath = path.startsWith("/auth");
  const isProtectedRoute = path.startsWith("/protected-route/");

  if (isAuthPath || isProtectedRoute) {
    return (
      <React.Fragment>
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </React.Fragment>
    );
  }

  return (
    <ReactQueryClientProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <React.Fragment>{children}</React.Fragment>
      </SidebarProvider>
    </ReactQueryClientProvider>
  );
}
