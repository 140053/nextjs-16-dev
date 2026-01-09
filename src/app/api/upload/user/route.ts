/*
New Features Added
✅ Custom upload path (e.g., upload to /public/uploads or /public/avatars)
✅ Customizable filename label (e.g., "Set your custom filename")
✅ User-defined filenames (e.g., "profile-picture.jpg")
✅ Auto-creates directories if they don’t exist

*/



import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const dynamic = "force-dynamic"; // Ensure this API route is dynamic

export async function POST(req: Request) {
  try {
    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const customName = formData.get("filename") as string | null; // Optional filename
    const uploadDir = formData.get("uploadPath") as string | null || "public/upload/user"; // Optional custom upload path

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

    // Define upload directory path
    const fullUploadDir = path.join(process.cwd(), uploadDir);
    await mkdir(fullUploadDir, { recursive: true }); // Ensure directory exists

    // Define file path
    const filePath = path.join(fullUploadDir, filename);

    // Save file
    await writeFile(filePath, buffer);

    return NextResponse.json({
      message: "Upload successful",
      filePath: `/${uploadDir}/${filename}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
