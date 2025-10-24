import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Fetch all library requests with related patron info
    const requests = await prisma.lib_request.findMany({
      include: {
        patron: {
          select: {
            id: true,
            name: true,
            address: true,
            Degree_Course: true,
            User_Class: true,
            Year_Level: true,
            IDnum: true,
            DateApplied: true,
            DateExpired: true,
            email: true,
            gender: true,
            campus: true,
            Bkloan: true,
            telephone: true,
            Overdue: true,
            remarks: true,
            suspended: true,
            tag: true,
            photo: true,
            esig: true,
            reg_date: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    })

    return NextResponse.json(requests)
  } catch (error) {
    console.error("❌ Error fetching library requests:", error)
    return NextResponse.json(
      { error: "Failed to fetch library requests" },
      { status: 500 }
    )
  }
}
