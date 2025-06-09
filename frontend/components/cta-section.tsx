"use client"

import { Button } from "@/components/ui/button"
import { useLeadFormStore } from "@/lib/store"

interface CTASectionProps {
  content?: {
    title?: string
    subtitle?: string
    primaryCta?: string
    secondaryCta?: string
  }
}

export default function CTASection({ content }: CTASectionProps) {
  const { openLeadForm } = useLeadFormStore()

  const title = content?.title || "Ready to Get Started?"
  const subtitle = content?.subtitle || "Contact us today for your free estimate"
  const primaryCta = content?.primaryCta || "Get Free Estimate"
  const secondaryCta = content?.secondaryCta || "Call (713) 555-1234"

  return (
    <section className="py-16 bg-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">{subtitle}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            onClick={openLeadForm}
          >
            {primaryCta}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-orange-500 px-8 py-3 text-lg font-semibold"
          >
            {secondaryCta}
          </Button>
        </div>
      </div>
    </section>
  )
}
