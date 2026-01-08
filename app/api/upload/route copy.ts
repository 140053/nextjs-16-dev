import { NextResponse } from "next/server";

import { writeFile } from "fs/promises";
import path from "path";

// Disable Next.js's built-in bodyParser
export const dynamic = "force-dynamic"; // Ensure this route is always dynamic

export async function POST(req: Request) {
  try {
    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define upload path
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadDir, file.name);

    // Save file
    await writeFile(filePath, buffer);

    return NextResponse.json({
      message: "Upload successful",
      filePath: `/uploads/${file.name}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
