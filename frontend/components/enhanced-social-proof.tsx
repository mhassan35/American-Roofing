"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

interface SocialProofProps {
  content?: {
    title?: string
    rating?: string
    reviewCount?: string
    testimonials?: Array<{
      name: string
      text: string
      rating: number
    }>
  }
}

export default function EnhancedSocialProof({ content }: SocialProofProps) {
  const title = content?.title || "What Our Customers Say"
  const rating = content?.rating || "4.9"
  const reviewCount = content?.reviewCount || "250+"
  const testimonials = content?.testimonials || [
    {
      name: "John Smith",
      text: "Excellent work and professional service. Highly recommended!",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      text: "They replaced our roof quickly and efficiently. Great team!",
      rating: 5,
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>

          {/* Rating Display */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">{rating}</span>
            <span className="text-gray-600">({reviewCount} reviews)</span>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow border-0">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-orange-500 mb-4" />
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{testimonial.name}</span>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
