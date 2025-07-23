import { RootState } from "@/redux/store";
import { Subtask, Task } from "@/types/task-type";
import { findTaskById } from "@/utils/helper/task-helper";
import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const taskAdapter = createEntityAdapter<Task>();

const initialState = taskAdapter.getInitialState();

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      taskAdapter.setAll(state, action.payload);
    },
    addTask: (
      state,
      action: PayloadAction<{
        statusId: string;
        title: string;
        description?: string;
      }>
    ) => {
      const { statusId, title, description } = action.payload;
      const id = uuidv4();
      taskAdapter.addOne(state, {
        id,
        statusId,
        title,
        description: description || "",
        completed: false,
        done: false,
        priority: "low",
        parentId: null,
        subtasks: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    },
    addSubtask: (
      state,
      action: PayloadAction<{ parentId: string; title: string }>
    ) => {
      const parent = findTaskById(state.entities, action.payload.parentId);

      if (parent) {
        if (!Array.isArray(parent.subtasks)) {
          parent.subtasks = [];
        }

        parent.subtasks.push({
          id: uuidv4(),
          title: action.payload.title,
          done: false,
          priority: "low",
          parentId: parent.id,
          subtasks: [],
          updatedAt: Date.now(),
          createdAt: Date.now(),
        });

        parent.updatedAt = Date.now();
      } else {
        console.warn("Parent not found:", action.payload.parentId);
      }
    },
    removeSubtask: (
      state,
      action: PayloadAction<{ parentId: string; subtaskId: string }>
    ) => {
      const findAndRemoveSubtask = (
        subtasks: Subtask[] | undefined
      ): Subtask[] => {
        if (!subtasks) return [];

        return subtasks
          .filter((sub) => sub.id !== action.payload.subtaskId)
          .map((sub) => ({
            ...sub,
            subtasks: findAndRemoveSubtask(sub.subtasks),
          })) as Subtask[];
      };

      // It could be a top-level task or a nested subtask
      const parent = state.entities[action.payload.parentId];
      if (parent) {
        parent.subtasks = findAndRemoveSubtask(parent.subtasks);
        parent.updatedAt = Date.now();
      } else {
        // fallback: iterate all tasks to find the correct parent
        Object.values(state.entities).forEach((task) => {
          task.subtasks = findAndRemoveSubtask(task.subtasks);
        });
      }
    },
    updateTaskTitle: (
      state,
      action: PayloadAction<{ taskId: string; newTitle: string }>
    ) => {
      const task = state.entities[action.payload.taskId];
      if (task) {
        task.title = action.payload.newTitle;
        task.updatedAt = Date.now();
      }
    },
    updateTaskDescription: (
      state,
      action: PayloadAction<{ taskId: string; description: string }>
    ) => {
      const task = state.entities[action.payload.taskId];
      if (task) {
        task.description = action.payload.description;
        task.updatedAt = Date.now();
      }
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.entities[action.payload];
      if (task) {
        task.completed = !task.completed;
        task.updatedAt = Date.now();
      }
    },
    removeTask: (state, action: PayloadAction<{ taskId: string }>) => {
      const toDelete: string[] = [action.payload.taskId];

      const collectSubtasks = (parentId: string) => {
        const children = Object.values(state.entities).filter(
          (t) => t?.parentId === parentId
        );
        for (const child of children) {
          if (child) {
            toDelete.push(child.id);
            collectSubtasks(child.id);
          }
        }
      };

      collectSubtasks(action.payload.taskId);
      taskAdapter.removeMany(state, toDelete);
    },
    clearTasks: (state) => {
      taskAdapter.removeAll(state);
    },
    updateTaskOrSubtask: (
      state,
      action: PayloadAction<{
        id: string;
        changes: Partial<Task>;
        parentId?: string; // optional, only needed for nested subtasks
      }>
    ) => {
      const { id, changes, parentId } = action.payload;

      if (parentId) {
        const parent = state.entities[parentId];
        if (!parent || !Array.isArray(parent.subtasks)) return;

        const index = parent.subtasks.findIndex((sub) => sub.id === id);
        if (index !== -1) {
          parent.subtasks[index] = {
            ...parent.subtasks[index],
            ...changes,
            updatedAt: Date.now(),
          };
        }
      } else {
        const task = state.entities[id];
        if (task) {
          Object.assign(task, changes, { updatedAt: Date.now() });
        }
      }
    },
  },
});

const taskSelectors = taskAdapter.getSelectors<{
  task: ReturnType<typeof taskSlice.reducer>;
}>((state) => state.task);

export const selectAllTasks = taskSelectors.selectAll;
export const selectTaskById = taskSelectors.selectById;
export const selectTaskEntities = (state: RootState) => state.task.entities;
export const selectTasksByStatusId = createSelector(
  [
    (state: RootState) => state.task.entities,
    (_: RootState, statusId: string) => statusId,
  ],
  (entities, statusId): Task[] => {
    if (!entities) return [];
    return Object.values(entities).filter(
      (task) => task?.statusId === statusId
    ) as Task[];
  }
);
export const selectSubtasks = (parentId: string) =>
  createSelector([selectAllTasks], (tasks) =>
    tasks.filter((task) => task.parentId === parentId)
  );

export const {
  setTasks,
  updateTaskOrSubtask,
  addTask,
  removeSubtask,
  addSubtask,
  updateTaskTitle,
  updateTaskDescription,
  toggleTaskCompletion,
  removeTask,
  clearTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
