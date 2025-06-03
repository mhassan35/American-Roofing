import ServiceLayout from "../service-layout"
import Image from "next/image"
import { CheckCircle } from "lucide-react"

export default function RoofReplacementPage() {
  return (
    <ServiceLayout
      title="Roof Replacement"
      description="Complete roof replacement services with premium materials and expert installation for Houston homeowners."
      faqs={[
        {
          question: "How long does a roof replacement typically take?",
          answer:
            "Most residential roof replacements can be completed in 1-3 days, depending on the size and complexity of your roof, weather conditions, and material choices.",
        },
        {
          question: "What roofing materials do you offer?",
          answer:
            "We offer a wide range of roofing materials including asphalt shingles, metal roofing, tile, slate, and flat roofing systems. We'll help you choose the best option for your home and budget.",
        },
        {
          question: "How do I know if I need a full roof replacement?",
          answer:
            "Signs you may need a full replacement include: your roof is over 20 years old, multiple leaks, significant storm damage, curling or missing shingles, and sagging areas. We offer free inspections to help you determine the best course of action.",
        },
        {
          question: "Do you offer warranties on roof replacements?",
          answer:
            "Yes, we offer manufacturer warranties on materials (typically 25-50 years depending on the product) and our own workmanship warranty to ensure your complete satisfaction.",
        },
        {
          question: "Can you help with insurance claims for roof replacement?",
          answer:
            "Our team has extensive experience working with insurance companies and can help guide you through the entire claims process for storm or disaster-related roof damage.",
        },
      ]}
      benefits={[
        {
          title: "Increased Home Value",
          description:
            "A new roof can increase your home's resale value by up to 7% and significantly improve curb appeal.",
        },
        {
          title: "Enhanced Energy Efficiency",
          description:
            "Modern roofing materials can reduce energy costs by improving insulation and reflecting solar heat.",
        },
        {
          title: "Improved Safety & Protection",
          description: "A new roof provides better protection against leaks, mold, and structural damage to your home.",
        },
        {
          title: "Peace of Mind",
          description:
            "Enjoy the security of knowing your home is protected by a durable, properly installed roof with warranty coverage.",
        },
      ]}
    >
      <div className="space-y-6">
        <div className="aspect-video relative rounded-md overflow-hidden mb-6">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Roof Replacement"
            width={800}
            height={400}
            className="object-cover"
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-800">Professional Roof Replacement Services</h2>

        <p className="text-sm text-gray-600">
          American Roofing provides comprehensive roof replacement services for homeowners throughout the Houston area.
          Whether your roof has sustained storm damage, reached the end of its lifespan, or you simply want to upgrade
          to a more modern and energy-efficient roofing system, our team of experienced professionals is here to help.
        </p>

        <p className="text-sm text-gray-600">
          We understand that replacing your roof is a significant investment, which is why we're committed to providing
          honest assessments, quality materials, expert installation, and transparent pricing throughout the entire
          process.
        </p>

        <h3 className="text-lg font-semibold text-gray-800">Our Roof Replacement Process</h3>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-brand-orange text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-xs font-medium">1</span>
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-800">Thorough Inspection & Assessment</h4>
              <p className="text-sm text-gray-600">
                We begin with a comprehensive inspection of your current roof to assess its condition, identify any
                underlying issues, and determine the best approach for your replacement.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-brand-orange text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-xs font-medium">2</span>
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-800">Detailed Proposal & Material Selection</h4>
              <p className="text-sm text-gray-600">
                We'll provide a detailed proposal outlining our recommendations and help you select the right materials
                for your home, budget, and aesthetic preferences.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-brand-orange text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-xs font-medium">3</span>
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-800">Professional Installation</h4>
              <p className="text-sm text-gray-600">
                Our skilled team will remove your old roof, inspect the decking, make any necessary repairs, and install
                your new roofing system according to manufacturer specifications and industry best practices.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-brand-orange text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-xs font-medium">4</span>
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-800">Thorough Cleanup & Final Inspection</h4>
              <p className="text-sm text-gray-600">
                We'll thoroughly clean up your property, removing all debris, and conduct a final inspection to ensure
                everything meets our high standards of quality.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-6">Roofing Materials We Offer</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-base font-medium text-gray-800 mb-2">Asphalt Shingles</h4>
            <ul className="space-y-1">
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Affordable and versatile
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Available in various styles and colors
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                25-30 year lifespan
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-base font-medium text-gray-800 mb-2">Metal Roofing</h4>
            <ul className="space-y-1">
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Exceptional durability and longevity
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Energy efficient and environmentally friendly
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                50+ year lifespan
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-base font-medium text-gray-800 mb-2">Tile Roofing</h4>
            <ul className="space-y-1">
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Classic, elegant appearance
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Excellent insulation properties
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                50+ year lifespan
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-base font-medium text-gray-800 mb-2">Flat Roofing Systems</h4>
            <ul className="space-y-1">
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Ideal for modern architectural styles
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                Multiple material options (TPO, EPDM, modified bitumen)
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                20-30 year lifespan
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ServiceLayout>
  )
}
