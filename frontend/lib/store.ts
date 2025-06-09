"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

// Define types
export type ComponentType =
  | "hero"
  | "services"
  | "why-choose"
  | "social-proof"
  | "gallery"
  | "cta"
  | "floating-cta"
  | "about-content"
  | "contact-form"
  | "service-layout"
  | "service-benefits"
  | "service-process"
  | "service-faqs"

export type PageType =
  | "home"
  | "about"
  | "contact"
  | "services"
  | "roof-replacement"
  | "roof-repair"
  | "storm-damage"
  | "gallery"

export type CategoryType = "main" | "service" | "utility"

interface LeadFormState {
  isOpen: boolean
  openLeadForm: () => void
  closeLeadForm: () => void
}

export const useLeadFormStore = create<LeadFormState>((set) => ({
  isOpen: false,
  openLeadForm: () => set({ isOpen: true }),
  closeLeadForm: () => set({ isOpen: false }),
}))

// Lead Form Store (for modal open/close)
export interface Lead {
  _id: string // <-- MongoDB ID
  firstName: string
  lastName: string
  email: string
  phone: string
  service: string
  message: string
  date: string
  status: "new" | "contacted" | "completed"
  source: string
  urgency?: string
  propertyType?: string
  address?: string
  zipCode?: string
  photo?: string
}

interface LeadStore {
  leads: Lead[]
  addLead: (lead: Omit<Lead, "_id" | "date" | "status">) => void
  updateLeadStatus: (id: string, status: Lead["status"]) => void
  deleteLead: (id: string) => void
  getStats: () => {
    total: number
    new: number
    contacted: number
    completed: number
  }
  setLeads: (leadsFromDB: Lead[]) => void
}

export const useLeadStore = create<LeadStore>()(
  persist(
    (set, get) => ({
      leads: [],

      addLead: (leadData) =>
        set((state) => ({
          leads: [
            {
              ...leadData,
              _id: Math.random().toString(36).substring(2, 15), // Temporary ID for local testing
              date: new Date().toISOString().split("T")[0],
              status: "new",
            },
            ...state.leads,
          ],
        })),

      updateLeadStatus: (id, status) =>
        set((state) => ({
          leads: state.leads.map((lead) => (lead._id === id ? { ...lead, status } : lead)),
        })),

      deleteLead: async (_id) => {
        try {
          await fetch("http://localhost:8080/api/deletecontact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: _id }),
          })

          set((state) => ({
            leads: state.leads.filter((lead) => lead._id !== _id),
          }))
        } catch (err) {
          console.error("Failed to delete lead:", err)
        }
      },

      getStats: () => {
        const leads = get().leads
        return {
          total: leads.length,
          new: leads.filter((l) => l.status === "new").length,
          contacted: leads.filter((l) => l.status === "contacted").length,
          completed: leads.filter((l) => l.status === "completed").length,
        }
      },

      setLeads: (leadsFromDB) => set(() => ({ leads: leadsFromDB })),
    }),
    {
      name: "lead-storage",
    },
  ),
)

// Auth Store (now with persist middleware)
interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
  error: string | null
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => void
  clearError: () => void
}

const adminUser = {
  id: "admin001",
  email: "admin@americanroofing.com",
  password: "admin123",
  name: "Admin User",
  role: "Administrator",
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null })

        try {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000))

          if (credentials.email === adminUser.email && credentials.password === adminUser.password) {
            const { password, ...userWithoutPassword } = adminUser
            set({
              isAuthenticated: true,
              user: userWithoutPassword,
              isLoading: false,
              error: null,
            })
          } else {
            set({
              isAuthenticated: false,
              user: null,
              isLoading: false,
              error: "Invalid email or password",
            })
          }
        } catch (error) {
          set({
            isAuthenticated: false,
            user: null,
            isLoading: false,
            error: "Login failed. Please try again.",
          })
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: null,
        })
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: "admin-auth-storage",
    },
  ),
)

// UI Store (replaces uiSlice)
interface UIState {
  sidebarOpen: boolean
  activeTab: string
  isMobile: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setActiveTab: (tab: string) => void
  setIsMobile: (mobile: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  activeTab: "dashboard",
  isMobile: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setIsMobile: (mobile) => set({ isMobile: mobile }),
}))

// Enhanced Content Management Store with Images and SEO
export interface SEOData {
  title: string
  description: string
  keywords: string
  ogImage?: string
}

export interface ImageAsset {
  id: string
  url: string
  alt: string
  title?: string
}

export interface ComponentContent {
  id: string
  name: string
  type: ComponentType
  isActive: boolean
  settings: Record<string, any>
  images?: ImageAsset[]
}

export interface PageContent {
  id: string
  name: string
  path: string
  sections: number
  lastModified: string
  components: ComponentContent[]
  category: CategoryType
  seo: SEOData
  images: ImageAsset[]
}

// Complete initial pages data with ALL original frontend content
const initialPages: PageContent[] = [
  {
    id: "home",
    name: "Home Page",
    path: "/",
    sections: 7,
    lastModified: "2024-05-15",
    category: "main",
    seo: {
      title: "Houston's Most Trusted Roofing Pros | American Roofing",
      description:
        "Professional roofing services in Houston. Get a free estimate for roof replacement, repair, and storm damage restoration. Licensed & insured.",
      keywords: "roofing houston, roof repair, roof replacement, storm damage",
      ogImage: "/placeholder.svg?height=630&width=1200",
    },
    images: [
      { id: "hero-bg", url: "/placeholder.svg?height=600&width=1200", alt: "Professional roofing team at work" },
    ],
    components: [
      {
        id: "home-hero",
        name: "Hero Section",
        type: "hero",
        isActive: true,
        settings: {
          title: "Houston's Most Trusted Roofing Pros",
          subtitle: "Request a fast, free quote in under 60 seconds.",
          ctaText: "Get Free Estimate",
          features: ["Licensed & Insured", "4.9⭐ on Google", "Trusted by 3,000+ Homeowners"],
          backgroundImage: "/placeholder.svg?height=600&width=1200",
        },
      },
      {
        id: "home-services",
        name: "Services Overview",
        type: "services",
        isActive: true,
        settings: {
          title: "Our Roofing Services",
          subtitle: "Comprehensive solutions for all your roofing needs",
          services: [
            {
              title: "Roof Replacement",
              description: "Complete roof replacement with premium materials and expert installation.",
              icon: "home",
              link: "/services/roof-replacement",
            },
            {
              title: "Roof Repair",
              description: "Fast, reliable repairs for leaks, damaged shingles, and other roofing issues.",
              icon: "wrench",
              link: "/services/roof-repair",
            },
            {
              title: "Storm Damage Restoration",
              description: "Comprehensive restoration services for roofs damaged by storms and severe weather.",
              icon: "cloud",
              link: "/services/storm-damage",
            },
            {
              title: "Free Inspections",
              description: "Thorough roof inspections to identify potential issues before they become major problems.",
              icon: "search",
              link: "/services/inspections",
            },
            {
              title: "Gutter Services",
              description: "Installation, repair, and maintenance of gutters and downspouts to protect your home.",
              icon: "droplets",
              link: "/services/gutters",
            },
            {
              title: "Insurance Claim Help",
              description: "Expert assistance navigating the insurance claim process for roof damage.",
              icon: "file-text",
              link: "/services/insurance",
            },
          ],
        },
      },
      {
        id: "home-why-choose",
        name: "Why Choose Us",
        type: "why-choose",
        isActive: true,
        settings: {
          title: "Why Choose American Roofing?",
          subtitle: "We're committed to excellence in every project, from small repairs to complete roof replacements.",
          features: [
            {
              title: "Quality Guarantee",
              description: "We stand behind our work with comprehensive warranties and use only premium materials.",
              icon: "shield",
            },
            {
              title: "Expert Team",
              description: "Our certified professionals have years of experience and ongoing training.",
              icon: "users",
            },
            {
              title: "Award Winning",
              description: "Recognized for excellence with industry awards and customer satisfaction.",
              icon: "award",
            },
            {
              title: "Fast Response",
              description: "Quick response times for estimates and emergency repairs when you need us most.",
              icon: "clock",
            },
          ],
        },
      },
      {
        id: "home-social-proof",
        name: "Enhanced Social Proof",
        type: "social-proof",
        isActive: true,
        settings: {
          title: "What Our Customers Say",
          rating: "4.9",
          reviewCount: "250+",
          testimonials: [
            {
              name: "Sarah Johnson",
              text: "American Roofing did an amazing job on our roof replacement. The team was professional, efficient, and the quality of work exceeded our expectations. Highly recommend!",
              rating: 5,
            },
            {
              name: "Mike Rodriguez",
              text: "After the storm damaged our roof, American Roofing helped us through the entire insurance process and restored our roof quickly. Excellent service from start to finish.",
              rating: 5,
            },
            {
              name: "Jennifer Davis",
              text: "We had a persistent leak that other companies couldn't fix. American Roofing found the problem immediately and solved it permanently. Great work!",
              rating: 5,
            },
          ],
        },
      },
      {
        id: "home-gallery",
        name: "Project Gallery",
        type: "gallery",
        isActive: true,
        settings: {
          title: "Recent Projects",
          subtitle: "See our quality work in action",
          categories: ["All", "Roof Replacement", "Roof Repair", "Storm Damage", "Commercial"],
        },
      },
      {
        id: "home-cta",
        name: "Call to Action",
        type: "cta",
        isActive: true,
        settings: {
          title: "Ready to Get Started?",
          subtitle:
            "Contact us today for your free estimate and see why thousands of Houston homeowners trust American Roofing.",
          primaryCta: "Get Free Estimate",
          secondaryCta: "Call (713) 555-1234",
        },
      },
      {
        id: "home-floating-cta",
        name: "Floating CTA",
        type: "floating-cta",
        isActive: true,
        settings: {
          phone: "(713) 555-1234",
          ctaText: "Get Free Quote",
          showAfterScroll: 500,
        },
      },
    ],
  },
  {
    id: "about",
    name: "About Us",
    path: "/about",
    sections: 4,
    lastModified: "2024-05-10",
    category: "main",
    seo: {
      title: "About American Roofing | Houston's Trusted Roofing Experts",
      description:
        "Learn about American Roofing's 15+ years of experience serving Houston homeowners with quality roofing services.",
      keywords: "about american roofing, houston roofers, roofing company history",
      ogImage: "/placeholder.svg?height=630&width=1200",
    },
    images: [{ id: "about-hero", url: "/placeholder.svg?height=400&width=600", alt: "American Roofing team" }],
    components: [
      {
        id: "about-hero",
        name: "About Hero",
        type: "hero",
        isActive: true,
        settings: {
          title: "About American Roofing",
          subtitle:
            "Houston's most trusted roofing professionals with over 15 years of experience serving homeowners throughout the greater Houston area.",
          backgroundImage: "/placeholder.svg?height=600&width=1200",
        },
      },
      {
        id: "about-content",
        name: "Our Story Section",
        type: "about-content",
        isActive: true,
        settings: {
          story: {
            title: "Our Story",
            content:
              "Founded in 2008, American Roofing has been serving the Houston community with integrity, quality craftsmanship, and exceptional customer service. What started as a small family business has grown into one of Houston's most trusted roofing companies.\n\nWe understand that your roof is one of your home's most important investments. That's why we're committed to providing superior roofing solutions using only the highest quality materials and proven installation techniques.",
          },
          mission: {
            title: "Our Mission",
            content:
              "Our mission is to protect Houston homes and families by providing exceptional roofing services with unmatched quality, reliability, and customer satisfaction.",
          },
          credentials: [
            "Licensed & Insured",
            "BBB A+ Rating",
            "GAF Certified Installer",
            "Trusted by 3,000+ Homeowners",
            "15+ Years Experience",
            "Emergency Services Available",
          ],
        },
      },
      {
        id: "about-why-choose",
        name: "Why Choose Us Cards",
        type: "why-choose",
        isActive: true,
        settings: {
          title: "Why Choose American Roofing?",
          subtitle: "We're committed to excellence in every project, from small repairs to complete roof replacements.",
          features: [
            {
              title: "Quality Guarantee",
              description: "We stand behind our work with comprehensive warranties and use only premium materials.",
              icon: "shield",
            },
            {
              title: "Expert Team",
              description: "Our certified professionals have years of experience and ongoing training.",
              icon: "users",
            },
            {
              title: "Award Winning",
              description: "Recognized for excellence with industry awards and customer satisfaction.",
              icon: "award",
            },
            {
              title: "Fast Response",
              description: "Quick response times for estimates and emergency repairs when you need us most.",
              icon: "clock",
            },
          ],
        },
      },
      {
        id: "about-cta",
        name: "Ready to Get Started CTA",
        type: "cta",
        isActive: true,
        settings: {
          title: "Ready to Get Started?",
          subtitle:
            "Contact us today for your free estimate and see why thousands of Houston homeowners trust American Roofing.",
          primaryCta: "Get Free Estimate",
          secondaryCta: "Call (713) 555-1234",
        },
      },
    ],
  },
  {
    id: "contact",
    name: "Contact Us",
    path: "/contact",
    sections: 2,
    lastModified: "2024-05-14",
    category: "main",
    seo: {
      title: "Contact American Roofing | Free Estimates in Houston",
      description:
        "Contact American Roofing for free estimates on roofing services in Houston. Call (713) 555-1234 or fill out our contact form.",
      keywords: "contact roofing houston, free estimate, roofing quote",
      ogImage: "/placeholder.svg?height=630&width=1200",
    },
    images: [],
    components: [
      {
        id: "contact-hero",
        name: "Contact Hero",
        type: "hero",
        isActive: true,
        settings: {
          title: "Contact Us",
          subtitle:
            "Get in touch with Houston's most trusted roofing professionals. We're here to help with all your roofing needs.",
          backgroundImage: "/placeholder.svg?height=600&width=1200",
        },
      },
      {
        id: "contact-form",
        name: "Contact Form & Info",
        type: "contact-form",
        isActive: true,
        settings: {
          title: "Get Your Free Estimate",
          subtitle: "Fill out the form below and we'll get back to you within 24 hours",
          contactInfo: {
            phone: "(713) 555-1234",
            email: "info@americanroofing.com",
            address: "123 Main Street\nHouston, TX 77001",
            hours: "Mon - Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 4:00 PM\nSun: Emergency calls only",
          },
        },
      },
    ],
  },
  {
    id: "services",
    name: "Services Overview",
    path: "/services",
    sections: 3,
    lastModified: "2024-05-12",
    category: "main",
    seo: {
      title: "Roofing Services Houston | American Roofing",
      description:
        "Comprehensive roofing services in Houston including roof replacement, repair, storm damage restoration, and more. Free estimates available.",
      keywords: "roofing services houston, roof replacement, roof repair, storm damage",
      ogImage: "/placeholder.svg?height=630&width=1200",
    },
    images: [],
    components: [
      {
        id: "services-hero",
        name: "Services Hero",
        type: "hero",
        isActive: true,
        settings: {
          title: "Our Roofing Services",
          subtitle:
            "American Roofing provides comprehensive roofing solutions for homeowners throughout Houston and surrounding areas. From complete roof replacements to minor repairs, our team of experienced professionals is here to help.",
          backgroundImage: "/placeholder.svg?height=600&width=1200",
        },
      },
      {
        id: "services-grid",
        name: "Services Grid",
        type: "services",
        isActive: true,
        settings: {
          title: "Complete Roofing Solutions",
          subtitle: "Professional services for all your roofing needs",
          services: [
            {
              title: "Roof Replacement",
              description: "Complete roof replacement with premium materials and expert installation.",
              icon: "home",
              link: "/services/roof-replacement",
            },
            {
              title: "Roof Repair",
              description: "Fast, reliable repairs for leaks, damaged shingles, and other roofing issues.",
              icon: "wrench",
              link: "/services/roof-repair",
            },
            {
              title: "Storm Damage Restoration",
              description: "Comprehensive restoration services for roofs damaged by storms and severe weather.",
              icon: "cloud",
              link: "/services/storm-damage",
            },
            {
              title: "Free Inspections",
              description: "Thorough roof inspections to identify potential issues before they become major problems.",
              icon: "search",
              link: "/services/inspections",
            },
            {
              title: "Gutter Services",
              description: "Installation, repair, and maintenance of gutters and downspouts to protect your home.",
              icon: "droplets",
              link: "/services/gutters",
            },
            {
              title: "Insurance Claim Help",
              description: "Expert assistance navigating the insurance claim process for roof damage.",
              icon: "file-text",
              link: "/services/insurance",
            },
          ],
        },
      },
      {
        id: "services-process",
        name: "Our Process",
        type: "service-process",
        isActive: true,
        settings: {
          title: "Our Process",
          subtitle:
            "We follow a streamlined, customer-focused process to ensure your roofing project is completed efficiently and to your complete satisfaction.",
          steps: [
            {
              number: 1,
              title: "Consultation",
              description: "We'll discuss your needs, assess your current roof, and provide expert recommendations.",
            },
            {
              number: 2,
              title: "Proposal",
              description: "You'll receive a detailed, transparent proposal outlining the scope of work and costs.",
            },
            {
              number: 3,
              title: "Installation",
              description:
                "Our skilled team will complete your project with precision, quality, and attention to detail.",
            },
            {
              number: 4,
              title: "Satisfaction",
              description: "We'll ensure you're completely satisfied with our work and provide warranty information.",
            },
          ],
        },
      },
      {
        id: "services-cta",
        name: "Services CTA",
        type: "cta",
        isActive: true,
        settings: {
          title: "Ready to Get Started?",
          subtitle:
            "Contact American Roofing today to schedule a free consultation and estimate for your roofing project. Our team is ready to provide the quality service and expertise you deserve.",
          primaryCta: "Get a Free Estimate",
          secondaryCta: "Contact Us",
        },
      },
    ],
  },
  {
    id: "gallery",
    name: "Project Gallery",
    path: "/gallery",
    sections: 2,
    lastModified: "2024-05-10",
    category: "main",
    seo: {
      title: "Roofing Project Gallery | American Roofing Houston",
      description:
        "View our completed roofing projects in Houston. See examples of roof replacements, repairs, and storm damage restorations.",
      keywords: "roofing gallery houston, roof replacement examples, before after roofing",
      ogImage: "/placeholder.svg?height=630&width=1200",
    },
    images: [
      { id: "gallery-1", url: "/placeholder.svg?height=300&width=400", alt: "Roof replacement project 1" },
      { id: "gallery-2", url: "/placeholder.svg?height=300&width=400", alt: "Roof replacement project 2" },
      { id: "gallery-3", url: "/placeholder.svg?height=300&width=400", alt: "Storm damage repair" },
      { id: "gallery-4", url: "/placeholder.svg?height=300&width=400", alt: "Commercial roofing project" },
      { id: "gallery-5", url: "/placeholder.svg?height=300&width=400", alt: "Residential roof repair" },
      { id: "gallery-6", url: "/placeholder.svg?height=300&width=400", alt: "Gutter installation" },
    ],
    components: [
      {
        id: "gallery-hero",
        name: "Gallery Hero",
        type: "hero",
        isActive: true,
        settings: {
          title: "Project Gallery",
          subtitle:
            "Browse our portfolio of completed roofing projects throughout the Houston area. See the quality of our work and the transformations we've achieved for our satisfied customers.",
          backgroundImage: "/placeholder.svg?height=600&width=1200",
        },
      },
      {
        id: "gallery-grid",
        name: "Project Gallery Grid",
        type: "gallery",
        isActive: true,
        settings: {
          title: "Recent Projects",
          subtitle: "See our quality work in action",
          categories: ["All", "Roof Replacement", "Roof Repair", "Storm Damage", "Commercial"],
          projects: [
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
          ],
        },
      },
    ],
  },
  // Service pages with complete original content
  {
    id: "roof-replacement",
    name: "Roof Replacement Service",
    path: "/services/roof-replacement",
    sections: 5,
    lastModified: "2024-05-12",
    category: "service",
    seo: {
      title: "Roof Replacement Houston | Professional Installation | American Roofing",
      description:
        "Professional roof replacement services in Houston. Quality materials, expert installation, and comprehensive warranties. Get your free estimate today.",
      keywords: "roof replacement houston, new roof installation, roofing materials",
      ogImage: "/placeholder.svg?height=630&width=1200",
    },
    images: [{ id: "replacement-hero", url: "/placeholder.svg?height=400&width=800", alt: "Roof Replacement" }],
    components: [
      {
        id: "replacement-hero",
        name: "Service Hero",
        type: "hero",
        isActive: true,
        settings: {
          title: "Roof Replacement",
          subtitle:
            "Complete roof replacement services with premium materials and expert installation for Houston homeowners.",
          backgroundImage: "/placeholder.svg?height=600&width=1200",
        },
      },
      {
        id: "replacement-content",
        name: "Service Content",
        type: "service-layout",
        isActive: true,
        settings: {
          title: "Professional Roof Replacement Services",
          description:
            "American Roofing provides comprehensive roof replacement services for homeowners throughout the Houston area. Whether your roof has sustained storm damage, reached the end of its lifespan, or you simply want to upgrade to a more modern and energy-efficient roofing system, our team of experienced professionals is here to help.",
          content:
            "We understand that replacing your roof is a significant investment, which is why we're committed to providing honest assessments, quality materials, expert installation, and transparent pricing throughout the entire process.",
        },
      },
      {
        id: "replacement-benefits",
        name: "Service Benefits",
        type: "service-benefits",
        isActive: true,
        settings: {
          title: "Benefits of Our Roof Replacement Service",
          benefits: [
            {
              title: "Increased Home Value",
              description:
                "A new roof can increase your home's resale value by up to 7% and significantly improve curb appeal.",
            },
            {
              title: "Enhanced Energy Efficiency",
              description:
                "Modern roofing materials can reduce energy costs by improving insulation and reflecting solar heat.",
            },
            {
              title: "Improved Safety & Protection",
              description:
                "A new roof provides better protection against leaks, mold, and structural damage to your home.",
            },
            {
              title: "Peace of Mind",
              description:
                "Enjoy the security of knowing your home is protected by a durable, properly installed roof with warranty coverage.",
            },
          ],
        },
      },
      {
        id: "replacement-process",
        name: "Replacement Process",
        type: "service-process",
        isActive: true,
        settings: {
          title: "Our Roof Replacement Process",
          steps: [
            {
              number: 1,
              title: "Thorough Inspection & Assessment",
              description:
                "We begin with a comprehensive inspection of your current roof to assess its condition, identify any underlying issues, and determine the best approach for your replacement.",
            },
            {
              number: 2,
              title: "Detailed Proposal & Material Selection",
              description:
                "We'll provide a detailed proposal outlining our recommendations and help you select the right materials for your home, budget, and aesthetic preferences.",
            },
            {
              number: 3,
              title: "Professional Installation",
              description:
                "Our skilled team will remove your old roof, inspect the decking, make any necessary repairs, and install your new roofing system according to manufacturer specifications and industry best practices.",
            },
            {
              number: 4,
              title: "Thorough Cleanup & Final Inspection",
              description:
                "We'll thoroughly clean up your property, removing all debris, and conduct a final inspection to ensure everything meets our high standards of quality.",
            },
          ],
        },
      },
      {
        id: "replacement-faqs",
        name: "Replacement FAQs",
        type: "service-faqs",
        isActive: true,
        settings: {
          title: "Frequently Asked Questions",
          faqs: [
            {
              question: "How long does a roof replacement typically take?",
              answer:
                "Most residential roof replacements can be completed in 1-3 days, depending on the size and complexity of your roof, weather conditions, and material choices.",
            },
            {
              question: "What roofing materials do you offer?",
              answer:
                "We offer a wide range of roofing materials including asphalt shingles, metal roofing, tile, slate, and flat roofing systems. We'll help you choose the best option for your home and budget.",
            },
            {
              question: "How do I know if I need a full roof replacement?",
              answer:
                "Signs you may need a full replacement include: your roof is over 20 years old, multiple leaks, significant storm damage, curling or missing shingles, and sagging areas. We offer free inspections to help you determine the best course of action.",
            },
            {
              question: "Do you offer warranties on roof replacements?",
              answer:
                "Yes, we offer manufacturer warranties on materials (typically 25-50 years depending on the product) and our own workmanship warranty to ensure your complete satisfaction.",
            },
            {
              question: "Can you help with insurance claims for roof replacement?",
              answer:
                "Our team has extensive experience working with insurance companies and can help guide you through the entire claims process for storm or disaster-related roof damage.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "roof-repair",
    name: "Roof Repair Service",
    path: "/services/roof-repair",
    sections: 5,
    lastModified: "2024-05-12",
    category: "service",
    seo: {
      title: "Roof Repair Houston | Fast & Reliable | American Roofing",
      description:
        "Professional roof repair services in Houston. Fast response for leaks, storm damage, and emergency repairs. Licensed and insured.",
      keywords: "roof repair houston, roof leak repair, emergency roofing",
      ogImage: "/placeholder.svg?height=630&width=1200",
    },
    images: [{ id: "repair-hero", url: "/placeholder.svg?height=400&width=800", alt: "Roof Repair" }],
    components: [
      {
        id: "repair-hero",
        name: "Service Hero",
        type: "hero",
        isActive: true,
        settings: {
          title: "Roof Repair",
          subtitle: "Fast, reliable repairs for leaks, damaged shingles, and other roofing issues throughout Houston.",
          backgroundImage: "/placeholder.svg?height=600&width=1200",
        },
      },
      {
        id: "repair-content",
        name: "Service Content",
        type: "service-layout",
        isActive: true,
        settings: {
          title: "Expert Roof Repair Services",
          description:
            "American Roofing provides comprehensive roof repair services for homeowners throughout the Houston area. From minor leaks to storm damage, our experienced team can quickly diagnose and repair any roofing issue to protect your home and restore your peace of mind.",
          content:
            "We understand that roof problems can be stressful and disruptive. That's why we prioritize prompt, professional service and transparent communication throughout the repair process.",
        },
      },
      {
        id: "repair-benefits",
        name: "Service Benefits",
        type: "service-benefits",
        isActive: true,
        settings: {
          title: "Benefits of Our Roof Repair Service",
          benefits: [
            {
              title: "Prevent Costly Damage",
              description:
                "Timely repairs prevent small issues from becoming major problems that could damage your home's structure.",
            },
            {
              title: "Extend Roof Lifespan",
              description:
                "Regular maintenance and prompt repairs can significantly extend the life of your existing roof.",
            },
            {
              title: "Maintain Home Value",
              description: "A well-maintained roof preserves your home's value and curb appeal.",
            },
            {
              title: "Energy Efficiency",
              description: "Repairing leaks and damage helps maintain your home's energy efficiency and comfort.",
            },
          ],
        },
      },
      {
        id: "repair-process",
        name: "Repair Process",
        type: "service-process",
        isActive: true,
        settings: {
          title: "Our Roof Repair Process",
          steps: [
            {
              number: 1,
              title: "Thorough Inspection",
              description:
                "We conduct a comprehensive inspection to identify all damage and underlying issues, not just the obvious problems.",
            },
            {
              number: 2,
              title: "Detailed Estimate",
              description:
                "You'll receive a clear, itemized estimate outlining all necessary repairs and associated costs.",
            },
            {
              number: 3,
              title: "Expert Repairs",
              description:
                "Our skilled technicians perform all repairs using quality materials and proven techniques to ensure lasting results.",
            },
            {
              number: 4,
              title: "Final Inspection & Warranty",
              description:
                "We conduct a final inspection to verify all repairs meet our high standards and provide warranty information for your peace of mind.",
            },
          ],
        },
      },
      {
        id: "repair-faqs",
        name: "Repair FAQs",
        type: "service-faqs",
        isActive: true,
        settings: {
          title: "Frequently Asked Questions",
          faqs: [
            {
              question: "How do I know if my roof needs repair?",
              answer:
                "Signs that your roof may need repair include: missing or damaged shingles, water stains on ceilings, leaks during rain, granules in gutters, and visible sagging or damage.",
            },
            {
              question: "How quickly can you repair my roof?",
              answer:
                "For emergency repairs, we can often be on-site within 24-48 hours. For standard repairs, we typically schedule work within 3-7 days, depending on weather conditions and our current workload.",
            },
            {
              question: "Do you provide emergency roof repair services?",
              answer:
                "Yes, we offer emergency roof repair services for situations that require immediate attention, such as active leaks or storm damage. Contact our emergency line for rapid response.",
            },
            {
              question: "Will my insurance cover roof repairs?",
              answer:
                "Many homeowner's insurance policies cover roof repairs, especially if the damage was caused by a covered peril like a storm. We can help you determine if your damage qualifies and assist with the claims process.",
            },
            {
              question: "How much do roof repairs typically cost?",
              answer:
                "The cost of roof repairs varies widely depending on the extent of damage, materials needed, and accessibility. Minor repairs may cost a few hundred dollars, while more extensive repairs could cost more. We provide detailed, transparent estimates before beginning any work.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "storm-damage",
    name: "Storm Damage Service",
    path: "/services/storm-damage",
    sections: 5,
    lastModified: "2024-05-12",
    category: "service",
    seo: {
      title: "Storm Damage Roof Repair Houston | Insurance Claims | American Roofing",
      description:
        "Expert storm damage roof repair in Houston. Hail damage, wind damage, emergency services. We work with insurance companies.",
      keywords: "storm damage repair houston, hail damage, wind damage, insurance claims",
      ogImage: "/placeholder.svg?height=630&width=1200",
    },
    images: [{ id: "storm-hero", url: "/placeholder.svg?height=400&width=800", alt: "Storm Damage Restoration" }],
    components: [
      {
        id: "storm-hero",
        name: "Service Hero",
        type: "hero",
        isActive: true,
        settings: {
          title: "Storm Damage Restoration",
          subtitle: "Comprehensive storm damage assessment, repair, and restoration services for Houston homeowners.",
          backgroundImage: "/placeholder.svg?height=600&width=1200",
        },
      },
      {
        id: "storm-content",
        name: "Service Content",
        type: "service-layout",
        isActive: true,
        settings: {
          title: "Storm Damage Restoration Services",
          description:
            "Houston's severe weather—from hurricanes and tropical storms to hail and high winds—can cause significant damage to your roof. American Roofing provides comprehensive storm damage restoration services to quickly assess, repair, and restore your roof after weather-related damage.",
          content:
            "Our experienced team understands the urgency of storm damage repairs and works efficiently to protect your home from further damage while delivering lasting, quality restorations.",
        },
      },
      {
        id: "storm-benefits",
        name: "Service Benefits",
        type: "service-benefits",
        isActive: true,
        settings: {
          title: "Benefits of Our Storm Damage Service",
          benefits: [
            {
              title: "Prevent Secondary Damage",
              description:
                "Quick response to storm damage prevents water infiltration that can lead to mold, rot, and structural issues.",
            },
            {
              title: "Insurance Expertise",
              description:
                "Our team has extensive experience working with insurance companies to maximize your claim coverage.",
            },
            {
              title: "Comprehensive Restoration",
              description:
                "We don't just patch problems—we restore your roof to pre-storm condition or better with quality materials.",
            },
            {
              title: "Peace of Mind",
              description:
                "Professional storm damage restoration ensures your home is properly protected against future weather events.",
            },
          ],
        },
      },
      {
        id: "storm-process",
        name: "Storm Process",
        type: "service-process",
        isActive: true,
        settings: {
          title: "Our Storm Damage Restoration Process",
          steps: [
            {
              number: 1,
              title: "Emergency Response",
              description:
                "We provide rapid response for emergency tarping and temporary repairs to prevent further damage to your home.",
            },
            {
              number: 2,
              title: "Comprehensive Damage Assessment",
              description:
                "Our experts thoroughly inspect your roof to document all storm-related damage for insurance purposes and restoration planning.",
            },
            {
              number: 3,
              title: "Insurance Claim Assistance",
              description:
                "We work directly with your insurance company, providing documentation and expertise to ensure you receive the coverage you deserve.",
            },
            {
              number: 4,
              title: "Professional Restoration",
              description:
                "Our skilled team completes all necessary repairs and restoration work using quality materials and proven techniques.",
            },
            {
              number: 5,
              title: "Final Inspection & Warranty",
              description:
                "We conduct a thorough final inspection and provide warranty information for your restored roof.",
            },
          ],
        },
      },
      {
        id: "storm-faqs",
        name: "Storm FAQs",
        type: "service-faqs",
        isActive: true,
        settings: {
          title: "Frequently Asked Questions",
          faqs: [
            {
              question: "What should I do immediately after storm damage?",
              answer:
                "First, ensure your family's safety. Then document the damage with photos, contact your insurance company, and call us for emergency tarping if needed to prevent further damage.",
            },
            {
              question: "How do I know if my roof has storm damage?",
              answer:
                "Signs of storm damage include missing or damaged shingles, leaks, dents from hail, debris on the roof, water stains on ceilings, and granules in gutters. Our free inspection can identify all damage, even issues that aren't visible from the ground.",
            },
            {
              question: "Will my insurance cover storm damage repairs?",
              answer:
                "Most homeowner's insurance policies cover storm damage repairs. We have extensive experience working with insurance companies and can help guide you through the claims process to ensure you receive the coverage you're entitled to.",
            },
            {
              question: "How long does storm damage restoration take?",
              answer:
                "The timeline varies depending on the extent of damage, but most residential storm damage restorations can be completed within 1-5 days once materials are secured and weather permits.",
            },
            {
              question: "Do you provide emergency services after storms?",
              answer:
                "Yes, we offer 24/7 emergency response for storm damage, including temporary tarping and water mitigation to prevent further damage to your home.",
            },
          ],
        },
      },
    ],
  },
]

// Helper function to create categories
const createCategories = (pages: PageContent[]) => {
  const categories: Record<CategoryType, string[]> = {
    main: [],
    service: [],
    utility: [],
  }

  if (Array.isArray(pages)) {
    pages.forEach((page) => {
      if (page && page.category && categories[page.category]) {
        categories[page.category].push(page.id)
      }
    })
  }

  return categories
}

interface ContentState {
  pages: PageContent[]
  selectedPage: PageContent | null
  selectedComponent: ComponentContent | null
  categories: Record<CategoryType, string[]>
  selectPage: (pageId: string) => void
  selectComponent: (componentId: string) => void
  updateComponentSettings: (params: { componentId: string; settings: Record<string, any> }) => void
  toggleComponent: (componentId: string) => void
  updatePageSEO: (params: { pageId: string; seo: SEOData }) => void
  addImage: (params: { pageId: string; image: ImageAsset }) => void
  updateImage: (params: { pageId: string; imageId: string; updates: Partial<ImageAsset> }) => void
  removeImage: (params: { pageId: string; imageId: string }) => void
  getPageContent: (pageId: string) => PageContent | null
  getComponentContent: (pageId: string, componentId: string) => ComponentContent | null
}

export const useContentStore = create<ContentState>()(
  persist(
    (set, get) => ({
      pages: initialPages,
      selectedPage: null,
      selectedComponent: null,
      categories: createCategories(initialPages),

      selectPage: (pageId: string) => {
        if (pageId === "") {
          set({ selectedPage: null, selectedComponent: null })
          return
        }

        const page = get().pages.find((p) => p.id === pageId) || null
        set({ selectedPage: page, selectedComponent: null })
      },

      selectComponent: (componentId: string) => {
        if (componentId === "") {
          set({ selectedComponent: null })
          return
        }

        const { selectedPage } = get()
        if (!selectedPage) return

        const component = selectedPage.components.find((c) => c.id === componentId) || null
        set({ selectedComponent: component })
      },

      updateComponentSettings: ({ componentId, settings }: { componentId: string; settings: Record<string, any> }) => {
        const { pages, selectedPage } = get()
        if (!selectedPage) return

        const updatedPages = pages.map((page) => {
          if (page.id === selectedPage.id) {
            return {
              ...page,
              components: page.components.map((component) => {
                if (component.id === componentId) {
                  return {
                    ...component,
                    settings,
                  }
                }
                return component
              }),
              lastModified: new Date().toISOString().split("T")[0],
            }
          }
          return page
        })

        const updatedSelectedPage = updatedPages.find((p) => p.id === selectedPage.id) || null
        const updatedSelectedComponent = updatedSelectedPage?.components.find((c) => c.id === componentId) || null

        set({
          pages: updatedPages,
          selectedPage: updatedSelectedPage,
          selectedComponent: updatedSelectedComponent,
        })
      },

      toggleComponent: (componentId: string) => {
        const { pages, selectedPage } = get()
        if (!selectedPage) return

        const updatedPages = pages.map((page) => {
          if (page.id === selectedPage.id) {
            return {
              ...page,
              components: page.components.map((component) => {
                if (component.id === componentId) {
                  return {
                    ...component,
                    isActive: !component.isActive,
                  }
                }
                return component
              }),
              lastModified: new Date().toISOString().split("T")[0],
            }
          }
          return page
        })

        const updatedSelectedPage = updatedPages.find((p) => p.id === selectedPage.id) || null

        set({
          pages: updatedPages,
          selectedPage: updatedSelectedPage,
        })
      },

      updatePageSEO: ({ pageId, seo }: { pageId: string; seo: SEOData }) => {
        const updatedPages = get().pages.map((page) => {
          if (page.id === pageId) {
            return {
              ...page,
              seo,
              lastModified: new Date().toISOString().split("T")[0],
            }
          }
          return page
        })

        set({ pages: updatedPages })
      },

      addImage: ({ pageId, image }: { pageId: string; image: ImageAsset }) => {
        const updatedPages = get().pages.map((page) => {
          if (page.id === pageId) {
            return {
              ...page,
              images: [...page.images, image],
              lastModified: new Date().toISOString().split("T")[0],
            }
          }
          return page
        })

        set({ pages: updatedPages })
      },

      updateImage: ({
        pageId,
        imageId,
        updates,
      }: { pageId: string; imageId: string; updates: Partial<ImageAsset> }) => {
        const updatedPages = get().pages.map((page) => {
          if (page.id === pageId) {
            return {
              ...page,
              images: page.images.map((img) => (img.id === imageId ? { ...img, ...updates } : img)),
              lastModified: new Date().toISOString().split("T")[0],
            }
          }
          return page
        })

        set({ pages: updatedPages })
      },

      removeImage: ({ pageId, imageId }: { pageId: string; imageId: string }) => {
        const updatedPages = get().pages.map((page) => {
          if (page.id === pageId) {
            return {
              ...page,
              images: page.images.filter((img) => img.id !== imageId),
              lastModified: new Date().toISOString().split("T")[0],
            }
          }
          return page
        })

        set({ pages: updatedPages })
      },

      getPageContent: (pageId: string) => {
        return get().pages.find((p) => p.id === pageId) || null
      },

      getComponentContent: (pageId: string, componentId: string) => {
        const page = get().pages.find((p) => p.id === pageId)
        if (!page) return null
        return page.components.find((c) => c.id === componentId) || null
      },
    }),
    {
      name: "content-storage",
    },
  ),
)

// Services Management Store
export interface ServiceFAQ {
  question: string
  answer: string
}

export interface ServiceProcess {
  title: string
  steps: Array<{
    title: string
    description: string
  }>
}

export interface ServiceCTA {
  title: string
  subtitle: string
  buttonText: string
}

export interface Service {
  id: string
  name: string
  title: string
  description: string
  heroTitle: string
  heroSubtitle: string
  isActive: boolean
  benefits: string[]
  process: ServiceProcess
  faqs: ServiceFAQ[]
  pricing: Record<string, any>
  cta: ServiceCTA
  lastModified: string
}

interface ServicesState {
  services: Service[]
  selectedService: Service | null
  stats: {
    total: number
    active: number
    inactive: number
  }
  selectService: (serviceId: string) => void
  updateService: (params: { id: string; updates: Record<string, any> }) => void
  toggleServiceStatus: (serviceId: string) => void
  addFAQ: (params: { serviceId: string; faq: ServiceFAQ }) => void
  removeFAQ: (params: { serviceId: string; index: number }) => void
  addBenefit: (params: { serviceId: string; benefit: string }) => void
  removeBenefit: (params: { serviceId: string; index: number }) => void
}

// Initial services data
const initialServices: Service[] = [
  {
    id: "roof-replacement",
    name: "Roof Replacement",
    title: "Professional Roof Replacement Services",
    description: "Complete roof replacement with quality materials and expert installation.",
    heroTitle: "Get a New Roof for Your Home",
    heroSubtitle: "Quality materials and professional installation for lasting protection",
    isActive: true,
    benefits: [
      "Premium quality materials",
      "Expert installation team",
      "Long-lasting results",
      "Comprehensive warranty",
      "Financing options available",
    ],
    process: {
      title: "Our Roof Replacement Process",
      steps: [
        {
          title: "Free Inspection",
          description: "We thoroughly inspect your current roof and provide a detailed assessment.",
        },
        {
          title: "Material Selection",
          description: "Choose from our wide range of high-quality roofing materials and colors.",
        },
        {
          title: "Professional Installation",
          description: "Our expert team installs your new roof with precision and care.",
        },
        {
          title: "Final Inspection",
          description: "We conduct a final inspection to ensure everything meets our high standards.",
        },
      ],
    },
    faqs: [
      {
        question: "How long does a roof replacement take?",
        answer:
          "Most residential roof replacements can be completed in 1-3 days, depending on the size and complexity of your roof.",
      },
      {
        question: "What roofing materials do you offer?",
        answer:
          "We offer a variety of materials including asphalt shingles, metal roofing, tile, and more to suit your needs and budget.",
      },
      {
        question: "Do you offer warranties?",
        answer:
          "Yes, we provide manufacturer warranties on materials and our own workmanship warranty for your peace of mind.",
      },
    ],
    pricing: {
      startingAt: "$8,000",
      factors: ["Roof size", "Material type", "Roof complexity"],
    },
    cta: {
      title: "Ready for a New Roof?",
      subtitle: "Contact us today for a free inspection and estimate",
      buttonText: "Get a Free Estimate",
    },
    lastModified: "2024-05-10",
  },
  {
    id: "roof-repair",
    name: "Roof Repair",
    title: "Expert Roof Repair Services",
    description: "Professional roof repair services to fix leaks, damage, and extend your roof's life.",
    heroTitle: "Quality Roof Repairs",
    heroSubtitle: "Fast, reliable repairs to protect your home from water damage",
    isActive: true,
    benefits: [
      "Quick response times",
      "Experienced repair specialists",
      "Quality materials",
      "Affordable solutions",
      "Prevent costly water damage",
    ],
    process: {
      title: "Our Roof Repair Process",
      steps: [
        {
          title: "Thorough Inspection",
          description: "We identify all damage and underlying issues affecting your roof.",
        },
        {
          title: "Detailed Estimate",
          description: "We provide a clear, itemized estimate for all necessary repairs.",
        },
        {
          title: "Professional Repairs",
          description: "Our skilled technicians perform all repairs with precision and care.",
        },
        {
          title: "Final Inspection",
          description: "We verify all repairs are completed to our high standards.",
        },
      ],
    },
    faqs: [
      {
        question: "How do I know if I need a repair or replacement?",
        answer:
          "Our inspection will determine the extent of damage. Generally, if less than 30% of your roof is damaged, a repair is often sufficient.",
      },
      {
        question: "How quickly can you repair my roof?",
        answer:
          "For emergency repairs, we can often respond within 24-48 hours. Standard repairs are typically scheduled within a week.",
      },
      {
        question: "Do you provide emergency roof repair services?",
        answer: "Yes, we offer emergency roof repair services for situations that require immediate attention.",
      },
    ],
    pricing: {
      startingAt: "$350",
      factors: ["Extent of damage", "Repair complexity", "Materials needed"],
    },
    cta: {
      title: "Need Roof Repairs?",
      subtitle: "Contact us today for a free inspection and estimate",
      buttonText: "Schedule an Inspection",
    },
    lastModified: "2024-05-12",
  },
  {
    id: "storm-damage",
    name: "Storm Damage",
    title: "Storm Damage Roof Repair",
    description: "Specialized repair services for roofs damaged by storms, hail, and high winds.",
    heroTitle: "Storm Damage Specialists",
    heroSubtitle: "Expert repairs for hail, wind, and storm damage with insurance assistance",
    isActive: true,
    benefits: [
      "Insurance claim assistance",
      "Hail and wind damage experts",
      "Emergency services available",
      "Complete documentation for claims",
      "Restoration to pre-storm condition",
    ],
    process: {
      title: "Our Storm Damage Process",
      steps: [
        {
          title: "Emergency Assessment",
          description: "We quickly assess damage and provide temporary solutions if needed.",
        },
        {
          title: "Documentation",
          description: "We thoroughly document all damage for insurance purposes.",
        },
        {
          title: "Insurance Coordination",
          description: "We work directly with your insurance company to streamline the claims process.",
        },
        {
          title: "Quality Restoration",
          description: "We restore your roof to pre-storm condition or better.",
        },
      ],
    },
    faqs: [
      {
        question: "Will you work with my insurance company?",
        answer:
          "Yes, we have extensive experience working with insurance companies and can help navigate the claims process.",
      },
      {
        question: "How can I tell if my roof has storm damage?",
        answer:
          "Signs include missing shingles, granule loss, dented gutters, water stains on ceilings, or leaks after a storm.",
      },
      {
        question: "How quickly can you respond after a storm?",
        answer:
          "We prioritize storm damage calls and typically respond within 24 hours for assessment and temporary solutions.",
      },
    ],
    pricing: {
      startingAt: "Insurance deductible",
      factors: ["Extent of damage", "Insurance coverage", "Upgrade options"],
    },
    cta: {
      title: "Storm Damage?",
      subtitle: "Contact us for emergency service and insurance claim assistance",
      buttonText: "Get Emergency Help",
    },
    lastModified: "2024-05-08",
  },
]

export const useServicesStore = create<ServicesState>()(
  persist(
    (set, get) => ({
      services: initialServices,
      selectedService: null,
      stats: {
        total: initialServices.length,
        active: initialServices.filter((s) => s.isActive).length,
        inactive: initialServices.filter((s) => !s.isActive).length,
      },

      selectService: (serviceId: string) => {
        if (serviceId === "") {
          set({ selectedService: null })
          return
        }

        const service = get().services.find((s) => s.id === serviceId) || null
        set({ selectedService: service })
      },

      updateService: ({ id, updates }) => {
        const updatedServices = get().services.map((service) => {
          if (service.id === id) {
            return {
              ...service,
              ...updates,
              lastModified: new Date().toISOString().split("T")[0],
            }
          }
          return service
        })

        const updatedSelectedService = updatedServices.find((s) => s.id === id) || null

        set({
          services: updatedServices,
          selectedService: updatedSelectedService,
          stats: {
            total: updatedServices.length,
            active: updatedServices.filter((s) => s.isActive).length,
            inactive: updatedServices.filter((s) => !s.isActive).length,
          },
        })
      },

      toggleServiceStatus: (serviceId: string) => {
        const updatedServices = get().services.map((service) => {
          if (service.id === serviceId) {
            return {
              ...service,
              isActive: !service.isActive,
              lastModified: new Date().toISOString().split("T")[0],
            }
          }
          return service
        })

        const updatedSelectedService = get().selectedService
          ? updatedServices.find((s) => s.id === get().selectedService?.id) || null
          : null

        set({
          services: updatedServices,
          selectedService: updatedSelectedService,
          stats: {
            total: updatedServices.length,
            active: updatedServices.filter((s) => s.isActive).length,
            inactive: updatedServices.filter((s) => !s.isActive).length,
          },
        })
      },

      addFAQ: ({ serviceId, faq }) => {
        const updatedServices = get().services.map((service) => {
          if (service.id === serviceId) {
            return {
              ...service,
              faqs: [...service.faqs, faq],
              lastModified: new Date().toISOString().split("T")[0],
            }
          }
          return service
        })

        const updatedSelectedService = updatedServices.find((s) => s.id === serviceId) || null

        set({
          services: updatedServices,
          selectedService: updatedSelectedService,
        })
      },

      removeFAQ: ({ serviceId, index }) => {
        const updatedServices = get().services.map((service) => {
          if (service.id === serviceId) {
            return {
              ...service,
              faqs: service.faqs.filter((_, i) => i !== index),
              lastModified: new Date().toISOString().split("T")[0],
            }
          }
          return service
        })

        const updatedSelectedService = updatedServices.find((s) => s.id === serviceId) || null

        set({
          services: updatedServices,
          selectedService: updatedSelectedService,
        })
      },

      addBenefit: ({ serviceId, benefit }) => {
        const updatedServices = get().services.map((service) => {
          if (service.id === serviceId) {
            return {
              ...service,
              benefits: [...service.benefits, benefit],
              lastModified: new Date().toISOString().split("T")[0],
            }
          }
          return service
        })

        const updatedSelectedService = updatedServices.find((s) => s.id === serviceId) || null

        set({
          services: updatedServices,
          selectedService: updatedSelectedService,
        })
      },

      removeBenefit: ({ serviceId, index }) => {
        const updatedServices = get().services.map((service) => {
          if (service.id === serviceId) {
            return {
              ...service,
              benefits: service.benefits.filter((_, i) => i !== index),
              lastModified: new Date().toISOString().split("T")[0],
            }
          }
          return service
        })

        const updatedSelectedService = updatedServices.find((s) => s.id === serviceId) || null

        set({
          services: updatedServices,
          selectedService: updatedSelectedService,
        })
      },
    }),
    {
      name: "services-storage",
    },
  ),
)
