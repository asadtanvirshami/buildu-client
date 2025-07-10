"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowUpRight } from "lucide-react"

const topPairs = [
    { pair: "EUR/USD", profit: 1320 },
    { pair: "GBP/USD", profit: 950 },
    { pair: "USD/JPY", profit: 745 },
    { pair: "AUD/USD", profit: 690 },
    { pair: "USD/CAD", profit: 580 },
    { pair: "NZD/USD", profit: 520 },
    { pair: "EUR/JPY", profit: 470 },
    { pair: "USD/CHF", profit: 410 },
    { pair: "EUR/GBP", profit: 390 },
    { pair: "GBP/JPY", profit: 360 },
]

export function TopPerformingPairs() {
    return (
        <Card className="text-sm h-[260px]">
            <CardHeader className="pb-2">
                <CardTitle className="text-base">Top Performing Pairs</CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto pr-1 scrollbar-hide max-h-[190px]">
                {topPairs.map((item, index) => (
                    <div key={item.pair}>
                        <div className="flex items-center justify-between py-1">
                            <span className="font-medium">{item.pair}</span>
                            <span className="text-green-500 font-semibold flex items-center">
                                +{item.profit} USD
                                <ArrowUpRight className="ml-1 h-3 w-3" />
                            </span>
                        </div>
                        {index < topPairs.length - 1 && <Separator />}
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
