//app/protected-route/dashboard/page.tsx

"use client";
import React, { memo } from "react";
// import { taskData } from "@/mocks/data";
import NotesWidget from "./widgets/notes.widget";
import ListWidget from "./widgets/task.widget";

const Dashboard = () => {
  // stickyboard widget
  // const filteredTaskData = taskData.map(task => ({ ...task, dueDate: task.dueDate || '' }));
  return (
    <div className="w-full h-screen container justify-center space-y-8  items-center m-auto">
      <div>
        <NotesWidget />
      </div>
      <div className="w-full flex">
        <div className="w-full ">
          <ListWidget />
        </div>
      </div>
    </div>
  );
};

export default memo(Dashboard);
