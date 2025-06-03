"use client"

import { create } from "zustand"

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
}

interface AdminStore {
  leads: Lead[]
  addLead: (lead: Omit<Lead, "id" | "date" | "status">) => void
  updateLeadStatus: (id: number, status: Lead["status"]) => void
  deleteLead: (id: number) => void
}

export const useAdminStore = create<AdminStore>((set) => ({
  leads: [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
      phone: "(713) 555-0123",
      service: "Roof Replacement",
      message: "Need a complete roof replacement for my 2-story home in Memorial area.",
      date: "2024-01-15",
      status: "new",
    },
    {
      id: 2,
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.j@email.com",
      phone: "(281) 555-0456",
      service: "Storm Damage",
      message: "Recent hail damage, need inspection and repair estimate.",
      date: "2024-01-14",
      status: "contacted",
    },
  ],

  addLead: (leadData) =>
    set((state) => ({
      leads: [
        ...state.leads,
        {
          ...leadData,
          id: Math.max(...state.leads.map((l) => l.id)) + 1,
          date: new Date().toISOString().split("T")[0],
          status: "new",
        },
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
}))
