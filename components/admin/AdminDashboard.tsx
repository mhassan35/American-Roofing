"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux"
import { setIsMobile } from "@/lib/store/slices/uiSlice"
import LoginForm from "./LoginForm"
import DashboardLayout from "./DashboardLayout"

export default function AdminDashboard() {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth < 768))
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [dispatch])

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <DashboardLayout />
}
