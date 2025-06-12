//app/(user)/layout.tsx

import MainLayout from "@/components/ui/app-layout/main-layout";
import { cn } from "@/lib/utils";
import React, { memo } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>
    <div className="relative flex h-screen w-full items-center justify-center bg-white dark:bg-card">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      <div className="h-full  w-full flex justify-center">
        <div className="relative container w-full inset-0 font-[family-name:var(--font-poppins)]">
          <React.Fragment>{children}</React.Fragment>
        </div>
      </div>
    </div></MainLayout>;
};

export default memo(Layout);
