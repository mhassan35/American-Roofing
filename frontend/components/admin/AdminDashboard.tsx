"use client"
import { useEffect, useState } from "react"
import { useAuthStore, useUIStore } from "@/lib/store"
import LoginForm from "./LoginForm"
import DashboardLayout from "./DashboardLayout"

export default function AdminDashboard() {
  const { isAuthenticated } = useAuthStore()
  const { setIsMobile } = useUIStore()
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [setIsMobile])

  useEffect(() => {
    // Wait for the auth store to hydrate from localStorage
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setHasHydrated(true)
    })

    // If already hydrated, set immediately
    if (useAuthStore.persist.hasHydrated()) {
      setHasHydrated(true)
    }

    return unsubscribe
  }, [])

  // Show loading until the store has hydrated
  if (!hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-green-50">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <DashboardLayout />
}
