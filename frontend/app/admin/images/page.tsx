"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/lib/redux/hooks"
import { initializeContent } from "@/lib/redux/slices/contentSlice"
import { Toaster } from "@/components/ui/toaster"
import ImageManagement from "@/components/admin/ImageManagement"

export default function ImagesPage() {
  const dispatch = useAppDispatch()

  // Initialize content store if needed
  useEffect(() => {
    dispatch(initializeContent())
  }, [dispatch])

  return (
    <div className="container mx-auto py-6">
      <ImageManagement />
      <Toaster />
    </div>
  )
}
