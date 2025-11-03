import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const data = await prisma.courses.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        colleges: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    // Convert BigInt → Number
    const serialized = data.map((item) => ({
      ...item,
      id: Number(item.id), // ✅ course.id → number
      colleges: item.colleges
        ? {
            ...item.colleges,
            id: Number(item.colleges.id), // ✅ college.id → number
          }
        : null,
    }));

    return NextResponse.json(
      {
        message: "Data retrive Successfully",
        data: serialized,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching patrons:", error);
    return NextResponse.json(
      { message: "An error occurred while retrieving data" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
