"use client"

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useContentStore } from "@/lib/store"
import ContactForm from "@/components/contact-form"
import { Skeleton } from "@/components/ui/skeleton"

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  service: string
  message: string
}

export default function ContactPage() {
  const [isClient, setIsClient] = useState(false)
  const { getPageContent } = useContentStore()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <PageSkeleton />
  }

  const pageContent = getPageContent("contact")

  if (!pageContent) {
    return <PageSkeleton />
  }

  const getComponentContent = (componentId: string) => {
    const component = pageContent.components.find((c) => c.id === componentId)
    return component?.isActive ? component.settings : null
  }

  return (
    <main className="pt-20">
      {getComponentContent("contact-form") && <ContactForm content={getComponentContent("contact-form")} />}
    </main>
  )
}

function PageSkeleton() {
  return (
    <main className="pt-20">
      <div className="relative w-full bg-gradient-to-br from-green-100 via-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Skeleton className="h-16 w-full max-w-2xl" />
              <Skeleton className="h-8 w-full max-w-xl" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>
            <Skeleton className="h-96 w-full max-w-md justify-self-end" />
          </div>
        </div>
      </div>
    </main>
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
