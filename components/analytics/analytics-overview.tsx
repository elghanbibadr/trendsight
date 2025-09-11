"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  ComposedChart,
  Bar,
} from "recharts"
import { TrendingUp, TrendingDown, Users, Heart, MessageCircle, Eye, Activity } from "lucide-react"

interface AnalyticsOverviewProps {
  timeRange: string
  platform: string
}

const mockData = [
  { date: "Jan 1", followers: 18500, engagement: 3.2, impressions: 45000, reach: 38000, clicks: 1440 },
  { date: "Jan 8", followers: 18800, engagement: 3.8, impressions: 52000, reach: 44200, clicks: 1976 },
  { date: "Jan 15", followers: 19200, engagement: 4.1, impressions: 48000, reach: 40800, clicks: 1968 },
  { date: "Jan 22", followers: 19600, engagement: 3.9, impressions: 55000, reach: 46750, clicks: 2145 },
  { date: "Jan 29", followers: 20100, engagement: 4.2, impressions: 58000, reach: 49300, clicks: 2436 },
  { date: "Feb 5", followers: 20500, engagement: 4.5, impressions: 62000, reach: 52700, clicks: 2790 },
  { date: "Feb 12", followers: 20700, engagement: 4.2, impressions: 59000, reach: 50150, clicks: 2478 },
]

const keyMetrics = [
  {
    title: "Total Followers",
    value: "20.7K",
    change: "+8.6%",
    trend: "up",
    icon: Users,
    description: "Across all platforms",
  },
  {
    title: "Engagement Rate",
    value: "4.2%",
    change: "+0.8%",
    trend: "up",
    icon: Heart,
    description: "Average engagement",
  },
  {
    title: "Total Impressions",
    value: "412K",
    change: "+15.2%",
    trend: "up",
    icon: Eye,
    description: "This month",
  },
  {
    title: "Posts Published",
    value: "24",
    change: "-12.5%",
    trend: "down",
    icon: MessageCircle,
    description: "This month",
  },
]

export function AnalyticsOverview({ timeRange, platform }: AnalyticsOverviewProps) {
  const [chartType, setChartType] = useState<"line" | "area" | "combined">("area")
  const [selectedMetric, setSelectedMetric] = useState("followers")

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric) => {
          const Icon = metric.icon
          const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown
          const trendColor = metric.trend === "up" ? "text-green-600" : "text-red-600"

          return (
            <Card key={metric.title} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <div className="flex items-center justify-between mt-2">
                  <div className={`flex items-center text-xs ${trendColor}`}>
                    <TrendIcon className="h-3 w-3 mr-1" />
                    {metric.change}
                  </div>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Enhanced Growth Chart with Multiple Visualizations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Track your metrics over time with interactive visualizations</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={chartType === "line" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("line")}
              >
                Line
              </Button>
              <Button
                variant={chartType === "area" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("area")}
              >
                Area
              </Button>
              <Button
                variant={chartType === "combined" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("combined")}
              >
                Combined
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            {chartType === "line" && (
              <LineChart data={mockData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="followers"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "hsl(var(--chart-1))", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  yAxisId="right"
                />
              </LineChart>
            )}
            {chartType === "area" && (
              <AreaChart data={mockData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="impressions"
                  stackId="1"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="reach"
                  stackId="1"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.6}
                />
              </AreaChart>
            )}
            {chartType === "combined" && (
              <ComposedChart data={mockData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="clicks" fill="hsl(var(--chart-3))" />
                <Line type="monotone" dataKey="followers" stroke="hsl(var(--chart-1))" strokeWidth={3} />
                <Line type="monotone" dataKey="engagement" stroke="hsl(var(--chart-2))" strokeWidth={2} />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Enhanced Platform Breakdown with Mini Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Twitter/X Performance
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Connected
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Followers</span>
              <span className="font-medium">12.5K (+5.2%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Engagement Rate</span>
              <span className="font-medium">3.8% (+0.4%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Tweets</span>
              <span className="font-medium">15 (-3)</span>
            </div>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={mockData.slice(-4)}>
                  <Line type="monotone" dataKey="followers" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Instagram Performance
              <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                Connected
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Followers</span>
              <span className="font-medium">8.2K (+3.4%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Engagement Rate</span>
              <span className="font-medium">4.6% (+1.2%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Posts</span>
              <span className="font-medium">9 (-2)</span>
            </div>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart data={mockData.slice(-4)}>
                  <Area
                    type="monotone"
                    dataKey="engagement"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-accent" />
            Real-time Activity
          </CardTitle>
          <CardDescription>Live updates from your connected accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: "2 min ago", action: "New follower on Twitter", platform: "twitter", count: "+1" },
              { time: "5 min ago", action: "Post liked on Instagram", platform: "instagram", count: "+12" },
              { time: "8 min ago", action: "Tweet retweeted", platform: "twitter", count: "+3" },
              { time: "12 min ago", action: "Story viewed", platform: "instagram", count: "+45" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${activity.platform === "twitter" ? "bg-blue-500" : "bg-pink-500"}`}
                  />
                  <span className="text-sm text-foreground">{activity.action}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-green-600">{activity.count}</span>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
