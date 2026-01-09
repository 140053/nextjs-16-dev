import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const IDnum = searchParams.get("IDnum");

    if (!IDnum) {
      return NextResponse.json(
        { message: "ID number query parameter is required" },
        { status: 400 }
      );
    }

    const patrons = await prisma.patron_master.findMany({
      where: { IDnum },
    });

    if (!patrons.length) {
      return NextResponse.json(
        { message: `No records found for Student Number: ${IDnum}` },
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



export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      address,
      Degree_Course,
      User_Class,
      Year_Level,
      IDnum,
      email,
      gender,
      campus,
      telephone,
      photo,
      esig,
    } = body

    console.log("Updating patron:", body)

    // ✅ 1. Validate required field
    if (!IDnum) {
      return NextResponse.json(
        { message: "ID number is required for updating" },
        { status: 400 }
      )
    }

    // ✅ 2. Check if patron exists
    const existingPatron = await prisma.patron_master.findUnique({
      where: { IDnum },
    })

    if (!existingPatron) {
      return NextResponse.json(
        { message: "Patron not found" },
        { status: 404 }
      )
    }

    // ✅ 3. Update patron record
    const updatedPatron = await prisma.patron_master.update({
      where: { IDnum },
      data: {
        name,
        address,
        Degree_Course,
        User_Class,
        Year_Level,
        email,
        gender,
        campus,
        telephone,
        photo,
        esig,
      },
    })

    // ✅ 4. Insert new record in lib_request (linked to updated patron)
    await prisma.lib_request.create({
      data: {
        patron_id: updatedPatron.IDnum,
        photo: photo || null,
        esig: esig || null,
      },
    })

    // ✅ 5. Return success response
    return NextResponse.json(
      {
        message: "Patron updated successfully and request logged",
        data: updatedPatron,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating patron:", error)
    return NextResponse.json(
      { message: "An error occurred while updating the patron" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

