"use client"

import { AdvancedCharts } from "@/components/analytics/advanced-charts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, Share, FileText, TrendingUp } from "lucide-react"
import { ExportDialog } from "@/components/export/export-dialog"
import { QuickExport } from "@/components/export/quick-export"
import { InteractiveHeatmap } from "@/components/analytics/interactive-heatmap"
import { ExportHistory } from "@/components/export/export-history"

export default function ReportsPage() {
  const reports = [
    {
      id: "1",
      name: "Monthly Performance Report",
      description: "Comprehensive overview of all metrics",
      date: "March 2024",
      status: "ready",
      type: "monthly",
    },
    {
      id: "2",
      name: "Engagement Analysis",
      description: "Deep dive into audience engagement patterns",
      date: "Last 30 days",
      status: "generating",
      type: "custom",
    },
    {
      id: "3",
      name: "Content Performance Review",
      description: "Analysis of top-performing content",
      date: "Q1 2024",
      status: "ready",
      type: "quarterly",
    },
  ]

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Advanced visualizations and detailed reports</p>
        </div>

        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
          <ExportDialog
            trigger={
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            }
          />
        </div>
      </div>

      <div className="space-y-8">
        <QuickExport />

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Your latest generated reports and analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{report.name}</h4>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{report.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={report.status === "ready" ? "default" : "secondary"}>
                      {report.status === "ready" ? "Ready" : "Generating..."}
                    </Badge>
                    {report.status === "ready" && (
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                        <ExportDialog
                          trigger={
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Charts */}
        <AdvancedCharts />

        {/* Interactive Heatmap */}
        <InteractiveHeatmap />

        <ExportHistory />
      </div>
    </div>
  )
}
