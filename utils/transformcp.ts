// /lib/db/transformCopyright.ts

type YearStats = {
  printed: { T: number; V: number };
  ebooks: { T: number; V: number };
};

export function transformCopyright(rows: any[]) {
  const final: Record<string, any> = {};

  for (const row of rows) {
    const subjectCode = row.subjects.code;
    const description = row.subjects.name;

    const copyright = row.copyrights;
    const materialType = row.material_type;

    // ✅ Extract numeric year from "c2024", "(2022)", etc.
    const year = parseInt(copyright?.replace(/[^0-9]/g, "")) || 0;

    const isPrinted = materialType?.toLowerCase() === "text";
    const isEbook = materialType?.toLowerCase().includes("ebook");

    const copies = parseInt(row.copies ?? 0);

    // ✅ Create subject container if missing
    if (!final[subjectCode]) {
      final[subjectCode] = {
        subject: subjectCode,
        description,
        years: {},
        total: {
          printed: { T: 0, V: 0 },
          ebooks: { T: 0, V: 0 },
        },
      };
    }

    // ✅ Create year bucket if missing
    if (!final[subjectCode].years[year]) {
      final[subjectCode].years[year] = {
        printed: { T: 0, V: 0 },
        ebooks: { T: 0, V: 0 },
      };
    }

    // ✅ Apply totals and year counts
    if (isPrinted) {
      final[subjectCode].years[year].printed.T += 1;
      final[subjectCode].years[year].printed.V += copies;

      final[subjectCode].total.printed.T += 1;
      final[subjectCode].total.printed.V += copies;
    }

    if (isEbook) {
      final[subjectCode].years[year].ebooks.T += 1;

      // Usually ebooks have no V (copies)
      final[subjectCode].total.ebooks.T += 1;
    }
  }

  return Object.values(final);
}
