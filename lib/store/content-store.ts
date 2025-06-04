import { create } from "zustand"
import { persist } from "zustand/middleware"

// Define component types
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

// Define page types
export type PageType = "home" | "about" | "contact" | "roof-replacement" | "roof-repair" | "storm-damage"

// Define category types
export type CategoryType = "main" | "service" | "utility"

// Define interfaces for page and component objects
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
