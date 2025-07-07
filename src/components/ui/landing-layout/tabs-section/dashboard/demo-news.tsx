"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const forexNews = [
  {
    id: "1",
    title: "USD/JPY Hits New High",
    description: "The dollar strengthens after strong U.S. employment data.",
    impact: "High",
    date: "2025-06-28",
  },
  {
    id: "2",
    title: "EUR Weakens Amid CPI Miss",
    description: "Euro dips as inflation slows in the Eurozone.",
    impact: "Medium",
    date: "2025-06-27",
  },
  {
    id: "3",
    title: "GBP Recovers After Retail Boost",
    description: "Pound bounces back after better-than-expected retail sales.",
    impact: "Medium",
    date: "2025-06-26",
  },
  {
    id: "4",
    title: "CAD Strengthens with Oil",
    description: "Canadian dollar up as crude oil prices jump 4%.",
    impact: "High",
    date: "2025-06-25",
  },
]

export default function ForexNewsCarousel() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Forex News Highlights</h2>

      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {forexNews.map((news) => (
            <CarouselItem
              key={news.id}
              className="pl-4 basis-full sm:basis-1/2 md:basis-1/3"
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-base">{news.title}</CardTitle>
                  <CardDescription>{news.date}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>{news.description}</p>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded ${news.impact === "High"
                        ? "bg-red-100 text-red-700"
                        : news.impact === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-700"
                      }`}
                  >
                    Impact: {news.impact}
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
