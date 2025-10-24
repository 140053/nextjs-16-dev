"use client"

import { useEffect, useState } from "react"
import { columns, Patron } from "@/components/custom/columns"
import { DataTable } from "@/components/custom/data-table"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PatronMaster() {
  const [data, setData] = useState<Patron[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/db/patron/lists/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store", // ensures fresh data
        })

        if (!res.ok) {
          throw new Error(`Failed to fetch patrons: ${res.status}`)
        }

        const json = await res.json()
        setData(json.patrons || [])
      } catch (err: any) {
        console.error("Error fetching patrons:", err)
        setError(err.message || "Failed to fetch data.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="animate-spin mr-2 h-5 w-5 text-muted-foreground" />
        <span className="text-muted-foreground">Loading patrons...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertTitle>Failed to load patrons</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Patron List</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
