import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { search } = Object.fromEntries(new URL(req.url).searchParams);

    const where = {
      // ✅ Always filter by branch LIKE 'Pili%'
      branch: {
        startsWith: "Pili", // equivalent to WHERE branch LIKE 'Pili%'
      },
      tm:{
        contains: "book"
      },

      // ✅ Optional search
      ...(search
        ? {
            OR: [
              { Title: { contains: search } },
              { Maintext: { contains: search } },
            ],
          }
        : {}),
    };

    const data = await prisma.books.findMany({
      where,
      orderBy: { Title: "asc" },
      select:{
        bkID: true,
        Title: true,
        Maintext:true,
        coding:true,
        filsts:true,
        updated_by:true
      }
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
  } catch (error: unknown) {

    const message =
    error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { message: "Server Error", error: message },
      { status: 500 }
    );
  }
}
