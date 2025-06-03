import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface ServiceContent {
  id: string
  name: string
  title: string
  description: string
  heroTitle: string
  heroSubtitle: string
  benefits: string[]
  process: {
    title: string
    steps: Array<{
      title: string
      description: string
    }>
  }
  faqs: Array<{
    question: string
    answer: string
  }>
  pricing: {
    title: string
    description: string
    features: string[]
  }
  cta: {
    title: string
    subtitle: string
    buttonText: string
  }
  isActive: boolean
  lastModified: string
}

interface ServicesState {
  services: ServiceContent[]
  selectedService: ServiceContent | null
  stats: {
    total: number
    active: number
    inactive: number
  }
}

const initialServices: ServiceContent[] = [
  {
    id: "roof-replacement",
    name: "Roof Replacement",
    title: "Complete Roof Replacement Services",
    description:
      "Transform your home with our professional roof replacement services. We use premium materials and provide expert installation to ensure a durable and beautiful new roof.",
    heroTitle: "Complete Roof Replacement in Houston",
    heroSubtitle:
      "Upgrade your home with a brand new roof. Professional installation, premium materials, and a lifetime warranty for your peace of mind.",
    benefits: [
      "Premium roofing materials from top brands like GAF and Owens Corning",
      "Expert installation by certified and experienced roofing professionals",
      "Comprehensive lifetime workmanship warranty",
      "Assistance with insurance claims to maximize your coverage",
      "Free, no-obligation roof inspection and detailed estimate",
      "Emergency repair services to protect your home during the replacement process",
      "Improved energy efficiency with modern roofing systems",
      "Increased home value and curb appeal",
    ],
    process: {
      title: "Our Roof Replacement Process",
      steps: [
        {
          title: "Initial Roof Inspection",
          description:
            "We conduct a thorough inspection of your current roof to assess its condition and identify any underlying issues.",
        },
        {
          title: "Material Selection & Design",
          description:
            "Choose from a wide variety of premium roofing materials, colors, and styles to match your home's aesthetic.",
        },
        {
          title: "Insurance Coordination (If Applicable)",
          description:
            "We handle all insurance paperwork and communication to ensure you receive the maximum coverage for your roof replacement.",
        },
        {
          title: "Professional Roof Installation",
          description:
            "Our certified roofing team expertly installs your new roof with precision and attention to detail, ensuring long-lasting performance.",
        },
        {
          title: "Final Quality Assurance Inspection",
          description:
            "We conduct a final inspection to ensure your new roof meets our strict quality standards and activate your comprehensive warranty.",
        },
      ],
    },
    faqs: [
      {
        question: "How long does a typical roof replacement take?",
        answer:
          "Most residential roof replacements take between 1 to 3 days, depending on the size and complexity of your roof. We'll provide a more accurate timeline during your initial consultation.",
      },
      {
        question: "Do you work with insurance companies for roof replacements?",
        answer:
          "Yes, we have extensive experience working with insurance companies. We'll handle all the necessary paperwork and communication to ensure a smooth and hassle-free claims process.",
      },
      {
        question: "What types of roofing materials do you offer?",
        answer:
          "We offer a wide range of premium roofing materials, including asphalt shingles, tile, metal, and more. We'll help you choose the best material for your home's style and budget.",
      },
      {
        question: "What is included in your roof replacement warranty?",
        answer:
          "Our roof replacement warranty covers both materials and workmanship. We stand behind our work and ensure your complete satisfaction with your new roof.",
      },
    ],
    pricing: {
      title: "Transparent & Competitive Pricing",
      description:
        "We provide detailed and transparent quotes with no hidden fees. Our pricing is competitive, and we offer financing options to fit your budget.",
      features: [
        "Free, detailed roof inspection and estimate",
        "Clear breakdown of material and labor costs",
        "Assistance with insurance deductibles",
        "Flexible financing options available",
      ],
    },
    cta: {
      title: "Ready to Upgrade Your Roof?",
      subtitle: "Get a free, no-obligation roof replacement quote in under 60 seconds.",
      buttonText: "Get Your Free Roof Replacement Quote",
    },
    isActive: true,
    lastModified: "Just now",
  },
  {
    id: "roof-repair",
    name: "Roof Repair",
    title: "Fast & Reliable Roof Repair Services",
    description:
      "Protect your home with our fast and reliable roof repair services. We handle everything from minor leaks to major storm damage, ensuring your roof is strong and secure.",
    heroTitle: "Emergency Roof Repair Services in Houston",
    heroSubtitle:
      "24/7 emergency repairs available. Stop leaks fast with our professional repair services and prevent further damage to your home.",
    benefits: [
      "24/7 emergency roof repair services to address urgent issues",
      "Same-day repair availability for quick leak fixes",
      "Expert repairs for all roof types and materials",
      "Thorough leak detection and repair to prevent water damage",
      "Comprehensive storm damage restoration services",
      "Warranty on all repairs for your peace of mind",
      "Preventative maintenance to extend the life of your roof",
      "Skylight repair and replacement services",
    ],
    process: {
      title: "Our Roof Repair Process",
      steps: [
        {
          title: "Emergency Roof Assessment",
          description:
            "We provide an immediate evaluation of the damage and safety concerns to determine the best course of action.",
        },
        {
          title: "Temporary Roof Protection",
          description:
            "We offer emergency tarping and leak prevention services to minimize further damage to your home's interior.",
        },
        {
          title: "Detailed Roof Inspection",
          description:
            "We conduct a comprehensive assessment of all damage to identify the root cause of the problem and provide an accurate repair plan.",
        },
        {
          title: "Professional Roof Repair",
          description:
            "Our experienced roofing team performs expert repairs using quality materials to ensure a long-lasting and effective solution.",
        },
        {
          title: "Final Quality Assurance",
          description:
            "We conduct a final inspection to ensure the repairs meet our strict quality standards and activate your comprehensive warranty.",
        },
      ],
    },
    faqs: [
      {
        question: "Do you offer emergency roof repair services?",
        answer:
          "Yes, we provide 24/7 emergency roof repair services to prevent further damage to your home. Call us anytime for immediate assistance.",
      },
      {
        question: "How quickly can you respond to a roof leak?",
        answer:
          "We typically respond to emergency calls within 2-4 hours and can provide temporary protection the same day. Our goal is to minimize water damage and protect your home.",
      },
      {
        question: "Do you warranty your roof repair work?",
        answer:
          "Yes, all our roof repairs come with a comprehensive warranty on both materials and workmanship. We stand behind our work and ensure your complete satisfaction.",
      },
      {
        question: "What types of roof repairs do you handle?",
        answer:
          "We handle all types of roof repairs, including leak repairs, shingle replacement, storm damage restoration, and more. No job is too big or too small.",
      },
    ],
    pricing: {
      title: "Affordable & Transparent Repair Pricing",
      description:
        "We offer fair and transparent pricing for all our roof repair services. You'll receive a detailed quote with no hidden fees.",
      features: [
        "Free damage assessment and estimate",
        "Upfront and transparent pricing",
        "No hidden fees or surprises",
        "Assistance with insurance claims",
      ],
    },
    cta: {
      title: "Need Emergency Roof Repair?",
      subtitle: "Available 24/7 for emergency repairs and leak fixes. Protect your home now!",
      buttonText: "Get Emergency Repair Service",
    },
    isActive: true,
    lastModified: "Just now",
  },
  {
    id: "storm-damage",
    name: "Storm Damage Restoration",
    title: "Comprehensive Storm Damage Roof Restoration",
    description:
      "Recover from storm damage with our comprehensive roof restoration services. We handle everything from initial assessment to insurance claims, ensuring your roof is fully restored.",
    heroTitle: "Expert Storm Damage Restoration in Houston",
    heroSubtitle:
      "Comprehensive storm damage restoration services. We handle everything from assessment to insurance claims, making the process stress-free.",
    benefits: [
      "Complete storm damage assessment to identify all affected areas",
      "Expert assistance with insurance claims to maximize your coverage",
      "Emergency protection services to prevent further damage",
      "Full roof restoration services to pre-storm condition",
      "Quality workmanship guarantee for lasting results",
      "Direct insurance billing for a hassle-free experience",
      "Debris removal and cleanup services",
      "Temporary roofing solutions while repairs are underway",
    ],
    process: {
      title: "Our Storm Damage Restoration Process",
      steps: [
        {
          title: "Thorough Damage Assessment",
          description:
            "We conduct a comprehensive evaluation of the storm damage to identify all affected areas and determine the extent of the damage.",
        },
        {
          title: "Emergency Roof Protection",
          description:
            "We provide immediate protection to prevent further damage from rain, wind, and other elements. This may include tarping or temporary repairs.",
        },
        {
          title: "Detailed Insurance Documentation",
          description:
            "We create detailed documentation of the damage, including photos and reports, to support your insurance claim and ensure you receive fair compensation.",
        },
        {
          title: "Complete Roof Restoration",
          description:
            "Our experienced roofing team performs complete restoration services to return your roof to its pre-storm condition. We use quality materials and expert techniques.",
        },
        {
          title: "Final Quality Inspection",
          description:
            "We conduct a final inspection to ensure the restoration meets our strict quality standards and activate your comprehensive warranty.",
        },
      ],
    },
    faqs: [
      {
        question: "Will my insurance cover storm damage to my roof?",
        answer:
          "Most homeowner's insurance policies cover storm damage to roofs. We'll help assess your coverage and work with your adjuster to ensure you receive the compensation you deserve.",
      },
      {
        question: "How soon should I call after a storm to assess the damage?",
        answer:
          "Contact us immediately after a storm to prevent further damage and begin the claims process quickly. The sooner we assess the damage, the better.",
      },
      {
        question: "Do you work with all insurance companies for storm damage claims?",
        answer:
          "Yes, we work with all major insurance companies and handle the entire claims process for you. We'll communicate with your adjuster and ensure your claim is processed efficiently.",
      },
      {
        question: "What if I only have minor storm damage to my roof?",
        answer:
          "Even minor storm damage can lead to bigger problems down the road. We recommend having your roof inspected after any storm to identify and address any potential issues.",
      },
    ],
    pricing: {
      title: "Insurance-Friendly Pricing & Assistance",
      description:
        "We work closely with your insurance company to ensure you receive the maximum coverage for your storm damage restoration. We also offer deductible assistance programs.",
      features: [
        "Free storm damage inspection and assessment",
        "Expert assistance with insurance claims",
        "Direct insurance billing for your convenience",
        "Deductible assistance programs available",
      ],
    },
    cta: {
      title: "Storm Damage? We're Here to Help!",
      subtitle:
        "Get a free storm damage inspection and expert insurance assistance. Let us restore your roof and your peace of mind.",
      buttonText: "Get Free Storm Damage Assessment",
    },
    isActive: true,
    lastModified: "Just now",
  },
]

const initialState: ServicesState = {
  services: initialServices,
  selectedService: null,
  stats: {
    total: initialServices.length,
    active: initialServices.filter((s) => s.isActive).length,
    inactive: initialServices.filter((s) => !s.isActive).length,
  },
}

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    selectService: (state, action: PayloadAction<string>) => {
      state.selectedService = state.services.find((s) => s.id === action.payload) || null
    },
    updateService: (state, action: PayloadAction<{ id: string; updates: Partial<ServiceContent> }>) => {
      const { id, updates } = action.payload
      const serviceIndex = state.services.findIndex((s) => s.id === id)
      if (serviceIndex !== -1) {
        state.services[serviceIndex] = {
          ...state.services[serviceIndex],
          ...updates,
          lastModified: "Just now",
        }
        updateStats(state)
      }
    },
    toggleServiceStatus: (state, action: PayloadAction<string>) => {
      const service = state.services.find((s) => s.id === action.payload)
      if (service) {
        service.isActive = !service.isActive
        service.lastModified = "Just now"
        updateStats(state)
      }
    },
    addFAQ: (state, action: PayloadAction<{ serviceId: string; faq: { question: string; answer: string } }>) => {
      const service = state.services.find((s) => s.id === action.payload.serviceId)
      if (service) {
        service.faqs.push(action.payload.faq)
        service.lastModified = "Just now"
      }
    },
    removeFAQ: (state, action: PayloadAction<{ serviceId: string; index: number }>) => {
      const service = state.services.find((s) => s.id === action.payload.serviceId)
      if (service) {
        service.faqs.splice(action.payload.index, 1)
        service.lastModified = "Just now"
      }
    },
    addBenefit: (state, action: PayloadAction<{ serviceId: string; benefit: string }>) => {
      const service = state.services.find((s) => s.id === action.payload.serviceId)
      if (service) {
        service.benefits.push(action.payload.benefit)
        service.lastModified = "Just now"
      }
    },
    removeBenefit: (state, action: PayloadAction<{ serviceId: string; index: number }>) => {
      const service = state.services.find((s) => s.id === action.payload.serviceId)
      if (service) {
        service.benefits.splice(action.payload.index, 1)
        service.lastModified = "Just now"
      }
    },
  },
})

function updateStats(state: ServicesState) {
  state.stats = {
    total: state.services.length,
    active: state.services.filter((s) => s.isActive).length,
    inactive: state.services.filter((s) => !s.isActive).length,
  }
}

export const { selectService, updateService, toggleServiceStatus, addFAQ, removeFAQ, addBenefit, removeBenefit } =
  servicesSlice.actions

export default servicesSlice.reducer
