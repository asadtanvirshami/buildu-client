"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
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

export const description = "An interactive area chart"

const chartData = [
    { date: "2024-04-01", profit: 222, loss: 150 },
    { date: "2024-04-02", profit: 97, loss: 180 },
    { date: "2024-04-03", profit: 167, loss: 120 },
    { date: "2024-04-04", profit: 242, loss: 260 },
    { date: "2024-04-05", profit: 373, loss: 290 },
    { date: "2024-04-06", profit: 301, loss: 340 },
    { date: "2024-04-07", profit: 245, loss: 180 },
    { date: "2024-04-08", profit: 409, loss: 320 },
    { date: "2024-04-09", profit: 59, loss: 110 },
    { date: "2024-04-10", profit: 261, loss: 190 },
    { date: "2024-04-11", profit: 327, loss: 350 },
    { date: "2024-04-12", profit: 292, loss: 210 },
    { date: "2024-04-13", profit: 342, loss: 380 },
    { date: "2024-04-14", profit: 137, loss: 220 },
    { date: "2024-04-15", profit: 120, loss: 170 },
    { date: "2024-04-16", profit: 138, loss: 190 },
    { date: "2024-04-17", profit: 446, loss: 360 },
    { date: "2024-04-18", profit: 364, loss: 410 },
    { date: "2024-04-19", profit: 243, loss: 180 },
    { date: "2024-04-20", profit: 89, loss: 150 },
    { date: "2024-04-21", profit: 137, loss: 200 },
    { date: "2024-04-22", profit: 224, loss: 170 },
    { date: "2024-04-23", profit: 138, loss: 230 },
    { date: "2024-04-24", profit: 387, loss: 290 },
    { date: "2024-04-25", profit: 215, loss: 250 },
    { date: "2024-04-26", profit: 75, loss: 130 },
    { date: "2024-04-27", profit: 383, loss: 420 },
    { date: "2024-04-28", profit: 122, loss: 180 },
    { date: "2024-04-29", profit: 315, loss: 240 },
    { date: "2024-04-30", profit: 454, loss: 380 },
    { date: "2024-05-01", profit: 165, loss: 220 },
    { date: "2024-05-02", profit: 293, loss: 310 },
    { date: "2024-05-03", profit: 247, loss: 190 },
    { date: "2024-05-04", profit: 385, loss: 420 },
    { date: "2024-05-05", profit: 481, loss: 390 },
    { date: "2024-05-06", profit: 498, loss: 520 },
    { date: "2024-05-07", profit: 388, loss: 300 },
    { date: "2024-05-08", profit: 149, loss: 210 },
    { date: "2024-05-09", profit: 227, loss: 180 },
    { date: "2024-05-10", profit: 293, loss: 330 },
    { date: "2024-05-11", profit: 335, loss: 270 },
    { date: "2024-05-12", profit: 197, loss: 240 },
    { date: "2024-05-13", profit: 197, loss: 160 },
    { date: "2024-05-14", profit: 448, loss: 490 },
    { date: "2024-05-15", profit: 473, loss: 380 },
    { date: "2024-05-16", profit: 338, loss: 400 },
    { date: "2024-05-17", profit: 499, loss: 420 },
    { date: "2024-05-18", profit: 315, loss: 350 },
    { date: "2024-05-19", profit: 235, loss: 180 },
    { date: "2024-05-20", profit: 177, loss: 230 },
    { date: "2024-05-21", profit: 82, loss: 140 },
    { date: "2024-05-22", profit: 81, loss: 120 },
    { date: "2024-05-23", profit: 252, loss: 290 },
    { date: "2024-05-24", profit: 294, loss: 220 },
    { date: "2024-05-25", profit: 201, loss: 250 },
    { date: "2024-05-26", profit: 213, loss: 170 },
    { date: "2024-05-27", profit: 420, loss: 460 },
    { date: "2024-05-28", profit: 233, loss: 190 },
    { date: "2024-05-29", profit: 78, loss: 130 },
    { date: "2024-05-30", profit: 340, loss: 280 },
    { date: "2024-05-31", profit: 178, loss: 230 },
    { date: "2024-06-01", profit: 178, loss: 200 },
    { date: "2024-06-02", profit: 470, loss: 410 },
    { date: "2024-06-03", profit: 103, loss: 160 },
    { date: "2024-06-04", profit: 439, loss: 380 },
    { date: "2024-06-05", profit: 88, loss: 140 },
    { date: "2024-06-06", profit: 294, loss: 250 },
    { date: "2024-06-07", profit: 323, loss: 370 },
    { date: "2024-06-08", profit: 385, loss: 320 },
    { date: "2024-06-09", profit: 438, loss: 480 },
    { date: "2024-06-10", profit: 155, loss: 200 },
    { date: "2024-06-11", profit: 92, loss: 150 },
    { date: "2024-06-12", profit: 492, loss: 420 },
    { date: "2024-06-13", profit: 81, loss: 130 },
    { date: "2024-06-14", profit: 426, loss: 380 },
    { date: "2024-06-15", profit: 307, loss: 350 },
    { date: "2024-06-16", profit: 371, loss: 310 },
    { date: "2024-06-17", profit: 475, loss: 520 },
    { date: "2024-06-18", profit: 107, loss: 170 },
    { date: "2024-06-19", profit: 341, loss: 290 },
    { date: "2024-06-20", profit: 408, loss: 450 },
    { date: "2024-06-21", profit: 169, loss: 210 },
    { date: "2024-06-22", profit: 317, loss: 270 },
    { date: "2024-06-23", profit: 480, loss: 530 },
    { date: "2024-06-24", profit: 132, loss: 180 },
    { date: "2024-06-25", profit: 141, loss: 190 },
    { date: "2024-06-26", profit: 434, loss: 380 },
    { date: "2024-06-27", profit: 448, loss: 490 },
    { date: "2024-06-28", profit: 149, loss: 200 },
    { date: "2024-06-29", profit: 103, loss: 160 },
    { date: "2024-06-30", profit: 446, loss: 400 },
];

const chartConfig = {
    profit: {
        label: "Profit",
        color: "hsl(var(#90e0ef))", // Assuming --chart-1 is a dark blue
    },
    loss: {
        label: "Loss",
        color: "hsl(var(--chart-2))", // Assuming --chart-2 is a light blue
    },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
    const [timeRange, setTimeRange] = React.useState("90d")

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card className="pt-0 w-full h-fit md:w-[30-rem] lg:w-[30rem]">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Area Chart - Interactive</CardTitle>
                    <CardDescription>
                        Showing total profit and loss for the last 3 months
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="loss" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="#ff758f"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#ff758f"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="#74c69d"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#74c69d"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="profit"
                            type="natural"
                            fill="#74c69d"
                            stroke="#74c69d"
                            stackId="a"
                        />
                        <Area
                            dataKey="loss"
                            type="natural"
                            fill="#ff758f"
                            stroke="#ff758f"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
