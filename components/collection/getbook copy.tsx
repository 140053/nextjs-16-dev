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

  // ✅ Build DDC RANGES IN TENS (000–009, 010–019, ..., 990–999)
  const ddcRanges = [];
  for (let i = 0; i <= 999; i += 10) {
    const min = i;
    const max = i + 9.999; // include decimals
    const label = `${String(i).padStart(3, "0")} – ${String(i + 9).padStart(3, "0")}`;
    ddcRanges.push({ label, min, max });
  }

  useEffect(() => {
    fetch("/api/db/collection/books/list")
      .then((res) => res.json())
      .then((data) => {
        const list = data.data;
        setBooks(list);

        // ✅ Initialize counters
        let counts: any = {};
        ddcRanges.forEach((r) => (counts[r.label] = 0));

        // ✅ Count books per tens range
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
          <h2 className="font-bold text-lg mt-4">📚 DDC Classification (Tens Range)</h2>

          <div className="mt-3 space-y-1">
            {Object.entries(ddcCounts).map(([range, count]: any) =>
              count > 0 && (
                <p key={range}>
                  <strong>{range}</strong>: {count}
                </p>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
