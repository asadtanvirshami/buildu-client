import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type TradeTransaction = {
  id: string
  pair: string
  type: "Buy" | "Sell"
  amount: number
  price: number
  result: "Profit" | "Loss" | "Breakeven" | "Open"
  status: "Closed" | "Open"
  date: string
}

const tradeTransactions: TradeTransaction[] = [
  {
    id: "TX1001",
    pair: "EUR/USD",
    type: "Buy",
    amount: 1000,
    price: 1.085,
    result: "Profit",
    status: "Closed",
    date: "2025-06-28",
  },
  {
    id: "TX1002",
    pair: "USD/JPY",
    type: "Sell",
    amount: 2000,
    price: 159.45,
    result: "Loss",
    status: "Closed",
    date: "2025-06-27",
  },
  {
    id: "TX1003",
    pair: "GBP/USD",
    type: "Buy",
    amount: 1500,
    price: 1.27,
    result: "Profit",
    status: "Closed",
    date: "2025-06-26",
  },
  {
    id: "TX1004",
    pair: "AUD/USD",
    type: "Sell",
    amount: 1800,
    price: 0.665,
    result: "Breakeven",
    status: "Closed",
    date: "2025-06-25",
  },
  {
    id: "TX1005",
    pair: "USD/CAD",
    type: "Buy",
    amount: 1200,
    price: 1.362,
    result: "Loss",
    status: "Closed",
    date: "2025-06-25",
  },
  {
    id: "TX1006",
    pair: "EUR/JPY",
    type: "Sell",
    amount: 1700,
    price: 172.3,
    result: "Profit",
    status: "Closed",
    date: "2025-06-24",
  },
  {
    id: "TX1007",
    pair: "NZD/USD",
    type: "Buy",
    amount: 1000,
    price: 0.6105,
    result: "Loss",
    status: "Closed",
    date: "2025-06-23",
  },
  {
    id: "TX1008",
    pair: "GBP/JPY",
    type: "Sell",
    amount: 2000,
    price: 202.0,
    result: "Profit",
    status: "Closed",
    date: "2025-06-22",
  },
  {
    id: "TX1009",
    pair: "USD/CHF",
    type: "Buy",
    amount: 2500,
    price: 0.894,
    result: "Open",
    status: "Open",
    date: "2025-06-28",
  },
  {
    id: "TX1010",
    pair: "EUR/GBP",
    type: "Sell",
    amount: 800,
    price: 0.852,
    result: "Open",
    status: "Open",
    date: "2025-06-28",
  },
]

export default function TransactionTable() {
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Trade Transactions</h2>
      <Card className="overflow-x-auto rounded-xl border p-4">
        <Table>
          <TableCaption>Recent Forex Trade Transactions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Pair</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Result</TableHead>
              <TableHead className="text-right">Amount (USD)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tradeTransactions.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell>{txn.id}</TableCell>
                <TableCell>{txn.date}</TableCell>
                <TableCell>{txn.pair}</TableCell>
                <TableCell
                  className={
                    txn.type === "Buy"
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {txn.type}
                </TableCell>
                <TableCell
                  className={
                    txn.status === "Closed"
                      ? "text-green-500"
                      : "text-yellow-600"
                  }
                >
                  {txn.status}
                </TableCell>
                <TableCell
                  className={
                    txn.result === "Profit"
                      ? "text-green-600"
                      : txn.result === "Loss"
                      ? "text-red-600"
                      : txn.result === "Breakeven"
                      ? "text-gray-500"
                      : "text-blue-500"
                  }
                >
                  {txn.result}
                </TableCell>
                <TableCell className="text-right">
                  {txn.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
