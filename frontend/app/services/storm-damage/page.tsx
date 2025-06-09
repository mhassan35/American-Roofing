"use client"

import { useContentStore } from "@/lib/store"
import Hero from "@/components/hero"
import Image from "next/image"
import { AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

export default function StormDamagePage() {
  const { getPageContent } = useContentStore()
  const [pageContent, setPageContent] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Handle client-side hydration
    const content = getPageContent("storm-damage")
    setPageContent(content)
    setIsLoaded(true)
  }, [getPageContent])

  // Show loading state during hydration
  if (!isLoaded) {
    return <div className="pt-20 min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!pageContent) {
    // Fallback content if no page content is found
    return (
      <div className="pt-20">
        <DefaultStormDamageContent />
      </div>
    )
  }

  const activeComponents = pageContent.components.filter((component: any) => component.isActive)

  return (
    <div className="pt-20">
      {activeComponents.map((component: any) => {
        switch (component.type) {
          case "hero":
            return <Hero key={component.id} content={component.settings} />
          case "service-layout":
            return <ServiceContent key={component.id} content={component.settings} />
          case "service-benefits":
            return <ServiceBenefits key={component.id} content={component.settings} />
          case "service-process":
            return <ServiceProcess key={component.id} content={component.settings} />
          case "service-faqs":
            return <ServiceFAQs key={component.id} content={component.settings} />
          default:
            return null
        }
      })}
    </div>
  )
}

function DefaultStormDamageContent() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Emergency Alert */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md mb-6">
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

          <div className="aspect-video relative rounded-md overflow-hidden mb-6">
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="Storm Damage Restoration"
              width={800}
              height={400}
              className="object-cover"
            />
          </div>

          <h2 className="text-xl font-semibold text-gray-800">Storm Damage Restoration Services</h2>
          <p className="text-sm text-gray-600">
            Comprehensive storm damage assessment, repair, and restoration services for your property.
          </p>
        </div>
      </div>
    </section>
  )
}

function ServiceContent({ content }: { content: any }) {
  const title = content?.title || "Storm Damage Restoration Services"
  const description = content?.description || ""
  const serviceContent = content?.content || ""

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Emergency Alert */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md mb-6">
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

          <div className="aspect-video relative rounded-md overflow-hidden mb-6">
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="Storm Damage Restoration"
              width={800}
              height={400}
              className="object-cover"
            />
          </div>

          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
          {serviceContent && <p className="text-sm text-gray-600">{serviceContent}</p>}
        </div>
      </div>
    </section>
  )
}

function ServiceBenefits({ content }: { content: any }) {
  const title = content?.title || "Benefits of Our Service"
  const benefits = content?.benefits || []

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit: any, index: number) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceProcess({ content }: { content: any }) {
  const title = content?.title || "Our Process"
  const steps = content?.steps || []

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>
        <div className="space-y-4">
          {steps.map((step: any, index: number) => (
            <div key={index} className="flex items-start">
              <div className="bg-orange-500 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <span className="text-xs font-medium">{step.number || index + 1}</span>
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-800">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceFAQs({ content }: { content: any }) {
  const title = content?.title || "Frequently Asked Questions"
  const faqs = content?.faqs || []

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>
        <div className="space-y-6">
          {faqs.map((faq: any, index: number) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-base font-semibold text-gray-800 mb-3">{faq.question}</h4>
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
