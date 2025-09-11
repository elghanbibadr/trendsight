"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts"
import { useState } from "react"

const scatterData = [
  { engagement: 2.1, reach: 1200, followers: 850, platform: "Twitter" },
  { engagement: 4.5, reach: 2800, followers: 1200, platform: "Instagram" },
  { engagement: 3.2, reach: 1800, followers: 950, platform: "Twitter" },
  { engagement: 5.8, reach: 3200, followers: 1450, platform: "Instagram" },
  { engagement: 1.9, reach: 900, followers: 720, platform: "Twitter" },
  { engagement: 6.2, reach: 4100, followers: 1680, platform: "Instagram" },
]

const radarData = [
  { metric: "Engagement", twitter: 78, instagram: 92, fullMark: 100 },
  { metric: "Reach", twitter: 65, instagram: 85, fullMark: 100 },
  { metric: "Frequency", twitter: 88, instagram: 72, fullMark: 100 },
  { metric: "Quality", twitter: 82, instagram: 89, fullMark: 100 },
  { metric: "Growth", twitter: 75, instagram: 95, fullMark: 100 },
  { metric: "Consistency", twitter: 90, instagram: 78, fullMark: 100 },
]

const treemapData = [
  { name: "Educational Posts", size: 3240, engagement: 4.8 },
  { name: "Behind Scenes", size: 2180, engagement: 5.2 },
  { name: "Product Updates", size: 1890, engagement: 3.9 },
  { name: "Team Spotlights", size: 1560, engagement: 6.1 },
  { name: "Industry News", size: 1200, engagement: 3.2 },
  { name: "User Generated", size: 980, engagement: 7.3 },
]

const funnelData = [
  { name: "Impressions", value: 45000, fill: "hsl(var(--chart-1))" },
  { name: "Reach", value: 38000, fill: "hsl(var(--chart-2))" },
  { name: "Engagement", value: 1890, fill: "hsl(var(--chart-3))" },
  { name: "Clicks", value: 756, fill: "hsl(var(--chart-4))" },
  { name: "Conversions", value: 89, fill: "hsl(var(--chart-5))" },
]

export function AdvancedCharts() {
  const [selectedChart, setSelectedChart] = useState("scatter")

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          {payload.map((entry: any, index: number) => (
            <div key={index}>
              <p className="font-medium text-foreground">{entry.payload.platform || entry.payload.name}</p>
              <p className="text-sm text-muted-foreground">Engagement: {entry.payload.engagement}%</p>
              <p className="text-sm text-muted-foreground">
                Reach: {entry.payload.reach?.toLocaleString() || entry.payload.value?.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Deep insights with specialized visualizations</CardDescription>
            </div>
            <Select value={selectedChart} onValueChange={setSelectedChart}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scatter">Engagement vs Reach</SelectItem>
                <SelectItem value="radar">Platform Comparison</SelectItem>
                <SelectItem value="treemap">Content Performance</SelectItem>
                <SelectItem value="funnel">Conversion Funnel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
<ResponsiveContainer width="100%" height={400}>
  <>
    {selectedChart === "scatter" && (
      <ScatterChart data={scatterData}>
        <XAxis dataKey="engagement" name="Engagement Rate" unit="%" />
        <YAxis dataKey="reach" name="Reach" />
        <Tooltip content={<CustomTooltip />} />
        <Scatter name="Posts" dataKey="followers" fill="hsl(var(--chart-1))" />
      </ScatterChart>
    )}
    {selectedChart === "radar" && (
      <RadarChart data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} />
        <Radar
          name="Twitter"
          dataKey="twitter"
          stroke="hsl(var(--chart-1))"
          fill="hsl(var(--chart-1))"
          fillOpacity={0.3}
        />
        <Radar
          name="Instagram"
          dataKey="instagram"
          stroke="hsl(var(--chart-2))"
          fill="hsl(var(--chart-2))"
          fillOpacity={0.3}
        />
        <Tooltip />
      </RadarChart>
    )}
    {selectedChart === "treemap" && (
      <Treemap data={treemapData} dataKey="size" aspectRatio={4 / 3} stroke="#fff" fill="hsl(var(--chart-1))">
        <Tooltip content={<CustomTooltip />} />
      </Treemap>
    )}
    {selectedChart === "funnel" && (
      <FunnelChart>
        <Tooltip />
        <Funnel dataKey="value" data={funnelData} isAnimationActive>
          <LabelList position="center" fill="#fff" stroke="none" />
        </Funnel>
      </FunnelChart>
    )}
  </>
</ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
