import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface PageContent {
  id: string
  name: string
  path: string
  sections: number
  lastModified: string
  components: ComponentContent[]
  category: "main" | "service" | "utility"
}

interface ComponentContent {
  id: string
  name: string
  type:
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
  isActive: boolean
  settings: Record<string, any>
}

interface ContentState {
  pages: PageContent[]
  selectedPage: PageContent | null
  selectedComponent: ComponentContent | null
  categories: {
    main: PageContent[]
    service: PageContent[]
    utility: PageContent[]
  }
}

const initialPages: PageContent[] = [
  {
    id: "home",
    name: "Home Page",
    path: "/",
    sections: 7,
    lastModified: "Just now",
    category: "main",
    components: [
      {
        id: "hero-section",
        name: "Hero Section",
        type: "hero",
        isActive: true,
        settings: {
          title: "Houston's Most Trusted Roofing Pros",
          subtitle: "Request a fast, free quote in under 60 seconds.",
          ctaText: "Get Free Estimate",
          features: ["Licensed & Insured", "4.9⭐ on Google", "Trusted by 3,000+ Homeowners"],
        },
      },
      {
        id: "services-section",
        name: "Services Section",
        type: "services",
        isActive: true,
        settings: {
          title: "Our Roofing Services",
          subtitle: "We provide comprehensive roofing solutions for homeowners in Houston and surrounding areas.",
          services: [
            { name: "Roof Replacement", description: "Complete roof replacement with premium materials" },
            { name: "Roof Repair", description: "Fast, reliable repairs for leaks and damage" },
            { name: "Storm Damage", description: "Comprehensive restoration after severe weather" },
            { name: "Free Inspections", description: "Thorough roof inspections to identify issues" },
            { name: "Gutter Services", description: "Installation and maintenance of gutters" },
            { name: "Insurance Claims", description: "Expert assistance with insurance claims" },
          ],
        },
      },
      {
        id: "why-choose-section",
        name: "Why Choose Us",
        type: "why-choose",
        isActive: true,
        settings: {
          title: "Why Choose Us",
          subtitle: "American Roofing is committed to providing exceptional service and quality craftsmanship.",
          features: [
            { title: "Fast Quotes", description: "Get a detailed quote in as little as 60 seconds" },
            { title: "Local & Insured", description: "Houston-based, fully licensed and insured" },
            { title: "Real Human Support", description: "Speak directly with our roofing experts" },
          ],
        },
      },
      {
        id: "gallery-section",
        name: "Project Gallery",
        type: "gallery",
        isActive: true,
        settings: {
          title: "Before & After Gallery",
          subtitle: "See the transformation our roofing services can make with real projects.",
          projects: [
            { title: "Complete Roof Replacement", location: "Memorial, Houston" },
            { title: "Storm Damage Restoration", location: "Katy, TX" },
            { title: "New Construction Roofing", location: "The Woodlands, TX" },
          ],
        },
      },
      {
        id: "social-proof-section",
        name: "Customer Reviews",
        type: "social-proof",
        isActive: true,
        settings: {
          title: "What Our Customers Say",
          subtitle: "Join over 3,000 satisfied homeowners who trust American Roofing.",
          rating: "4.9",
          reviewCount: "300+",
          platforms: ["Google", "Facebook", "BBB", "HomeAdvisor"],
        },
      },
      {
        id: "cta-section",
        name: "Call to Action",
        type: "cta",
        isActive: true,
        settings: {
          title: "Ready to Transform Your Roof?",
          subtitle: "Get a free, no-obligation quote in under 60 seconds.",
          primaryCta: "Start Your Free Estimate",
          secondaryCta: "Learn More",
        },
      },
      {
        id: "floating-cta",
        name: "Floating CTA",
        type: "floating-cta",
        isActive: true,
        settings: {
          phone: "(713) 555-1234",
          ctaText: "Get a Free Estimate",
          showAfterScroll: 300,
        },
      },
    ],
  },
  {
    id: "about",
    name: "About Page",
    path: "/about",
    sections: 4,
    lastModified: "Just now",
    category: "main",
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
        },
      },
      {
        id: "about-content",
        name: "About Content",
        type: "about-content",
        isActive: true,
        settings: {
          story: {
            title: "Our Story",
            content:
              "Founded in 2008, American Roofing has been serving the Houston community with integrity, quality craftsmanship, and exceptional customer service. We understand that your roof is one of your home's most important features, protecting your family and belongings from the elements.",
          },
          mission: {
            title: "Our Mission",
            content:
              "To provide exceptional roofing services with integrity, quality craftsmanship, and unmatched customer service to homeowners throughout the Houston area.",
          },
          values: [
            "Quality workmanship with attention to detail",
            "Honest and transparent business practices",
            "Exceptional customer service",
            "Licensed, bonded, and insured professionals",
            "Local community commitment",
          ],
        },
      },
    ],
  },
  {
    id: "contact",
    name: "Contact Page",
    path: "/contact",
    sections: 3,
    lastModified: "Just now",
    category: "main",
    components: [
      {
        id: "contact-hero",
        name: "Contact Hero",
        type: "hero",
        isActive: true,
        settings: {
          title: "Contact American Roofing",
          subtitle:
            "Ready to get started on your roofing project? Contact us today for a free estimate and consultation.",
        },
      },
      {
        id: "contact-form",
        name: "Contact Form",
        type: "contact-form",
        isActive: true,
        settings: {
          title: "Get Your Free Estimate",
          subtitle: "Fill out the form below and we'll get back to you within 24 hours.",
          fields: ["name", "email", "phone", "service", "message"],
        },
      },
    ],
  },
  {
    id: "roof-replacement",
    name: "Roof Replacement",
    path: "/services/roof-replacement",
    sections: 6,
    lastModified: "Just now",
    category: "service",
    components: [
      {
        id: "roof-replacement-hero",
        name: "Service Hero",
        type: "hero",
        isActive: true,
        settings: {
          title: "Complete Roof Replacement in Houston",
          subtitle:
            "Transform your home with a brand new roof. Professional installation, premium materials, lifetime warranty.",
        },
      },
      {
        id: "roof-replacement-benefits",
        name: "Service Benefits",
        type: "service-benefits",
        isActive: true,
        settings: {
          title: "Why Choose Our Roof Replacement Service",
          benefits: [
            "Premium materials with manufacturer warranties",
            "Expert installation by certified roofers",
            "Lifetime workmanship guarantee",
            "Insurance claim assistance",
            "Free inspection and estimate",
            "Emergency repair services",
          ],
        },
      },
      {
        id: "roof-replacement-process",
        name: "Service Process",
        type: "service-process",
        isActive: true,
        settings: {
          title: "Our Roof Replacement Process",
          steps: [
            { title: "Initial Inspection", description: "Comprehensive roof assessment and damage evaluation" },
            { title: "Material Selection", description: "Choose from premium roofing materials and colors" },
            { title: "Insurance Coordination", description: "Handle all insurance paperwork and claims" },
            { title: "Professional Installation", description: "Expert installation with quality workmanship" },
            { title: "Final Inspection", description: "Quality assurance and warranty activation" },
          ],
        },
      },
      {
        id: "roof-replacement-faqs",
        name: "Service FAQs",
        type: "service-faqs",
        isActive: true,
        settings: {
          title: "Frequently Asked Questions",
          faqs: [
            {
              question: "How long does a roof replacement take?",
              answer:
                "Most residential roof replacements take 1-3 days depending on the size and complexity of your roof.",
            },
            {
              question: "Do you work with insurance companies?",
              answer:
                "Yes, we handle all insurance paperwork and work directly with your insurance adjuster to ensure proper coverage.",
            },
            {
              question: "What materials do you use?",
              answer:
                "We use only premium materials from trusted manufacturers like GAF, Owens Corning, and CertainTeed.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "roof-repair",
    name: "Roof Repair",
    path: "/services/roof-repair",
    sections: 6,
    lastModified: "Just now",
    category: "service",
    components: [
      {
        id: "roof-repair-hero",
        name: "Service Hero",
        type: "hero",
        isActive: true,
        settings: {
          title: "Fast Roof Repair in Houston",
          subtitle: "Emergency repairs available 24/7. Stop leaks fast with our professional repair services.",
        },
      },
      {
        id: "roof-repair-benefits",
        name: "Service Benefits",
        type: "service-benefits",
        isActive: true,
        settings: {
          title: "Why Choose Our Roof Repair Service",
          benefits: [
            "24/7 emergency repair services",
            "Same-day repair availability",
            "All roof types and materials",
            "Leak detection and repair",
            "Storm damage restoration",
            "Warranty on all repairs",
          ],
        },
      },
      {
        id: "roof-repair-process",
        name: "Service Process",
        type: "service-process",
        isActive: true,
        settings: {
          title: "Our Roof Repair Process",
          steps: [
            { title: "Emergency Assessment", description: "Immediate evaluation of damage and safety concerns" },
            { title: "Temporary Protection", description: "Emergency tarping and leak prevention" },
            { title: "Detailed Inspection", description: "Comprehensive assessment of all damage" },
            { title: "Professional Repair", description: "Expert repair using quality materials" },
            { title: "Quality Assurance", description: "Final inspection and warranty activation" },
          ],
        },
      },
      {
        id: "roof-repair-faqs",
        name: "Service FAQs",
        type: "service-faqs",
        isActive: true,
        settings: {
          title: "Frequently Asked Questions",
          faqs: [
            {
              question: "Do you offer emergency repair services?",
              answer: "Yes, we provide 24/7 emergency roof repair services to prevent further damage to your home.",
            },
            {
              question: "How quickly can you respond to a leak?",
              answer:
                "We typically respond to emergency calls within 2-4 hours and can provide temporary protection same-day.",
            },
            {
              question: "Do you warranty your repair work?",
              answer: "Yes, all our roof repairs come with a comprehensive warranty on both materials and workmanship.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "storm-damage",
    name: "Storm Damage Restoration",
    path: "/services/storm-damage",
    sections: 6,
    lastModified: "Just now",
    category: "service",
    components: [
      {
        id: "storm-damage-hero",
        name: "Service Hero",
        type: "hero",
        isActive: true,
        settings: {
          title: "Storm Damage Restoration in Houston",
          subtitle: "Comprehensive storm damage restoration. We handle everything from assessment to insurance claims.",
        },
      },
      {
        id: "storm-damage-benefits",
        name: "Service Benefits",
        type: "service-benefits",
        isActive: true,
        settings: {
          title: "Why Choose Our Storm Damage Service",
          benefits: [
            "Complete damage assessment",
            "Insurance claim assistance",
            "Emergency protection services",
            "Full restoration services",
            "Quality workmanship guarantee",
            "Direct insurance billing",
          ],
        },
      },
      {
        id: "storm-damage-process",
        name: "Service Process",
        type: "service-process",
        isActive: true,
        settings: {
          title: "Storm Damage Restoration Process",
          steps: [
            { title: "Damage Assessment", description: "Comprehensive evaluation of storm damage" },
            { title: "Emergency Protection", description: "Immediate protection to prevent further damage" },
            { title: "Insurance Documentation", description: "Detailed documentation for insurance claims" },
            { title: "Restoration Work", description: "Complete restoration to pre-storm condition" },
            { title: "Final Inspection", description: "Quality assurance and warranty activation" },
          ],
        },
      },
      {
        id: "storm-damage-faqs",
        name: "Service FAQs",
        type: "service-faqs",
        isActive: true,
        settings: {
          title: "Frequently Asked Questions",
          faqs: [
            {
              question: "Will my insurance cover storm damage?",
              answer:
                "Most homeowner's insurance policies cover storm damage. We'll help assess your coverage and work with your adjuster.",
            },
            {
              question: "How soon should I call after a storm?",
              answer:
                "Contact us immediately after a storm to prevent further damage and begin the claims process quickly.",
            },
            {
              question: "Do you work with all insurance companies?",
              answer: "Yes, we work with all major insurance companies and handle the entire claims process for you.",
            },
          ],
        },
      },
    ],
  },
]

const initialState: ContentState = {
  pages: initialPages,
  selectedPage: null,
  selectedComponent: null,
  categories: {
    main: initialPages.filter((p) => p.category === "main"),
    service: initialPages.filter((p) => p.category === "service"),
    utility: initialPages.filter((p) => p.category === "utility"),
  },
}

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    selectPage: (state, action: PayloadAction<string>) => {
      state.selectedPage = state.pages.find((p) => p.id === action.payload) || null
      state.selectedComponent = null
    },
    selectComponent: (state, action: PayloadAction<string>) => {
      if (state.selectedPage) {
        state.selectedComponent = state.selectedPage.components.find((c) => c.id === action.payload) || null
      }
    },
    updateComponentSettings: (state, action: PayloadAction<{ componentId: string; settings: Record<string, any> }>) => {
      if (state.selectedPage) {
        const component = state.selectedPage.components.find((c) => c.id === action.payload.componentId)
        if (component) {
          component.settings = { ...component.settings, ...action.payload.settings }
          state.selectedPage.lastModified = "Just now"
        }
      }
    },
    toggleComponent: (state, action: PayloadAction<string>) => {
      if (state.selectedPage) {
        const component = state.selectedPage.components.find((c) => c.id === action.payload)
        if (component) {
          component.isActive = !component.isActive
          state.selectedPage.lastModified = "Just now"
        }
      }
    },
    updatePageCategories: (state) => {
      state.categories = {
        main: state.pages.filter((p) => p.category === "main"),
        service: state.pages.filter((p) => p.category === "service"),
        utility: state.pages.filter((p) => p.category === "utility"),
      }
    },
  },
})

export const { selectPage, selectComponent, updateComponentSettings, toggleComponent, updatePageCategories } =
  contentSlice.actions
export default contentSlice.reducer
