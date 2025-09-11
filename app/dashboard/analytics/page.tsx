"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { EngagementMetrics } from "@/components/analytics/engagement-metrics"
import { AudienceInsights } from "@/components/analytics/audience-insights"
import { ContentPerformance } from "@/components/analytics/content-performance"
import { ExportDialog } from "@/components/export/export-dialog"
import { Calendar, Download, Filter } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [platform, setPlatform] = useState("all")

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into your social media performance</p>
        </div>

        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="twitter">Twitter/X</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <ExportDialog
            trigger={
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            }
          />
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <AnalyticsOverview timeRange={timeRange} platform={platform} />
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <EngagementMetrics timeRange={timeRange} platform={platform} />
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <AudienceInsights timeRange={timeRange} platform={platform} />
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <ContentPerformance timeRange={timeRange} platform={platform} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
