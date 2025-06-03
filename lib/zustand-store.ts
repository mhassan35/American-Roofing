"use client"

import { create } from "zustand"

// Lead Form Store
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

// Lead Data Store for Admin
interface Lead {
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
}

export const useLeadStore = create<LeadStore>((set, get) => ({
  leads: [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
      phone: "(713) 555-0123",
      service: "roof-replacement",
      message: "Need a complete roof replacement for my 2-story home in Memorial area.",
      date: "2024-01-15",
      status: "new",
      source: "Website Form",
      urgency: "soon",
      propertyType: "residential",
      address: "123 Memorial Dr",
      zipCode: "77024",
    },
    {
      id: 2,
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.j@email.com",
      phone: "(281) 555-0456",
      service: "storm-damage",
      message: "Recent hail damage, need inspection and repair estimate.",
      date: "2024-01-14",
      status: "contacted",
      source: "Website Form",
      urgency: "urgent",
      propertyType: "residential",
      address: "456 Katy Rd",
      zipCode: "77450",
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Davis",
      email: "mike.davis@email.com",
      phone: "(832) 555-0789",
      service: "roof-repair",
      message: "Small leak in the kitchen area, need quick repair.",
      date: "2024-01-13",
      status: "completed",
      source: "Phone Call",
      urgency: "urgent",
      propertyType: "residential",
      address: "789 Sugar Land Blvd",
      zipCode: "77478",
    },
  ],

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
}))
