"use client"

import { CheckCircle } from "lucide-react"
import Image from "next/image"
import { useContentStore } from "@/lib/store"
import { useLeadFormStore } from "@/lib/store"
import Hero from "@/components/hero"
import Services from "@/components/services"
import WhyChooseUs from "@/components/why-choose-us"
import CTASection from "@/components/cta-section"
import { useHydration } from "@/hooks/use-hydration"

export default function AboutPage() {
  const isHydrated = useHydration()
  const { getPageContent } = useContentStore()
  const { openLeadForm } = useLeadFormStore()

  // Don't render content until hydrated
  if (!isHydrated) {
    return (
      <div className="pt-20">
        <DefaultAboutContent />
      </div>
    )
  }

  const pageContent = getPageContent("about")

  if (!pageContent) {
    return (
      <div className="pt-20">
        <DefaultAboutContent />
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
          case "about-content":
            return <AboutStorySection key={component.id} content={component.settings} />
          case "why-choose":
            return <WhyChooseUs key={component.id} content={component.settings} />
          case "services":
            return <Services key={component.id} content={component.settings} />
          case "cta":
            return <CTASection key={component.id} content={component.settings} />
          default:
            return null
        }
      })}
    </div>
  )
}

function DefaultAboutContent() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">About American Roofing</h1>
            <p className="text-lg text-gray-600 mb-6">
              Houston's most trusted roofing professionals with over 15 years of experience serving homeowners
              throughout the greater Houston area.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded in 2008, American Roofing has been serving the Houston community with integrity, quality
              craftsmanship, and exceptional customer service.
            </p>
          </div>
          <div>
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="American Roofing team"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// About Story Component
function AboutStorySection({ content }: { content: any }) {
  const story = content?.story || {}
  const mission = content?.mission || {}
  const credentials = content?.credentials || []

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">{story.title || "Our Story"}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {story.content || "Founded in 2008, American Roofing has been serving the Houston community..."}
            </p>

            {mission.title && (
              <>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{mission.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{mission.content}</p>
              </>
            )}

            {credentials.length > 0 && (
              <div className="space-y-4">
                {credentials.map((credential: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{credential}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="American Roofing team"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
