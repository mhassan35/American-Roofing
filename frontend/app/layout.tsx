import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "American Roofing | Houston's Most Trusted Roofing Professionals",
  description:
    "Professional roofing services in Houston. Get a free estimate for roof replacement, repair, and storm damage restoration. Licensed & insured.",
  keywords: "roofing houston, roof repair, roof replacement, storm damage, american roofing",
  openGraph: {
    title: "American Roofing | Houston's Most Trusted Roofing Professionals",
    description:
      "Professional roofing services in Houston. Get a free estimate for roof replacement, repair, and storm damage restoration.",
    images: ["/placeholder.svg?height=630&width=1200"],
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}