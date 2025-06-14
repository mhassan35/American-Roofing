import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "American Roofing | Houston's Most Trusted Roofing Pros",
  description:
    "American Roofing provides premium roofing services in Houston including roof replacement, repair, and storm damage restoration. Get a free quote in 60 seconds.",
  keywords: "roofing, Houston roofing, roof repair Houston, roof replacement, storm damage, roofing contractor",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://americanroofinghouston.com",
    title: "American Roofing | Houston's Most Trusted Roofing Pros",
    description: "Premium roofing services in Houston. Get a free quote in 60 seconds.",
    siteName: "American Roofing",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "American Roofing - Houston's Most Trusted Roofing Pros",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className="bg-brand-beige font-sans">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
