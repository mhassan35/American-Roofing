"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Home, Wrench, CloudLightning, Search, Droplets, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

interface ServicesProps {
  content?: any
}

const iconMap = {
  home: Home,
  wrench: Wrench,
  "cloud-lightning": CloudLightning,
  search: Search,
  droplets: Droplets,
  "file-text": FileText,
}

export default function Services({ content }: ServicesProps) {
  const settings = content || {
    title: "Our Roofing Services",
    subtitle: "We provide comprehensive roofing solutions for homeowners in Houston and surrounding areas.",
    services: [
      {
        icon: "home",
        title: "Roof Replacement",
        description: "Complete roof replacement with premium materials and expert installation.",
        link: "/services/roof-replacement",
      },
      {
        icon: "wrench",
        title: "Roof Repair",
        description: "Fast, reliable repairs for leaks, damaged shingles, and other roofing issues.",
        link: "/services/roof-repair",
      },
      {
        icon: "cloud-lightning",
        title: "Storm Damage Restoration",
        description: "Comprehensive restoration services for roofs damaged by storms and severe weather.",
        link: "/services/storm-damage",
      },
      {
        icon: "search",
        title: "Free Inspections",
        description: "Thorough roof inspections to identify potential issues before they become major problems.",
        link: "/services/inspections",
      },
      {
        icon: "droplets",
        title: "Gutter Services",
        description: "Installation, repair, and maintenance of gutters and downspouts to protect your home.",
        link: "/services/gutters",
      },
      {
        icon: "file-text",
        title: "Insurance Claim Help",
        description: "Expert assistance navigating the insurance claim process for roof damage.",
        link: "/services/insurance",
      },
    ],
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{settings.title}</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{settings.subtitle}</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {settings.services.map((service: any, index: number) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Home

            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50"
              >
                <CardContent className="p-8 text-center h-full flex flex-col">
                  {/* Icon */}
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <IconComponent className="w-8 h-8 text-orange-500" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{service.description}</p>

                  {/* Link */}
                  {service.link && (
                    <Link
                      href={service.link}
                      className="inline-flex items-center text-orange-500 hover:text-orange-600 font-semibold transition-colors"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
