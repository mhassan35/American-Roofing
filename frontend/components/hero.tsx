"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CheckCircle, Star, Shield, ArrowRight, Award, Home } from "lucide-react"
import { useLeadFormStore } from "@/lib/store"

interface HeroProps {
  content?: {
    title?: string
    subtitle?: string
    primaryButton?: string
    secondaryButton?: string
    trustIndicators?: string[]
    formTitle?: string
    formSubtitle?: string
    formFeatures?: string[]
    formButtonText?: string
  }
}

export default function Hero({ content }: HeroProps) {
  const { openLeadForm } = useLeadFormStore()
  const [email, setEmail] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const title = content?.title || "Houston's Most Trusted Roofing Pros"
  const subtitle = content?.subtitle || "Request a fast, free quote in under 60 seconds."
  const primaryButton = content?.primaryButton || "Get Free Estimate"
  const secondaryButton = content?.secondaryButton || "Learn More"
  const trustIndicators = content?.trustIndicators || [
    "Licensed & Insured",
    "4.9 ⭐ on Google",
    "Trusted by 3,000+ Homeowners",
  ]
  const formTitle = content?.formTitle || "Get Your Free Estimate"
  const formSubtitle = content?.formSubtitle || "Takes less than 60 seconds"
  const formFeatures = content?.formFeatures || [
    "No obligation quote",
    "Fast response time",
    "Professional assessment",
    "Transparent pricing",
  ]
  const formButtonText = content?.formButtonText || "Start Your Free Estimate"

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      openLeadForm()
    }
  }

  return (
    <section id="hero-section" className="relative pb-36 lg:pb-20 pt-24 overflow-hidden">
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4 text-gray-800">{title}</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6">{subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
              <Button
                onClick={openLeadForm}
                className="btn-corporate bg-brand-orange hover:bg-brand-orange/90 text-white"
              >
                {primaryButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="btn-corporate border-brand-green text-brand-green hover:bg-brand-green/10"
              >
                {secondaryButton}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-3">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center">
                  <div className="flat-icon flat-icon-sm mr-2 rounded-full">
                    {index === 0 && <Shield className="h-4 w-4" />}
                    {index === 1 && <Star className="h-4 w-4" />}
                    {index === 2 && <Award className="h-4 w-4" />}
                  </div>
                  <span className="text-sm text-gray-700">{indicator}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full max-w-md"
          >
            <Card className="bg-white shadow-2xl border-0 rounded-lg">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{formTitle}</h3>
                  <p className="text-base text-gray-600">{formSubtitle}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {formFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flat-icon-secondary rounded-full mr-3 p-1.5">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={openLeadForm}
                  className="w-full btn-corporate bg-brand-orange hover:bg-brand-orange/90 text-white"
                >
                  {formButtonText}
                </Button>
              </CardContent>
            </Card>
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
