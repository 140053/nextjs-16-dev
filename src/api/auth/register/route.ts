import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()

    // 1️⃣ Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // 2️⃣ Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // 3️⃣ Hash password securely
    const hashed = await bcrypt.hash(password, 10)

    // 4️⃣ Create user
    const user = await prisma.user.create({
      data: { email, password: hashed, name, role: "USER", avatar: "/default-avatar.png" },
      select: { id: true, email: true, name: true, avatar: true, role: true },
    })

    return NextResponse.json({ message: "User registered", user })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
