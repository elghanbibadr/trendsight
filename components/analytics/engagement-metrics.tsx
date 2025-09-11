"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from "recharts"

interface EngagementMetricsProps {
  timeRange: string
  platform: string
}

const engagementData = [
  { day: "Mon", likes: 245, comments: 32, shares: 18, saves: 12 },
  { day: "Tue", likes: 312, comments: 45, shares: 23, saves: 19 },
  { day: "Wed", likes: 189, comments: 28, shares: 15, saves: 8 },
  { day: "Thu", likes: 398, comments: 67, shares: 34, saves: 25 },
  { day: "Fri", likes: 456, comments: 78, shares: 42, saves: 31 },
  { day: "Sat", likes: 523, comments: 89, shares: 56, saves: 38 },
  { day: "Sun", likes: 378, comments: 52, shares: 29, saves: 22 },
]

const engagementTypes = [
  { name: "Likes", value: 2501, color: "hsl(var(--chart-1))" },
  { name: "Comments", value: 391, color: "hsl(var(--chart-2))" },
  { name: "Shares", value: 217, color: "hsl(var(--chart-3))" },
  { name: "Saves", value: 155, color: "hsl(var(--chart-4))" },
]

export function EngagementMetrics({ timeRange, platform }: EngagementMetricsProps) {
  return (
    <div className="space-y-6">
      {/* Engagement Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {engagementTypes.map((type) => (
          <Card key={type.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{type.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{type.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">This {timeRange}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Daily Engagement Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Engagement Breakdown</CardTitle>
          <CardDescription>Engagement activity by day of the week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="likes" fill="hsl(var(--chart-1))" name="Likes" />
              <Bar dataKey="comments" fill="hsl(var(--chart-2))" name="Comments" />
              <Bar dataKey="shares" fill="hsl(var(--chart-3))" name="Shares" />
              <Bar dataKey="saves" fill="hsl(var(--chart-4))" name="Saves" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Engagement Distribution */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Distribution</CardTitle>
            <CardDescription>Breakdown of engagement types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={engagementTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {engagementTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best Performing Times</CardTitle>
            <CardDescription>When your audience is most active</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Peak Hour</span>
              <span className="font-medium">6:00 PM - 7:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Best Day</span>
              <span className="font-medium">Saturday</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg. Response Time</span>
              <span className="font-medium">2.3 hours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Engagement Rate</span>
              <span className="font-medium">4.2%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
