"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useContentStore } from "@/lib/store"
import Hero from "@/components/hero"
import { useHydration } from "@/hooks/use-hydration"

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  service: string
  message: string
}

export default function ContactPage() {
  const isHydrated = useHydration()
  const { getPageContent } = useContentStore()

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  // Don't render content until hydrated
  if (!isHydrated) {
    return (
      <div className="pt-20">
        <DefaultContactContent formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
    )
  }

  const pageContent = getPageContent("contact")

  if (!pageContent) {
    return (
      <div className="pt-20">
        <DefaultContactContent formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
    )
  }

  const activeComponents = pageContent.components.filter((component: any) => component.isActive)

  return (
    <div className="pt-20">
      {activeComponents.map((component: any) => {
        switch (component.type) {
          case "hero":
            return <Hero key={component.id} content={component.settings} />
          case "contact-form":
            return (
              <ContactFormSection
                key={component.id}
                content={component.settings}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}

function DefaultContactContent({
  formData,
  handleChange,
  handleSubmit,
}: {
  formData: ContactFormData
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <ContactFormSection
      content={{
        title: "Get Your Free Estimate",
        subtitle: "Fill out the form below and we'll get back to you within 24 hours",
        contactInfo: {
          phone: "(713) 555-1234",
          email: "info@americanroofing.com",
          address: "123 Main Street\nHouston, TX 77001",
          hours: "Mon - Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 4:00 PM\nSun: Emergency calls only",
        },
      }}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

// Contact Form Component
function ContactFormSection({
  content,
  formData,
  handleChange,
  handleSubmit,
}: {
  content: any
  formData: ContactFormData
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}) {
  const title = content?.title || "Get Your Free Estimate"
  const subtitle = content?.subtitle || "Fill out the form below and we'll get back to you within 24 hours"
  const contactInfo = content?.contactInfo || {}

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">{title}</h2>
                <p className="text-gray-600 mb-6">{subtitle}</p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(713) 555-1234"
                      className="w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Needed</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-orange-500 focus:ring-orange-500"
                    >
                      <option value="">Select a service</option>
                      <option value="Roof Replacement">Roof Replacement</option>
                      <option value="Roof Repair">Roof Repair</option>
                      <option value="Storm Damage">Storm Damage</option>
                      <option value="Gutter Projects">Gutter Projects</option>
                      <option value="Inspection">Inspection</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your roofing project..."
                      rows={4}
                      className="w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Ready to start your roofing project? Contact us today for a free estimate. Our experienced team is here
                to help you with all your roofing needs.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.phone && (
                <Card className="bg-white shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-100 p-3 rounded-full">
                        <Phone className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-600">Phone</h3>
                        <p className="text-gray-600">{contactInfo.phone}</p>
                        <p className="text-sm text-gray-500">Call us for immediate assistance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {contactInfo.email && (
                <Card className="bg-white shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <Mail className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-600">Email</h3>
                        <p className="text-gray-600">{contactInfo.email}</p>
                        <p className="text-sm text-gray-500">Send us your questions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {contactInfo.address && (
                <Card className="bg-white shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-100 p-3 rounded-full">
                        <MapPin className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-600">Address</h3>
                        <p className="text-gray-600 whitespace-pre-line">{contactInfo.address}</p>
                        <p className="text-sm text-gray-500">Visit our office</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {contactInfo.hours && (
                <Card className="bg-white shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <Clock className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-600">Business Hours</h3>
                        <p className="text-gray-600 whitespace-pre-line">{contactInfo.hours}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
