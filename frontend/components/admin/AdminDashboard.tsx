"use client"
import { useEffect } from "react"
import { useAuthStore, useUIStore } from "@/lib/store"
import LoginForm from "./LoginForm"
import DashboardLayout from "./DashboardLayout"

export default function AdminDashboard() {
  const { isAuthenticated } = useAuthStore()
  const { setIsMobile } = useUIStore()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [setIsMobile])

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <DashboardLayout />
}
