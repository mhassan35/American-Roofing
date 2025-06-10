"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"

interface GalleryProps {
  content?: any
}

export default function Gallery({ content }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const settings = content || {
    title: "Before & After Gallery",
    subtitle: "See the transformation our roofing services can make with these real projects from Houston homeowners.",
    projects: [
      {
        id: 1,
        title: "Complete Roof Replacement",
        beforeImage: "/placeholder.svg?height=300&width=400",
        afterImage: "/placeholder.svg?height=300&width=400",
        description: "Storm-damaged roof transformed with premium architectural shingles",
      },
      {
        id: 2,
        title: "Hail Damage Restoration",
        beforeImage: "/placeholder.svg?height=300&width=400",
        afterImage: "/placeholder.svg?height=300&width=400",
        description: "Insurance claim restoration with upgraded materials",
      },
      {
        id: 3,
        title: "Leak Repair & Restoration",
        beforeImage: "/placeholder.svg?height=300&width=400",
        afterImage: "/placeholder.svg?height=300&width=400",
        description: "Emergency leak repair with full section replacement",
      },
    ],
  }

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % settings.projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + settings.projects.length) % settings.projects.length)
  }

  const currentProject = settings.projects[currentIndex]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{settings.title}</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{settings.subtitle}</p>
        </div>

        {/* Main Gallery Display */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8 min-h-[500px]">
            {/* Before/After Toggle */}
            <div className="absolute top-6 left-6 z-10">
              <div className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold">AFTER</div>
            </div>

            {/* Enlarge Button */}
            <div className="absolute top-6 right-6 z-10">
              <Button variant="outline" size="icon" className="bg-white/80 hover:bg-white border-0 rounded-full">
                <Expand className="h-4 w-4" />
              </Button>
            </div>

            {/* Main Image */}
            <div className="flex items-center justify-center h-full">
              <div className="relative w-full max-w-2xl">
                <Image
                  src={currentProject.afterImage || "/placeholder.svg"}
                  alt={currentProject.title}
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg"
                />

                {/* Orange Circle with House Icon */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                      <div className="w-4 h-4 bg-orange-500 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevProject}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-0 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={nextProject}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-0 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Project Info */}
          <div className="text-center mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentProject.title}</h3>
            <p className="text-gray-600 mb-6">{currentProject.description}</p>

            {/* Project Indicators */}
            <div className="flex justify-center space-x-2">
              {settings.projects.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-orange-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
