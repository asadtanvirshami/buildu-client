const todoData = [
    { id: 1, name: 'Buy milk', completed: true, priority: "low", date: new Date() }, { id: 2, name: 'Buy eggs', completed: false, priority: "high", date: new Date() },
    { id: 3, name: 'Buy bread', completed: false, priority: "medium", date: new Date() }, { id: 4, name: 'Buy cheese', completed: false, priority: "low", date: new Date() },
]

const taskData = [
    {
        id: "f1a2b3c4-e5f6-a7b8-c9d0-e1f2a3b4c5d6",
        title: "Renew Gym Membership",
        status: "in-progress",
        description: "The annual gym membership expires at the end of the month. Renew online or at the front desk.",
        priority: "medium",
        flag: true,
        dueDate: "2025-06-30T18:00:00.000Z",
        taskReminder: [
            {
                takskId: "f1a2b3c4-e5f6-a7b8-c9d0-e1f2a3b4c5d6",
                remindAt: "2025-06-30T09:00:00.000Z"
            }
        ],
        tags: ["work", "health", "fitness"]
    },
    {
        id: "g2h3i4j5-k6l7-m8n9-o0p1-q2r3s4t5u6v7",
        title: "Prepare for project demo",
        status: "done",
        description: "Finalize the presentation slides and rehearse the demo for the client meeting on Friday.",
        priority: "high",
        flag: true,
        dueDate: "2025-06-20T14:00:00.000Z",
        taskReminder: [
            {
                takskId: "g2h3i4j5-k6l7-m8n9-o0p1-q2r3s4t5u6v7",
                remindAt: "2025-06-20T11:00:00.000Z"
            }
        ],
        tags: ["work", "development", "planning"]
    },
    {
        id: "h3i4j5k6-l7m8-n9o0-p1q2-r3s4t5u6v7w8",
        title: "Buy a birthday gift for Sarah",
        status: "pending",
        description: "Sarah's birthday is next week. Find a gift from her wishlist.",
        priority: "high",
        flag: false,
        dueDate: "2025-06-18T12:00:00.000Z",
        taskReminder: [],
        tags: ["personal", "health", "learning"]
    },
    {
        id: "i4j5k6l7-m8n9-o0p1-q2r3-s4t5u6v7w8x9",
        title: "Organize the bookshelf",
        status: "done",
        description: "Sort books by genre and author. Donate any unwanted books.",
        priority: "low",
        flag: false,
        dueDate: null,
        taskReminder: []
    },
    {
        id: "j5k6l7m8-n9o0-p1q2-r3s4-t5u6v7w8x9y0",
        title: "Change car oil",
        status: "canceled",
        description: "The car is due for an oil change. Schedule an appointment at the auto shop.",
        priority: "medium",
        flag: true,
        dueDate: "2025-07-01T15:30:00.000Z",
        taskReminder: [
            {
                takskId: "j5k6l7m8-n9o0-p1q2-r3s4-t5u6v7w8x9y0",
                remindAt: "2025-07-01T10:00:00.000Z"
            }
        ]
    }
];

const stickyNotesData = [
    {
        id: "sn-a1b2-c3d4-e5f6",
        note: "Don't forget the team meeting tomorrow at 10 AM. Prepare the weekly report.",
        // Layout can store stringified JSON for position and size
        layout: JSON.stringify({ x: 50, y: 100, width: 200, height: 150 }),
        color: "#FFF59D" // Light Yellow
    },
    {
        id: "sn-b2c3-d4e5-f6a7",
        note: "Pick up groceries on the way home: milk, bread, and coffee.",
        layout: JSON.stringify({ x: 300, y: 120, width: 200, height: 150 }),
        color: "#A7FFEB" // Light Teal
    },
    {
        id: "sn-c3d4-e5f6-a7b8",
        note: "Q3 brainstorming session ideas:\n- New marketing campaign\n- User feedback improvements",
        layout: JSON.stringify({ x: 80, y: 300, width: 200, height: 150 }),
        color: "#FFCC80" // Light Orange
    },
    {
        id: "sn-d4e5-f6a7-b8c9",
        note: "Call Dr. Smith's office to reschedule appointment.",
        layout: JSON.stringify({ x: 550, y: 80, width: 200, height: 150 }),
        color: "#CF9FFF" // Light Purple
    },
    {
        id: "sn-e5f6-a7b8-c9d0",
        note: "Project 'Phoenix' deadline is approaching. Finalize the remaining tasks.",
        layout: JSON.stringify({ x: 450, y: 280, width: 200, height: 150 }),
        color: "#FFAB91" // Light Red/Peach
    }
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
        message: "New objective assigned: 'Develop and launch new feature by end of quarter.'",
        type: "objective",
        read: true,
    },
    {
        id: "uuid-notif-m4n5o6",
        message: "Don't forget to write in your journal today to reflect on your progress.",
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
        message: "Your manager has requested a check-in for your 'Project Alpha' progress.",
        type: "checkin",
        read: false,
    },
    {
        id: "uuid-notif-v4w5x6",
        message: "A new task has been assigned to you: 'Review pull request #451'.",
        type: "task",
        read: false,
    }
];

const collectionsData = [
    {
        id: "coll-uuid-proj-alpha",
        name: "Project Alpha",
        tags: ["work", "Q3", "development", "planning"]
    },
    {
        id: "coll-uuid-personal-q3",
        name: "Personal Goals Q3",
        tags: ["personal", "health", "learning"]
    },
    {
        id: "coll-uuid-marketing-strat",
        name: "Marketing Strategy",
        tags: ["work", "marketing", "brainstorming"]
    }
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
        sticky_notes: []
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
            { id: "sticky-uuid-c", note: "Find a training plan for the 5k.", layout: "...", color: "#FFAB91" }
        ]
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
        sticky_notes: []
    }]

// --- Mock Data for Calendar ---
const calendarData = [
    {
        id: "cal-uuid-1",
        name: "Q3 Strategy Meeting",
        description: "Final review of the quarterly strategy before presentation to leadership.",
        cover: "https://placehold.co/600x400/A7FFEB/333333?text=Strategy",
        cover_id: "cover-img-strategy-01",
        platform: "Google Meet",
        location: "Online",
        url: "https://meet.google.com/xyz-abc-def"
    },
    {
        id: "cal-uuid-2",
        name: "Team Offsite Event",
        description: "Annual team-building offsite event. Agenda includes workshops and fun activities.",
        cover: "https://placehold.co/600x400/FFCC80/333333?text=Team+Offsite",
        cover_id: "cover-img-offsite-01",
        platform: null,
        location: "Mountain View Retreat Center",
        url: null
    },
    {
        id: "cal-uuid-3",
        name: "Client Demo: Project Phoenix",
        description: "Live demonstration of the new features developed for Project Phoenix.",
        cover: null,
        cover_id: null,
        platform: "Zoom",
        location: "Virtual",
        url: "https://zoom.us/j/1234567890"
    }
];

// --- Mock Data for Achievements ---
const achievementsData = [
    {
        id: "achieve-uuid-1",
        title: "Top Contributor",
        description: "Awarded for the most meaningful contributions during the last quarter.",
        color: "#FFD700", // Gold
        icon: "star-fill",
        icon_id: "ico-star-fill-01",
        pin: true
    },
    {
        id: "achieve-uuid-2",
        title: "Project Pioneer",
        description: "Successfully led and launched a major project from start to finish.",
        color: "#C0C0C0", // Silver
        icon: "rocket-launch",
        icon_id: "ico-rocket-01",
        pin: true
    },
    {
        id: "achieve-uuid-3",
        title: "Community Helper",
        description: "Recognized for outstanding support and mentorship to new team members.",
        color: "#CD7F32", // Bronze
        icon: "heart-handshake",
        icon_id: "ico-handshake-01",
        pin: false
    },
    {
        id: "achieve-uuid-4",
        title: "Innovation Award",
        description: "For developing a creative solution that significantly improved a workflow.",
        color: "#A7FFEB", // Teal
        icon: "lightbulb",
        icon_id: "ico-lightbulb-01",
        pin: false
    }
];

export { todoData, taskData, stickyNotesData, notificationData, collectionsData, notesData, achievementsData, calendarData };