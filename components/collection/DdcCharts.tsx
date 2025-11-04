"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
  Legend,
} from "recharts";

type Range = { label: string; min: number; max: number };

export default function DdcCharts({
  ranges,
  title,
  line = true,
  pie = true,
  bar = true,
}: {
  ranges?: Range[];
  title?: string;
  line?: boolean;
  pie?: boolean;
  bar?: boolean;
}) {
  // ✅ Stable ranges
  const finalRanges = useMemo(
    () =>
      ranges ?? [
        { label: "000 – 099", min: 0, max: 99.999 },
        { label: "100 – 199", min: 100, max: 199.999 },
        { label: "200 – 299", min: 200, max: 299.999 },
        { label: "300 – 399", min: 300, max: 399.999 },
        { label: "400 – 499", min: 400, max: 499.999 },
        { label: "500 – 599", min: 500, max: 599.999 },
        { label: "600 – 699", min: 600, max: 699.999 },
        { label: "700 – 799", min: 700, max: 799.999 },
        { label: "800 – 899", min: 800, max: 899.999 },
        { label: "900 – 999", min: 900, max: 999.999 },
      ],
    [ranges?.length]
  );

  const [books, setBooks] = useState<any[] | null>(null);
  const [ddcCounts, setDdcCounts] = useState<Record<string, number>>({});

  // ✅ Extract numeric part from call number
  function extractClassNumber(callNumber: string | undefined | null) {
    if (!callNumber) return null;
    const match = callNumber.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[0]) : null;
  }

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch("/api/db/collection/books/list");
        const json = await res.json();
        const list = json?.data ?? [];
        setBooks(list);

        // Initialize counts
        const counts: Record<string, number> = {};
        finalRanges.forEach((r) => (counts[r.label] = 0));

        // ✅ Process each book once
        list.forEach((b: any) => {
          const num = extractClassNumber(b?.bib?.callNumber);
          if (num === null) return;

          // Find the first matching range
          const matched = finalRanges.find((r) => num >= r.min && num <= r.max);
          if (matched) {
            counts[matched.label]++;
          }
        });

        setDdcCounts(counts);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    }

    fetchBooks();
  }, [finalRanges]);

  // ✅ Convert counts to chart data
  const chartData = useMemo(
    () =>
      Object.entries(ddcCounts).map(([name, value]) => ({
        name,
        value,
      })),
    [ddcCounts]
  );

  // ✅ Robust total calculation: sum of all counts
  const totalBooks = useMemo(
    () => Object.values(ddcCounts).reduce((sum, val) => sum + val, 0),
    [ddcCounts]
  );

  const COLORS = [
    "#2563eb",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#6b7280",
    "#0ea5e9",
    "#84cc16",
  ];

  if (books === null) return <p>Loading...</p>;

  return (
    <div className="w-full mt-6 space-y-10">
      {/* LINE CHART */}
      {line && (
        <div>
          <h2 className="font-bold text-lg mb-4">
            {title ?? ""}{" "}
            <span className="text-sm font-normal hidden">({totalBooks} total)</span>
          </h2>
          <div className="w-full h-80 p-4 border rounded-lg shadow">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-30}
                  interval={0}
                  textAnchor="end"
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* PIE CHART */}
      {pie && (
        <div>
          <h2 className="font-bold text-lg mb-4">
            {title ?? ""}{" "}
            <span className="text-sm font-normal hidden">({totalBooks} total)</span>
          </h2>
          <div className="w-full h-96 p-4 border rounded-lg shadow flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                  isAnimationActive={false}
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* BAR CHART */}
      {bar && (
        <div>
          <h2 className="font-bold text-lg mb-4">
            {title ?? ""}{" "}
            <span className="text-sm font-normal ">({totalBooks} total titles)</span>
          </h2>
          <div className="w-full h-80 p-4 border rounded-lg shadow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-30}
                  interval={0}
                  textAnchor="end"
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value">
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
