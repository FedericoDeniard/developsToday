"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, FileText, Table } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { SpyCat } from "@/lib/types"
import { toast } from "sonner"

interface ExportDataProps {
  cats: SpyCat[]
}

export function ExportData({ cats }: ExportDataProps) {
  const [isExporting, setIsExporting] = useState(false)

  const exportToCSV = () => {
    setIsExporting(true)
    try {
      const headers = ["ID", "Name", "Breed", "Years of Experience", "Salary", "Created At"]
      const csvContent = [
        headers.join(","),
        ...cats.map((cat) =>
          [
            cat.id,
            `"${cat.name}"`,
            `"${cat.breed}"`,
            cat.years_of_experience,
            cat.salary,
            `"${cat.created_at || "N/A"}"`,
          ].join(","),
        ),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `spy-cats-${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success("Spy cats data exported to CSV file")
    } catch (error) {
      toast.error("Failed to export data to CSV")
    } finally {
      setIsExporting(false)
    }
  }

  const exportToJSON = () => {
    setIsExporting(true)
    try {
      const jsonContent = JSON.stringify(cats, null, 2)
      const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `spy-cats-${new Date().toISOString().split("T")[0]}.json`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success("Spy cats data exported to JSON file")
    } catch (error) {
      toast.error("Failed to export data to JSON")
    } finally {
      setIsExporting(false)
    }
  }

  if (cats.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isExporting}>
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? "Exporting..." : "Export Data"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToCSV}>
          <Table className="h-4 w-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJSON}>
          <FileText className="h-4 w-4 mr-2" />
          Export as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
