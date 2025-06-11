"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Star, ChevronLeft, ChevronRight, User, MapPin, Calendar, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface TestimonialsProps {
  content?: any
}

export default function Testimonials({ content }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleReviews, setVisibleReviews] = useState(3)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const controls = useAnimation()

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
        id: 1,
        name: "Jennifer L.",
        location: "Houston, TX",
        rating: 5,
        text: "American Roofing replaced our entire roof after a major storm. Their team was professional, efficient, and the quality of work exceeded our expectations. They even helped with our insurance claim!",
        date: "June 15, 2023",
        source: "Google",
        verified: true,
      },
      {
        id: 2,
        name: "Michael T.",
        location: "Katy, TX",
        rating: 5,
        text: "I had several roofing companies give me quotes, but American Roofing stood out with their detailed assessment and fair pricing. The work was completed on schedule and my new roof looks fantastic.",
        date: "August 3, 2023",
        source: "Yelp",
        verified: true,
      },
      {
        id: 3,
        name: "Sarah W.",
        location: "The Woodlands, TX",
        rating: 5,
        text: "After a small leak during a heavy rain, American Roofing came out the same day to assess the damage. Their repair was quick and affordable, and they even did a full inspection to make sure there weren't any other issues.",
        date: "September 22, 2023",
        source: "Facebook",
        verified: true,
      },
    ],
  }

  useEffect(() => {
    if (inView) controls.start("visible")
  }, [controls, inView])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleReviews(1)
      } else if (window.innerWidth < 1024) {
        setVisibleReviews(2)
      } else {
        setVisibleReviews(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? settings.reviews.length - visibleReviews : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= settings.reviews.length - visibleReviews ? 0 : prev + 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 8000)
    return () => clearInterval(interval)
  }, [visibleReviews])

  return (
    <section className="corporate-section pt-24 bg-white">
      <div className="corporate-container">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">{settings.title}</h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">{settings.subtitle}</p>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-md p-4 mb-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-brand-orange text-white rounded-md p-3 mr-4">
              <span className="text-2xl font-bold">{settings.overallRating}</span>
            </div>
            <div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600">Based on {settings.reviewCount} verified reviews</p>
            </div>
          </div>

          {/* Platforms */}
          <div className="flex flex-wrap justify-center gap-2">
            {settings.platforms.map((platform: any, idx: number) => (
              <div key={idx} className="flex items-center bg-white px-3 py-1 rounded border border-gray-200 text-xs">
                <Image src="/placeholder.svg" alt={platform.name} width={20} height={20} className="mr-1" />
                <span>
                  {platform.rating} on {platform.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Carousel */}
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls} className="relative">
          {/* Prev Button */}
          <div className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2">
            <Button
              onClick={handlePrev}
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-sm hover:bg-gray-100 h-10 w-10 border-brand-green"
            >
              <ChevronLeft className="h-4 w-4 text-brand-green" />
            </Button>
          </div>

          {/* Review Cards */}
          <div className="overflow-hidden px-4 sm:px-8">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleReviews)}%)` }}
            >
              {settings.reviews.map((review: any) => (
                <div key={review.id} className="flex-shrink-0 px-2" style={{ width: `${100 / visibleReviews}%` }}>
                  <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <div className="bg-gray-100 rounded-full p-2 mr-3">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">{review.name}</h4>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {review.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                        <Image src="/placeholder.svg" alt={review.source} width={14} height={14} className="mr-1" />
                        {review.source}
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex mb-2 space-x-1">
                      {[...Array(review.rating)].map((_: any, i: number) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-sm text-gray-600 mb-3 flex-grow">"{review.text}"</p>

                    {/* Footer */}
                    <div className="flex justify-between items-center text-xs text-gray-500 pt-3 border-t border-gray-100">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {review.date}
                      </div>
                      {review.verified && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified Customer
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <div className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2">
            <Button
              onClick={handleNext}
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-sm hover:bg-gray-100 h-10 w-10 border-brand-green"
            >
              <ChevronRight className="h-4 w-4 text-brand-green" />
            </Button>
          </div>
        </motion.div>

        {/* Dots */}
        <div className="mt-6 flex justify-center">
          {settings.reviews.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full mx-1 transition-colors ${
                index >= currentIndex && index < currentIndex + visibleReviews ? "bg-brand-orange" : "bg-gray-300"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <Link href="/testimonials">
            <Button variant="outline" className="text-sm border-brand-green text-brand-green hover:bg-brand-green/10">
              View All Reviews
              <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
