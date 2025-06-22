//app/(user)/layout.tsx

import MainLayout from "@/components/ui/app-layout/main-layout";
import React, { memo } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // <div className="relative flex  w-full items-center justify-center bg-white dark:bg-card">
  //     <div
  //       className={cn(
  //         "absolute inset-0",
  //         "[background-size:20px_20px]",
  //         "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
  //         "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
  //       )}
  //     />
  //     <div className="h-full  w-full flex justify-center">
  //       <div className="relative container w-full inset-0 font-[family-name:var(--font-poppins)]">
  //         {/* Component */}
  //       </div>
  //     </div>
  //   </div>
  return <MainLayout>
    <React.Fragment>{children}</React.Fragment>
  </MainLayout>;
};

export default memo(Layout);
