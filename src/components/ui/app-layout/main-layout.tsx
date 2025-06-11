"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-layout/app-sidbar";
import React from "react";
import { usePathname } from "next/navigation";
import ReactQueryClientProvider from "@/provider/react-query";
import StoreProvider from "@/redux/store-provider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const isAuthPath = path.startsWith("/auth");
  const isProtectedRoute = path.startsWith("/protected-route/");

  if (isAuthPath) {
    return (
      <React.Fragment>
        <StoreProvider>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </StoreProvider>
      </React.Fragment>
    );
  }

  if (isProtectedRoute) {
    return (
      <StoreProvider>
        <ReactQueryClientProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <React.Fragment>{children}</React.Fragment>
          </SidebarProvider>
        </ReactQueryClientProvider>
      </StoreProvider>
    );
  }

  return (
    <StoreProvider>
      <ReactQueryClientProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          <React.Fragment>{children}</React.Fragment>
        </SidebarProvider>
      </ReactQueryClientProvider>
    </StoreProvider>
  );
}
