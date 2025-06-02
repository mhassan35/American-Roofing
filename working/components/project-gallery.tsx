"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Maximize2, X, Home, PenToolIcon as Tool } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Complete Roof Replacement",
    location: "Memorial, Houston",
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
    description: "Installation of a modern metal roof system on a newly constructed luxury home.",
    icon: Home,
    testimonial:
      "The metal roof not only looks stunning but has already helped with our energy bills during the hot Houston summer.",
    customerName: "The Williams Family",
  },
]

export default function ProjectGallery() {
  const [currentProject, setCurrentProject] = useState(0)
  const [showBefore, setShowBefore] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  // Auto-rotate projects
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isModalOpen) {
        nextProject()
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [isModalOpen])

  return (
    <section className="clickfunnels-section bg-brand-beige">
      <div className="clickfunnels-container">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Before & After Gallery</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the transformation our roofing services can make with these real projects from Houston homeowners.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <div className="relative aspect-[16/9]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentProject}-${showBefore ? "before" : "after"}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div
                    className={`w-full h-full ${showBefore ? "bg-gray-300" : "bg-gradient-to-r from-brand-green/20 to-brand-orange/20"} flex items-center justify-center`}
                  >
                    <div
                      className={`flat-icon ${showBefore ? "flat-icon-secondary" : "flat-icon-primary"} p-10 rounded-full`}
                    >
                      {projects[currentProject].icon &&
                        React.createElement(projects[currentProject].icon, { className: "h-20 w-20" })}
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-3xl font-bold mb-3">{projects[currentProject].title}</h3>
                    <p className="text-xl text-white/80 mb-3">{projects[currentProject].location}</p>
                    <p className="text-lg text-white/70">{projects[currentProject].description}</p>
                  </div>

                  <div className="absolute top-6 right-6 flex space-x-3">
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 text-lg"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <Maximize2 className="h-5 w-5 mr-2" />
                      Enlarge
                    </Button>
                  </div>

                  <div className="absolute top-6 left-6">
                    <span className="bg-brand-orange text-white px-6 py-2 rounded-full text-lg font-bold">
                      {showBefore ? "BEFORE" : "AFTER"}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute top-1/2 left-6 transform -translate-y-1/2 z-10">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 h-14 w-14"
                onClick={prevProject}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            </div>

            <div className="absolute top-1/2 right-6 transform -translate-y-1/2 z-10">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 h-14 w-14"
                onClick={nextProject}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div className="flex space-x-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`h-4 w-4 rounded-full transition-colors ${
                    currentProject === index ? "bg-brand-orange" : "bg-gray-300"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="lg"
              className="border-brand-green text-brand-green hover:bg-brand-green/10 text-lg font-medium"
              onClick={() => setShowBefore(!showBefore)}
            >
              Show {showBefore ? "After" : "Before"}
            </Button>
          </div>

          <div className="mt-10 bg-white p-8 rounded-xl shadow-soft">
            <div className="flex items-start">
              <div className="text-6xl text-brand-orange font-serif mr-6">"</div>
              <div>
                <p className="text-xl text-gray-600 italic mb-6">{projects[currentProject].testimonial}</p>
                <p className="text-xl font-medium text-gray-800">— {projects[currentProject].customerName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <Button
            variant="outline"
            size="icon"
            className="absolute top-6 right-6 rounded-full bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 h-14 w-14"
            onClick={() => setIsModalOpen(false)}
          >
            <X className="h-8 w-8" />
          </Button>

          <div className="relative w-full max-w-6xl aspect-[16/9] bg-gradient-to-r from-brand-green/20 to-brand-orange/20 flex items-center justify-center">
            <div className={`flat-icon ${showBefore ? "flat-icon-secondary" : "flat-icon-primary"} p-16 rounded-full`}>
              {projects[currentProject].icon &&
                React.createElement(projects[currentProject].icon, { className: "h-32 w-32" })}
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-6">
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-xl"
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
