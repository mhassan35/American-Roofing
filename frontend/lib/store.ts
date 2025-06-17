"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
const backend_url = process.env.BACKEND_URL
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
  | "trust-badges"
  | "trust-section"
  | "testimonials"

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
  _id: string
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
              _id: Math.random().toString(36).substring(2, 15),
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
          await fetch("https://low-amusing-acapella.glitch.me/api/deletecontact", {
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

// Auth Store
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

// UI Store
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

// Enhanced Content Management Store
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

// Initial content data with all components
const initialPages: PageContent[] = [
  {
    id: "home",
    name: "Home Page",
    path: "/",
    sections: 8,
    lastModified: "2024-05-15",
    category: "main",
    seo: {
      title: "Houston's Most Trusted Roofing Pros | American Roofing",
      description:
        "Professional roofing services in Houston. Get a free estimate for roof replacement, repair, and storm damage restoration. Licensed & insured.",
      keywords: "roofing houston, roof repair, roof replacement, storm damage",
      ogImage: "/placeholder.svg?height=630&width=1200",
    },
    images: [],
    components: [
      {
        id: "home-hero",
        name: "Hero Section",
        type: "hero",
        isActive: true,
        settings: {
          title: "Houston's Most Trusted Roofing Pros",
          subtitle: "Request a fast, free quote in under 60 seconds.",
          primaryButton: "Get Free Estimate",
          secondaryButton: "Learn More",
          trustIndicators: ["Licensed & Insured", "4.9 ⭐ on Google", "Trusted by 3,000+ Homeowners"],
          formTitle: "Get Your Free Estimate",
          formSubtitle: "Takes less than 60 seconds",
          formFeatures: ["No obligation quote", "Fast response time", "Professional assessment", "Transparent pricing"],
          formButtonText: "Start Your Free Estimate",
        },
      },
      {
        id: "home-trust-badges",
        name: "Trust Badges",
        type: "trust-badges",
        isActive: true,
        settings: {
          badges: [
            { icon: "shield", text: "BBB A+ Rating", color: "green" },
            { icon: "star", text: "4.9 (300+ Reviews)", color: "orange" },
            { icon: "award", text: "GAF Certified Installer", color: "green" },
            { icon: "home", text: "Local Houston-Owned", color: "orange" },
          ],
        },
      },
      {
        id: "home-services",
        name: "Services Overview",
        type: "services",
        isActive: true,
        settings: {
          title: "Our Roofing Services",
          subtitle: "We provide comprehensive roofing solutions for homeowners in Houston and surrounding areas.",
          services: [
            {
              icon: "home",
              title: "Roof Replacement",
              description: "Complete roof replacement with premium materials and expert installation.",
              link: "/services/roof-replacement",
            },
            {
              icon: "wrench",
              title: "Roof Repair",
              description: "Fast, reliable repairs for leaks, damaged shingles, and other roofing issues.",
              link: "/services/roof-repair",
            },
            {
              icon: "cloud-lightning",
              title: "Storm Damage Restoration",
              description: "Comprehensive restoration services for roofs damaged by storms and severe weather.",
              link: "/services/storm-damage",
            },
            {
              icon: "search",
              title: "Free Inspections",
              description: "Thorough roof inspections to identify potential issues before they become major problems.",
              link: "/services/inspections",
            },
            {
              icon: "droplets",
              title: "Gutter Services",
              description: "Installation, repair, and maintenance of gutters and downspouts to protect your home.",
              link: "/services/gutters",
            },
            {
              icon: "file-text",
              title: "Insurance Claim Help",
              description: "Expert assistance navigating the insurance claim process for roof damage.",
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
          title: "Why Choose Us",
          subtitle:
            "American Roofing is committed to providing exceptional service and quality craftsmanship on every project.",
          features: [
            {
              icon: "zap",
              title: "Fast Quotes",
              description: "Get a detailed quote for your roofing project in as little as 60 seconds.",
              color: "orange",
            },
            {
              icon: "users",
              title: "Local & Insured",
              description: "We're Houston-based, fully licensed, and insured for your complete peace of mind.",
              color: "green",
            },
            {
              icon: "headphones",
              title: "Real Human Support",
              description: "Speak directly with our roofing experts – no automated systems or offshore support.",
              color: "orange",
            },
          ],
        },
      },
      {
        id: "home-testimonials",
        name: "Customer Testimonials",
        type: "testimonials",
        isActive: true,
        settings: {
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
              name: "Lisa M.",
              location: "Sugar Land, TX",
              platform: "Google",
              rating: 5,
              text: "I can't say enough good things about American Roofing. Their customer service is outstanding, and the quality of their work is top-notch. My new roof looks beautiful and was completed on time and within budget.",
            },
            {
              name: "David H.",
              location: "Cypress, TX",
              platform: "BBB",
              rating: 5,
              text: "American Roofing provided excellent service from the initial consultation to the final inspection. The crew was professional, courteous, and cleaned up thoroughly after completing the job.",
            },
            {
              name: "Amanda R.",
              location: "Spring, TX",
              platform: "Google",
              rating: 5,
              text: "We had storm damage and American Roofing helped us navigate the insurance process seamlessly. They were patient, knowledgeable, and delivered exceptional quality work.",
            },
          ],
        },
      },
      {
        id: "home-trust-section",
        name: "Trust & Certifications",
        type: "trust-section",
        isActive: true,
        settings: {
          title: "Trusted by Homeowners & Industry Leaders",
          certifications: [
            { name: "BBB A+ Rating", icon: "shield" },
            { name: "GAF Certified", icon: "award" },
            { name: "Owens Corning Preferred", icon: "star" },
            { name: "CertainTeed SELECT ShingleMaster", icon: "certificate" },
            { name: "HomeAdvisor Top Rated", icon: "trophy" },
            { name: "Angi Super Service Award", icon: "medal" },
          ],
          stats: [
            { number: "3,000+", label: "Happy Customers" },
            { number: "15+", label: "Years Experience" },
            { number: "100%", label: "Satisfaction Guarantee" },
            { number: "5,000+", label: "Projects Completed" },
          ],
        },
      },
      {
        id: "home-gallery",
        name: "Project Gallery",
        type: "gallery",
        isActive: true,
        settings: {
          title: "Before & After Gallery",
          subtitle:
            "See the transformation our roofing services can make with these real projects from Houston homeowners.",
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
    images: [],
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
          primaryButton: "Get Free Estimate",
          secondaryButton: "Contact Us",
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
          primaryButton: "Get Free Estimate",
          secondaryButton: "Call Now",
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
    images: [],
    components: [
      {
        id: "replacement-hero",
        name: "Service Hero",
        type: "hero",
        isActive: true,
        settings: {
          title: "Complete Roof Replacement Services",
          subtitle: "Transform your home with a brand new roof installation from certified professionals",
          primaryButton: "Get Free Estimate",
          secondaryButton: "Call Now",
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
          image: "/placeholder.svg?height=400&width=800",
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
          subtitle: "A streamlined approach to your roof replacement project",
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
    images: [],
    components: [
      {
        id: "repair-hero",
        name: "Service Hero",
        type: "hero",
        isActive: true,
        settings: {
          title: "Professional Roof Repair Services",
          subtitle: "Expert roof repair solutions to restore your home's protection and value",
          primaryButton: "Get Free Estimate",
          secondaryButton: "Emergency Service",
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
          image: "/placeholder.svg?height=400&width=800",
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
          subtitle: "Professional repairs you can trust",
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
    images: [],
    components: [
      {
        id: "storm-hero",
        name: "Service Hero",
        type: "hero",
        isActive: true,
        settings: {
          title: "Emergency Storm Damage Repair",
          subtitle: "24/7 emergency response for storm damage restoration and insurance claim assistance",
          primaryButton: "Emergency Service",
          secondaryButton: "Free Inspection",
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
          image: "/placeholder.svg?height=400&width=800",
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
          subtitle: "Emergency response and complete restoration",
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
  isLoading?: boolean
  error?: string | null
  lastUpdated: number
  initializeStore?: () => void
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
  addComponent: (params: { pageId: string; component: Omit<ComponentContent, "id"> }) => void
  deleteComponent: (params: { pageId: string; componentId: string }) => void
  reorderComponents: (params: { pageId: string; componentIds: string[] }) => void
  duplicateComponent: (params: { pageId: string; componentId: string }) => void
  updateStore: () => void
}

export const useContentStore = create<ContentState>()(
  persist(
    (set, get) => ({
      pages: [],
      selectedPage: null,
      selectedComponent: null,
      categories: { main: [], service: [], utility: [] },
      isLoading: true,
      error: null,
      lastUpdated: Date.now(),

      // Initialize with minimal data first
      initializeStore: () => {
        try {
          set({
            pages: initialPages,
            categories: createCategories(initialPages),
            isLoading: false,
            error: null,
            lastUpdated: Date.now(),
          })
        } catch (error) {
          console.error("Failed to initialize store:", error)
          set({
            isLoading: false,
            error: "Failed to load content data",
          })
        }
      },

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
        try {
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
            lastUpdated: Date.now(),
          })
        } catch (error) {
          console.error("Failed to update component settings:", error)
        }
      },

      toggleComponent: (componentId: string) => {
        try {
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
            lastUpdated: Date.now(),
          })
        } catch (error) {
          console.error("Failed to toggle component:", error)
        }
      },

      updatePageSEO: ({ pageId, seo }: { pageId: string; seo: SEOData }) => {
        try {
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

          set({ pages: updatedPages, lastUpdated: Date.now() })
        } catch (error) {
          console.error("Failed to update page SEO:", error)
        }
      },

      addImage: ({ pageId, image }: { pageId: string; image: ImageAsset }) => {
        try {
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

          set({ pages: updatedPages, lastUpdated: Date.now() })
        } catch (error) {
          console.error("Failed to add image:", error)
        }
      },

      updateImage: ({
        pageId,
        imageId,
        updates,
      }: { pageId: string; imageId: string; updates: Partial<ImageAsset> }) => {
        try {
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

          set({ pages: updatedPages, lastUpdated: Date.now() })
        } catch (error) {
          console.error("Failed to update image:", error)
        }
      },

      removeImage: ({ pageId, imageId }: { pageId: string; imageId: string }) => {
        try {
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

          set({ pages: updatedPages, lastUpdated: Date.now() })
        } catch (error) {
          console.error("Failed to remove image:", error)
        }
      },

      getPageContent: (pageId: string) => {
        try {
          return get().pages.find((p) => p.id === pageId) || null
        } catch (error) {
          console.error("Failed to get page content:", error)
          return null
        }
      },

      getComponentContent: (pageId: string, componentId: string) => {
        try {
          const page = get().pages.find((p) => p.id === pageId)
          if (!page) return null
          return page.components.find((c) => c.id === componentId) || null
        } catch (error) {
          console.error("Failed to get component content:", error)
          return null
        }
      },

      addComponent: ({ pageId, component }: { pageId: string; component: Omit<ComponentContent, "id"> }) => {
        try {
          const newComponent: ComponentContent = {
            ...component,
            id: `${pageId}-${component.type}-${Date.now()}`,
          }

          const updatedPages = get().pages.map((page) => {
            if (page.id === pageId) {
              return {
                ...page,
                components: [...page.components, newComponent],
                lastModified: new Date().toISOString().split("T")[0],
              }
            }
            return page
          })

          set({ pages: updatedPages, lastUpdated: Date.now() })
        } catch (error) {
          console.error("Failed to add component:", error)
        }
      },

      deleteComponent: ({ pageId, componentId }: { pageId: string; componentId: string }) => {
        try {
          const updatedPages = get().pages.map((page) => {
            if (page.id === pageId) {
              return {
                ...page,
                components: page.components.filter((c) => c.id !== componentId),
                lastModified: new Date().toISOString().split("T")[0],
              }
            }
            return page
          })

          set({ pages: updatedPages, lastUpdated: Date.now() })
        } catch (error) {
          console.error("Failed to delete component:", error)
        }
      },

      reorderComponents: ({ pageId, componentIds }: { pageId: string; componentIds: string[] }) => {
        try {
          const updatedPages = get().pages.map((page) => {
            if (page.id === pageId) {
              const reorderedComponents = componentIds
                .map((id) => page.components.find((c) => c.id === id))
                .filter(Boolean) as ComponentContent[]

              return {
                ...page,
                components: reorderedComponents,
                lastModified: new Date().toISOString().split("T")[0],
              }
            }
            return page
          })

          set({ pages: updatedPages, lastUpdated: Date.now() })
        } catch (error) {
          console.error("Failed to reorder components:", error)
        }
      },

      duplicateComponent: ({ pageId, componentId }: { pageId: string; componentId: string }) => {
        try {
          const page = get().pages.find((p) => p.id === pageId)
          if (!page) return

          const componentToDuplicate = page.components.find((c) => c.id === componentId)
          if (!componentToDuplicate) return

          const duplicatedComponent: ComponentContent = {
            ...componentToDuplicate,
            id: `${pageId}-${componentToDuplicate.type}-${Date.now()}`,
            name: `${componentToDuplicate.name} (Copy)`,
          }

          const updatedPages = get().pages.map((p) => {
            if (p.id === pageId) {
              const componentIndex = p.components.findIndex((c) => c.id === componentId)
              const newComponents = [...p.components]
              newComponents.splice(componentIndex + 1, 0, duplicatedComponent)

              return {
                ...p,
                components: newComponents,
                lastModified: new Date().toISOString().split("T")[0],
              }
            }
            return p
          })

          set({ pages: updatedPages, lastUpdated: Date.now() })
        } catch (error) {
          console.error("Failed to duplicate component:", error)
        }
      },

      updateStore: () => {
        set({ lastUpdated: Date.now() })
      },
    }),
    {
      name: "content-storage",
      version: 1,
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Initialize the store after rehydration
          if (state.pages.length === 0) {
            state.initializeStore?.()
          } else {
            state.isLoading = false
          }
        }
      },
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
    heroTitle: "Complete Roof Replacement Services",
    heroSubtitle: "Transform your home with a brand new roof installation from certified professionals",
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
    heroTitle: "Professional Roof Repair Services",
    heroSubtitle: "Expert roof repair solutions to restore your home's protection and value",
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
    heroTitle: "Emergency Storm Damage Repair",
    heroSubtitle: "24/7 emergency response for storm damage restoration and insurance claim assistance",
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
