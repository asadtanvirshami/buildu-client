export interface Workspace {
  id: string;
  name: string;
  userId: string;
  folders: Folder[];
}

export interface Folder {
  id: string;
  name: string;
  lists: List[];
}

export interface List {
  id: string;
  name: string;
  statuses: Status[];
}

export interface Status {
  id: string;
  name: string; // Add more status types if needed
  tasks: Task[];
  editable: boolean;
  open: boolean;
}

export interface Task {
  id: string;
  parentId?: string | null;
  statusId: string;
  title: string;
  description?: string;
  completed: boolean;
  done: boolean;
  priority: "low" | "medium" | "high";
  subtasks: Subtask[]; // Change this to Task[] instead of Subtask[]
  createdAt: number;
  updatedAt: number;
}
export interface Subtask {
  id: string;
  title: string;
  done: boolean;
  priority: "low" | "medium" | "high";
  parentId: string | null; 
  subtasks?: Subtask[]; // recursive!
  createdAt: number;
  updatedAt: number;
}
