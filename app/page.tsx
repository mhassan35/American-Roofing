import Hero from "@/components/hero"
import Services from "@/components/services"
import WhyChooseUs from "@/components/why-choose-us"
import EnhancedSocialProof from "@/components/enhanced-social-proof"
import ProjectGallery from "@/components/project-gallery"
import CTASection from "@/components/cta-section"
import FloatingCTA from "@/components/floating-cta"

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Services />
      <WhyChooseUs />
      <EnhancedSocialProof />
      <ProjectGallery />
      <CTASection />
      <FloatingCTA />
    </div>
  )
}
