"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Table, ImageIcon, Trash2, Share } from "lucide-react"

const exportHistory = [
  {
    id: "1",
    name: "Monthly Performance Report - March 2024",
    format: "pdf",
    size: "2.4 MB",
    date: "2024-03-15",
    status: "completed",
    downloads: 3,
  },
  {
    id: "2",
    name: "Engagement Data Export",
    format: "csv",
    size: "156 KB",
    date: "2024-03-12",
    status: "completed",
    downloads: 1,
  },
  {
    id: "3",
    name: "Analytics Dashboard Screenshot",
    format: "png",
    size: "890 KB",
    date: "2024-03-10",
    status: "completed",
    downloads: 2,
  },
  {
    id: "4",
    name: "Q1 2024 Summary Report",
    format: "pdf",
    size: "3.1 MB",
    date: "2024-03-08",
    status: "processing",
    downloads: 0,
  },
]

export function ExportHistory() {
  const getFormatIcon = (format: string) => {
    switch (format) {
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "csv":
        return <Table className="h-4 w-4" />
      case "png":
        return <ImageIcon className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getFormatColor = (format: string) => {
    switch (format) {
      case "pdf":
        return "bg-red-100 text-red-800"
      case "csv":
        return "bg-green-100 text-green-800"
      case "png":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export History</CardTitle>
        <CardDescription>Your recent exports and downloads</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {exportHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-muted rounded-lg">{getFormatIcon(item.format)}</div>
                <div>
                  <h4 className="font-medium text-foreground">{item.name}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <Badge variant="secondary" className={getFormatColor(item.format)}>
                      {item.format.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{item.size}</span>
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.downloads} download{item.downloads !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant={item.status === "completed" ? "default" : "secondary"}>
                  {item.status === "completed" ? "Ready" : "Processing"}
                </Badge>
                {item.status === "completed" && (
                  <>
                    <Button variant="outline" size="sm">
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </>
                )}
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
