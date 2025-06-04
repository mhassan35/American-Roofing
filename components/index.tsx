import type React from "react"
// This file exports all section components for dynamic rendering

import dynamic from "next/dynamic"
import type { ComponentType } from "@/lib/store/content-store"

// Dynamic imports for all section components
const Hero = dynamic(() => import("./hero"))
const Services = dynamic(() => import("./services"))
const SocialProof = dynamic(() => import("./social-proof"))
const EnhancedSocialProof = dynamic(() => import("./enhanced-social-proof"))
const ContactForm = dynamic(() => import("@/app/contact/page"))
const CTASection = dynamic(() => import("./cta-section"))
const FloatingCTA = dynamic(() => import("./floating-cta"))
const ProjectGallery = dynamic(() => import("./project-gallery"))
const WhyChooseUs = dynamic(() => import("./why-choose-us"))

// Component mapping
const componentMap: Record<ComponentType, React.ComponentType<any>> = {
  hero: Hero,
  services: Services,
  "social-proof": SocialProof,
  "enhanced-social-proof": EnhancedSocialProof,
  gallery: ProjectGallery,
  cta: CTASection,
  "why-choose": WhyChooseUs,
  "floating-cta": FloatingCTA,
  "contact-form": ContactForm,
  "about-content": dynamic(() => import("@/app/about/page")),
  "service-benefits": dynamic(() => import("@/app/services/roof-repair/page")),
  "service-process": dynamic(() => import("@/app/services/roof-replacement/page")),
  "service-faqs": dynamic(() => import("@/app/services/storm-damage/page")),
  "project-gallery": ProjectGallery,
}

export { componentMap }
