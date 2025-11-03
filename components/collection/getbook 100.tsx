"use client"
import { useEffect, useState } from "react"

export default function GetBook() {
  const [books, setBooks] = useState(null);
  const [ddcCounts, setDdcCounts] = useState({});

  // ✅ Extract first numeric part from call number
  function extractClassNumber(callNumber: string) {
    const match = callNumber?.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[0]) : null;
  }

  // ✅ Generate DDC ranges (000–099, 100–199, ..., 900–999)
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

        // ✅ Initialize counters
        let counts: any = {};
        ddcRanges.forEach((r) => (counts[r.label] = 0));

        // ✅ Count all DDC classes
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
      .catch((error) => {
        console.error("Error fetching book data:", error);
      });
  }, []);

  return (
    <div>
      {!books ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2 className="font-bold text-lg mt-4">📚 DDC Classification Counts</h2>

          <div className="mt-3 space-y-1">
            {Object.entries(ddcCounts).map(([range, count]: any) => (
              <p key={range}>
                <strong>{range}:</strong> {count}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
