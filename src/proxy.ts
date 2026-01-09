import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"

export function proxy(req: NextRequest) {
  const token = req.cookies.get("session")?.value
  const { pathname } = req.nextUrl

  // If no token → redirect to login for protected routes
  if (!token) {
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/staff")) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    return NextResponse.next()
  }

  try {
    // Verify JWT and decode user data
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string }

    const role = decoded.role

    // 🔐 Role-based access logic
    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    if (pathname.startsWith("/staff") && !["STAFF", "ADMIN"].includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    // /dashboard is allowed for any logged-in user
    return NextResponse.next()
  } catch (err) {
    console.error("Invalid token:", err)
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/staff/:path*"],
}
