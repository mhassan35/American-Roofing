"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Shield, Users, Phone, ArrowRight } from "lucide-react"
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
    <section className="relative w-full bg-gradient-to-br from-green-100 via-green-50 to-blue-50 pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">{title}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{subtitle}</p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-3">
              {trustIndicators.map((indicator, index) => (
                <Badge key={index} variant="secondary" className="bg-white/80 text-gray-700 px-3 py-1">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  {indicator}
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={openLeadForm}
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {primaryButton}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-lg"
              >
                {secondaryButton}
              </Button>
            </div>

            {/* Quick Contact */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center space-x-2">
                <div className="bg-orange-500 p-2 rounded-full">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Call: (713) 555-1234</span>
              </div>
              <div className="text-gray-400">|</div>
              <div className="text-sm text-gray-600">24/7 Emergency Service</div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:justify-self-end w-full max-w-md">
            <Card className="bg-white shadow-2xl border-0">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{formTitle}</h3>
                  <p className="text-gray-600">{formSubtitle}</p>
                </div>

                <form onSubmit={handleQuickSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold rounded-lg"
                  >
                    {formButtonText}
                  </Button>
                </form>

                <div className="mt-6 space-y-3">
                  {formFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>4.9/5 Rating</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Licensed & Insured</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span>3,000+ Customers</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <div className="w-full h-full bg-gradient-to-l from-orange-200 to-transparent"></div>
      </div>
    </section>
  )
}
