"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"
import {
    PolarAngleAxis,
    PolarGrid,
    Radar,
    RadarChart,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const description = "A radar chart with dots and dataset switch"

const chartData = [
    { month: "January", buy: 45, sell: 38 },
    { month: "February", buy: 52, sell: 47 },
    { month: "March", buy: 60, sell: 55 },
    { month: "April", buy: 50, sell: 63 },
    { month: "May", buy: 58, sell: 49 },
    { month: "June", buy: 62, sell: 61 },
]

const chartConfig = {
    buy: {
        label: "Buy Trades",
        color: "#3b82f6", // Tailwind blue-500
    },
    sell: {
        label: "Sell Trades",
        color: "#f97316", // Tailwind orange-500
    },
} satisfies ChartConfig

export function ChartRadarDots() {
    const [dataKey, setDataKey] = useState<"buy" | "sell">("buy")

    return (
        <Card>
            <CardHeader className="items-center gap-4 !flex ">
                <div className="flex flex-col items-center justify-center text-center">
                    <CardTitle>Radar Chart - Dots</CardTitle>
                    <CardDescription>
                        Trade count by month (Buy/Sell)
                    </CardDescription>
                </div>
                <Select defaultValue="buy" onValueChange={(value) => setDataKey(value as "buy" | "sell")}>
                    <SelectTrigger className="w-[80px] mt-2">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="buy">Buy</SelectItem>
                        <SelectItem value="sell">Sell</SelectItem>
                    </SelectContent>
                </Select>

            </CardHeader>

            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[280px]"
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <PolarAngleAxis dataKey="month" />
                        <PolarGrid />
                        <Radar
                            dataKey={dataKey}
                            stroke={chartConfig[dataKey].color}
                            fill={chartConfig[dataKey].color}
                            fillOpacity={0.6}
                            dot={{
                                r: 4,
                                stroke: "white",
                                strokeWidth: 1.5,
                                fill: chartConfig[dataKey].color,
                            }}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium">
                    Trending up by 5.2% this month
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground">January - June 2024</div>
            </CardFooter>
        </Card>
    )
}
