"use client"

import { Button } from "@/components/ui/button"
import { useLeadFormStore } from "@/lib/store"

interface ServiceProcessProps {
  content?: {
    title?: string
    subtitle?: string
    steps?: Array<{
      number?: number
      title: string
      description: string
    }>
  }
}

export default function ServiceProcess({ content }: ServiceProcessProps) {
  const { openLeadForm } = useLeadFormStore()

  const title = content?.title || "Our Process"
  const subtitle = content?.subtitle || "How we work"
  const steps = content?.steps || []

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
        </div>

        <div className="space-y-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="bg-orange-500 text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
                  {step.number || index + 1}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={openLeadForm} size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
            Start Your Project Today
          </Button>
        </div>
      </div>
    </section>
  )
}
