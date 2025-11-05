import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

// ✅ Fix BigInt serialization for JSON
BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      subject_id,
      bkid,
      title,
      author,
      contributor,
      publisher,
      copyrights,
      isbn,
      call_number,
      accession_number,
      edition,
      place_of_publication,
      material_type,
      code,
      is_fil,
    } = body;

    // ✅ Minimal validation
    if (!subject_id || !bkid || !title) {
      return NextResponse.json(
        {
          message: "Missing required fields: subject_id, bkid, or title",
        },
        { status: 400 }
      );
    }

    // ✅ Insert into DB
    const created = await prisma.collection_by_subjects.create({
      data: {
        subject_id: BigInt(subject_id),
        bkid,
        title,
        author,
        contributor,
        publisher,
        copyrights,
        isbn,
        call_number,
        accession_number,
        edition,
        place_of_publication,
        material_type,
        code,
        is_fil: is_fil ?? false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Inserted successfully",
        data: created,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Insert Error:", error);

    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
  
    return NextResponse.json(
      {
        message: "Error inserting data",
        error: message,
      },
      { status: 500 }
    );
  }
}
