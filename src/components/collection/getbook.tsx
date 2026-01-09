"use client";

import { useEffect, useState } from "react";
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
  Cell,
  Legend,
} from "recharts";

export default function GetBook() {
  const [books, setBooks] = useState(null);
  const [ddcCounts, setDdcCounts] = useState({});

  function extractClassNumber(callNumber: string) {
    const match = callNumber?.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[0]) : null;
  }

  const ddcRanges = [
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
  ];

  useEffect(() => {
    fetch("/api/db/collection/books/list")
      .then((res) => res.json())
      .then((data) => {
        const list = data.data;
        setBooks(list);

        let counts: any = {};
        ddcRanges.forEach((r) => (counts[r.label] = 0));

        list.forEach((b: any) => {
          const cn = b.bib.callNumber;
          const num = extractClassNumber(cn);

          if (num !== null) {
            ddcRanges.forEach((r) => {
              if (num >= r.min && num <= r.max) {
                counts[r.label]++;
              }
            });
          }
        });

        setDdcCounts(counts);
      })
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  // ✅ Convert counts into array form
  const chartData = Object.entries(ddcCounts).map(([label, count]) => ({
    label,
    count,
  }));

  // ✅ Colors for Pie Chart slices
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

  return (
    <div className="w-full mt-6 space-y-10">
      {!books ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* ✅ Line Chart */}
          <div>
            <h2 className="font-bold text-lg mb-4">
              📊 DDC Classification – Line Chart
            </h2>
            <div className="w-full h-80 p-4 border rounded-lg shadow">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="label"
                    angle={-30}
                    interval={0}
                    textAnchor="end"
                  />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ✅ Pie Chart */}
          {/* ✅ Pie Chart */}
          <div>
            <h2 className="font-bold text-lg mb-4">
              🥧 DDC Distribution – Pie Chart
            </h2>
            <div className="w-full h-96 p-4 border rounded-lg shadow flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    label
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {chartData.map((_, index) => (
                      <Cell
                        key={`slice-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />

                  {/* ✅ Legend shows the range label NOW */}
                  <Legend
                    formatter={(value, entry, index) => chartData[index]?.label}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
