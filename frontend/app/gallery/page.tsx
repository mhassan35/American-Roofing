"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Maximize2, Home, Wrench, CloudLightning, Droplets, Filter } from "lucide-react"
import Link from "next/link"
import { useContentStore } from "@/lib/store"

// Project categories - keep original structure
const categories = [
  { id: "all", label: "All Projects" },
  { id: "replacement", label: "Roof Replacement", icon: Home },
  { id: "repair", label: "Roof Repair", icon: Wrench },
  { id: "storm", label: "Storm Damage", icon: CloudLightning },
  { id: "gutters", label: "Gutter Projects", icon: Droplets },
]

// Project data - keep original data exactly as it was
const projects = [
  {
    id: 1,
    title: "Complete Roof Replacement",
    location: "Memorial, Houston",
    category: "replacement",
    description: "Full replacement of an aging shingle roof with premium architectural shingles.",
    testimonial:
      "The transformation is incredible! Our home looks brand new and we've already received compliments from neighbors.",
    customerName: "The Johnson Family",
    date: "January 2024",
  },
  {
    id: 2,
    title: "Storm Damage Restoration",
    location: "Katy, TX",
    category: "storm",
    description: "Comprehensive repair and partial replacement after severe hail damage.",
    testimonial:
      "American Roofing was there for us when we needed them most. They handled our insurance claim and restored our roof quickly.",
    customerName: "David & Susan Miller",
    date: "February 2024",
  },
  {
    id: 3,
    title: "New Construction Roofing",
    location: "The Woodlands, TX",
    category: "replacement",
    description: "Installation of a modern metal roof system on a newly constructed luxury home.",
    testimonial:
      "The metal roof not only looks stunning but has already helped with our energy bills during the hot Houston summer.",
    customerName: "The Williams Family",
    date: "March 2024",
  },
  {
    id: 4,
    title: "Gutter System Installation",
    location: "Pearland, TX",
    category: "gutters",
    description: "Complete gutter system installation with leaf guards and downspout extensions.",
    testimonial:
      "The new gutters have made a huge difference during heavy rains. No more water pooling around our foundation!",
    customerName: "Robert & Maria Garcia",
    date: "February 2024",
  },
  {
    id: 5,
    title: "Roof Leak Repair",
    location: "Sugar Land, TX",
    category: "repair",
    description: "Identification and repair of multiple leak points and damaged flashing.",
    testimonial: "They found leaks that two other companies missed. Fast, professional service at a fair price.",
    customerName: "James Wilson",
    date: "January 2024",
  },
  {
    id: 6,
    title: "Hurricane Damage Restoration",
    location: "League City, TX",
    category: "storm",
    description: "Extensive repairs following hurricane damage, including shingle replacement and structural repairs.",
    testimonial:
      "American Roofing helped us through a difficult time after the hurricane. They worked directly with our insurance and made the process stress-free.",
    customerName: "The Martinez Family",
    date: "March 2024",
  },
  {
    id: 7,
    title: "Skylight Installation",
    location: "Bellaire, TX",
    category: "repair",
    description: "Installation of energy-efficient skylights with proper flashing and waterproofing.",
    testimonial:
      "The skylights have transformed our living room with natural light. The installation was flawless with no leaks.",
    customerName: "Sarah & Michael Thompson",
    date: "February 2024",
  },
  {
    id: 8,
    title: "Commercial Roof Replacement",
    location: "Downtown Houston",
    category: "replacement",
    description: "Complete replacement of a 15,000 sq ft commercial flat roof with a modern TPO system.",
    testimonial:
      "American Roofing completed our commercial project on time and on budget with minimal disruption to our business operations.",
    customerName: "Houston Business Center",
    date: "January 2024",
  },
  {
    id: 9,
    title: "Seamless Gutter Replacement",
    location: "Kingwood, TX",
    category: "gutters",
    description: "Removal of old sectional gutters and installation of new seamless gutters with proper drainage.",
    testimonial:
      "The seamless gutters look so much better than our old ones and function perfectly. Great attention to detail!",
    customerName: "The Anderson Family",
    date: "March 2024",
  },
]

export default function GalleryPage() {
  const { getPageContent } = useContentStore()
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [currentProject, setCurrentProject] = useState(0)
  const [showBefore, setShowBefore] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const pageContent = getPageContent("gallery")

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((project) => project.category === activeCategory))
    }
    setCurrentProject(0)
  }, [activeCategory])

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % filteredProjects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)
  }

  // Get hero content from store or use defaults
  const heroComponent = pageContent?.components.find((c) => c.type === "hero" && c.isActive)
  const heroTitle = heroComponent?.settings?.title || "Project Gallery"
  const heroSubtitle =
    heroComponent?.settings?.subtitle ||
    "Browse our portfolio of completed roofing projects throughout the Houston area. See the quality of our work and the transformations we've achieved for our satisfied customers."

  return (
    <div className="pt-20">
      {/* Hero Section - now editable from admin */}
      <div className="bg-gray-50 py-10">
        <div className="corporate-container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">{heroTitle}</h1>
            <p className="text-base text-gray-600">{heroSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Keep all the original gallery functionality exactly as it was */}
      <div className="corporate-container py-6 border-b border-gray-100">
        <div className="flex items-center mb-2">
          <Filter className="h-4 w-4 text-brand-orange mr-2" />
          <h2 className="text-base font-semibold text-gray-800">Filter Projects</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`text-xs ${
                activeCategory === category.id
                  ? "bg-brand-orange hover:bg-brand-orange/90 text-white"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon && <category.icon className="h-3 w-3 mr-1" />}
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Project - keep original functionality */}
      <div className="corporate-container py-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Featured Project</h2>

        <div className="relative rounded-md overflow-hidden shadow-sm">
          <div className="relative aspect-[16/9]">
            <div className="absolute inset-0">
              <div
                className={`w-full h-full ${showBefore ? "bg-gray-300" : "bg-gradient-to-r from-brand-green/20 to-brand-orange/20"} flex items-center justify-center`}
              >
                {showBefore ? (
                  <div className="text-center">
                    <div className="flat-icon flat-icon-secondary p-3 rounded-full inline-block mb-2">
                      <Home className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium text-gray-600">Before</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="flat-icon flat-icon-primary p-3 rounded-full inline-block mb-2">
                      <Home className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium text-gray-600">After</p>
                  </div>
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                <h3 className="text-lg md:text-xl font-semibold mb-1">{filteredProjects[currentProject].title}</h3>
                <p className="text-sm text-white/80 mb-1">{filteredProjects[currentProject].location}</p>
                <p className="text-xs text-white/70">{filteredProjects[currentProject].description}</p>
              </div>

              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 text-xs"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Maximize2 className="h-3 w-3 mr-1" />
                  Enlarge
                </Button>
              </div>

              <div className="absolute top-4 left-4">
                <span className="bg-brand-orange text-white px-3 py-1 rounded-md text-xs font-medium">
                  {showBefore ? "BEFORE" : "AFTER"}
                </span>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 h-8 w-8"
              onClick={prevProject}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 h-8 w-8"
              onClick={nextProject}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-1">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  currentProject === index ? "bg-brand-orange" : "bg-gray-300"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="border-brand-green text-brand-green hover:bg-brand-green/10 text-xs"
            onClick={() => setShowBefore(!showBefore)}
          >
            Show {showBefore ? "After" : "Before"}
          </Button>
        </div>

        <div className="mt-6 bg-white p-4 rounded-md shadow-sm">
          <div className="flex items-start">
            <div className="text-3xl text-brand-orange font-serif mr-3">"</div>
            <div>
              <p className="text-sm text-gray-600 italic mb-3">{filteredProjects[currentProject].testimonial}</p>
              <p className="text-sm font-medium text-gray-800">— {filteredProjects[currentProject].customerName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Grid - keep original */}
      <div className="corporate-container py-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">All Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-md shadow-sm overflow-hidden">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-green/20 to-brand-orange/10 flex items-center justify-center">
                  {project.category === "replacement" && <Home className="h-8 w-8 text-brand-orange" />}
                  {project.category === "repair" && <Wrench className="h-8 w-8 text-brand-orange" />}
                  {project.category === "storm" && <CloudLightning className="h-8 w-8 text-brand-orange" />}
                  {project.category === "gutters" && <Droplets className="h-8 w-8 text-brand-orange" />}
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-medium">{project.date}</span>
                </div>
                <div className="absolute top-3 right-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/80 backdrop-blur-sm border-white/30 text-gray-800 hover:bg-white text-xs h-7 px-2"
                  >
                    Before/After
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold mb-1 text-gray-800">{project.title}</h3>
                <p className="text-xs text-gray-500 mb-2">{project.location}</p>
                <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-brand-green text-brand-green hover:bg-brand-green/10 text-xs"
                  onClick={() => {
                    setCurrentProject(filteredProjects.indexOf(project))
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Categories - keep original */}
      <div className="corporate-container py-8 border-t border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Browse By Category</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/gallery?category=replacement" className="block">
            <div className="bg-white rounded-md shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="flat-icon flat-icon-primary p-3 rounded-full inline-block mb-3">
                <Home className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold mb-2 text-gray-800">Roof Replacements</h3>
              <p className="text-sm text-gray-600">
                View our complete roof replacement projects with before and after photos.
              </p>
            </div>
          </Link>

          <Link href="/gallery?category=repair" className="block">
            <div className="bg-white rounded-md shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="flat-icon flat-icon-secondary p-3 rounded-full inline-block mb-3">
                <Wrench className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold mb-2 text-gray-800">Roof Repairs</h3>
              <p className="text-sm text-gray-600">
                See how we've fixed leaks, damaged shingles, and other roofing issues.
              </p>
            </div>
          </Link>

          <Link href="/gallery?category=storm" className="block">
            <div className="bg-white rounded-md shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="flat-icon flat-icon-primary p-3 rounded-full inline-block mb-3">
                <CloudLightning className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold mb-2 text-gray-800">Storm Damage</h3>
              <p className="text-sm text-gray-600">Browse our storm damage restoration projects throughout Houston.</p>
            </div>
          </Link>

          <Link href="/gallery?category=gutters" className="block">
            <div className="bg-white rounded-md shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="flat-icon flat-icon-secondary p-3 rounded-full inline-block mb-3">
                <Droplets className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold mb-2 text-gray-800">Gutter Projects</h3>
              <p className="text-sm text-gray-600">
                View our gutter installation and repair projects for Houston homes.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* CTA Section - keep original */}
      <div className="corporate-container py-8 mb-8">
        <div className="bg-brand-orange/10 rounded-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Ready to Transform Your Roof?</h2>
          <p className="text-sm text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact American Roofing today to schedule a free consultation and join our growing list of satisfied
            customers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white text-sm">Get a Free Estimate</Button>
            <Button
              variant="outline"
              className="border-brand-green text-brand-green hover:bg-brand-green/10 text-sm"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Full-screen modal - keep original */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 rounded-full bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 h-8 w-8"
            onClick={() => setIsModalOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="relative w-full max-w-4xl aspect-[16/9] bg-gradient-to-r from-brand-green/20 to-brand-orange/20 flex items-center justify-center">
            <div className="text-center">
              <div
                className={`flat-icon ${showBefore ? "flat-icon-secondary" : "flat-icon-primary"} p-6 rounded-full inline-block mb-3`}
              >
                {filteredProjects[currentProject].category === "replacement" && <Home className="h-10 w-10" />}
                {filteredProjects[currentProject].category === "repair" && <Wrench className="h-10 w-10" />}
                {filteredProjects[currentProject].category === "storm" && <CloudLightning className="h-10 w-10" />}
                {filteredProjects[currentProject].category === "gutters" && <Droplets className="h-10 w-10" />}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{filteredProjects[currentProject].title}</h3>
              <p className="text-sm text-white/80">{filteredProjects[currentProject].location}</p>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-sm"
              onClick={() => setShowBefore(!showBefore)}
            >
              Show {showBefore ? "After" : "Before"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
