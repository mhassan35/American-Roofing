"use client"

import { useState } from "react"
import { useContentStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Edit,
  Settings,
  Eye,
  FileText,
  ArrowLeft,
  Save,
  Home,
  Users,
  Star,
  Camera,
  Phone,
  Target,
  Globe,
  Wrench,
  Cloud,
  Plus,
  Trash2,
  type LucideIcon,
} from "lucide-react"
import type { ComponentType, PageType, CategoryType, ComponentContent, PageContent } from "@/lib/store"

// Component icons mapping with proper typing
const componentIcons: Record<ComponentType, LucideIcon> = {
  hero: Home,
  services: Settings,
  "social-proof": Star,
  gallery: Camera,
  cta: Target,
  "why-choose": Users,
  "floating-cta": Phone,
  "contact-form": Globe,
  "about-content": FileText,
  "service-benefits": Star,
  "service-process": Settings,
  "service-faqs": FileText,
  "service-layout": FileText,
}

// Page icons mapping with proper typing
const pageIcons: Record<PageType, LucideIcon> = {
  home: Home,
  about: Users,
  contact: Phone,
  services: Settings,
  "roof-replacement": Wrench,
  "roof-repair": Wrench,
  "storm-damage": Cloud,
  gallery: Camera,
}

// Helper function to get component icon safely
const getComponentIcon = (type: string): LucideIcon => {
  return componentIcons[type as ComponentType] || Settings
}

// Helper function to get page icon safely
const getPageIcon = (id: string): LucideIcon => {
  return pageIcons[id as PageType] || FileText
}

// Interface for editing settings
interface EditingSettings {
  title?: string
  subtitle?: string
  ctaText?: string
  primaryCta?: string
  secondaryCta?: string
  phone?: string
  showAfterScroll?: number
  rating?: string
  reviewCount?: string
  benefits?: string[]
  services?: any[]
  features?: any[]
  testimonials?: any[]
  steps?: any[]
  faqs?: any[]
  story?: {
    title?: string
    content?: string
  }
  mission?: {
    title?: string
    content?: string
  }
  credentials?: string[]
  contactInfo?: {
    phone?: string
    email?: string
    address?: string
    hours?: string
  }
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  backgroundImage?: string
  imageAlt?: string
  galleryImages?: string
  showOnMobile?: boolean
  showOnDesktop?: boolean
  customClasses?: string
  description?: string
  content?: string
  categories?: string[]
  projects?: any[]
  [key: string]: any
}

export default function ContentManagement() {
  const {
    pages,
    selectedPage,
    selectedComponent,
    categories,
    selectPage,
    selectComponent,
    updateComponentSettings,
    toggleComponent,
  } = useContentStore()
  const [editingSettings, setEditingSettings] = useState<EditingSettings>({})
  const [activeCategory, setActiveCategory] = useState<CategoryType>("main")

  const handlePageSelect = (pageId: string): void => {
    selectPage(pageId)
  }

  const handleComponentSelect = (componentId: string): void => {
    selectComponent(componentId)
    if (selectedPage) {
      const component = selectedPage.components.find((c: ComponentContent) => c.id === componentId)
      if (component) {
        setEditingSettings(component.settings || {})
      }
    }
  }

  const handleSaveSettings = (): void => {
    if (selectedComponent) {
      updateComponentSettings({
        componentId: selectedComponent.id,
        settings: editingSettings,
      })
    }
  }

  const handleToggleComponent = (componentId: string): void => {
    toggleComponent(componentId)
  }

  const handleInputChange = (field: string, value: string | number | boolean): void => {
    setEditingSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleNestedInputChange = (parent: string, field: string, value: string): void => {
    setEditingSettings((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value },
    }))
  }

  const handleArrayChange = (field: string, value: string): void => {
    setEditingSettings((prev) => ({
      ...prev,
      [field]: value.split("\n").filter((item: string) => item.trim()),
    }))
  }

  const handleObjectArrayChange = (field: string, index: number, key: string, value: string): void => {
    setEditingSettings((prev) => {
      const array = [...(prev[field] || [])]
      if (!array[index]) array[index] = {}
      array[index][key] = value
      return { ...prev, [field]: array }
    })
  }

  const addArrayItem = (field: string, defaultItem: any): void => {
    setEditingSettings((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), defaultItem],
    }))
  }

  const removeArrayItem = (field: string, index: number): void => {
    setEditingSettings((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((_: any, i: number) => i !== index),
    }))
  }

  if (selectedPage && selectedComponent) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="outline" size="sm" onClick={() => selectComponent("")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Components
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit {selectedComponent.name}</h1>
              <p className="text-gray-600">{selectedPage.name}</p>
            </div>
          </div>
          <Button onClick={handleSaveSettings} className="bg-orange-500 hover:bg-orange-600">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Component Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Component Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Hero Section Settings */}
            {selectedComponent.type === "hero" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Main Title</label>
                  <Input
                    value={editingSettings.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <Textarea
                    value={editingSettings.subtitle || ""}
                    onChange={(e) => handleInputChange("subtitle", e.target.value)}
                    rows={3}
                  />
                </div>
                {editingSettings.ctaText !== undefined && (
                  <div>
                    <label className="block text-sm font-medium mb-2">CTA Button Text</label>
                    <Input
                      value={editingSettings.ctaText || ""}
                      onChange={(e) => handleInputChange("ctaText", e.target.value)}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2">Background Image URL</label>
                  <Input
                    value={editingSettings.backgroundImage || ""}
                    onChange={(e) => handleInputChange("backgroundImage", e.target.value)}
                    placeholder="/placeholder.svg?height=600&width=1200"
                  />
                </div>
                {editingSettings.features && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Features (one per line)</label>
                    <Textarea
                      value={Array.isArray(editingSettings.features) ? editingSettings.features.join("\n") : ""}
                      onChange={(e) => handleArrayChange("features", e.target.value)}
                      rows={4}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Services Section Settings */}
            {selectedComponent.type === "services" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Section Title</label>
                  <Input
                    value={editingSettings.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Section Subtitle</label>
                  <Textarea
                    value={editingSettings.subtitle || ""}
                    onChange={(e) => handleInputChange("subtitle", e.target.value)}
                    rows={3}
                  />
                </div>
                {editingSettings.services && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Services</label>
                    {editingSettings.services.map((service: any, index: number) => (
                      <div key={index} className="border p-4 rounded-md mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Service {index + 1}</h4>
                          <Button variant="outline" size="sm" onClick={() => removeArrayItem("services", index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Input
                            placeholder="Service Title"
                            value={service.title || ""}
                            onChange={(e) => handleObjectArrayChange("services", index, "title", e.target.value)}
                          />
                          <Textarea
                            placeholder="Service Description"
                            value={service.description || ""}
                            onChange={(e) => handleObjectArrayChange("services", index, "description", e.target.value)}
                            rows={2}
                          />
                          <Input
                            placeholder="Icon (e.g., home, wrench, cloud)"
                            value={service.icon || ""}
                            onChange={(e) => handleObjectArrayChange("services", index, "icon", e.target.value)}
                          />
                          <Input
                            placeholder="Link URL"
                            value={service.link || ""}
                            onChange={(e) => handleObjectArrayChange("services", index, "link", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addArrayItem("services", { title: "", description: "", icon: "home", link: "" })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Service
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Why Choose Us Settings */}
            {selectedComponent.type === "why-choose" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Section Title</label>
                  <Input
                    value={editingSettings.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Section Subtitle</label>
                  <Textarea
                    value={editingSettings.subtitle || ""}
                    onChange={(e) => handleInputChange("subtitle", e.target.value)}
                    rows={3}
                  />
                </div>
                {editingSettings.features && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Features</label>
                    {editingSettings.features.map((feature: any, index: number) => (
                      <div key={index} className="border p-4 rounded-md mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Feature {index + 1}</h4>
                          <Button variant="outline" size="sm" onClick={() => removeArrayItem("features", index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Input
                            placeholder="Feature Title"
                            value={feature.title || ""}
                            onChange={(e) => handleObjectArrayChange("features", index, "title", e.target.value)}
                          />
                          <Textarea
                            placeholder="Feature Description"
                            value={feature.description || ""}
                            onChange={(e) => handleObjectArrayChange("features", index, "description", e.target.value)}
                            rows={2}
                          />
                          <Input
                            placeholder="Icon (e.g., shield, users, award, clock)"
                            value={feature.icon || ""}
                            onChange={(e) => handleObjectArrayChange("features", index, "icon", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addArrayItem("features", { title: "", description: "", icon: "shield" })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Social Proof Settings */}
            {selectedComponent.type === "social-proof" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Section Title</label>
                  <Input
                    value={editingSettings.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <Input
                    value={editingSettings.rating || ""}
                    onChange={(e) => handleInputChange("rating", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Review Count</label>
                  <Input
                    value={editingSettings.reviewCount || ""}
                    onChange={(e) => handleInputChange("reviewCount", e.target.value)}
                  />
                </div>
                {editingSettings.testimonials && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Testimonials</label>
                    {editingSettings.testimonials.map((testimonial: any, index: number) => (
                      <div key={index} className="border p-4 rounded-md mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Testimonial {index + 1}</h4>
                          <Button variant="outline" size="sm" onClick={() => removeArrayItem("testimonials", index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Input
                            placeholder="Customer Name"
                            value={testimonial.name || ""}
                            onChange={(e) => handleObjectArrayChange("testimonials", index, "name", e.target.value)}
                          />
                          <Textarea
                            placeholder="Testimonial Text"
                            value={testimonial.text || ""}
                            onChange={(e) => handleObjectArrayChange("testimonials", index, "text", e.target.value)}
                            rows={3}
                          />
                          <Input
                            type="number"
                            placeholder="Rating (1-5)"
                            value={testimonial.rating || ""}
                            onChange={(e) => handleObjectArrayChange("testimonials", index, "rating", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addArrayItem("testimonials", { name: "", text: "", rating: 5 })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Testimonial
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* About Content Settings */}
            {selectedComponent.type === "about-content" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Story Title</label>
                  <Input
                    value={editingSettings.story?.title || ""}
                    onChange={(e) => handleNestedInputChange("story", "title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Story Content</label>
                  <Textarea
                    value={editingSettings.story?.content || ""}
                    onChange={(e) => handleNestedInputChange("story", "content", e.target.value)}
                    rows={6}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mission Title</label>
                  <Input
                    value={editingSettings.mission?.title || ""}
                    onChange={(e) => handleNestedInputChange("mission", "title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mission Content</label>
                  <Textarea
                    value={editingSettings.mission?.content || ""}
                    onChange={(e) => handleNestedInputChange("mission", "content", e.target.value)}
                    rows={3}
                  />
                </div>
                {editingSettings.credentials && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Credentials (one per line)</label>
                    <Textarea
                      value={Array.isArray(editingSettings.credentials) ? editingSettings.credentials.join("\n") : ""}
                      onChange={(e) => handleArrayChange("credentials", e.target.value)}
                      rows={6}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Service Layout Settings */}
            {selectedComponent.type === "service-layout" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Section Title</label>
                  <Input
                    value={editingSettings.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={editingSettings.description || ""}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Additional Content</label>
                  <Textarea
                    value={editingSettings.content || ""}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Service Benefits Settings */}
            {selectedComponent.type === "service-benefits" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Section Title</label>
                  <Input
                    value={editingSettings.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                {editingSettings.benefits && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Benefits</label>
                    {editingSettings.benefits.map((benefit: any, index: number) => (
                      <div key={index} className="border p-4 rounded-md mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Benefit {index + 1}</h4>
                          <Button variant="outline" size="sm" onClick={() => removeArrayItem("benefits", index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Input
                            placeholder="Benefit Title"
                            value={benefit.title || ""}
                            onChange={(e) => handleObjectArrayChange("benefits", index, "title", e.target.value)}
                          />
                          <Textarea
                            placeholder="Benefit Description"
                            value={benefit.description || ""}
                            onChange={(e) => handleObjectArrayChange("benefits", index, "description", e.target.value)}
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" onClick={() => addArrayItem("benefits", { title: "", description: "" })}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Benefit
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Service Process Settings */}
            {selectedComponent.type === "service-process" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Section Title</label>
                  <Input
                    value={editingSettings.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Section Subtitle</label>
                  <Textarea
                    value={editingSettings.subtitle || ""}
                    onChange={(e) => handleInputChange("subtitle", e.target.value)}
                    rows={3}
                  />
                </div>
                {editingSettings.steps && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Process Steps</label>
                    {editingSettings.steps.map((step: any, index: number) => (
                      <div key={index} className="border p-4 rounded-md mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Step {index + 1}</h4>
                          <Button variant="outline" size="sm" onClick={() => removeArrayItem("steps", index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Input
                            placeholder="Step Number"
                            type="number"
                            value={step.number || index + 1}
                            onChange={(e) => handleObjectArrayChange("steps", index, "number", e.target.value)}
                          />
                          <Input
                            placeholder="Step Title"
                            value={step.title || ""}
                            onChange={(e) => handleObjectArrayChange("steps", index, "title", e.target.value)}
                          />
                          <Textarea
                            placeholder="Step Description"
                            value={step.description || ""}
                            onChange={(e) => handleObjectArrayChange("steps", index, "description", e.target.value)}
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() =>
                        addArrayItem("steps", { number: editingSettings.steps.length + 1, title: "", description: "" })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Step
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Service FAQs Settings */}
            {selectedComponent.type === "service-faqs" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Section Title</label>
                  <Input
                    value={editingSettings.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                {editingSettings.faqs && (
                  <div>
                    <label className="block text-sm font-medium mb-2">FAQs</label>
                    {editingSettings.faqs.map((faq: any, index: number) => (
                      <div key={index} className="border p-4 rounded-md mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">FAQ {index + 1}</h4>
                          <Button variant="outline" size="sm" onClick={() => removeArrayItem("faqs", index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Input
                            placeholder="Question"
                            value={faq.question || ""}
                            onChange={(e) => handleObjectArrayChange("faqs", index, "question", e.target.value)}
                          />
                          <Textarea
                            placeholder="Answer"
                            value={faq.answer || ""}
                            onChange={(e) => handleObjectArrayChange("faqs", index, "answer", e.target.value)}
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" onClick={() => addArrayItem("faqs", { question: "", answer: "" })}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add FAQ
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Gallery Settings */}
            {selectedComponent.type === "gallery" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Section Title</label>
                  <Input
                    value={editingSettings.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Section Subtitle</label>
                  <Textarea
                    value={editingSettings.subtitle || ""}
                    onChange={(e) => handleInputChange("subtitle", e.target.value)}
                    rows={2}
                  />
                </div>
                {editingSettings.categories && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Categories (one per line)</label>
                    <Textarea
                      value={Array.isArray(editingSettings.categories) ? editingSettings.categories.join("\n") : ""}
                      onChange={(e) => handleArrayChange("categories", e.target.value)}
                      rows={4}
                    />
                  </div>
                )}
              </div>
            )}

            {/* CTA Section Settings */}
            {selectedComponent.type === "cta" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Main Title</label>
                  <Input
                    value={editingSettings.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <Textarea
                    value={editingSettings.subtitle || ""}
                    onChange={(e) => handleInputChange("subtitle", e.target.value)}
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Button Text</label>
                  <Input
                    value={editingSettings.primaryCta || ""}
                    onChange={(e) => handleInputChange("primaryCta", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Secondary Button Text</label>
                  <Input
                    value={editingSettings.secondaryCta || ""}
                    onChange={(e) => handleInputChange("secondaryCta", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Contact Form Settings */}
            {selectedComponent.type === "contact-form" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Form Title</label>
                  <Input
                    value={editingSettings.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Form Subtitle</label>
                  <Textarea
                    value={editingSettings.subtitle || ""}
                    onChange={(e) => handleInputChange("subtitle", e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="space-y-4 border-t pt-4">
                  <h4 className="text-lg font-semibold">Contact Information</h4>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input
                      value={editingSettings.contactInfo?.phone || ""}
                      onChange={(e) => handleNestedInputChange("contactInfo", "phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <Input
                      value={editingSettings.contactInfo?.email || ""}
                      onChange={(e) => handleNestedInputChange("contactInfo", "email", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <Textarea
                      value={editingSettings.contactInfo?.address || ""}
                      onChange={(e) => handleNestedInputChange("contactInfo", "address", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Hours</label>
                    <Textarea
                      value={editingSettings.contactInfo?.hours || ""}
                      onChange={(e) => handleNestedInputChange("contactInfo", "hours", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Floating CTA Settings */}
            {selectedComponent.type === "floating-cta" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input
                    value={editingSettings.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CTA Button Text</label>
                  <Input
                    value={editingSettings.ctaText || ""}
                    onChange={(e) => handleInputChange("ctaText", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Show After Scroll (pixels)</label>
                  <Input
                    type="number"
                    value={editingSettings.showAfterScroll?.toString() || ""}
                    onChange={(e) => handleInputChange("showAfterScroll", Number.parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            )}

            {/* Advanced Settings */}
            <div className="space-y-4 border-t pt-6">
              <h4 className="text-lg font-semibold text-gray-800">Advanced Settings</h4>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={editingSettings.showOnMobile !== false}
                  onCheckedChange={(checked) => handleInputChange("showOnMobile", checked)}
                />
                <label className="text-sm font-medium">Show on Mobile</label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={editingSettings.showOnDesktop !== false}
                  onCheckedChange={(checked) => handleInputChange("showOnDesktop", checked)}
                />
                <label className="text-sm font-medium">Show on Desktop</label>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Custom CSS Classes</label>
                <Input
                  value={editingSettings.customClasses || ""}
                  onChange={(e) => handleInputChange("customClasses", e.target.value)}
                  placeholder="custom-class-1 custom-class-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (selectedPage) {
    const PageIcon = getPageIcon(selectedPage.id)

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="outline" size="sm" onClick={() => selectPage("")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Pages
            </Button>
            <div className="flex items-center">
              <div className="bg-orange-100 p-2 rounded-lg mr-3">
                <PageIcon className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedPage.name}</h1>
                <p className="text-gray-600">Manage page components</p>
              </div>
            </div>
          </div>
        </div>

        {/* Components List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedPage.components.map((component: ComponentContent) => {
            const IconComponent = getComponentIcon(component.type)
            return (
              <Card key={component.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-orange-100 p-2 rounded-lg mr-3">
                        <IconComponent className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{component.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{component.type.replace("-", " ")}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={component.isActive}
                        onCheckedChange={() => handleToggleComponent(component.id)}
                      />
                      <Badge variant={component.isActive ? "default" : "secondary"}>
                        {component.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      size="sm"
                      onClick={() => handleComponentSelect(component.id)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Settings
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        Advanced
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
        <p className="text-gray-600">Manage your website content and page components</p>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <Button
          variant={activeCategory === "main" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveCategory("main")}
          className={activeCategory === "main" ? "bg-white shadow-sm" : ""}
        >
          Main Pages
        </Button>
        <Button
          variant={activeCategory === "service" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveCategory("service")}
          className={activeCategory === "service" ? "bg-white shadow-sm" : ""}
        >
          Service Pages
        </Button>
        <Button
          variant={activeCategory === "utility" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveCategory("utility")}
          className={activeCategory === "utility" ? "bg-white shadow-sm" : ""}
        >
          Utility Pages
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pages</p>
                <p className="text-2xl font-bold text-gray-900">{pages?.length || 0}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Main Pages</p>
                <p className="text-2xl font-bold text-gray-900">{categories?.main?.length || 0}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Service Pages</p>
                <p className="text-2xl font-bold text-gray-900">{categories?.service?.length || 0}</p>
              </div>
              <div className="bg-orange-500 p-3 rounded-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Components</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pages ? pages.reduce((acc: number, page: PageContent) => acc + page.components.length, 0) : 0}
                </p>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories && categories[activeCategory] ? (
          categories[activeCategory].map((pageId: string) => {
            const page = pages.find((p: PageContent) => p.id === pageId)
            if (!page) return null

            const PageIcon = getPageIcon(page.id)
            return (
              <Card
                key={page.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handlePageSelect(page.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-orange-100 p-3 rounded-lg mr-3">
                        <PageIcon className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{page.name}</h3>
                        <p className="text-sm text-gray-500">{page.path}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Published</Badge>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Components:</span>
                      <span className="font-medium">{page.components.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Active:</span>
                      <span className="font-medium text-green-600">
                        {page.components.filter((c: ComponentContent) => c.isActive).length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium capitalize">{page.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Modified:</span>
                      <span className="font-medium">{page.lastModified}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Manage Components
                  </Button>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <p>No pages found in this category</p>
        )}
      </div>
    </div>
  )
}
