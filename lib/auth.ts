"use server"

import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { prisma } from "./prisma"

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return null

  const bcrypt = await import("bcryptjs")
  const match = await bcrypt.compare(password, user.password)
  if (!match) return null

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" })
  ;(await cookies()).set("session", token, { httpOnly: true, path: "/", maxAge: 86400, secure: process.env.NODE_ENV === "production", sameSite: "lax" })

  return { id: user.id, email: user.email, name: user.name, avatar: user.avatar, role: user.role }
}




export async function getSession() {
  const token = (await cookies()).get("session")?.value
  if (!token) return null

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number }
    const user = await prisma.user.findUnique({ where: { id: payload.userId } })
    return user
  } catch {
    return null
  }
}

export async function logoutUser() {
  (await cookies()).delete("session")
}
