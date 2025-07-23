"use client";

import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import ListAccordation from "@/components/ui/list/list-accordation";
import { normalizedData } from "@/mocks/tasks";
import { setStatuses } from "@/redux/slices/status/status-slice";
import { setTasks } from "@/redux/slices/task/task-slice";

const transformTasks = (tasks: any[]) => {
  return tasks.map((task) => ({
    ...task,
    completed: false,
    done: false,
    priority: "low",
    subtasks: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }));
};

const transformStatuses = (statuses: any[]) => {
  return statuses.map((status) => ({
    ...status,
    tasks: [], // Initialize tasks as an empty array
    editable: false, // Initialize editable as false
    open: false, // Initialize open as false
  }));
};

const ListWidget = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStatuses(transformStatuses(normalizedData.statuses))); // This now goes through the entity adapter
    dispatch(setTasks(transformTasks(normalizedData.tasks)));
  }, [dispatch, normalizedData.statuses, normalizedData.tasks]);

  return <ListAccordation />;
};

export default ListWidget;
