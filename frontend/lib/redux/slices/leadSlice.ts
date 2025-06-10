import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  createdAt: string
  status: "new" | "contacted" | "qualified" | "closed"
}

interface LeadState {
  leads: Lead[]
  isFormOpen: boolean
  loading: boolean
}

const initialState: LeadState = {
  leads: [],
  isFormOpen: false,
  loading: false,
}

const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    openLeadForm: (state) => {
      state.isFormOpen = true
    },
    closeLeadForm: (state) => {
      state.isFormOpen = false
    },
    addLead: (state, action: PayloadAction<Omit<Lead, "id" | "createdAt" | "status">>) => {
      const newLead: Lead = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: "new",
      }
      state.leads.unshift(newLead)
    },
    updateLeadStatus: (state, action: PayloadAction<{ id: string; status: Lead["status"] }>) => {
      const lead = state.leads.find((l) => l.id === action.payload.id)
      if (lead) {
        lead.status = action.payload.status
      }
    },
  },
})

export const { openLeadForm, closeLeadForm, addLead, updateLeadStatus } = leadSlice.actions
export default leadSlice.reducer
