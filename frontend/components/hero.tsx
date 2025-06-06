"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useLeadFormStore } from "@/lib/store"
import {
  Star,
  Shield,
  Award,
  CheckCircle,
  Home,
  ArrowRight
} from "lucide-react"

export default function Hero() {
  const { openLeadForm } = useLeadFormStore()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="hero-section" className="relative pb-36 lg:pb-20 pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-r from-brand-green/20 to-brand-orange/10" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-2 pb-24 md:pb-2 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center text-center lg:text-left lg:items-start gap-12">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-2xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4 text-gray-800">
              Houston's Most Trusted Roofing Pros
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6">
              Request a fast, free quote in under 60 seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
              <Button
                onClick={openLeadForm}
                className="btn-corporate bg-brand-orange hover:bg-brand-orange/90 text-white"
              >
                Get Free Estimate
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="btn-corporate border-brand-green text-brand-green hover:bg-brand-green/10"
              >
                Learn More
              </Button>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-3">
              <div className="flex items-center">
                <div className="flat-icon flat-icon-sm mr-2 rounded-full">
                  <Shield className="h-4 w-4" />
                </div>
                <span className="text-sm text-gray-700">Licensed & Insured</span>
              </div>
              <div className="flex items-center">
                <div className="flat-icon flat-icon-sm mr-2 rounded-full">
                  <Star className="h-4 w-4" />
                </div>
                <span className="text-sm text-gray-700">4.9⭐ on Google</span>
              </div>
              <div className="flex items-center">
                <div className="flat-icon flat-icon-sm mr-2 rounded-full">
                  <Award className="h-4 w-4" />
                </div>
                <span className="text-sm text-gray-700">Trusted by 3,000+ Homeowners</span>
              </div>
            </div>
          </motion.div>

          {/* Estimate Form Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full max-w-md"
          >
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Get Your Free Estimate</h2>
                <p className="text-base text-gray-600">Takes less than 60 seconds</p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  "No obligation quote",
                  "Fast response time",
                  "Professional assessment",
                  "Transparent pricing"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="flat-icon-secondary rounded-full mr-3 p-1.5">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={openLeadForm}
                className="w-full btn-corporate bg-brand-orange hover:bg-brand-orange/90 text-white"
              >
                Start Your Free Estimate
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white py-3 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 text-center">
            <div className="flex items-center">
              <div className="flat-icon flat-icon-secondary mr-3 p-1.5">
                <Award className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">BBB A+ Rating</span>
            </div>
            <div className="flex items-center">
              <div className="flat-icon flat-icon-primary mr-3 p-1.5">
                <Star className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-xs">4.9 (300+ Reviews)</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flat-icon flat-icon-secondary mr-3 p-1.5">
                <Shield className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">GAF Certified Installer</span>
            </div>
            <div className="flex items-center">
              <div className="flat-icon flat-icon-primary mr-3 p-1.5">
                <Home className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Local Houston-Owned</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
