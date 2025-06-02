import ServiceLayout from "../service-layout"
import Image from "next/image"
import { CheckCircle } from "lucide-react"

export default function RoofRepairPage() {
  return (
    <ServiceLayout
      title="Roof Repair"
      description="Fast, reliable repairs for leaks, damaged shingles, and other roofing issues throughout Houston."
      faqs={[
        {
          question: "How do I know if my roof needs repair?",
          answer:
            "Signs that your roof may need repair include: missing or damaged shingles, water stains on ceilings, leaks during rain, granules in gutters, and visible sagging or damage.",
        },
        {
          question: "How quickly can you repair my roof?",
          answer:
            "For emergency repairs, we can often be on-site within 24-48 hours. For standard repairs, we typically schedule work within 3-7 days, depending on weather conditions and our current workload.",
        },
        {
          question: "Do you provide emergency roof repair services?",
          answer:
            "Yes, we offer emergency roof repair services for situations that require immediate attention, such as active leaks or storm damage. Contact our emergency line for rapid response.",
        },
        {
          question: "Will my insurance cover roof repairs?",
          answer:
            "Many homeowner's insurance policies cover roof repairs, especially if the damage was caused by a covered peril like a storm. We can help you determine if your damage qualifies and assist with the claims process.",
        },
        {
          question: "How much do roof repairs typically cost?",
          answer:
            "The cost of roof repairs varies widely depending on the extent of damage, materials needed, and accessibility. Minor repairs may cost a few hundred dollars, while more extensive repairs could cost more. We provide detailed, transparent estimates before beginning any work.",
        },
      ]}
      benefits={[
        {
          title: "Prevent Costly Damage",
          description:
            "Timely repairs prevent small issues from becoming major problems that could damage your home's structure.",
        },
        {
          title: "Extend Roof Lifespan",
          description:
            "Regular maintenance and prompt repairs can significantly extend the life of your existing roof.",
        },
        {
          title: "Maintain Home Value",
          description: "A well-maintained roof preserves your home's value and curb appeal.",
        },
        {
          title: "Energy Efficiency",
          description: "Repairing leaks and damage helps maintain your home's energy efficiency and comfort.",
        },
      ]}
    >
      <div className="space-y-6">
        <div className="aspect-video relative rounded-md overflow-hidden mb-6">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Roof Repair"
            width={800}
            height={400}
            className="object-cover"
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-800">Expert Roof Repair Services</h2>

        <p className="text-sm text-gray-600">
          American Roofing provides comprehensive roof repair services for homeowners throughout the Houston area. From
          minor leaks to storm damage, our experienced team can quickly diagnose and repair any roofing issue to protect
          your home and restore your peace of mind.
        </p>

        <p className="text-sm text-gray-600">
          We understand that roof problems can be stressful and disruptive. That's why we prioritize prompt,
          professional service and transparent communication throughout the repair process.
        </p>

        <h3 className="text-lg font-semibold text-gray-800">Common Roof Repairs We Handle</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-base font-medium text-gray-800 mb-2">Leak Repairs</h4>
            <ul className="space-y-1">
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Identification and sealing of leak sources
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Repair of damaged underlayment
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Flashing repairs and replacement
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-base font-medium text-gray-800 mb-2">Shingle Repairs</h4>
            <ul className="space-y-1">
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Replacement of missing or damaged shingles
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Repair of lifted or curling shingles
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Color matching for seamless repairs
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-base font-medium text-gray-800 mb-2">Storm Damage Repairs</h4>
            <ul className="space-y-1">
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Emergency tarping and temporary repairs
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Hail and wind damage assessment
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Insurance claim assistance
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-base font-medium text-gray-800 mb-2">Structural Repairs</h4>
            <ul className="space-y-1">
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Roof deck repair and replacement
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Rafter and truss repairs
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Sagging roof correction
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-6">Our Roof Repair Process</h3>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-brand-orange text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-xs font-medium">1</span>
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-800">Thorough Inspection</h4>
              <p className="text-sm text-gray-600">
                We conduct a comprehensive inspection to identify all damage and underlying issues, not just the obvious
                problems.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-brand-orange text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-xs font-medium">2</span>
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-800">Detailed Estimate</h4>
              <p className="text-sm text-gray-600">
                You'll receive a clear, itemized estimate outlining all necessary repairs and associated costs.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-brand-orange text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-xs font-medium">3</span>
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-800">Expert Repairs</h4>
              <p className="text-sm text-gray-600">
                Our skilled technicians perform all repairs using quality materials and proven techniques to ensure
                lasting results.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-brand-orange text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-xs font-medium">4</span>
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-800">Final Inspection & Warranty</h4>
              <p className="text-sm text-gray-600">
                We conduct a final inspection to verify all repairs meet our high standards and provide warranty
                information for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ServiceLayout>
  )
}
