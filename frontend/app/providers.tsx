"use client"

import { type ReactNode, useEffect, useState } from "react"
import LeadForm from "@/components/lead-form"

export default function Providers({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      {children}
      {isMounted && <LeadForm />}
    </>
  )
}
