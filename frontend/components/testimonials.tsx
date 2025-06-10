"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight, User } from "lucide-react"

interface TestimonialsProps {
  content?: any
}

export default function Testimonials({ content }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const settings = content || {
    title: "What Our Customers Say",
    subtitle:
      "Join over 3,000 satisfied homeowners who trust American Roofing for quality, reliability, and exceptional service.",
    overallRating: "4.9",
    reviewCount: "300+",
    platforms: [
      { name: "Google", rating: "4.8" },
      { name: "Facebook", rating: "4.9" },
      { name: "BBB", rating: "4.10" },
      { name: "HomeAdvisor", rating: "4.11" },
    ],
    reviews: [
      {
        name: "Lisa M.",
        location: "Sugar Land, TX",
        platform: "Google",
        rating: 5,
        text: "I can't say enough good things about American Roofing. Their customer service is outstanding, and the quality of their work is top-notch. My new roof looks beautiful and was completed on time and within budget.",
      },
      {
        name: "David H.",
        location: "Cypress, TX",
        platform: "BBB",
        rating: 5,
        text: "American Roofing provided excellent service from the initial consultation to the final inspection. The crew was professional, courteous, and cleaned up thoroughly after completing the job.",
      },
      {
        name: "Amanda R.",
        location: "Spring, TX",
        platform: "Google",
        rating: 5,
        text: "We had storm damage and American Roofing helped us navigate the insurance process seamlessly. They were patient, knowledgeable, and delivered exceptional quality work.",
      },
    ],
  }

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % settings.reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + settings.reviews.length) % settings.reviews.length)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{settings.title}</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">{settings.subtitle}</p>

          {/* Rating Display */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-orange-500 text-white px-6 py-3 rounded-lg mr-6">
              <span className="text-3xl font-bold">{settings.overallRating}</span>
            </div>
            <div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600">Based on {settings.reviewCount} verified reviews</p>
            </div>
          </div>

          {/* Platform Ratings */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {settings.platforms.map((platform: any, index: number) => (
              <div key={index} className="text-center">
                <div className="text-lg font-bold text-gray-900">{platform.rating}</div>
                <div className="text-sm text-gray-600">on {platform.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {settings.reviews.map((review: any, index: number) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow border-0">
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-600 mb-6 leading-relaxed">"{review.text}"</p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{review.name}</div>
                        <div className="text-sm text-gray-500">{review.location}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{review.platform}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevReview}
              className="rounded-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextReview}
              className="rounded-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* View All Reviews Button */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-8 py-3"
            >
              View All Reviews
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
