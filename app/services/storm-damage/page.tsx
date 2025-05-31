import ServiceLayout from "../service-layout"
import Image from "next/image"
import { CheckCircle, AlertTriangle } from "lucide-react"

export default function StormDamagePage() {
  return (
    <ServiceLayout
      title="Storm Damage Restoration"
      description="Comprehensive storm damage assessment, repair, and restoration services for Houston homeowners."
      faqs={[
        {
          question: "What should I do immediately after storm damage?",
          answer:
            "First, ensure your family's safety. Then document the damage with photos, contact your insurance company, and call us for emergency tarping if needed to prevent further damage.",
        },
        {
          question: "How do I know if my roof has storm damage?",
          answer:
            "Signs of storm damage include missing or damaged shingles, leaks, dents from hail, debris on the roof, water stains on ceilings, and granules in gutters. Our free inspection can identify all damage, even issues that aren't visible from the ground.",
        },
        {
          question: "Will my insurance cover storm damage repairs?",
          answer:
            "Most homeowner's insurance policies cover storm damage repairs. We have extensive experience working with insurance companies and can help guide you through the claims process to ensure you receive the coverage you're entitled to.",
        },
        {
          question: "How long does storm damage restoration take?",
          answer:
            "The timeline varies depending on the extent of damage, but most residential storm damage restorations can be completed within 1-5 days once materials are secured and weather permits.",
        },
        {
          question: "Do you provide emergency services after storms?",
          answer:
            "Yes, we offer 24/7 emergency response for storm damage, including temporary tarping and water mitigation to prevent further damage to your home.",
        },
      ]}
      benefits={[
        {
          title: "Prevent Secondary Damage",
          description:
            "Quick response to storm damage prevents water infiltration that can lead to mold, rot, and structural issues.",
        },
        {
          title: "Insurance Expertise",
          description:
            "Our team has extensive experience working with insurance companies to maximize your claim coverage.",
        },
        {
          title: "Comprehensive Restoration",
          description:
            "We don't just patch problems—we restore your roof to pre-storm condition or better with quality materials.",
        },
        {
          title: "Peace of Mind",
          description:
            "Professional storm damage restoration ensures your home is properly protected against future weather events.",
        },
      ]}
    >
      <div className="space-y-6">
        <div className="aspect-video relative rounded-md overflow-hidden mb-6">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Storm Damage Restoration"
            width={800}
            height={400}
            className="object-cover"
          />
        </div>

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

        <h2 className="text-xl font-semibold text-gray-800">Storm Damage Restoration Services</h2>

        <p className="text-sm text-gray-600">
          Houston's severe weather—from hurricanes and tropical storms to hail and high winds—can cause significant
          damage to your roof. American Roofing provides comprehensive storm damage restoration services to quickly
          assess, repair, and restore your roof after weather-related damage.
        </p>

        <p className="text-sm text-gray-600">
          Our experienced team understands the urgency of storm damage repairs and works efficiently to protect your
          home from further damage while delivering lasting, quality restorations.
        </p>

        <h3 className="text-lg font-semibold text-gray-800">Types of Storm Damage We Address</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-base font-medium text-gray-800 mb-2">Wind Damage</h4>
            <ul className="space-y-1">
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Lifted, creased, or missing shingles
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Damaged flashing and roof accessories
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Debris impact damage
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-base font-medium text-gray-800 mb-2">Hail Damage</h4>
            <ul className="space-y-1">
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Dents, cracks, and punctures in shingles
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Granule loss exposing asphalt layer
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Damaged gutters and downspouts
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-base font-medium text-gray-800 mb-2">Hurricane & Tropical Storm Damage</h4>
            <ul className="space-y-1">
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Extensive wind and water damage
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Structural damage to roof system
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Comprehensive restoration solutions
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-base font-medium text-gray-800 mb-2">Water Damage</h4>
            <ul className="space-y-1">
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Leak identification and repair
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Damaged decking and underlayment replacement
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Interior damage assessment
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-6">Our Storm Damage Restoration Process</h3>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-brand-orange text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-xs font-medium">1</span>
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-800">Emergency Response</h4>
              <p className="text-sm text-gray-600">
                We provide rapid response for emergency tarping and temporary repairs to prevent further damage to your
                home.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-brand-orange text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-xs font-medium">2</span>
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-800">Comprehensive Damage Assessment</h4>
              <p className="text-sm text-gray-600">
                Our experts thoroughly inspect your roof to document all storm-related damage for insurance purposes and
                restoration planning.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-brand-orange text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-xs font-medium">3</span>
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-800">Insurance Claim Assistance</h4>
              <p className="text-sm text-gray-600">
                We work directly with your insurance company, providing documentation and expertise to ensure you
                receive the coverage you deserve.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-brand-orange text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-xs font-medium">4</span>
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-800">Professional Restoration</h4>
              <p className="text-sm text-gray-600">
                Our skilled team completes all necessary repairs and restoration work using quality materials and proven
                techniques.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-brand-orange text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-xs font-medium">5</span>
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-800">Final Inspection & Warranty</h4>
              <p className="text-sm text-gray-600">
                We conduct a thorough final inspection and provide warranty information for your restored roof.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ServiceLayout>
  )
}
