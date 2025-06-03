"use client"

import { useEffect } from "react"
import { useLeadStore } from "@/lib/zustand-store"
import { useToast } from "@/components/ui/use-toast"

// This component handles lead form submissions and integrates with the admin system
export default function LeadFormHandler() {
  const { addLead } = useLeadStore()
  const { toast } = useToast()

  // Function to handle lead form submission
  const handleLeadSubmission = async (formData: any) => {
    try {
      // Add lead to the store (which will appear in admin)
      addLead({
        firstName: formData.name.split(" ")[0] || formData.name,
        lastName: formData.name.split(" ").slice(1).join(" ") || "",
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message || "",
        source: "Website Form",
        urgency: formData.urgency,
        propertyType: formData.propertyType,
        address: formData.address,
        zipCode: formData.zipCode,
      })

      // Show success message
      toast({
        title: "Lead Submitted Successfully!",
        description: "The lead has been added to your admin dashboard.",
        variant: "default",
      })

      return true
    } catch (error) {
      console.error("Error submitting lead:", error)
      toast({
        title: "Error",
        description: "Failed to submit lead. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  // Expose the handler globally so the lead form can use it
  useEffect(() => {
    ;(window as any).handleLeadSubmission = handleLeadSubmission
  }, [])

  return null // This component doesn't render anything
}
