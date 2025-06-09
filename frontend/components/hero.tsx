"use client"

import { Button } from "@/components/ui/button"
import { useLeadFormStore } from "@/lib/store"

interface HeroProps {
  content?: {
    title?: string
    subtitle?: string
    ctaText?: string
    features?: string[]
    backgroundImage?: string
  }
}

export default function Hero({ content }: HeroProps) {
  const { openLeadForm } = useLeadFormStore()

  const title = content?.title || "Houston's Most Trusted Roofing Pros"
  const subtitle = content?.subtitle || "Request a fast, free quote in under 60 seconds."
  const ctaText = content?.ctaText || "Get Free Estimate"
  const features = content?.features || []
  const backgroundImage = content?.backgroundImage || "/placeholder.svg?height=600&width=1200"

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">{title}</h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">{subtitle}</p>

          {/* CTA Button - only show if ctaText exists */}
          {ctaText && (
            <div className="mb-12">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold"
                onClick={openLeadForm}
              >
                {ctaText}
              </Button>
            </div>
          )}

          {/* Trust Indicators - only show if features exist */}
          {features.length > 0 && (
            <div className="flex flex-wrap gap-6 text-sm">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-200">{feature}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
