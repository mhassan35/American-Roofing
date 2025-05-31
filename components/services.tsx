"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
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

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeService, setActiveService] = useState(services[0].id)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("services-section")
      if (element) {
        const position = element.getBoundingClientRect()
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check on initial load

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="services-section" className="corporate-section bg-white">
      <div className="corporate-container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">Our Roofing Services</h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive roofing solutions for homeowners in Houston and surrounding areas.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={item}
              className="service-card bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              onMouseEnter={() => setActiveService(service.id)}
            >
              <div className="relative h-40 rounded-t-lg overflow-hidden bg-gradient-to-r from-brand-green/10 to-brand-orange/10 flex items-center justify-center">
                <div className="flat-icon flat-icon-primary p-4 rounded-full">
                  <service.icon className="h-8 w-8" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <Link
                  href={service.link}
                  className="inline-flex items-center text-sm text-brand-orange hover:text-brand-orange/80 font-medium transition-colors"
                >
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
