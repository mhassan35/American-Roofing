"use client"

import Hero from "@/components/hero"
import Services from "@/components/services"
import WhyChooseUs from "@/components/why-choose-us"
import EnhancedSocialProof from "@/components/enhanced-social-proof"
import ProjectGallery from "@/components/project-gallery"
import CTASection from "@/components/cta-section"
import FloatingCTA from "@/components/floating-cta"
import { useContentStore } from "@/lib/store"
import { useHydration } from "@/hooks/use-hydration"

export default function Home() {
  const isHydrated = useHydration()
  const { getPageContent } = useContentStore()

  // Don't render content until hydrated
  if (!isHydrated) {
    return (
      <div className="relative">
        <DefaultHomeContent />
      </div>
    )
  }

  const pageContent = getPageContent("home")

  if (!pageContent) {
    return (
      <div className="relative">
        <DefaultHomeContent />
      </div>
    )
  }

  const activeComponents = pageContent.components.filter((component: any) => component.isActive)

  return (
    <div className="relative">
      {activeComponents.map((component: any) => {
        switch (component.type) {
          case "hero":
            return <Hero key={component.id} content={component.settings} />
          case "services":
            return <Services key={component.id} content={component.settings} />
          case "why-choose":
            return <WhyChooseUs key={component.id} content={component.settings} />
          case "social-proof":
            return <EnhancedSocialProof key={component.id} content={component.settings} />
          case "gallery":
            return <ProjectGallery key={component.id} content={component.settings} />
          case "cta":
            return <CTASection key={component.id} content={component.settings} />
          case "floating-cta":
            return <FloatingCTA key={component.id} content={component.settings} />
          default:
            return null
        }
      })}
    </div>
  )
}

function DefaultHomeContent() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <EnhancedSocialProof />
      <ProjectGallery />
      <CTASection />
      <FloatingCTA />
    </>
  )
}
