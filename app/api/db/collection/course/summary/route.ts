// app/api/copyright/route.ts
import { NextResponse } from "next/server";
import { getCopyrightRaw } from "@/components/part/no-api/collection-master";
import { transformCopyright } from "@/utils/transformcp";
import { prisma } from "@/lib/prisma";


function serializeBigInt(obj: any): any {
  return JSON.parse(
    JSON.stringify(obj, (_, v) => (typeof v === "bigint" ? v.toString() : v))
  );
}


export async function GET(req: Request) {
  //const courseId = 1; // You can make this dynamic later
  const { courseId } = Object.fromEntries(new URL(req.url).searchParams);

  const courseIdNum = Number(courseId) || 0;

  //const rows = await getCopyrightRaw(courseId);
  //const data = transformCopyright(rows);
  const data  = await prisma.collection_by_subjects.findMany({
  where: {
    subjects: {
      course_id: courseIdNum,
    },
    copyrights:{
      gte: "2023",
      lte: "2024",
    }
  },
  include: {
    subjects: true, // ✅ THIS is needed by your transformCopyright
  },
  
});

  const result = serializeBigInt(data);
  const procees = transformCopyright(result)
  return NextResponse.json({ data: procees });
}
