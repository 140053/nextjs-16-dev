import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"


export async function GET() {

    const patrons = await prisma.patron_master.findMany()

  return NextResponse.json({ patrons })
}
