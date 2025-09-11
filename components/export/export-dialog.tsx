"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Download, FileText, Table, ImageIcon } from "lucide-react"

interface ExportDialogProps {
  trigger?: React.ReactNode
  defaultFormat?: "pdf" | "csv" | "png"
}

export function ExportDialog({ trigger, defaultFormat = "pdf" }: ExportDialogProps) {
  const [format, setFormat] = useState(defaultFormat)
  const [timeRange, setTimeRange] = useState("30d")
  const [includeCharts, setIncludeCharts] = useState(true)
  const [includeData, setIncludeData] = useState(true)
  const [includeSummary, setIncludeSummary] = useState(true)
  const [customName, setCustomName] = useState("")
  const [notes, setNotes] = useState("")
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const exportData = {
      format,
      timeRange,
      includeCharts,
      includeData,
      includeSummary,
      customName: customName || `Social-Analytics-Report-${new Date().toISOString().split("T")[0]}`,
      notes,
      timestamp: new Date().toISOString(),
    }

    console.log("Exporting with options:", exportData)

    // In a real app, this would trigger the actual export
    if (format === "csv") {
      downloadCSV(exportData)
    } else if (format === "pdf") {
      downloadPDF(exportData)
    } else if (format === "png") {
      downloadImage(exportData)
    }

    setIsExporting(false)
  }

  const downloadCSV = (data: any) => {
    const csvContent = generateCSVContent()
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${data.customName}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const downloadPDF = (data: any) => {
    // In a real app, this would generate a proper PDF
    console.log("Generating PDF report...")
    alert("PDF export functionality would be implemented with libraries like jsPDF or Puppeteer")
  }

  const downloadImage = (data: any) => {
    // In a real app, this would capture chart screenshots
    console.log("Generating image export...")
    alert("Image export functionality would be implemented with html2canvas")
  }

  const generateCSVContent = () => {
    const headers = ["Date", "Platform", "Followers", "Engagement Rate", "Impressions", "Clicks"]
    const data = [
      ["2024-01-01", "Twitter", "12500", "3.8", "45000", "1440"],
      ["2024-01-01", "Instagram", "8200", "4.6", "32000", "1280"],
      ["2024-01-08", "Twitter", "12650", "4.1", "48000", "1680"],
      ["2024-01-08", "Instagram", "8350", "4.9", "35000", "1450"],
    ]

    return [headers, ...data].map((row) => row.join(",")).join("\n")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Report</DialogTitle>
          <DialogDescription>Customize your export settings and download your analytics report</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Format */}
          <div className="space-y-2">
            <Label>Export Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    PDF Report
                  </div>
                </SelectItem>
                <SelectItem value="csv">
                  <div className="flex items-center">
                    <Table className="h-4 w-4 mr-2" />
                    CSV Data
                  </div>
                </SelectItem>
                <SelectItem value="png">
                  <div className="flex items-center">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    PNG Image
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Time Range */}
          <div className="space-y-2">
            <Label>Time Range</Label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Include Options */}
          {format === "pdf" && (
            <div className="space-y-3">
              <Label>Include in Report</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="charts" checked={includeCharts} onCheckedChange={setIncludeCharts} />
                  <Label htmlFor="charts" className="text-sm">
                    Charts and visualizations
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="data" checked={includeData} onCheckedChange={setIncludeData} />
                  <Label htmlFor="data" className="text-sm">
                    Raw data tables
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="summary" checked={includeSummary} onCheckedChange={setIncludeSummary} />
                  <Label htmlFor="summary" className="text-sm">
                    Executive summary
                  </Label>
                </div>
              </div>
            </div>
          )}

          {/* Custom Name */}
          <div className="space-y-2">
            <Label htmlFor="name">File Name (optional)</Label>
            <Input
              id="name"
              placeholder="Custom report name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add notes or comments for this export"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" disabled={isExporting}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? "Exporting..." : "Export Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
