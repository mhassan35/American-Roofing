import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

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
  source?: string
  urgency?: string
  propertyType?: string
  address?: string
  zipCode?: string
}

interface LeadsState {
  leads: Lead[]
  filteredLeads: Lead[]
  searchTerm: string
  statusFilter: string
  selectedLead: Lead | null
  stats: {
    total: number
    new: number
    contacted: number
    completed: number
  }
}

const mockLeads: Lead[] = [
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
]

const initialState: LeadsState = {
  leads: mockLeads,
  filteredLeads: mockLeads,
  searchTerm: "",
  statusFilter: "all",
  selectedLead: null,
  stats: {
    total: mockLeads.length,
    new: mockLeads.filter((l) => l.status === "new").length,
    contacted: mockLeads.filter((l) => l.status === "contacted").length,
    completed: mockLeads.filter((l) => l.status === "completed").length,
  },
}

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setLeads: (state, action: PayloadAction<Lead[]>) => {
      state.leads = action.payload
      state.filteredLeads = filterLeads(action.payload, state.searchTerm, state.statusFilter)
      updateStats(state)
    },
    addLead: (state, action: PayloadAction<Omit<Lead, "id" | "date" | "status">>) => {
      const newLead: Lead = {
        ...action.payload,
        id: Math.max(...state.leads.map((l) => l.id), 0) + 1,
        date: new Date().toISOString().split("T")[0],
        status: "new",
      }
      state.leads.unshift(newLead)
      state.filteredLeads = filterLeads(state.leads, state.searchTerm, state.statusFilter)
      updateStats(state)
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
      state.filteredLeads = filterLeads(state.leads, action.payload, state.statusFilter)
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload
      state.filteredLeads = filterLeads(state.leads, state.searchTerm, action.payload)
    },
    updateLeadStatus: (state, action: PayloadAction<{ id: number; status: Lead["status"] }>) => {
      const { id, status } = action.payload
      const leadIndex = state.leads.findIndex((lead) => lead.id === id)
      if (leadIndex !== -1) {
        state.leads[leadIndex].status = status
        state.filteredLeads = filterLeads(state.leads, state.searchTerm, state.statusFilter)
        updateStats(state)
      }
    },
    selectLead: (state, action: PayloadAction<Lead | null>) => {
      state.selectedLead = action.payload
    },
  },
})

function filterLeads(leads: Lead[], searchTerm: string, statusFilter: string): Lead[] {
  let filtered = leads

  if (searchTerm) {
    filtered = filtered.filter(
      (lead) =>
        lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.address && lead.address.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }

  if (statusFilter !== "all") {
    filtered = filtered.filter((lead) => lead.status === statusFilter)
  }

  return filtered
}

function updateStats(state: LeadsState) {
  state.stats = {
    total: state.leads.length,
    new: state.leads.filter((l) => l.status === "new").length,
    contacted: state.leads.filter((l) => l.status === "contacted").length,
    completed: state.leads.filter((l) => l.status === "completed").length,
  }
}

export const { setLeads, addLead, setSearchTerm, setStatusFilter, updateLeadStatus, selectLead } = leadsSlice.actions
export default leadsSlice.reducer
