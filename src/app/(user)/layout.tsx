import MainLayout from "@/components/ui/app-layout/main-layout";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
