"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X, Download } from "lucide-react"
import { Table } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function BookDataTableToolbar<TData extends Record<string, any>>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [exporting, setExporting] = useState(false)
  const [pageSize, setPageSize] = useState(table.getState().pagination.pageSize)

  /** Export CSV **/
  const exportCSV = () => {
    setExporting(true)
    const rows = table.getFilteredRowModel().rows.map((row) => row.original)
    const headers = Object.keys(rows[0] || {})
    const csvContent = [
      headers.join(","),
      ...rows.map((r) =>
        headers.map((h) => JSON.stringify(r[h] ?? "")).join(",")
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "books_export.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setExporting(false)
  }

  /** Export JSON **/
  const exportJSON = () => {
    setExporting(true)
    const rows = table.getFilteredRowModel().rows.map((row) => row.original)
    const blob = new Blob([JSON.stringify(rows, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "books_export.json")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setExporting(false)
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-4">

      {/* ✅ Search Only */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search ..."
          value={(table.getColumn("Maintext")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Maintext")?.setFilterValue(event.target.value)
          }
          className="h-9 w-[220px] lg:w-[300px]"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-9 px-2"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* ✅ Page Size + Export */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Show</span>

        <Select
          value={String(pageSize)}
          onValueChange={(value) => {
            const newSize =
              value === "all"
                ? table.getFilteredRowModel().rows.length
                : Number(value)
            setPageSize(newSize)
            table.setPageSize(newSize)
          }}
        >
          <SelectTrigger className="w-[90px]">
            <SelectValue placeholder={String(pageSize)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
            <SelectItem value="1000">1000</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground">entries</span>

        {/* Export */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" disabled={exporting}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={exportCSV}>
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={exportJSON}>
              Export as JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
