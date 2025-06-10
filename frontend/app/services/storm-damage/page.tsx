"use client"

import { useEffect, useState } from "react"
import { useContentStore } from "@/lib/store"
import Hero from "@/components/hero"
import ServiceContent from "@/components/service-content"
import ServiceBenefits from "@/components/service-benefits"
import ServiceProcess from "@/components/service-process"
import ServiceFAQs from "@/components/service-faqs"
import { AlertTriangle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

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

  return (
    <main className="pt-20">
      {getComponentContent("storm-hero") && <Hero content={getComponentContent("storm-hero")} />}

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

      {getComponentContent("storm-content") && <ServiceContent content={getComponentContent("storm-content")} />}

      {getComponentContent("storm-benefits") && <ServiceBenefits content={getComponentContent("storm-benefits")} />}

      {getComponentContent("storm-process") && <ServiceProcess content={getComponentContent("storm-process")} />}

      {getComponentContent("storm-faqs") && <ServiceFAQs content={getComponentContent("storm-faqs")} />}
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
