//app/protected-route/dashboard/page.tsx

"use client";
import React, { memo } from "react";
import IntroductionWidget from "./widgets/introduction.widget";
// import { taskData } from "@/mocks/data";
import TodoWidget from "./widgets/todo.widget";
import NotesWidget from "./widgets/notes.widget";
import TaskWidget from "./widgets/task.widget";



const Dashboard = () => {
  // stickyboard widget
  // const filteredTaskData = taskData.map(task => ({ ...task, dueDate: task.dueDate || '' }));
  return (
    <div
      className="w-screen h-screen container mt-12 justify-center space-y-8  items-center m-auto"
    >
      <IntroductionWidget />
      <div>
        <NotesWidget />
      </div>
      <div className="w-full flex">
        <div className="w-fit">
          <TodoWidget />
        </div>
        <div className="w-[50rem] ">
          <TaskWidget />
        </div>
      </div>
    </div >
  );
};

export default memo(Dashboard);
