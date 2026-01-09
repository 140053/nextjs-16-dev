import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAllPending } from "@/lib/utils/idmaker";



export async function DELETE() {
     return NextResponse.json(
      {
        message: "Query Success",
        data: [],
      },
      { status: 200 }
    );
}

export async function PATCH() {
     return NextResponse.json(
      {
        message: "Query Success",
        data: [],
      },
      { status: 200 }
    );
}

export async function PUT() {
     return NextResponse.json(
      {
        message: "Query Success",
        data: [],
      },
      { status: 200 }
    );
}

export async function GET(req: Request) {
  try {
    /*
    const { searchParams } = new URL(req.url);
    const IDnum = searchParams.get("IDnum");

    if (!IDnum) {
      return NextResponse.json(
        { message: "ID number query parameter is required" },
        { status: 400 }
      );
    }
      */

   

    const patrons = await getAllPending();

    if (!patrons) {
      return NextResponse.json(
        { message: `No records found for Student Number:` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Patron(s) retrieved successfully",
        data: patrons,
      },
      { status: 200 }
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



