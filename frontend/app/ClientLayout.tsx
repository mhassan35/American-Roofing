"use client"

import { usePathname } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import CookieConsent from "@/components/cookie-consent"
// import AdminButton from "@/components/admin-button"
// import LeadFormHandler from "@/components/website/LeadFormHandler"
import Providers from "./providers"


export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith("/admin")

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <Providers>
        {!isAdminRoute && <Header />}
        <main className="min-h-screen">{children}</main>
      
        {/* <AdminButton />
        <LeadFormHandler /> */}
        {!isAdminRoute && <Footer />}
        <Toaster />
        <CookieConsent />
      </Providers>
    </ThemeProvider>
  )
}
