export const normalizedData = {
  workspaces: [
    {
      id: "workspace-1",
      name: "Build U HQ",
      userId: "user-123",
    },
  ],

  folders: [
    {
      id: "folder-1",
      name: "Personal Growth",
      workspaceId: "workspace-1",
    },
    {
      id: "folder-2",
      name: "Startup",
      workspaceId: "workspace-1",
    },
  ],

  lists: [
    { id: "list-1", name: "Fitness Plan", folderId: "folder-1" },
    { id: "list-2", name: "Reading List", folderId: "folder-1" },
    { id: "list-3", name: "Build MVP", folderId: "folder-2" },
  ],

  statuses: [
    { id: "status-1", name: "Planned", listId: "list-1" },
    { id: "status-2", name: "In Progress", listId: "list-1" },
    { id: "status-3", name: "Completed", listId: "list-1" },

    { id: "status-4", name: "To Read", listId: "list-2" },

    { id: "status-5", name: "To Do", listId: "list-3" },
    { id: "status-6", name: "In Progress", listId: "list-3" },
  ],

  tasks: [
    {
      id: "task-1",
      title: "Join a Gym",
      description: "Find a gym nearby and sign up.",
      statusId: "status-1",
    },
    {
      id: "task-2",
      title: "Buy gym clothes",
      description: "Get breathable gym wear and shoes.",
      statusId: "status-1",
    },
    {
      id: "task-3",
      title: "Deep Work by Cal Newport",
      description: "Productivity and focus",
      statusId: "status-4",
    },
    {
      id: "task-4",
      title: "Design UI Wireframes",
      description: "Use Figma to sketch main screens",
      statusId: "status-5",
    },
    {
      id: "task-5",
      title: "Setup GitHub Monorepo",
      description: "Organize with Go backend, Next.js frontend",
      statusId: "status-6",
    },
  ],

  subtasks: [
    { id: "subtask-1", title: "Check pricing", done: false, taskId: "task-1" },
    {
      id: "subtask-2",
      title: "Visit 3 local gyms",
      done: true,
      taskId: "task-1",
    },
    { id: "subtask-3", title: "Buy the book", done: true, taskId: "task-3" },
    {
      id: "subtask-4",
      title: "Read 1 chapter a day",
      done: false,
      taskId: "task-3",
    },
    { id: "subtask-5", title: "Home screen", done: true, taskId: "task-4" },
    { id: "subtask-6", title: "Task flow", done: false, taskId: "task-4" },
  ],
};
