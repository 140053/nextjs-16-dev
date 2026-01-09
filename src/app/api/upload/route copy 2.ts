import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const dynamic = "force-dynamic"; // Ensure this API route is dynamic

export async function POST(req: Request) {
  try {
    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const customName = formData.get("filename") as string | null; // Optional custom filename

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate filename
    const extension = file.name.split(".").pop();
    const filename = customName
      ? `${customName}.${extension}`
      : `${crypto.randomUUID()}.${extension}`;

    // Define upload path
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadDir, filename);

    // Save file
    await writeFile(filePath, buffer);

    return NextResponse.json({
      message: "Upload successful",
      filePath: `/uploads/${filename}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
