import { Subtask, Task } from "@/types/task-type";
export const findTaskById = (
  tasks: Record<string, Subtask | Task>,
  id: string
): Task | Subtask | null => {
  for (const task of Object.values(tasks)) {
    const found = searchRecursive(task, id);
    if (found) return found;
  }
  return null;
};

const searchRecursive = (
  task: Task | Subtask,
  id: string
): Task | Subtask | null => {
  if (task.id === id) return task;
  if ("subtasks" in task) {
    for (const subtask of task.subtasks || []) {
      const found = searchRecursive(subtask, id);
      if (found) return found;
    }
  }
  return null;
};
