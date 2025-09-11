"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExportDialog } from "./export-dialog"
import { FileText, Table, ImageIcon, Calendar } from "lucide-react"

export function QuickExport() {
  const quickExportOptions = [
    {
      title: "PDF Report",
      description: "Complete analytics report with charts",
      icon: FileText,
      format: "pdf" as const,
      color: "text-red-600",
    },
    {
      title: "CSV Data",
      description: "Raw data for spreadsheet analysis",
      icon: Table,
      format: "csv" as const,
      color: "text-green-600",
    },
    {
      title: "Dashboard Image",
      description: "Screenshot of current dashboard",
      icon: ImageIcon,
      format: "png" as const,
      color: "text-blue-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Export</CardTitle>
        <CardDescription>Export your data in different formats</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickExportOptions.map((option) => {
            const Icon = option.icon
            return (
              <div key={option.format} className="p-4 border border-border rounded-lg text-center space-y-3">
                <Icon className={`h-8 w-8 mx-auto ${option.color}`} />
                <div>
                  <h4 className="font-medium text-foreground">{option.title}</h4>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                <ExportDialog
                  defaultFormat={option.format}
                  trigger={
                    <Button variant="outline" className="w-full bg-transparent">
                      Export {option.format.toUpperCase()}
                    </Button>
                  }
                />
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-4 w-4 text-accent" />
            <h4 className="font-medium text-foreground">Scheduled Exports</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">Set up automatic report generation and delivery</p>
          <Button variant="outline" size="sm">
            Configure Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
