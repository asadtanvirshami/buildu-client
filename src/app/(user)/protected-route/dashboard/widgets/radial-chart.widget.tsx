"use client"


import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart with a grid and circle"

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 273 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-4)",
    },
} satisfies ChartConfig

export function ChartRadarGridCircle() {
    return (

        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[350px] bg-card border rounded-xl"
        >
            <RadarChart data={chartData}>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <PolarGrid gridType="circle" />
                <PolarAngleAxis dataKey="month" />
                <Radar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    fillOpacity={0.6}
                    dot={{
                        r: 4,
                        fillOpacity: 1,
                    }}
                />
            </RadarChart>
        </ChartContainer>


    )
}
