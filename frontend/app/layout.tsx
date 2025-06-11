import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import LeadForm from "@/components/lead-form"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Houston's Most Trusted Roofing Pros | American Roofing",
  description:
    "Professional roofing services in Houston. Get a free estimate for roof replacement, repair, and storm damage restoration. Licensed & insured.",
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
        <main>{children}</main>
        <Footer />
        <LeadForm />
        <Toaster />
      </body>
    </html>
  )
}
