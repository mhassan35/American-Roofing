"use client"

import { create } from "zustand"

interface LeadFormStore {
  isOpen: boolean
  openLeadForm: () => void
  closeLeadForm: () => void
}

export const useLeadFormStore = create<LeadFormStore>((set) => ({
  isOpen: false,
  openLeadForm: () => set({ isOpen: true }),
  closeLeadForm: () => set({ isOpen: false }),
}))
