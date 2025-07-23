interface Trade {
  id: string;
  date: string; // ISO format e.g. "2025-07-01T09:30:00Z"
  pair: string; // Currency pair or instrument
  profit: number; // Profit or loss amount
  entry: string; // Entry price or signal
  exit: string; // Exit price or reason
  notes: string; // Optional notes
}

const trades: Trade[] = [
  {
    id: "T001",
    date: "2025-07-01T09:30:00Z",
    pair: "EUR/USD",
    profit: 120,
    entry: "1.0700",
    exit: "1.0750",
    notes: "Breakout trade after CPI news",
  },
  {
    id: "T002",
    date: "2025-07-01T14:00:00Z",
    pair: "USD/JPY",
    profit: -85,
    entry: "158.20",
    exit: "157.80",
    notes: "Failed breakout, reversed quickly",
  },
  {
    id: "T003",
    date: "2025-07-02T10:15:00Z",
    pair: "GBP/USD",
    profit: 60,
    entry: "1.2650",
    exit: "1.2700",
    notes: "Support bounce after UK retail data",
  },
  {
    id: "T004",
    date: "2025-07-03T08:45:00Z",
    pair: "AUD/USD",
    profit: 40,
    entry: "0.6620",
    exit: "0.6640",
    notes: "RBA statement-driven scalp",
  },
  {
    id: "T005",
    date: "2025-07-03T13:20:00Z",
    pair: "USD/CAD",
    profit: -30,
    entry: "1.3700",
    exit: "1.3680",
    notes: "Oil price spike affected CAD strength",
  },
];

export { trades };
