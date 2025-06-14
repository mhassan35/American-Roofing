"use client"

import type React from "react"
import ReduxProvider from "@/lib/providers/ReduxProvider"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReduxProvider>
      <div className="min-h-screen bg-gray-50">
        {children}
        <Toaster />
      </div>
    </ReduxProvider>
  )
}
