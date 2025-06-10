"use client"

import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLeadFormStore } from "@/lib/store"

interface ServiceBenefitsProps {
  content?: {
    title?: string
    benefits?: Array<{
      title: string
      description: string
    }>
  }
}

export default function ServiceBenefits({ content }: ServiceBenefitsProps) {
  const { openLeadForm } = useLeadFormStore()

  const title = content?.title || "Benefits of Our Service"
  const benefits = content?.benefits || []

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{title}</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm border">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={openLeadForm} size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
            Get Your Free Estimate
          </Button>
        </div>
      </div>
    </section>
  )
}
