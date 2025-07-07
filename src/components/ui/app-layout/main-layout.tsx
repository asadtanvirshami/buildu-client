"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-layout/app-sidbar";
import React from "react";
import { usePathname } from "next/navigation";
import ReactQueryClientProvider from "@/provider/react-query";
import StoreProvider from "@/redux/store-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "../header";
import Footer from "../footer";

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
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
      >
        <StoreProvider>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </StoreProvider>
      </GoogleOAuthProvider>
    );
  }

  if (isProtectedRoute) {
    return (
      <StoreProvider>
        <ReactQueryClientProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            {children}
          </SidebarProvider>
        </ReactQueryClientProvider>
      </StoreProvider>
    );
  }

  return (
    <StoreProvider>
      <ReactQueryClientProvider>
        <Header />
        {children}
        <Footer />
      </ReactQueryClientProvider>
    </StoreProvider>
  );
}
