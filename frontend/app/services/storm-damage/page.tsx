"use client"

import { useEffect, useState } from "react"
import { useContentStore } from "@/lib/store"
import ServiceContent from "@/components/service-content"
import ServiceBenefits from "@/components/service-benefits"
import ServiceProcess from "@/components/service-process"
import ServiceFAQs from "@/components/service-faqs"
import { AlertTriangle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

type PageHeaderContent = {
  title?: string
  subtitle?: string
}

type ServiceContentType = {
  title?: string
  description?: string
  content?: string
  image?: string
}

type ServiceBenefitsType = {
  title?: string
  benefits?: { title: string; description: string }[]
}

type ServiceProcessType = {
  title?: string
  subtitle?: string
  steps?: { number?: number; title: string; description: string }[]
}

type ServiceFAQsType = {
  title?: string
  faqs?: { question: string; answer: string }[]
}

export default function StormDamagePage() {
  const [isClient, setIsClient] = useState(false)
  const { getPageContent } = useContentStore()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <PageSkeleton />
  }

  const pageContent = getPageContent("storm-damage")

  if (!pageContent) {
    return <PageSkeleton />
  }

  const getComponentContent = (componentId: string) => {
    const component = pageContent.components.find((c) => c.id === componentId)
    return component?.isActive ? component.settings : null
  }

  // Get content with proper type casting - using the correct component ID
  const headerContent = getComponentContent("storm-hero") as PageHeaderContent | null
  const contentSection = getComponentContent("storm-content") as ServiceContentType | null
  const benefitsContent = getComponentContent("storm-benefits") as ServiceBenefitsType | null
  const processContent = getComponentContent("storm-process") as ServiceProcessType | null
  const faqsContent = getComponentContent("storm-faqs") as ServiceFAQsType | null

  return (
    <main className="pt-20">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-green-100 via-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {headerContent?.title || "Emergency Storm Damage Repair"}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
            {headerContent?.subtitle ||
              "24/7 emergency response for storm damage restoration and insurance claim assistance"}
          </p>
        </div>
      </section>

      {/* Emergency Alert */}
      <section className="py-8 bg-yellow-50 border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded-r-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Emergency Storm Damage?</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Call our 24/7 emergency line at (713) 555-1234 for immediate assistance with tarping and temporary
                    repairs.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
