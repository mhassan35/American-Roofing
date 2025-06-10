"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import LoginForm from "@/components/admin/LoginForm"
import AdminDashboard from "@/components/admin/AdminDashboard"
import { Loader2 } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading, user } = useAuthStore()

  useEffect(() => {
    // Initialize auth check
    const checkAuth = () => {
      const authState = useAuthStore.getState()
      if (!authState.isAuthenticated && !authState.isLoading) {
        // Not authenticated and not loading, show login
        return
      }
    }

    checkAuth()
  }, [])

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm />
  }

  // Show admin dashboard if authenticated
  return <AdminDashboard />
}
