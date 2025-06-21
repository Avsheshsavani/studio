import type { Note } from "./types";

export const initialNotes: Note[] = [
  {
    id: "note-1",
    type: "simple",
    title: "Project Ideas",
    body: "1. A personal finance tracker.\n2. A recipe book app.\n3. A workout planner.",
    tags: ["brainstorming", "projects"],
    timestamp: new Date("2023-10-26T10:00:00Z").getTime(),
  },
  {
    id: "note-2",
    type: "photo",
    title: "Inspiration",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "mountain landscape",
    tags: ["design", "nature"],
    timestamp: new Date("2023-10-26T11:30:00Z").getTime(),
  },
  {
    id: "note-3",
    type: "financial",
    title: "October Expenses",
    tags: ["finance", "budget"],
    timestamp: new Date("2023-10-26T12:00:00Z").getTime(),
    transactions: [
      { id: "txn-1", item: "Groceries", category: "Food", amount: 75.5, date: new Date("2023-10-25T09:00:00Z").getTime() },
      { id: "txn-2", item: "Coffee", category: "Food", amount: 4.75, date: new Date("2023-10-25T09:00:00Z").getTime() },
      { id: "txn-3", item: "Gas", category: "Transport", amount: 55.0, date: new Date("2023-10-24T17:00:00Z").getTime() },
      { id: "txn-4", item: "Movie tickets", category: "Entertainment", amount: 28.0, date: new Date("2023-10-22T20:00:00Z").getTime() },
    ],
  },
  {
    id: "note-4",
    type: "protected",
    title: "Personal Goals Q4",
    body: "This is a secret note about my personal goals. The passkey is 'password'.",
    tags: ["personal", "secure"],
    timestamp: new Date("2023-10-26T14:00:00Z").getTime(),
  },
    {
    id: "note-5",
    type: "simple",
    title: "Grocery List",
    body: "- Milk\n- Bread\n- Eggs\n- Cheese\n- Apples",
    tags: ["shopping", "food"],
    timestamp: new Date("2023-10-27T08:00:00Z").getTime(),
  },
   {
    id: "note-6",
    type: "photo",
    title: "Vacation Snapshot",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "beach sunset",
    tags: ["travel", "memories"],
    timestamp: new Date("2023-08-15T18:45:00Z").getTime(),
  },
];
