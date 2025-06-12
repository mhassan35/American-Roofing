"use client"

import { useEffect, useState } from "react"
import { useContentStore } from "@/lib/store"
import Hero from "@/components/hero"
import ServiceContent from "@/components/service-content"
import ServiceBenefits from "@/components/service-benefits"
import ServiceProcess from "@/components/service-process"
import ServiceFAQs from "@/components/service-faqs"
import { Skeleton } from "@/components/ui/skeleton"

// Define types to match your component props
type BenefitsContent = {
  title?: string
  benefits?: { title: string; description: string }[]
}

export default function RoofRepairPage() {
  const [isClient, setIsClient] = useState(false)
  const { getPageContent } = useContentStore()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <PageSkeleton />
  }

  const pageContent = getPageContent("roof-repair")

  if (!pageContent) {
    return <PageSkeleton />
  }

  const getComponentContent = (componentId: string) => {
    const component = pageContent.components.find((c) => c.id === componentId)
    return component?.isActive ? component.settings : null
  }

  // Get content with proper type casting
  const heroContent = getComponentContent("repair-hero")
  const contentSection = getComponentContent("repair-content")
  const benefitsContent = getComponentContent("repair-benefits") as BenefitsContent | null
  const processContent = getComponentContent("repair-process")
  const faqsContent = getComponentContent("repair-faqs")

  return (
    <main className="pt-20">
      {heroContent && <Hero content={heroContent} />}

      {contentSection && <ServiceContent content={contentSection} />}

      {benefitsContent && <ServiceBenefits content={benefitsContent} />}

      {processContent && <ServiceProcess content={processContent} />}

      {faqsContent && <ServiceFAQs content={faqsContent} />}
    </main>
  )
}

function PageSkeleton() {
  return (
    <main className="pt-20">
      {/* Hero Skeleton */}
      <div className="relative w-full bg-gradient-to-br from-green-100 via-green-50 to-blue-50">
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

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Skeleton className="h-8 w-3/4 mb-6" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-6" />

        <div className="aspect-video relative rounded-md overflow-hidden mb-6">
          <Skeleton className="h-full w-full" />
        </div>

        <Skeleton className="h-6 w-1/2 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </main>
  )
}
