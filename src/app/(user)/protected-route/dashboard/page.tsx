//app/protected-route/dashboard/page.tsx

"use client";
import React, { memo } from "react";
import DraggableNote from "@/components/ui/sticky-note";

const Dashboard = () => {
  return (
    <div
      className="w-full flex-col justify-center gap-5 items-center m-auto"
    >
      
      <div>
        <DraggableNote limit={3} />
      </div>
    </div>
  );
};

export default memo(Dashboard);
