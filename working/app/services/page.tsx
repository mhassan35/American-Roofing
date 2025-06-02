import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Home, Wrench, CloudLightning, Search, Droplets, FileText, ArrowRight } from "lucide-react"

const services = [
  {
    id: "roof-replacement",
    title: "Roof Replacement",
    description: "Complete roof replacement with premium materials and expert installation.",
    icon: Home,
    link: "/services/roof-replacement",
  },
  {
    id: "roof-repair",
    title: "Roof Repair",
    description: "Fast, reliable repairs for leaks, damaged shingles, and other roofing issues.",
    icon: Wrench,
    link: "/services/roof-repair",
  },
  {
    id: "storm-damage",
    title: "Storm Damage Restoration",
    description: "Comprehensive restoration services for roofs damaged by storms and severe weather.",
    icon: CloudLightning,
    link: "/services/storm-damage",
  },
  {
    id: "inspections",
    title: "Free Inspections",
    description: "Thorough roof inspections to identify potential issues before they become major problems.",
    icon: Search,
    link: "/services/inspections",
  },
  {
    id: "gutters",
    title: "Gutter Services",
    description: "Installation, repair, and maintenance of gutters and downspouts to protect your home.",
    icon: Droplets,
    link: "/services/gutters",
  },
  {
    id: "insurance",
    title: "Insurance Claim Help",
    description: "Expert assistance navigating the insurance claim process for roof damage.",
    icon: FileText,
    link: "/services/insurance",
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gray-50 py-10">
        <div className="corporate-container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">Our Roofing Services</h1>
            <p className="text-base text-gray-600 mb-6">
              American Roofing provides comprehensive roofing solutions for homeowners throughout Houston and
              surrounding areas. From complete roof replacements to minor repairs, our team of experienced professionals
              is here to help.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="corporate-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-md shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <div className="h-40 bg-gray-100 relative">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt={service.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className="flat-icon flat-icon-primary p-2 rounded-md">
                    <service.icon className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">{service.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <Link href={service.link}>
                  <Button
                    variant="outline"
                    className="w-full border-brand-green text-brand-green hover:bg-brand-green/10 text-sm"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Our Process</h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              We follow a streamlined, customer-focused process to ensure your roofing project is completed efficiently
              and to your complete satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-md shadow-sm p-5 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-orange text-white rounded-full h-8 w-8 flex items-center justify-center">
                <span className="font-semibold">1</span>
              </div>
              <h3 className="text-center text-base font-semibold mt-3 mb-2 text-gray-800">Consultation</h3>
              <p className="text-center text-sm text-gray-600">
                We'll discuss your needs, assess your current roof, and provide expert recommendations.
              </p>
            </div>

            <div className="bg-white rounded-md shadow-sm p-5 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-orange text-white rounded-full h-8 w-8 flex items-center justify-center">
                <span className="font-semibold">2</span>
              </div>
              <h3 className="text-center text-base font-semibold mt-3 mb-2 text-gray-800">Proposal</h3>
              <p className="text-center text-sm text-gray-600">
                You'll receive a detailed, transparent proposal outlining the scope of work and costs.
              </p>
            </div>

            <div className="bg-white rounded-md shadow-sm p-5 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-orange text-white rounded-full h-8 w-8 flex items-center justify-center">
                <span className="font-semibold">3</span>
              </div>
              <h3 className="text-center text-base font-semibold mt-3 mb-2 text-gray-800">Installation</h3>
              <p className="text-center text-sm text-gray-600">
                Our skilled team will complete your project with precision, quality, and attention to detail.
              </p>
            </div>

            <div className="bg-white rounded-md shadow-sm p-5 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-orange text-white rounded-full h-8 w-8 flex items-center justify-center">
                <span className="font-semibold">4</span>
              </div>
              <h3 className="text-center text-base font-semibold mt-3 mb-2 text-gray-800">Satisfaction</h3>
              <p className="text-center text-sm text-gray-600">
                We'll ensure you're completely satisfied with our work and provide warranty information.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-brand-orange/10 rounded-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">Ready to Get Started?</h2>
          <p className="text-base text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact American Roofing today to schedule a free consultation and estimate for your roofing project. Our
            team is ready to provide the quality service and expertise you deserve.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">Get a Free Estimate</Button>
            <Button variant="outline" className="border-brand-green text-brand-green hover:bg-brand-green/10" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
