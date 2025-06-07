"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

// Lead Form Store (for modal open/close)
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

// Lead Data Store (for admin dashboard)

export interface Lead {
  id: number
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
  addLead: (lead: Omit<Lead, "id" | "date" | "status">) => void
  updateLeadStatus: (id: number, status: Lead["status"]) => void
  deleteLead: (id: number) => void
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
              id: Math.max(...state.leads.map((l) => l.id), 0) + 1,
              date: new Date().toISOString().split("T")[0],
              status: "new",
            },
            ...state.leads,
          ],
        })),

      updateLeadStatus: (id, status) =>
        set((state) => ({
          leads: state.leads.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
        })),

      deleteLead: (id) =>
        set((state) => ({
          leads: state.leads.filter((lead) => lead.id !== id),
        })),

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

// Content Management Store
export type ComponentType =
  | "hero"
  | "services"
  | "social-proof"
  | "gallery"
  | "cta"
  | "why-choose"
  | "floating-cta"
  | "contact-form"
  | "about-content"
  | "service-benefits"
  | "service-process"
  | "service-faqs"

export type PageType = "home" | "about" | "contact" | "roof-replacement" | "roof-repair" | "storm-damage"

export type CategoryType = "main" | "service" | "utility"

export interface ComponentContent {
  id: string
  name: string
  type: ComponentType
  isActive: boolean
  settings: Record<string, any>
}

export interface PageContent {
  id: string
  name: string
  path: string
  sections: number
  lastModified: string
  components: ComponentContent[]
  category: CategoryType
}

// Sample data for initial state
const initialPages: PageContent[] = [
  {
    id: "home",
    name: "Home Page",
    path: "/",
    sections: 6,
    lastModified: "2024-05-15",
    category: "main",
    components: [
      {
        id: "home-hero",
        name: "Hero Section",
        type: "hero",
        isActive: true,
        settings: {
          title: "Professional Roofing Services in Houston",
          subtitle: "Quality roofing solutions for residential and commercial properties",
          ctaText: "Get a Free Estimate",
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
        },
      },
      {
        id: "home-social-proof",
        name: "Testimonials",
        type: "social-proof",
        isActive: true,
        settings: {
          title: "What Our Customers Say",
          rating: "4.9",
          reviewCount: "250",
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
    components: [
      {
        id: "about-hero",
        name: "About Hero",
        type: "hero",
        isActive: true,
        settings: {
          title: "About American Roofing",
          subtitle: "Trusted roofing experts serving Houston for over 20 years",
        },
      },
      {
        id: "about-content",
        name: "Company Story",
        type: "about-content",
        isActive: true,
        settings: {
          story: {
            title: "Our Story",
            content:
              "Founded in 2000, American Roofing has been providing quality roofing services to Houston residents for over two decades...",
          },
          mission: {
            title: "Our Mission",
            content:
              "To provide exceptional roofing services with integrity, quality, and customer satisfaction as our top priorities.",
          },
        },
      },
    ],
  },
  {
    id: "roof-replacement",
    name: "Roof Replacement",
    path: "/services/roof-replacement",
    sections: 5,
    lastModified: "2024-05-12",
    category: "service",
    components: [
      {
        id: "replacement-hero",
        name: "Service Hero",
        type: "hero",
        isActive: true,
        settings: {
          title: "Professional Roof Replacement",
          subtitle: "Quality materials and expert installation for your new roof",
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
            "Premium quality materials",
            "Expert installation team",
            "Long-lasting results",
            "Comprehensive warranty",
            "Financing options available",
          ],
        },
      },
    ],
  },
]

// Create categories from pages
const createCategories = (pages: PageContent[]): Record<CategoryType, string[]> => {
  const categories: Record<CategoryType, string[]> = {
    main: [],
    service: [],
    utility: [],
  }

  pages.forEach((page) => {
    if (page.category in categories) {
      categories[page.category].push(page.id)
    }
  })

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
