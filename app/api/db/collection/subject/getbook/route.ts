import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { subject_id } = Object.fromEntries(new URL(req.url).searchParams);

    // ✅ Convert to number (Prisma requires correct type)
    const parsedId = subject_id ? Number(subject_id) : undefined;

    const where = parsedId
      ? { subject_id: parsedId }        // ✅ correct type
      : {};

    const data = await prisma.collection_by_subjects.findMany({
      where,
      orderBy: { title: "asc" },
      select: {
        id: true,
        bkid: true,
        title: true,
        author: true,
        contributor: true,
        publisher: true,
        copyrights: true,
        isbn: true,
        call_number: true,
        accession_number: true,
        edition: true,
        place_of_publication: true,
        material_type: true,
        code: true,
        is_fil: true,
      },
      
    });

    const serialized = JSON.parse(
      JSON.stringify(data, (_, v) => (typeof v === "bigint" ? v.toString() : v))
    );

    return NextResponse.json(
      {
        message: "Success",
        count: serialized.length,
        data: serialized,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}
