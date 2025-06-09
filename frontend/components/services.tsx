"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Wrench, CloudLightning, Search, Droplets, FileText } from "lucide-react"
import Link from "next/link"

interface ServicesProps {
  content?: {
    title?: string
    subtitle?: string
    services?: Array<{
      title: string
      description: string
      icon?: string
      link?: string
    }>
  }
}

const iconMap = {
  home: Home,
  wrench: Wrench,
  cloud: CloudLightning,
  search: Search,
  droplets: Droplets,
  "file-text": FileText,
}

export default function Services({ content }: ServicesProps) {
  const title = content?.title || "Our Roofing Services"
  const subtitle = content?.subtitle || "Comprehensive solutions for all your roofing needs"
  const services = content?.services || [
    {
      title: "Roof Replacement",
      description: "Complete roof replacement with premium materials",
      icon: "home",
      link: "/services/roof-replacement",
    },
    {
      title: "Roof Repair",
      description: "Professional repairs for leaks and damage",
      icon: "wrench",
      link: "/services/roof-repair",
    },
    {
      title: "Storm Damage",
      description: "Emergency storm damage restoration",
      icon: "cloud",
      link: "/services/storm-damage",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Home

            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  {service.link && (
                    <Link href={service.link}>
                      <Button
                        variant="outline"
                        className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                      >
                        Learn More
                      </Button>
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
