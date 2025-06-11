"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Maximize2, X, Home, PenToolIcon as Tool } from "lucide-react"

interface GalleryProps {
  content?: any
}

export default function Gallery({ content }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showBefore, setShowBefore] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const settings = content || {
    title: "Before & After Gallery",
    subtitle: "See the transformation our roofing services can make with these real projects from Houston homeowners.",
    projects: [
      {
        id: 1,
        title: "Complete Roof Replacement",
        location: "Memorial, Houston",
        beforeImage: "/placeholder.svg?height=300&width=400",
        afterImage: "/placeholder.svg?height=300&width=400",
        description: "Full replacement of an aging shingle roof with premium architectural shingles.",
        icon: Home,
        testimonial:
          "The transformation is incredible! Our home looks brand new and we've already received compliments from neighbors.",
        customerName: "The Johnson Family",
      },
      {
        id: 2,
        title: "Storm Damage Restoration",
        location: "Katy, TX",
        beforeImage: "/placeholder.svg?height=300&width=400",
        afterImage: "/placeholder.svg?height=300&width=400",
        description: "Comprehensive repair and partial replacement after severe hail damage.",
        icon: Tool,
        testimonial:
          "American Roofing was there for us when we needed them most. They handled our insurance claim and restored our roof quickly.",
        customerName: "David & Susan Miller",
      },
      {
        id: 3,
        title: "New Construction Roofing",
        location: "The Woodlands, TX",
        beforeImage: "/placeholder.svg?height=300&width=400",
        afterImage: "/placeholder.svg?height=300&width=400",
        description: "Installation of a modern metal roof system on a newly constructed luxury home.",
        icon: Home,
        testimonial:
          "The metal roof not only looks stunning but has already helped with our energy bills during the hot Houston summer.",
        customerName: "The Williams Family",
      },
    ],
  }

  const nextProject = () => setCurrentIndex((prev) => (prev + 1) % settings.projects.length)
  const prevProject = () => setCurrentIndex((prev) => (prev - 1 + settings.projects.length) % settings.projects.length)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isModalOpen) nextProject()
    }, 6000)
    return () => clearInterval(interval)
  }, [isModalOpen])

  const currentProject = settings.projects[currentIndex]

  return (
    <section className="bg-brand-beige px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">{settings.title}</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">{settings.subtitle}</p>
        </div>

        {/* Carousel */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <div className="relative aspect-[16/9] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentIndex}-${showBefore}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div
                  className={`w-full h-full ${
                    showBefore ? "bg-gray-300" : "bg-gradient-to-r from-brand-green/20 to-brand-orange/20"
                  } flex items-center justify-center`}
                >
                  <div
                    className={`flat-icon ${
                      showBefore ? "flat-icon-secondary" : "flat-icon-primary"
                    } p-10 sm:p-12 md:p-16 rounded-full`}
                  >
                    {React.createElement(currentProject.icon || Home, {
                      className: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24",
                    })}
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{currentProject.title}</h3>
                  <p className="text-base sm:text-lg text-white/80 mb-2">{currentProject.location}</p>
                  <p className="text-sm sm:text-base text-white/70">{currentProject.description}</p>
                </div>

                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/20 text-white text-sm sm:text-base hover:bg-white/30"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Enlarge
                  </Button>
                </div>

                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                  <span className="bg-brand-orange text-white px-4 sm:px-6 py-1 sm:py-2 rounded-full text-sm sm:text-base font-bold">
                    {showBefore ? "BEFORE" : "AFTER"}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/20 text-white hover:bg-white/30 h-10 w-10 sm:h-12 sm:w-12"
              onClick={prevProject}
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/20 text-white hover:bg-white/30 h-10 w-10 sm:h-12 sm:w-12"
              onClick={nextProject}
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
          <div className="flex space-x-2 sm:space-x-3">
            {settings.projects.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full transition-colors ${
                  currentIndex === index ? "bg-brand-orange" : "bg-gray-300"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="border-brand-green text-brand-green hover:bg-brand-green/10 text-sm sm:text-base font-medium"
            onClick={() => setShowBefore(!showBefore)}
          >
            Show {showBefore ? "After" : "Before"}
          </Button>
        </div>

        {/* Testimonial */}
        <div className="mt-10 bg-white p-6 sm:p-8 rounded-xl shadow-soft">
          <div className="flex flex-col sm:flex-row items-start">
            <div className="text-5xl sm:text-6xl text-brand-orange font-serif mr-4 sm:mr-6">"</div>
            <div>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 italic mb-4">{currentProject.testimonial}</p>
              <p className="text-base sm:text-lg font-medium text-gray-800">— {currentProject.customerName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 rounded-full bg-white/10 text-white hover:bg-white/20 h-10 w-10 sm:h-14 sm:w-14"
            onClick={() => setIsModalOpen(false)}
          >
            <X className="h-5 w-5 sm:h-8 sm:w-8" />
          </Button>

          <div className="relative w-full max-w-3xl sm:max-w-6xl aspect-[16/9] bg-gradient-to-r from-brand-green/20 to-brand-orange/20 flex items-center justify-center">
            <div
              className={`flat-icon ${showBefore ? "flat-icon-secondary" : "flat-icon-primary"} p-10 sm:p-16 rounded-full`}
            >
              {React.createElement(currentProject.icon || Home, {
                className: "h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32",
              })}
            </div>
          </div>

          <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white hover:bg-white/20 text-sm sm:text-lg"
              onClick={() => setShowBefore(!showBefore)}
            >
              Show {showBefore ? "After" : "Before"}
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
