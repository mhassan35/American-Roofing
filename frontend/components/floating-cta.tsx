"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { useLeadFormStore } from "@/lib/store"

interface FloatingCTAProps {
  content?: {
    phone?: string
    ctaText?: string
    showAfterScroll?: number
  }
}

export default function FloatingCTA({ content }: FloatingCTAProps) {
  const { openLeadForm } = useLeadFormStore()
  const [isVisible, setIsVisible] = useState(false)

  const phone = content?.phone || "(713) 555-1234"
  const ctaText = content?.ctaText || "Get Free Quote"
  const showAfterScroll = content?.showAfterScroll || 500

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfterScroll)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showAfterScroll])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Phone Button */}
      <Button
        size="lg"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 p-0 shadow-lg"
        asChild
      >
        <a href={`tel:${phone}`}>
          <Phone className="w-6 h-6" />
        </a>
      </Button>

      {/* CTA Button */}
      <Button
        size="lg"
        className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg whitespace-nowrap"
        onClick={openLeadForm}
      >
        {ctaText}
      </Button>
    </div>
  )
}
