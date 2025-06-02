"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Star, ChevronLeft, ChevronRight, User, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

const reviews = [
  // ... same review data
]

export default function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const controls = useAnimation()
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inView) controls.start("visible")
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const handlePrev = () =>
    setCurrentIndex(prev => (prev === 0 ? reviews.length - 1 : prev - 1))

  const handleNext = () =>
    setCurrentIndex(prev => (prev === reviews.length - 1 ? 0 : prev + 1))

  useEffect(() => {
    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: currentIndex * sliderRef.current.offsetWidth,
        behavior: "smooth",
      })
    }
  }, [currentIndex])

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our roofing services.
          </p>
        </div>

        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls} className="relative">
          {/* Arrows */}
          <div className="hidden md:block absolute top-1/2 left-4 z-10 -translate-y-1/2">
            <Button onClick={handlePrev} variant="outline" size="icon" className="rounded-full bg-white shadow hover:bg-gray-100 h-12 w-12 md:h-14 md:w-14 border-brand-green">
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8 text-brand-green" />
            </Button>
          </div>

          <div className="overflow-hidden">
            <div
              ref={sliderRef}
              className="flex transition-transform ease-in-out duration-500 w-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="min-w-full px-4 sm:px-8">
                  <div className="bg-white rounded-2xl shadow p-6 sm:p-10 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                      {/* Avatar + Info */}
                      <div className="md:w-1/3 flex flex-col items-center text-center md:text-left">
                        <div className="bg-brand-green/10 p-6 rounded-full mb-4">
                          <User className="h-10 w-10 text-brand-green" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-800">{review.name}</h4>
                        <div className="flex items-center justify-center md:justify-start text-gray-600 mt-1">
                          <MapPin className="h-4 w-4 mr-1 text-brand-green" />
                          <p className="text-sm">{review.location}</p>
                        </div>
                        <div className="flex mt-2 justify-center md:justify-start">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>

                      {/* Review Text */}
                      <div className="md:w-2/3">
                        <p className="text-gray-600 italic text-base sm:text-lg mb-4">"{review.text}"</p>
                        <div className="flex items-center text-gray-500">
                          <Calendar className="h-4 w-4 mr-2 text-brand-green" />
                          <p className="text-sm sm:text-base">{review.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <div className="hidden md:block absolute top-1/2 right-4 z-10 -translate-y-1/2">
            <Button onClick={handleNext} variant="outline" size="icon" className="rounded-full bg-white shadow hover:bg-gray-100 h-12 w-12 md:h-14 md:w-14 border-brand-green">
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8 text-brand-green" />
            </Button>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                  currentIndex === index ? "bg-brand-orange" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Star Icons Section */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex justify-center">
              <div className={`p-4 rounded-lg ${index % 2 === 0 ? "bg-brand-green/10" : "bg-brand-orange/10"}`}>
                <Star className="h-6 w-6 text-brand-green" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
