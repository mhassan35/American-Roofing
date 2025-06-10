"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLeadFormStore } from "@/lib/store"

interface ServiceFAQsProps {
  content?: {
    title?: string
    faqs?: Array<{
      question: string
      answer: string
    }>
  }
}

export default function ServiceFAQs({ content }: ServiceFAQsProps) {
  const { openLeadForm } = useLeadFormStore()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const title = content?.title || "Frequently Asked Questions"
  const faqs = content?.faqs || []

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{title}</h2>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={openLeadForm} size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
            Have More Questions? Get Free Consultation
          </Button>
        </div>
      </div>
    </section>
  )
}
