const taskData = [
  {
    id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    title: "Plan Q4 Marketing Campaign",
    description:
      "Outline the strategy, budget, and channels for the upcoming quarterly marketing campaign.",
    parent_id: null,
    status: "in_progress",
    due_date: "2025-10-15T23:59:59Z",
    priority: 1,
    created_at: "2025-09-01T10:00:00Z",
    updated_at: "2025-09-05T14:20:00Z",
  },
  {
    id: "b2c3d4e5-f6a7-8901-2345-67890abcdef1",
    title: "Develop Creative Assets",
    description:
      "Create graphics, ad copy, and video content for the social media push.",
    parent_id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    status: "in_progress",
    due_date: "2025-09-30T23:59:59Z",
    priority: 1,
    created_at: "2025-09-02T11:00:00Z",
    updated_at: "2025-09-06T09:15:00Z",
  },
  {
    id: "c3d4e5f6-a7b8-9012-3456-7890abcdef23",
    title: "Finalize Budget",
    description:
      "Allocate funds for ad spend, content creators, and software tools.",
    parent_id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    status: "done",
    due_date: "2025-09-10T23:59:59Z",
    priority: 2,
    created_at: "2025-09-02T11:05:00Z",
    updated_at: "2025-09-08T16:30:00Z",
  },
  {
    id: "d4e5f6a7-b8c9-0123-4567-890abcdef345",
    title: "Update Website Homepage",
    description:
      "Update the main banner and featured products on the company website.",
    parent_id: null,
    status: "todo",
    due_date: "2025-09-20T23:59:59Z",
    priority: 2,
    created_at: "2025-09-03T15:00:00Z",
    updated_at: "2025-09-03T15:00:00Z",
  },
  {
    id: "e5f6a7b8-c9d0-1234-5678-90abcdef4567",
    title: "Fix Login Authentication Bug",
    description:
      "Users are reporting issues logging in with their Google accounts. Investigate and deploy a fix.",
    parent_id: null,
    status: "done",
    due_date: null,
    priority: 1,
    created_at: "2025-09-04T09:30:00Z",
    updated_at: "2025-09-05T18:00:00Z",
  },
  {
    id: "f6a7b8c9-d0e1-2345-6789-0abcdef56789",
    title: "Organize Team Offsite Event",
    description:
      "Plan the annual team-building offsite. Research venues and activities.",
    parent_id: null,
    status: "todo",
    due_date: null,
    priority: 3,
    created_at: "2025-09-05T12:00:00Z",
    updated_at: "2025-09-05T12:00:00Z",
  },
];

const workspaceData = [
  {
    id: "1a1a1a1a-1a1a-1a1a-1a1a-1a1a1a1a1a1a",
    name: "Personal",
    created_at: "2025-07-14T10:00:00Z",
    updated_at: "2025-07-14T10:00:00Z",
  },
  {
    id: "2b2b2b2b-2b2b-2b2b-2b2b-2b2b2b2b2b2b",
    name: "Work",
    created_at: "2025-07-15T09:00:00Z",
    updated_at: "2025-07-15T09:00:00Z",
  },
];

const projectsData = [
  {
    id: "3c3c3c3c-3c3c-3c3c-3c3c-3c3c3c3c3c3c",
    workspace_id: "2b2b2b2b-2b2b-2b2b-2b2b-2b2b2b2b2b2b",
    name: "Q3 Marketing Campaign",
    created_at: "2025-07-15T09:05:00Z",
    updated_at: "2025-07-15T09:05:00Z",
  },
  {
    id: "4d4d4d4d-4d4d-4d4d-4d4d-4d4d4d4d4d4d",
    workspace_id: "2b2b2b2b-2b2b-2b2b-2b2b-2b2b2b2b2b2b",
    name: "Website Redesign",
    created_at: "2025-07-15T09:10:00Z",
    updated_at: "2025-07-15T09:10:00Z",
  },
];

const notificationData = [
  {
    id: "uuid-notif-1a2b3c",
    message: "Your weekly summary for June 9th - June 15th is ready to view.",
    type: "weeklySummary",
    read: true,
  },
  {
    id: "uuid-notif-4d5e6f",
    message: "You've completed the goal: 'Increase user engagement by 15%'!",
    type: "goal",
    read: false,
  },
  {
    id: "uuid-notif-7g8h9i",
    message: "Reminder: 'Finalize Q3 presentation' is due tomorrow.",
    type: "reminder",
    read: false,
  },
  {
    id: "uuid-notif-j1k2l3",
    message:
      "New objective assigned: 'Develop and launch new feature by end of quarter.'",
    type: "objective",
    read: true,
  },
  {
    id: "uuid-notif-m4n5o6",
    message:
      "Don't forget to write in your journal today to reflect on your progress.",
    type: "journal",
    read: false,
  },
  {
    id: "uuid-notif-p7q8r9",
    message: "Task 'Deploy server updates' has been successfully completed.",
    type: "task",
    read: true,
  },
  {
    id: "uuid-notif-s1t2u3",
    message:
      "Your manager has requested a check-in for your 'Project Alpha' progress.",
    type: "checkin",
    read: false,
  },
  {
    id: "uuid-notif-v4w5x6",
    message: "A new task has been assigned to you: 'Review pull request #451'.",
    type: "task",
    read: false,
  },
];

const collectionsData = [
  {
    id: "coll-uuid-proj-alpha",
    name: "Project Alpha",
    tags: ["work", "Q3", "development", "planning"],
  },
  {
    id: "coll-uuid-personal-q3",
    name: "Personal Goals Q3",
    tags: ["personal", "health", "learning"],
  },
  {
    id: "coll-uuid-marketing-strat",
    name: "Marketing Strategy",
    tags: ["work", "marketing", "brainstorming"],
  },
];

// --- Mock Data for Notes ---
const notesData = [
  {
    id: "note-uuid-1",
    note: "Initial research and competitor analysis for Project Alpha's new feature set. Focus on UI/UX trends.",
    tags: ["research", "competitor-analysis", "ux"],
    color: "#A7FFEB", // Light Teal
    createdAt: new Date("2025-06-10T11:30:00.000Z"),
    updatedAt: new Date("2025-06-12T14:00:00.000Z"),
    user: { id: "user-uuid-123", name: "Alice" },
  },
  {
    id: "note-uuid-2",
    note: "Draft of Q3 marketing content calendar. Includes blog posts, social media schedule, and email campaigns.",
    tags: ["content-planning", "social-media", "email"],
    layout: JSON.stringify({ x: 300, y: 10, width: 250, height: 200 }),
    color: "#FFCC80", // Light Orange
    createdAt: new Date("2025-06-11T09:00:00.000Z"),
    updatedAt: new Date("2025-06-11T09:00:00.000Z"),
    user: { id: "user-uuid-456", name: "Bob" },
    collection: { id: "coll-uuid-marketing-strat", name: "Marketing Strategy" },
    sticky_notes: [],
  },
  {
    id: "note-uuid-3",
    note: "My personal goals for the quarter: 1. Run a 5k. 2. Read 3 books. 3. Learn the basics of React Native.",
    tags: ["fitness", "reading", "coding"],
    layout: JSON.stringify({ x: 10, y: 250, width: 250, height: 200 }),
    color: "#CF9FFF", // Light Purple
    createdAt: new Date("2025-06-01T18:00:00.000Z"),
    updatedAt: new Date("2025-06-14T10:15:00.000Z"),
    user: { id: "user-uuid-123", name: "Alice" },
    collection: { id: "coll-uuid-personal-q3", name: "Personal Goals Q3" },
    sticky_notes: [
      {
        id: "sticky-uuid-c",
        note: "Find a training plan for the 5k.",
        layout: "...",
        color: "#FFAB91",
      },
    ],
  },
  {
    id: "note-uuid-4",
    note: "Meeting minutes from the Project Alpha kickoff call. Key decisions and action items are summarized.",
    tags: ["meeting", "action-items", "kickoff"],
    layout: JSON.stringify({ x: 300, y: 250, width: 250, height: 200 }),
    color: "#A7FFEB", // Light Teal
    createdAt: new Date("2025-05-28T16:00:00.000Z"),
    updatedAt: new Date("2025-05-28T16:00:00.000Z"),
    user: { id: "user-uuid-789", name: "Charlie" },
    collection: { id: "coll-uuid-proj-alpha", name: "Project Alpha" },
    sticky_notes: [],
  },
];

// --- Mock Data for Calendar ---
const calendarData = [
  {
    id: "cal-uuid-1",
    name: "Q3 Strategy Meeting",
    description:
      "Final review of the quarterly strategy before presentation to leadership.",
    cover: "https://placehold.co/600x400/A7FFEB/333333?text=Strategy",
    cover_id: "cover-img-strategy-01",
    platform: "Google Meet",
    location: "Online",
    url: "https://meet.google.com/xyz-abc-def",
  },
  {
    id: "cal-uuid-2",
    name: "Team Offsite Event",
    description:
      "Annual team-building offsite event. Agenda includes workshops and fun activities.",
    cover: "https://placehold.co/600x400/FFCC80/333333?text=Team+Offsite",
    cover_id: "cover-img-offsite-01",
    platform: null,
    location: "Mountain View Retreat Center",
    url: null,
  },
  {
    id: "cal-uuid-3",
    name: "Client Demo: Project Phoenix",
    description:
      "Live demonstration of the new features developed for Project Phoenix.",
    cover: null,
    cover_id: null,
    platform: "Zoom",
    location: "Virtual",
    url: "https://zoom.us/j/1234567890",
  },
];

// --- Mock Data for Achievements ---
const achievementsData = [
  {
    id: "achieve-uuid-1",
    title: "Top Contributor",
    description:
      "Awarded for the most meaningful contributions during the last quarter.",
    color: "#FFD700", // Gold
    icon: "star-fill",
    icon_id: "ico-star-fill-01",
    pin: true,
  },
  {
    id: "achieve-uuid-2",
    title: "Project Pioneer",
    description:
      "Successfully led and launched a major project from start to finish.",
    color: "#C0C0C0", // Silver
    icon: "rocket-launch",
    icon_id: "ico-rocket-01",
    pin: true,
  },
  {
    id: "achieve-uuid-3",
    title: "Community Helper",
    description:
      "Recognized for outstanding support and mentorship to new team members.",
    color: "#CD7F32", // Bronze
    icon: "heart-handshake",
    icon_id: "ico-handshake-01",
    pin: false,
  },
  {
    id: "achieve-uuid-4",
    title: "Innovation Award",
    description:
      "For developing a creative solution that significantly improved a workflow.",
    color: "#A7FFEB", // Teal
    icon: "lightbulb",
    icon_id: "ico-lightbulb-01",
    pin: false,
  },
];

export {
  taskData,
  workspaceData,
  notificationData,
  collectionsData,
  notesData,
  achievementsData,
  calendarData,
};
