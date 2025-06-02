"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Star, ChevronLeft, ChevronRight, User, MapPin, Calendar, Award, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const reviews = [
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
  {
    id: 4,
    name: "Robert J.",
    location: "Pearland, TX",
    rating: 5,
    text: "The team at American Roofing was exceptional from start to finish. They guided me through the entire process, helped with material selection, and completed the installation with remarkable attention to detail.",
    date: "October 11, 2023",
    source: "HomeAdvisor",
    verified: true,
  },
  {
    id: 5,
    name: "Lisa M.",
    location: "Sugar Land, TX",
    rating: 5,
    text: "I can't say enough good things about American Roofing. Their customer service is outstanding, and the quality of their work is top-notch. My new roof looks beautiful and was completed on time and on budget.",
    date: "November 5, 2023",
    source: "Google",
    verified: true,
  },
  {
    id: 6,
    name: "David H.",
    location: "Cypress, TX",
    rating: 5,
    text: "American Roofing provided excellent service from the initial consultation to the final inspection. The crew was professional, courteous, and cleaned up thoroughly after completing the job.",
    date: "December 12, 2023",
    source: "BBB",
    verified: true,
  },
  {
    id: 7,
    name: "Amanda R.",
    location: "Spring, TX",
    rating: 5,
    text: "We had storm damage and American Roofing helped us navigate the insurance process seamlessly. They were patient, knowledgeable, and delivered exceptional quality work.",
    date: "January 8, 2024",
    source: "Google",
    verified: true,
  },
  {
    id: 8,
    name: "Thomas B.",
    location: "Bellaire, TX",
    rating: 5,
    text: "From start to finish, American Roofing was professional, responsive, and thorough. They explained everything clearly and delivered exactly what they promised. Highly recommend!",
    date: "February 15, 2024",
    source: "Angi",
    verified: true,
  },
]

const trustBadges = [
  { name: "BBB A+ Rating", icon: Award },
  { name: "GAF Certified", icon: Shield },
  { name: "Owens Corning Preferred", icon: Award },
  { name: "CertainTeed SELECT ShingleMaster", icon: Shield },
  { name: "HomeAdvisor Top Rated", icon: Star },
  { name: "Angi Super Service Award", icon: Award },
]

export default function EnhancedSocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleReviews, setVisibleReviews] = useState(3)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const controls = useAnimation()
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
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
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      return newIndex < 0 ? reviews.length - visibleReviews : newIndex
    })
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1
      return newIndex > reviews.length - visibleReviews ? 0 : newIndex
    })
  }

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 8000)

    return () => clearInterval(interval)
  }, [visibleReviews])

  const reviewsToShow = []
  for (let i = 0; i < visibleReviews; i++) {
    const index = (currentIndex + i) % reviews.length
    reviewsToShow.push(reviews[index])
  }

  return (
    <section className="corporate-section bg-white">
      <div className="corporate-container">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">What Our Customers Say</h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Join over 3,000 satisfied homeowners who trust American Roofing for quality, reliability, and exceptional
            service.
          </p>
        </div>

        {/* Review summary */}
        <div className="bg-gray-50 rounded-md p-4 mb-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-brand-orange text-white rounded-md p-3 mr-4">
              <span className="text-2xl font-bold">4.9</span>
            </div>
            <div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600">Based on 300+ verified reviews</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <div className="flex items-center bg-white px-3 py-1 rounded border border-gray-200">
              <Image src="/placeholder.svg?height=20&width=20" alt="Google" width={20} height={20} className="mr-1" />
              <span className="text-xs">4.9 on Google</span>
            </div>
            <div className="flex items-center bg-white px-3 py-1 rounded border border-gray-200">
              <Image src="/placeholder.svg?height=20&width=20" alt="Facebook" width={20} height={20} className="mr-1" />
              <span className="text-xs">4.8 on Facebook</span>
            </div>
            <div className="flex items-center bg-white px-3 py-1 rounded border border-gray-200">
              <Image src="/placeholder.svg?height=20&width=20" alt="BBB" width={20} height={20} className="mr-1" />
              <span className="text-xs">A+ on BBB</span>
            </div>
            <div className="flex items-center bg-white px-3 py-1 rounded border border-gray-200">
              <Image
                src="/placeholder.svg?height=20&width=20"
                alt="HomeAdvisor"
                width={20}
                height={20}
                className="mr-1"
              />
              <span className="text-xs">5.0 on HomeAdvisor</span>
            </div>
          </div>
        </div>

        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls} className="relative">
          <div className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2">
            <Button
              onClick={handlePrev}
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-sm hover:bg-gray-100 h-8 w-8 border-brand-green"
            >
              <ChevronLeft className="h-4 w-4 text-brand-green" />
            </Button>
          </div>

          <div className="overflow-hidden px-8">
            <div
              className="flex gap-4 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleReviews)}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-2">
                  <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 h-full flex flex-col">
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
                        <Image
                          src="/placeholder.svg?height=14&width=14"
                          alt={review.source}
                          width={14}
                          height={14}
                          className="mr-1"
                        />
                        {review.source}
                      </div>
                    </div>

                    <div className="flex mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    <p className="text-sm text-gray-600 mb-3 flex-grow">"{review.text}"</p>

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

          <div className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2">
            <Button
              onClick={handleNext}
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-sm hover:bg-gray-100 h-8 w-8 border-brand-green"
            >
              <ChevronRight className="h-4 w-4 text-brand-green" />
            </Button>
          </div>
        </motion.div>

        <div className="mt-6 flex justify-center">
          {reviews.map((_, index) => (
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

        <div className="mt-8 text-center">
          <Link href="/testimonials">
            <Button variant="outline" className="text-sm border-brand-green text-brand-green hover:bg-brand-green/10">
              View All Reviews
              <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h3 className="text-center text-lg font-semibold mb-6 text-gray-800">
            Trusted By Homeowners & Industry Leaders
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex flex-col items-center justify-center bg-gray-50 p-3 rounded-md">
                <div
                  className={`flat-icon ${index % 2 === 0 ? "flat-icon-primary" : "flat-icon-secondary"} p-2 rounded-md mb-2`}
                >
                  <badge.icon className="h-4 w-4" />
                </div>
                <span className="text-xs text-center text-gray-700">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer satisfaction stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <div className="text-2xl font-bold text-brand-orange mb-1">3,000+</div>
            <div className="text-xs text-gray-600">Happy Customers</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <div className="text-2xl font-bold text-brand-orange mb-1">15+</div>
            <div className="text-xs text-gray-600">Years Experience</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <div className="text-2xl font-bold text-brand-orange mb-1">100%</div>
            <div className="text-xs text-gray-600">Satisfaction Guarantee</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <div className="text-2xl font-bold text-brand-orange mb-1">5,000+</div>
            <div className="text-xs text-gray-600">Projects Completed</div>
          </div>
        </div>
      </div>
    </section>
  )
}
