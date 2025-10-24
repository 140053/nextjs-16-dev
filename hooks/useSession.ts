"use client"

import { useEffect, useState } from "react"

interface User {
  id: number
  email: string
  name?: string
  avatar: string
}

export function useSession() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session")
        const data = await res.json()
        setUser(data.user)
      } catch (err) {
        console.error("Failed to load session", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [])

  return { user, loading }
}
