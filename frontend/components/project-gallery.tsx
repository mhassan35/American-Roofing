"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ProjectGalleryProps {
  content?: {
    title?: string
    subtitle?: string
    categories?: string[]
  }
}

export default function ProjectGallery({ content }: ProjectGalleryProps) {
  const title = content?.title || "Recent Projects"
  const subtitle = content?.subtitle || "See our quality work in action"
  const categories = content?.categories || ["All", "Roof Replacement", "Roof Repair", "Storm Damage"]

  const [activeCategory, setActiveCategory] = useState("All")

  const projects = [
    {
      id: 1,
      title: "Complete Roof Replacement",
      category: "Roof Replacement",
      image: "/placeholder.svg?height=300&width=400",
      description: "Modern shingle installation",
    },
    {
      id: 2,
      title: "Storm Damage Repair",
      category: "Storm Damage",
      image: "/placeholder.svg?height=300&width=400",
      description: "Hail damage restoration",
    },
    {
      id: 3,
      title: "Emergency Leak Repair",
      category: "Roof Repair",
      image: "/placeholder.svg?height=300&width=400",
      description: "Quick leak fix",
    },
    {
      id: 4,
      title: "Commercial Roofing",
      category: "Commercial",
      image: "/placeholder.svg?height=300&width=400",
      description: "Large commercial project",
    },
    {
      id: 5,
      title: "Residential Replacement",
      category: "Roof Replacement",
      image: "/placeholder.svg?height=300&width=400",
      description: "Family home renovation",
    },
    {
      id: 6,
      title: "Gutter Installation",
      category: "Gutters",
      image: "/placeholder.svg?height=300&width=400",
      description: "Complete gutter system",
    },
  ]

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-200">{project.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
