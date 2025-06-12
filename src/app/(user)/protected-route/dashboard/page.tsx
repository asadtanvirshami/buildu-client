//app/protected-route/dashboard/page.tsx

"use client";
import React, { memo } from "react";
import DraggableNote from "@/components/ui/sticky-note";
import { CalendarWidget } from "./widgets/calendar.widget";
import { DataTableDemo } from "./widgets/tasks.widget";
import { LucideFocus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div
      className="w-full flex-col mt-12 justify-center space-y-8 space-x-8 items-center m-auto"
    >
      <div>
        <Button className="flex items-center justify-center bg-rose-500 text-white" >Focus Mode<LucideFocus className="w-6 h-6" /></Button>
      </div>
      <div>
        <div className="w-full fade-up h-[20rem] bg-card shadow-lg rounded-xl " />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card fade-up px-4 py-4 rounded-xl shadow-lg">
          <CalendarWidget />
        </div>
        <div className="bg-card fade-up px-4 rounded-xl shadow-lg">
          <DataTableDemo />
        </div>
      </div>
      <div>
        <DraggableNote limit={3} />
      </div>
    </div >
  );
};

export default memo(Dashboard);
