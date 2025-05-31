"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Star, ChevronLeft, ChevronRight, User, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    id: 1,
    name: "Jennifer L.",
    location: "Houston, TX",
    rating: 5,
    text: "American Roofing replaced our entire roof after a major storm. Their team was professional, efficient, and the quality of work exceeded our expectations. They even helped with our insurance claim!",
    date: "June 15, 2023",
  },
  {
    id: 2,
    name: "Michael T.",
    location: "Katy, TX",
    rating: 5,
    text: "I had several roofing companies give me quotes, but American Roofing stood out with their detailed assessment and fair pricing. The work was completed on schedule and my new roof looks fantastic.",
    date: "August 3, 2023",
  },
  {
    id: 3,
    name: "Sarah W.",
    location: "The Woodlands, TX",
    rating: 5,
    text: "After a small leak during a heavy rain, American Roofing came out the same day to assess the damage. Their repair was quick and affordable, and they even did a full inspection to make sure there weren't any other issues.",
    date: "September 22, 2023",
  },
  {
    id: 4,
    name: "Robert J.",
    location: "Pearland, TX",
    rating: 5,
    text: "The team at American Roofing was exceptional from start to finish. They guided me through the entire process, helped with material selection, and completed the installation with remarkable attention to detail.",
    date: "October 11, 2023",
  },
  {
    id: 5,
    name: "Lisa M.",
    location: "Sugar Land, TX",
    rating: 5,
    text: "I can't say enough good things about American Roofing. Their customer service is outstanding, and the quality of their work is top-notch. My new roof looks beautiful and was completed on time and on budget.",
    date: "November 5, 2023",
  },
]

export default function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0)
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1))
  }

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Scroll to current review
  useEffect(() => {
    if (sliderRef.current) {
      const scrollAmount = currentIndex * sliderRef.current.offsetWidth
      sliderRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }, [currentIndex])

  return (
    <section className="clickfunnels-section bg-white">
      <div className="clickfunnels-container">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our roofing services.
          </p>
        </div>

        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls} className="relative">
          <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
            <Button
              onClick={handlePrev}
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-gray-100 h-14 w-14 border-brand-green"
            >
              <ChevronLeft className="h-8 w-8 text-brand-green" />
            </Button>
          </div>

          <div ref={sliderRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="min-w-full px-12">
                  <div className="testimonial-card bg-white rounded-2xl shadow-soft p-10 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/4 flex flex-col items-center">
                        <div className="flat-icon flat-icon-primary p-6 rounded-full mb-6">
                          <User className="h-12 w-12" />
                        </div>
                        <h4 className="text-xl font-bold text-center text-gray-800">{review.name}</h4>
                        <div className="flex items-center mt-2 text-gray-600">
                          <MapPin className="h-4 w-4 mr-1 text-brand-green" />
                          <p className="text-lg">{review.location}</p>
                        </div>
                        <div className="flex items-center mt-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>

                      <div className="md:w-3/4">
                        <p className="text-xl text-gray-600 italic mb-6">"{review.text}"</p>
                        <div className="flex items-center text-gray-500">
                          <Calendar className="h-5 w-5 mr-2 text-brand-green" />
                          <p className="text-lg">{review.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
            <Button
              onClick={handleNext}
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-gray-100 h-14 w-14 border-brand-green"
            >
              <ChevronRight className="h-8 w-8 text-brand-green" />
            </Button>
          </div>

          <div className="flex justify-center mt-10 space-x-3">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-4 w-4 rounded-full transition-colors ${
                  currentIndex === index ? "bg-brand-orange" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex justify-center">
              <div
                className={`flat-icon ${index % 2 === 0 ? "flat-icon-primary" : "flat-icon-secondary"} p-4 rounded-lg`}
              >
                <Star className="h-8 w-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
