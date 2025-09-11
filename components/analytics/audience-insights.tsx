"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface AudienceInsightsProps {
  timeRange: string
  platform: string
}

const ageData = [
  { age: "18-24", percentage: 25, count: 5175 },
  { age: "25-34", percentage: 35, count: 7245 },
  { age: "35-44", percentage: 22, count: 4554 },
  { age: "45-54", percentage: 12, count: 2484 },
  { age: "55+", percentage: 6, count: 1242 },
]

const locationData = [
  { country: "United States", percentage: 45, count: 9315 },
  { country: "United Kingdom", percentage: 18, count: 3726 },
  { country: "Canada", percentage: 12, count: 2484 },
  { country: "Australia", percentage: 8, count: 1656 },
  { country: "Germany", percentage: 7, count: 1449 },
  { country: "Others", percentage: 10, count: 2070 },
]

export function AudienceInsights({ timeRange, platform }: AudienceInsightsProps) {
  return (
    <div className="space-y-6">
      {/* Audience Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Audience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">20.7K</div>
            <p className="text-xs text-green-600 mt-1">+8.6% growth</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Gender Split</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">52% / 48%</div>
            <p className="text-xs text-muted-foreground mt-1">Female / Male</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3m 24s</div>
            <p className="text-xs text-green-600 mt-1">+12s from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Age Demographics */}
      <Card>
        <CardHeader>
          <CardTitle>Age Demographics</CardTitle>
          <CardDescription>Age distribution of your audience</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ageData}>
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip formatter={(value, name) => [`${value}%`, "Percentage"]} />
              <Bar dataKey="percentage" fill="hsl(var(--chart-1))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Geographic Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Top Locations</CardTitle>
          <CardDescription>Where your audience is located</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {locationData.map((location) => (
            <div key={location.country} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{location.country}</span>
                <span className="text-muted-foreground">
                  {location.percentage}% ({location.count.toLocaleString()})
                </span>
              </div>
              <Progress value={location.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Audience Interests */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Interests</CardTitle>
            <CardDescription>What your audience cares about</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { interest: "Technology", percentage: 78 },
              { interest: "Business", percentage: 65 },
              { interest: "Design", percentage: 52 },
              { interest: "Marketing", percentage: 48 },
              { interest: "Entrepreneurship", percentage: 41 },
            ].map((item) => (
              <div key={item.interest} className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.interest}</span>
                <span className="text-sm text-muted-foreground">{item.percentage}%</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Patterns</CardTitle>
            <CardDescription>When your audience is online</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Most Active Day</span>
              <span className="font-medium">Saturday</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Peak Hours</span>
              <span className="font-medium">6 PM - 9 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Time Zone</span>
              <span className="font-medium">EST (45%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Device</span>
              <span className="font-medium">Mobile (72%)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
