import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const data = await prisma.subjects.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        level: true,
        courses: {
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
      courses: item.courses
        ? {
            ...item.courses,
            id: Number(item.courses.id), // ✅ college.id → number
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
