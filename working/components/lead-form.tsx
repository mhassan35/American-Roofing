"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useLeadFormStore } from "@/lib/store"
import {
  X,
  Home,
  Building,
  Clock,
  MapPin,
  Camera,
  User,
  Phone,
  Mail,
  CheckCircle,
  Loader2,
  Calendar,
  AlertCircle,
  Info,
  HelpCircle,
  Send,
  ChevronLeft,
  ChevronRight,
  Upload,
  FileText,
  Clipboard,
  Wrench,
  CloudLightning,
  Search,
  Droplets,
} from "lucide-react"

const services = [
  { id: "roof-replacement", label: "Roof Replacement", icon: Home },
  { id: "roof-repair", label: "Roof Repair", icon: Wrench },
  { id: "storm-damage", label: "Storm Damage", icon: CloudLightning },
  { id: "inspection", label: "Free Inspection", icon: Search },
  { id: "gutters", label: "Gutter Services", icon: Droplets },
  { id: "insurance", label: "Insurance Claim", icon: FileText },
]

const propertyTypes = [
  { id: "residential", label: "Residential", icon: Home },
  { id: "commercial", label: "Commercial", icon: Building },
]

const urgencyLevels = [
  { id: "urgent", label: "Urgent (ASAP)", icon: AlertCircle },
  { id: "soon", label: "Soon (Within 2 weeks)", icon: Calendar },
  { id: "planning", label: "Planning (1+ months)", icon: Clock },
]

export default function LeadForm() {
  const { isOpen, closeLeadForm } = useLeadFormStore()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    service: "",
    propertyType: "",
    urgency: "",
    address: "",
    zipCode: "",
    photo: null,
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  // Update progress bar
  useEffect(() => {
    const totalSteps = 6
    setProgress((step / totalSteps) * 100)
  }, [step])

  const handleServiceSelect = (service: string) => {
    setFormData({ ...formData, service })
    nextStep()
  }

  const handlePropertyTypeSelect = (propertyType: string) => {
    setFormData({ ...formData, propertyType })
    nextStep()
  }

  const handleUrgencySelect = (urgency: string) => {
    setFormData({ ...formData, urgency })
    nextStep()
  }

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.address && formData.zipCode) {
      nextStep()
    } else {
      toast({
        title: "Please fill in all fields",
        description: "Address and zip code are required",
        variant: "destructive",
      })
    }
  }

  const handlePhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Photo is optional, so we can proceed regardless
    nextStep()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] })
    }
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, phone, and email are required",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success
      setIsSubmitting(false)
      setIsComplete(true)

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsComplete(false)
        setStep(1)
        setFormData({
          service: "",
          propertyType: "",
          urgency: "",
          address: "",
          zipCode: "",
          photo: null,
          name: "",
          phone: "",
          email: "",
          message: "",
        })
        closeLeadForm()
      }, 5000)
    } catch (error) {
      setIsSubmitting(false)
      toast({
        title: "Error submitting form",
        description: "Please try again later",
        variant: "destructive",
      })
    }
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-brand-orange text-white p-4 pb-6">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 text-white hover:bg-white/20 h-8 w-8"
                onClick={closeLeadForm}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="flex items-center mb-2">
                <Clipboard className="h-5 w-5 mr-2" />
                <h2 className="text-lg font-semibold">Get Your Free Roofing Estimate</h2>
              </div>
              <p className="text-sm text-white/80">Quick, easy, and no obligation</p>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/20">
                <div className="h-full bg-brand-green progress-bar" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Form content */}
            <div className="p-5 overflow-y-auto max-h-[calc(90vh-80px)]">
              {isComplete ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-green/20 mb-4">
                    <CheckCircle className="h-8 w-8 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Thank You!</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Your estimate request has been submitted successfully. One of our roofing experts will contact you
                    shortly.
                  </p>
                  <Button
                    onClick={closeLeadForm}
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white text-sm py-2 px-6"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <>
                  {/* Step 1: Service Selection */}
                  {step === 1 && (
                    <div>
                      <div className="flex items-center mb-4">
                        <HelpCircle className="h-4 w-4 text-brand-orange mr-2" />
                        <h3 className="text-base font-semibold text-gray-800">What service do you need?</h3>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {services.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => handleServiceSelect(service.id)}
                            className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-md hover:border-brand-orange hover:bg-brand-orange/5 transition-colors"
                          >
                            <div className="flat-icon flat-icon-sm flat-icon-primary rounded-full mb-2">
                              <service.icon className="h-4 w-4" />
                            </div>
                            <span className="text-center text-xs text-gray-800">{service.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Property Type */}
                  {step === 2 && (
                    <div>
                      <div className="flex items-center mb-4">
                        <Building className="h-4 w-4 text-brand-orange mr-2" />
                        <h3 className="text-base font-semibold text-gray-800">Is this residential or commercial?</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {propertyTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => handlePropertyTypeSelect(type.id)}
                            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-md hover:border-brand-orange hover:bg-brand-orange/5 transition-colors"
                          >
                            <div className="flat-icon flat-icon-sm flat-icon-primary rounded-full mb-2">
                              <type.icon className="h-4 w-4" />
                            </div>
                            <span className="text-center text-sm text-gray-800">{type.label}</span>
                          </button>
                        ))}
                      </div>

                      <div className="mt-6 flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-sm py-1.5 px-3 border-brand-green text-brand-green"
                          onClick={prevStep}
                        >
                          <ChevronLeft className="h-3 w-3 mr-1" />
                          Back
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Urgency */}
                  {step === 3 && (
                    <div>
                      <div className="flex items-center mb-4">
                        <Clock className="h-4 w-4 text-brand-orange mr-2" />
                        <h3 className="text-base font-semibold text-gray-800">Is this urgent or routine?</h3>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {urgencyLevels.map((level) => (
                          <button
                            key={level.id}
                            onClick={() => handleUrgencySelect(level.id)}
                            className="flex items-center p-3 border border-gray-200 rounded-md hover:border-brand-orange hover:bg-brand-orange/5 transition-colors"
                          >
                            <div className="flat-icon flat-icon-sm flat-icon-primary rounded-full mr-3">
                              <level.icon className="h-4 w-4" />
                            </div>
                            <span className="text-sm text-gray-800">{level.label}</span>
                          </button>
                        ))}
                      </div>

                      <div className="mt-6 flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-sm py-1.5 px-3 border-brand-green text-brand-green"
                          onClick={prevStep}
                        >
                          <ChevronLeft className="h-3 w-3 mr-1" />
                          Back
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Address */}
                  {step === 4 && (
                    <div>
                      <div className="flex items-center mb-4">
                        <MapPin className="h-4 w-4 text-brand-orange mr-2" />
                        <h3 className="text-base font-semibold text-gray-800">What's your address?</h3>
                      </div>
                      <form onSubmit={handleAddressSubmit}>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                              Street Address
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-orange h-4 w-4" />
                              <Input
                                id="address"
                                placeholder="123 Main St"
                                className="pl-9 py-2 text-sm border-brand-green/50 focus:border-brand-green"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                              Zip Code
                            </label>
                            <div className="relative">
                              <Info className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-orange h-4 w-4" />
                              <Input
                                id="zipCode"
                                placeholder="77001"
                                className="pl-9 py-2 text-sm border-brand-green/50 focus:border-brand-green"
                                value={formData.zipCode}
                                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-between">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-sm py-1.5 px-3 border-brand-green text-brand-green"
                            onClick={prevStep}
                          >
                            <ChevronLeft className="h-3 w-3 mr-1" />
                            Back
                          </Button>
                          <Button
                            type="submit"
                            size="sm"
                            className="bg-brand-orange hover:bg-brand-orange/90 text-white text-sm py-1.5 px-3"
                          >
                            Continue
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Step 5: Photo Upload (Optional) */}
                  {step === 5 && (
                    <div>
                      <div className="flex items-center mb-2">
                        <Camera className="h-4 w-4 text-brand-orange mr-2" />
                        <h3 className="text-base font-semibold text-gray-800">
                          Upload a photo of your roof (Optional)
                        </h3>
                      </div>
                      <p className="text-xs text-gray-600 mb-4">This helps us provide a more accurate estimate</p>

                      <form onSubmit={handlePhotoSubmit}>
                        <div className="border-2 border-dashed border-brand-green/30 rounded-md p-6 text-center">
                          <div className="mb-3">
                            <Upload className="h-8 w-8 text-brand-green mx-auto" />
                          </div>

                          {formData.photo ? (
                            <div className="mb-3">
                              <p className="text-sm text-brand-green font-medium">Photo selected</p>
                              <p className="text-xs text-gray-500">{formData.photo.name}</p>
                            </div>
                          ) : (
                            <p className="text-xs text-gray-500 mb-3">Drag and drop a photo here, or click to select</p>
                          )}

                          <input
                            type="file"
                            id="photo"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-xs py-1.5 px-3 border-brand-green text-brand-green"
                            onClick={() => document.getElementById("photo")?.click()}
                          >
                            <Camera className="h-3 w-3 mr-1" />
                            Select Photo
                          </Button>
                        </div>

                        <div className="mt-6 flex justify-between">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-sm py-1.5 px-3 border-brand-green text-brand-green"
                            onClick={prevStep}
                          >
                            <ChevronLeft className="h-3 w-3 mr-1" />
                            Back
                          </Button>
                          <Button
                            type="submit"
                            size="sm"
                            className="bg-brand-orange hover:bg-brand-orange/90 text-white text-sm py-1.5 px-3"
                          >
                            {formData.photo ? "Continue" : "Skip This Step"}
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Step 6: Contact Information */}
                  {step === 6 && (
                    <div>
                      <div className="flex items-center mb-4">
                        <User className="h-4 w-4 text-brand-orange mr-2" />
                        <h3 className="text-base font-semibold text-gray-800">Your Contact Information</h3>
                      </div>
                      <form onSubmit={handleFinalSubmit}>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-orange h-4 w-4" />
                              <Input
                                id="name"
                                placeholder="John Smith"
                                className="pl-9 py-2 text-sm border-brand-green/50 focus:border-brand-green"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-orange h-4 w-4" />
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="(713) 555-1234"
                                className="pl-9 py-2 text-sm border-brand-green/50 focus:border-brand-green"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-orange h-4 w-4" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                className="pl-9 py-2 text-sm border-brand-green/50 focus:border-brand-green"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                              Additional Information (Optional)
                            </label>
                            <div className="relative">
                              <FileText className="absolute left-3 top-3 text-brand-orange h-4 w-4" />
                              <Textarea
                                id="message"
                                placeholder="Tell us more about your roofing needs..."
                                rows={3}
                                className="pl-9 text-sm border-brand-green/50 focus:border-brand-green"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-between">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-sm py-1.5 px-3 border-brand-green text-brand-green"
                            onClick={prevStep}
                            disabled={isSubmitting}
                          >
                            <ChevronLeft className="h-3 w-3 mr-1" />
                            Back
                          </Button>
                          <Button
                            type="submit"
                            size="sm"
                            className="bg-brand-orange hover:bg-brand-orange/90 text-white text-sm py-1.5 px-3"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-3 w-3" />
                                Submit Request
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
