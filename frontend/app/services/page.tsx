"use client"
import { useContentStore } from "@/lib/store"
import Hero from "@/components/hero"
import Services from "@/components/services"
import CTASection from "@/components/cta-section"
import { useHydration } from "@/hooks/use-hydration"

export default function ServicesPage() {
  const isHydrated = useHydration()
  const { getPageContent } = useContentStore()

  // Don't render content until hydrated
  if (!isHydrated) {
    return (
      <div className="pt-20">
        <DefaultServicesContent />
      </div>
    )
  }

  const pageContent = getPageContent("services")

  if (!pageContent) {
    return (
      <div className="pt-20">
        <DefaultServicesContent />
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
          case "services":
            return <Services key={component.id} content={component.settings} />
          case "service-process":
            return <ProcessSection key={component.id} content={component.settings} />
          case "cta":
            return <CTASection key={component.id} content={component.settings} />
          default:
            return null
        }
      })}
    </div>
  )
}

function DefaultServicesContent() {
  return (
    <>
      <Hero />
      <Services />
      <CTASection />
    </>
  )
}

// Process Section Component
function ProcessSection({ content }: { content: any }) {
  const title = content?.title || "Our Process"
  const subtitle = content?.subtitle || "We follow a streamlined, customer-focused process"
  const steps = content?.steps || []

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">{title}</h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step: any, index: number) => (
            <div key={index} className="bg-white rounded-md shadow-sm p-5 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white rounded-full h-8 w-8 flex items-center justify-center">
                <span className="font-semibold">{step.number || index + 1}</span>
              </div>
              <h3 className="text-center text-base font-semibold mt-3 mb-2 text-gray-800">{step.title}</h3>
              <p className="text-center text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
