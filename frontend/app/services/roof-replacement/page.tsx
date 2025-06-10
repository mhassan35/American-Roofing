"use client"

import { useEffect, useState } from "react"
import { useContentStore } from "@/lib/store"
import Hero from "@/components/hero"
import ServiceContent from "@/components/service-content"
import ServiceBenefits from "@/components/service-benefits"
import ServiceProcess from "@/components/service-process"
import ServiceFAQs from "@/components/service-faqs"
import { Skeleton } from "@/components/ui/skeleton"

export default function RoofReplacementPage() {
  const [isClient, setIsClient] = useState(false)
  const { getPageContent } = useContentStore()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <PageSkeleton />
  }

  const pageContent = getPageContent("roof-replacement")

  if (!pageContent) {
    return <PageSkeleton />
  }

  const getComponentContent = (componentId: string) => {
    const component = pageContent.components.find((c) => c.id === componentId)
    return component?.isActive ? component.settings : null
  }

  return (
    <main className="pt-20">
      {getComponentContent("replacement-hero") && <Hero content={getComponentContent("replacement-hero")} />}

      {getComponentContent("replacement-content") && (
        <ServiceContent content={getComponentContent("replacement-content")} />
      )}

      {getComponentContent("replacement-benefits") && (
        <ServiceBenefits content={getComponentContent("replacement-benefits")} />
      )}

      {getComponentContent("replacement-process") && (
        <ServiceProcess content={getComponentContent("replacement-process")} />
      )}

      {getComponentContent("replacement-faqs") && <ServiceFAQs content={getComponentContent("replacement-faqs")} />}
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
