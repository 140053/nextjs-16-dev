import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseMaintext } from "@/lib/utils/maintext";

interface BookItem {
  bkID: string;
  tm: string;
  sm: string;
  branch: string;
  Maintext?: string;
}

export async function GET(_req: Request) {
  try {
    const data = await prisma.books.findMany({
      //take: 2,
      select: {
        bkID: true,
        Maintext: true,   // ✅ we keep selecting it (needed for parsing)
        tm: true,
        sm: true,
        branch: true
      },
      where: {
        tm: { contains: "book" },
        branch: { contains: "PILI Library" },
        entered_by: { not: "rizal" }
      }
    });

    // ✅ BigInt serialization fix
    const serialized = JSON.parse(
      JSON.stringify(data, (_, v) => (typeof v === "bigint" ? v.toString() : v))
    );

    // ✅ Add parsed data AND remove Maintext from output
    const processed = serialized.map((item: BookItem) => {
      const bib = parseMaintext(item.Maintext || "");

      return {
        bkID: item.bkID,
        tm: item.tm,
        sm: item.sm,
        branch: item.branch,

        // ✅ add parsed bibliographic info
        bib,

        // ❌ DO NOT return Maintext
      };
    });

    return NextResponse.json(
      {
        message: "Success",
        count: processed.length,
        data: processed
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Error", error: String(error) },
      { status: 500 }
    );
  }
}
