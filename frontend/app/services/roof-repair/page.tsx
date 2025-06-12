"use client"

import { useEffect, useState } from "react"
import { useContentStore } from "@/lib/store"
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

type PageHeaderContent = {
  title?: string
  subtitle?: string
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

  // Get content with proper type casting - using the correct component ID
  const headerContent = getComponentContent("repair-hero") as PageHeaderContent | null
  const contentSection = getComponentContent("repair-content")
  const benefitsContent = getComponentContent("repair-benefits") as BenefitsContent | null
  const processContent = getComponentContent("repair-process")
  const faqsContent = getComponentContent("repair-faqs")

  return (
    <main className="pt-20">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-green-100 via-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {headerContent?.title || "Professional Roof Repair Services"}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
            {headerContent?.subtitle || "Expert roof repair solutions to restore your home's protection and value"}
          </p>
        </div>
      </section>

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
      {/* Header Skeleton */}
      <section className="py-16 bg-gradient-to-br from-green-100 via-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
          <Skeleton className="h-8 w-full max-w-4xl mx-auto" />
        </div>
      </section>

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
