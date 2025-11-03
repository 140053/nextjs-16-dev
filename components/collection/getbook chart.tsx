"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export default function DDCChart() {
  const [books, setBooks] = useState(null)
  const [chartData, setChartData] = useState([])

  // ✅ Extract first numeric DDC number
  function extractClassNumber(callNumber: string) {
    const match = callNumber?.match(/(\d+(\.\d+)?)/)
    return match ? parseFloat(match[0]) : null
  }

  // ✅ Build Tens Ranges (000–009, 010–019, ..., 990–999)
  const ddcRanges = []
  for (let i = 0; i <= 999; i += 10) {
    const min = i
    const max = i + 9.999
    const label = `${String(i).padStart(3, "0")}–${String(i + 9).padStart(3, "0")}`
    ddcRanges.push({ label, min, max })
  }

  useEffect(() => {
    fetch("/api/db/collection/books/list")
      .then((res) => res.json())
      .then((data) => {
        const list = data.data
        setBooks(list)

        // ✅ Initialize counters
        let counts: any = {}
        ddcRanges.forEach((r) => (counts[r.label] = 0))

        // ✅ Count matching ranges
        list.forEach((b: any) => {
          const cn = b.bib.callNumber
          const num = extractClassNumber(cn)

          if (num !== null) {
            ddcRanges.forEach((r) => {
              if (num >= r.min && num <= r.max) counts[r.label]++
            })
          }
        })

        // ✅ Format for Recharts (only non-zero)
        const formatted = Object.entries(counts)
          .filter(([_, count]) => count > 0)
          .map(([range, count]) => ({
            range,
            count
          }))

        setChartData(formatted)
      })
      .catch((error) => console.error("Error:", error))
  }, [])

  return (
    <Card className="w-full p-4">
      <CardHeader>
        <CardTitle>📚 DDC Classification (Tens Range)</CardTitle>
      </CardHeader>

      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="range" angle={-45} textAnchor="end" interval={0} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
