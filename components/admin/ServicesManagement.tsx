"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux"
import {
  selectService,
  updateService,
  toggleServiceStatus,
  addFAQ,
  removeFAQ,
  addBenefit,
  removeBenefit,
} from "@/lib/store/slices/servicesSlice"
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
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Home,
  Wrench,
  Cloud,
  CheckCircle,
  HelpCircle,
  Target,
  Copy,
} from "lucide-react"
import { useState } from "react"

const serviceIcons = {
  "roof-replacement": { icon: Home, color: "bg-blue-100 text-blue-600" },
  "roof-repair": { icon: Wrench, color: "bg-orange-100 text-orange-600" },
  "storm-damage": { icon: Cloud, color: "bg-red-100 text-red-600" },
}

export default function ServicesManagement() {
  const dispatch = useAppDispatch()
  const { services, selectedService, stats } = useAppSelector((state) => state.services)
  const [editingSettings, setEditingSettings] = useState<Record<string, any>>({})
  const [newFAQ, setNewFAQ] = useState({ question: "", answer: "" })
  const [newBenefit, setNewBenefit] = useState("")

  const handleServiceSelect = (serviceId: string) => {
    dispatch(selectService(serviceId))
    const service = services.find((s) => s.id === serviceId)
    if (service) {
      setEditingSettings({
        title: service.title,
        description: service.description,
        heroTitle: service.heroTitle,
        heroSubtitle: service.heroSubtitle,
        benefits: service.benefits,
        process: service.process,
        faqs: service.faqs,
        pricing: service.pricing,
        cta: service.cta,
      })
    }
  }

  const handleSaveSettings = () => {
    if (selectedService) {
      dispatch(
        updateService({
          id: selectedService.id,
          updates: editingSettings,
        }),
      )
    }
  }

  const handleAddFAQ = () => {
    if (selectedService && newFAQ.question && newFAQ.answer) {
      dispatch(
        addFAQ({
          serviceId: selectedService.id,
          faq: newFAQ,
        }),
      )
      setNewFAQ({ question: "", answer: "" })
      setEditingSettings((prev) => ({
        ...prev,
        faqs: [...(prev.faqs || []), newFAQ],
      }))
    }
  }

  const handleAddBenefit = () => {
    if (selectedService && newBenefit) {
      dispatch(
        addBenefit({
          serviceId: selectedService.id,
          benefit: newBenefit,
        }),
      )
      setNewBenefit("")
      setEditingSettings((prev) => ({
        ...prev,
        benefits: [...(prev.benefits || []), newBenefit],
      }))
    }
  }

  const handleRemoveFAQ = (index: number) => {
    if (selectedService) {
      dispatch(
        removeFAQ({
          serviceId: selectedService.id,
          index,
        }),
      )
      setEditingSettings((prev) => ({
        ...prev,
        faqs: prev.faqs?.filter((_, i) => i !== index) || [],
      }))
    }
  }

  const handleRemoveBenefit = (index: number) => {
    if (selectedService) {
      dispatch(
        removeBenefit({
          serviceId: selectedService.id,
          index,
        }),
      )
      setEditingSettings((prev) => ({
        ...prev,
        benefits: prev.benefits?.filter((_, i) => i !== index) || [],
      }))
    }
  }

  if (selectedService) {
    const serviceIconData = serviceIcons[selectedService.id as keyof typeof serviceIcons] || {
      icon: Settings,
      color: "bg-gray-100 text-gray-600",
    }
    const IconComponent = serviceIconData.icon

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="outline" size="sm" onClick={() => dispatch(selectService(""))} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Button>
            <div className="flex items-center">
              <div className={`${serviceIconData.color} p-2 rounded-lg mr-3`}>
                <IconComponent className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit {selectedService.name}</h1>
                <p className="text-gray-600">Manage service content and settings</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Switch
              checked={selectedService.isActive}
              onCheckedChange={() => dispatch(toggleServiceStatus(selectedService.id))}
            />
            <Button onClick={handleSaveSettings} className="bg-orange-500 hover:bg-orange-600">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Service Title</label>
                <Input
                  value={editingSettings.title || ""}
                  onChange={(e) => setEditingSettings((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={editingSettings.description || ""}
                  onChange={(e) => setEditingSettings((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hero Title</label>
                <Input
                  value={editingSettings.heroTitle || ""}
                  onChange={(e) => setEditingSettings((prev) => ({ ...prev, heroTitle: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
                <Textarea
                  value={editingSettings.heroSubtitle || ""}
                  onChange={(e) => setEditingSettings((prev) => ({ ...prev, heroSubtitle: e.target.value }))}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card>
            <CardHeader>
              <CardTitle>Call to Action</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">CTA Title</label>
                <Input
                  value={editingSettings.cta?.title || ""}
                  onChange={(e) =>
                    setEditingSettings((prev) => ({
                      ...prev,
                      cta: { ...prev.cta, title: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CTA Subtitle</label>
                <Textarea
                  value={editingSettings.cta?.subtitle || ""}
                  onChange={(e) =>
                    setEditingSettings((prev) => ({
                      ...prev,
                      cta: { ...prev.cta, subtitle: e.target.value },
                    }))
                  }
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Button Text</label>
                <Input
                  value={editingSettings.cta?.buttonText || ""}
                  onChange={(e) =>
                    setEditingSettings((prev) => ({
                      ...prev,
                      cta: { ...prev.cta, buttonText: e.target.value },
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Benefits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Service Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {editingSettings.benefits?.map((benefit: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">{benefit}</span>
                  <Button size="sm" variant="ghost" onClick={() => handleRemoveBenefit(index)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
              <div className="flex space-x-2">
                <Input
                  placeholder="Add new benefit..."
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                />
                <Button onClick={handleAddBenefit}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Process */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Service Process
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Process Title</label>
              <Input
                value={editingSettings.process?.title || ""}
                onChange={(e) =>
                  setEditingSettings((prev) => ({
                    ...prev,
                    process: { ...prev.process, title: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-3">
              {editingSettings.process?.steps?.map((step: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">Step Title</label>
                      <Input
                        value={step.title}
                        onChange={(e) => {
                          const newSteps = [...(editingSettings.process?.steps || [])]
                          newSteps[index] = { ...newSteps[index], title: e.target.value }
                          setEditingSettings((prev) => ({
                            ...prev,
                            process: { ...prev.process, steps: newSteps },
                          }))
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Step Description</label>
                      <Textarea
                        value={step.description}
                        onChange={(e) => {
                          const newSteps = [...(editingSettings.process?.steps || [])]
                          newSteps[index] = { ...newSteps[index], description: e.target.value }
                          setEditingSettings((prev) => ({
                            ...prev,
                            process: { ...prev.process, steps: newSteps },
                          }))
                        }}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-2" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {editingSettings.faqs?.map((faq: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{faq.question}</h4>
                    <Button size="sm" variant="ghost" onClick={() => handleRemoveFAQ(index)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              ))}

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Add New FAQ</h4>
                <div className="space-y-3">
                  <Input
                    placeholder="Question..."
                    value={newFAQ.question}
                    onChange={(e) => setNewFAQ((prev) => ({ ...prev, question: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Answer..."
                    value={newFAQ.answer}
                    onChange={(e) => setNewFAQ((prev) => ({ ...prev, answer: e.target.value }))}
                    rows={3}
                  />
                  <Button onClick={handleAddFAQ}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add FAQ
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
        <p className="text-gray-600">Manage your roofing service pages and content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Services</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Services</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive Services</p>
                <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
              </div>
              <div className="bg-red-500 p-3 rounded-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const serviceIconData = serviceIcons[service.id as keyof typeof serviceIcons] || {
            icon: Settings,
            color: "bg-gray-100 text-gray-600",
          }
          const IconComponent = serviceIconData.icon
          return (
            <Card
              key={service.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleServiceSelect(service.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`${serviceIconData.color} p-3 rounded-lg mr-3`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={service.isActive}
                      onCheckedChange={() => dispatch(toggleServiceStatus(service.id))}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Badge variant={service.isActive ? "default" : "secondary"}>
                      {service.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Benefits:</span>
                    <span className="font-medium">{service.benefits.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Process Steps:</span>
                    <span className="font-medium">{service.process.steps.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">FAQs:</span>
                    <span className="font-medium">{service.faqs.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Modified:</span>
                    <span className="font-medium">{service.lastModified}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Leads Generated:</span>
                    <span className="font-medium">25</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Conversions:</span>
                    <span className="font-medium">8</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Service
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-1" />
                      Settings
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-1" />
                      Clone
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
