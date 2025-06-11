"use client"

import { useEffect, useState } from "react"
import { useContentStore } from "@/lib/store"
import Hero from "@/components/hero"
import Services from "@/components/services"
import WhyChooseUs from "@/components/why-choose-us"
import Testimonials from "@/components/testimonials"
import TrustSection from "@/components/trust-section"
import Gallery from "@/components/gallery"

import { Skeleton } from "@/components/ui/skeleton"
import CTASection from "@/components/cta-section"

export default function HomePage() {
  const [isClient, setIsClient] = useState(false)
  const { getPageContent } = useContentStore()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <PageSkeleton />
  }

  const pageContent = getPageContent("home")

  if (!pageContent) {
    return <PageSkeleton />
  }

  const getComponentContent = (componentId: string) => {
    const component = pageContent.components.find((c) => c.id === componentId)
    return component?.isActive ? component.settings : null
  }

  // Ensure that content is not null before passing it to the Hero component
  const heroContent = getComponentContent("home-hero")
  if (!heroContent) {
    return <PageSkeleton /> // Optionally return a skeleton or an error message if content is missing
  }

  return (
    <main>
      <Hero content={heroContent} />
      
      {/* Your other components */}
      {getComponentContent("home-services") && <Services content={getComponentContent("home-services")} />}
      {getComponentContent("home-why-choose") && <WhyChooseUs content={getComponentContent("home-why-choose")} />}
      {getComponentContent("home-testimonials") && <Testimonials content={getComponentContent("home-testimonials")} />}
      {getComponentContent("home-trust-section") && <TrustSection content={getComponentContent("home-trust-section")} />}
      {getComponentContent("home-gallery") && <Gallery content={getComponentContent("home-gallery")} />}
      <CTASection />

    </main>
  )
}

function PageSkeleton() {
  return (
    <main>
      {/* Hero Skeleton */}
      <div className="relative w-full bg-gradient-to-br from-green-100 via-green-50 to-blue-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Skeleton className="h-16 w-full max-w-2xl" />
              <Skeleton className="h-8 w-full max-w-xl" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>
            <Skeleton className="h-96 w-full max-w-md justify-self-end" />
          </div>
        </div>
      </div>

      {/* Trust Badges Skeleton */}
      <div className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-center space-x-3 p-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Skeleton */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border rounded-lg p-8">
                <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
