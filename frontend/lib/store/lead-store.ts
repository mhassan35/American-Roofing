import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Lead = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  service: string
  propertyType?: string
  urgency?: string
  address?: string
  zipCode?: string
  message?: string
  photo?: string
  status: "new" | "contacted" | "completed"
  date: string
  source: string
}

type LeadStore = {
  leads: Lead[]
  addLead: (lead: Omit<Lead, "id" | "date" | "status" | "source">) => void
  updateLeadStatus: (id: string, status: Lead["status"]) => void
  getStats: () => {
    total: number
    new: number
    contacted: number
    completed: number
  }
}

export const useLeadStore = create<LeadStore>()(
  persist(
    (set, get) => ({
      leads: [],

      addLead: (leadData) => {
        const newLead: Lead = {
          id: `lead_${Date.now()}`,
          firstName: leadData.firstName || "",
          lastName: leadData.lastName || "",
          email: leadData.email,
          phone: leadData.phone,
          service: leadData.service,
          propertyType: leadData.propertyType,
          urgency: leadData.urgency,
          address: leadData.address,
          zipCode: leadData.zipCode,
          message: leadData.message,
          photo: leadData.photo,
          status: "new",
          date: new Date().toLocaleDateString(),
          source: "Website Form",
        }

        set((state) => ({
          leads: [newLead, ...state.leads],
        }))

        return newLead.id
      },

      updateLeadStatus: (id, status) => {
        set((state) => ({
          leads: state.leads.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
        }))
      },

      getStats: () => {
        const leads = get().leads
        return {
          total: leads.length,
          new: leads.filter((lead) => lead.status === "new").length,
          contacted: leads.filter((lead) => lead.status === "contacted").length,
          completed: leads.filter((lead) => lead.status === "completed").length,
        }
      },
    }),
    {
      name: "lead-storage",
    },
  ),
)
