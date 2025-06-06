"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, Phone, Mail, Clock, CheckCircle, HelpCircle } from "lucide-react"
import { useLeadFormStore } from "@/lib/store"

interface ServiceLayoutProps {
  title: string
  description: string
  children: ReactNode
  faqs?: Array<{
    question: string
    answer: string
  }>
  benefits?: Array<{
    title: string
    description: string
  }>
  cta?: {
    title: string
    description: string
  }
}

export default function ServiceLayout({
  title,
  description,
  children,
  faqs = [],
  benefits = [],
  cta = {
    title: "Ready to Get Started?",
    description: "Contact us today for a free, no-obligation quote on your roofing project.",
  },
}: ServiceLayoutProps) {
  const { openLeadForm } = useLeadFormStore()

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gray-50 py-10">
        <div className="corporate-container">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="mb-1 flex items-center text-xs text-gray-500">
                <Link href="/" className="hover:text-brand-orange">
                  Home
                </Link>
                <ChevronRight className="h-3 w-3 mx-1" />
                <Link href="/services" className="hover:text-brand-orange">
                  Services
                </Link>
                <ChevronRight className="h-3 w-3 mx-1" />
                <span>{title}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">{title}</h1>
              <p className="text-base text-gray-600 mb-6">{description}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={openLeadForm} className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                  Get a Free Quote
                </Button>
                <Button
                  variant="outline"
                  className="border-brand-green text-brand-green hover:bg-brand-green/10"
                  asChild
                >
                  <Link href="tel:+17135551234">
                    <Phone className="h-4 w-4 mr-2" />
                    Call (713) 555-1234
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/3 bg-white p-4 rounded-md shadow-sm">
              <h3 className="text-base font-semibold mb-3 text-gray-800">Quick Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-brand-orange mr-2" />
                  <Link href="tel:+17135551234" className="text-gray-600 hover:text-brand-orange">
                    (713) 555-1234
                  </Link>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 text-brand-orange mr-2" />
                  <Link href="mailto:info@americanroofinghouston.com" className="text-gray-600 hover:text-brand-orange">
                    info@americanroofinghouston.com
                  </Link>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-brand-orange mr-2" />
                  <span className="text-gray-600">Mon-Fri: 8am-6pm, Sat: 9am-3pm</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button
                  onClick={openLeadForm}
                  className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white text-sm"
                >
                  Request a Free Estimate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="corporate-container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Service Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-gray-50 rounded-md p-4 mb-6">
              <h3 className="text-base font-semibold mb-3 text-gray-800">Our Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/services/roof-replacement"
                    className="flex items-center text-sm text-gray-600 hover:text-brand-orange py-1"
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Roof Replacement
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/roof-repair"
                    className="flex items-center text-sm text-gray-600 hover:text-brand-orange py-1"
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Roof Repair
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/storm-damage"
                    className="flex items-center text-sm text-gray-600 hover:text-brand-orange py-1"
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Storm Damage Restoration
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/inspections"
                    className="flex items-center text-sm text-gray-600 hover:text-brand-orange py-1"
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Free Inspections
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/gutters"
                    className="flex items-center text-sm text-gray-600 hover:text-brand-orange py-1"
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Gutter Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/insurance"
                    className="flex items-center text-sm text-gray-600 hover:text-brand-orange py-1"
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Insurance Claim Help
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-brand-orange/10 rounded-md p-4">
              <h3 className="text-base font-semibold mb-3 text-gray-800">Why Choose Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                  Licensed & Insured Professionals
                </li>
                <li className="flex items-start text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                  15+ Years of Experience
                </li>
                <li className="flex items-start text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                  Premium Materials & Workmanship
                </li>
                <li className="flex items-start text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                  Comprehensive Warranties
                </li>
                <li className="flex items-start text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                  Transparent, No-Surprise Pricing
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-md shadow-sm p-6 mb-8">{children}</div>

            {/* Benefits Section */}
            {benefits.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="bg-white rounded-md shadow-sm p-4 border-l-4 border-brand-green">
                      <h3 className="text-base font-semibold mb-2 text-gray-800">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Section */}
            {faqs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-md shadow-sm p-4">
                      <h3 className="flex items-center text-base font-semibold mb-2 text-gray-800">
                        <HelpCircle className="h-4 w-4 text-brand-orange mr-2" />
                        {faq.question}
                      </h3>
                      <p className="text-sm text-gray-600 pl-6">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="bg-brand-green/10 rounded-md p-6 text-center">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{cta.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{cta.description}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button onClick={openLeadForm} className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                  Get a Free Quote
                </Button>
                <Button
                  variant="outline"
                  className="border-brand-green text-brand-green hover:bg-brand-green/10"
                  asChild
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
