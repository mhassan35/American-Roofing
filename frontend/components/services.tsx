"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Wrench, CloudLightning, Search, Droplets, FileText, ArrowRight } from "lucide-react"

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
  const [isVisible, setIsVisible] = useState(false)

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

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("services-section")
      if (section) {
        const { top } = section.getBoundingClientRect()
        if (top < window.innerHeight * 0.75) {
          setIsVisible(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="services-section" className="bg-white px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">{settings.title}</h2>
          <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto">{settings.subtitle}</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {settings.services.map((service: any, index: number) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Home

            return (
              <motion.div
                key={index}
                variants={item}
                className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300"
              >
                <div className="h-40 flex items-center justify-center bg-gradient-to-r from-brand-green/10 to-brand-orange/10 rounded-t-lg">
                  <div className="p-4 bg-white rounded-full shadow">
                    <IconComponent className="h-8 w-8 text-brand-orange" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  {service.link && (
                    <Link
                      href={service.link}
                      className="inline-flex items-center text-sm text-brand-orange hover:text-brand-orange/80 font-medium transition-colors"
                    >
                      Learn More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
