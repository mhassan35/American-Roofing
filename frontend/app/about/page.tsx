"use client"

import { useEffect, useState } from "react"
import { useContentStore } from "@/lib/store"
import AboutContent from "@/components/about-content"
import { Skeleton } from "@/components/ui/skeleton"

export default function AboutPage() {
  const [isClient, setIsClient] = useState(false)
  const { getPageContent } = useContentStore()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <PageSkeleton />
  }

  const pageContent = getPageContent("about")

  if (!pageContent) {
    return <PageSkeleton />
  }

  const getComponentContent = (componentId: string) => {
    const component = pageContent.components.find((c) => c.id === componentId)
    return component?.isActive ? component.settings : null
  }

  return (
    <main className="pt-20">
      {getComponentContent("about-content") && <AboutContent content={getComponentContent("about-content")} />}
    </main>
  )
}

function PageSkeleton() {
  return (
    <main className="pt-20">
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
    </main>
  )
}
