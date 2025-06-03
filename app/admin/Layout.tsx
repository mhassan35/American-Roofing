import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AdminButton from "@/components/admin-button"
import LeadFormHandler from "@/components/website/LeadFormHandler"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "American Roofing - Houston's Most Trusted Roofing Professionals",
  description:
    "Professional roofing services in Houston. Roof replacement, repair, storm damage restoration, and more.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <AdminButton />
        <LeadFormHandler />
        <Toaster />
      </body>
    </html>
  )
}
