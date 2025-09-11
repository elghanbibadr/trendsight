"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const heatmapData = [
  { hour: 0, day: "Mon", value: 12, engagement: 2.1 },
  { hour: 1, day: "Mon", value: 8, engagement: 1.8 },
  { hour: 2, day: "Mon", value: 5, engagement: 1.2 },
  { hour: 6, day: "Mon", value: 25, engagement: 3.2 },
  { hour: 9, day: "Mon", value: 45, engagement: 4.1 },
  { hour: 12, day: "Mon", value: 65, engagement: 5.2 },
  { hour: 15, day: "Mon", value: 55, engagement: 4.8 },
  { hour: 18, day: "Mon", value: 85, engagement: 6.1 },
  { hour: 21, day: "Mon", value: 75, engagement: 5.9 },
  // Add more data for other days...
  { hour: 0, day: "Tue", value: 15, engagement: 2.3 },
  { hour: 6, day: "Tue", value: 30, engagement: 3.5 },
  { hour: 9, day: "Tue", value: 50, engagement: 4.3 },
  { hour: 12, day: "Tue", value: 70, engagement: 5.4 },
  { hour: 15, day: "Tue", value: 60, engagement: 5.0 },
  { hour: 18, day: "Tue", value: 90, engagement: 6.5 },
  { hour: 21, day: "Tue", value: 80, engagement: 6.2 },
]

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const hours = Array.from({ length: 24 }, (_, i) => i)

export function InteractiveHeatmap() {
  const [selectedCell, setSelectedCell] = useState<{ day: string; hour: number } | null>(null)
  const [metric, setMetric] = useState<"value" | "engagement">("value")

  const getIntensity = (value: number, maxValue: number) => {
    const intensity = value / maxValue
    return `rgba(139, 92, 246, ${intensity})`
  }

  const maxValue = Math.max(...heatmapData.map((d) => d[metric]))

  const getCellData = (day: string, hour: number) => {
    return heatmapData.find((d) => d.day === day && d.hour === hour)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Posting Activity Heatmap</CardTitle>
            <CardDescription>Optimal times for maximum engagement</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Badge
              variant={metric === "value" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setMetric("value")}
            >
              Activity
            </Badge>
            <Badge
              variant={metric === "engagement" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setMetric("engagement")}
            >
              Engagement
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Heatmap Grid */}
          <div className="grid grid-cols-25 gap-1 text-xs">
            {/* Header row with hours */}
            <div></div>
            {hours.map((hour) => (
              <div key={hour} className="text-center text-muted-foreground p-1">
                {hour}
              </div>
            ))}

            {/* Data rows */}
            {days.map((day) => (
              <div key={day} className="contents">
                <div className="text-muted-foreground p-1 font-medium">{day}</div>
                {hours.map((hour) => {
                  const cellData = getCellData(day, hour)
                  const value = cellData?.[metric] || 0
                  return (
                    <div
                      key={`${day}-${hour}`}
                      className="aspect-square rounded cursor-pointer border border-border hover:border-accent transition-colors"
                      style={{
                        backgroundColor: cellData ? getIntensity(value, maxValue) : "transparent",
                      }}
                      onClick={() => setSelectedCell({ day, hour })}
                      title={cellData ? `${day} ${hour}:00 - ${metric}: ${value}` : "No data"}
                    />
                  )
                })}
              </div>
            ))}
          </div>

          {/* Selected Cell Info */}
          {selectedCell && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">
                {selectedCell.day} at {selectedCell.hour}:00
              </h4>
              {(() => {
                const cellData = getCellData(selectedCell.day, selectedCell.hour)
                return cellData ? (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Activity: </span>
                      <span className="font-medium">{cellData.value}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Engagement: </span>
                      <span className="font-medium">{cellData.engagement}%</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No data available for this time slot</p>
                )
              })()}
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Low</span>
            <div className="flex space-x-1">
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((intensity) => (
                <div
                  key={intensity}
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: `rgba(139, 92, 246, ${intensity})` }}
                />
              ))}
            </div>
            <span>High</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
