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
  TrendingUp,
  Search,
  Share2,
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
}

// Page icons mapping with proper typing
const pageIcons: Record<PageType, LucideIcon> = {
  home: Home,
  about: Users,
  contact: Phone,
  "roof-replacement": Wrench,
  "roof-repair": Wrench,
  "storm-damage": Cloud,
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
  story?: {
    title?: string
    content?: string
  }
  mission?: {
    title?: string
    content?: string
  }
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

  const handleInputChange = (field: string, value: string | number): void => {
    setEditingSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleNestedInputChange = (parent: string, field: string, value: string): void => {
    setEditingSettings((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value },
    }))
  }

  const handleBenefitsChange = (value: string): void => {
    setEditingSettings((prev) => ({
      ...prev,
      benefits: value.split("\n").filter((b: string) => b.trim()),
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
                    rows={4}
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
                <div>
                  <label className="block text-sm font-medium mb-2">Benefits (one per line)</label>
                  <Textarea
                    value={Array.isArray(editingSettings.benefits) ? editingSettings.benefits.join("\n") : ""}
                    onChange={(e) => handleBenefitsChange(e.target.value)}
                    rows={6}
                  />
                </div>
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
                <p className="text-2xl font-bold text-gray-900">{pages.length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{categories.main.length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{categories.service.length}</p>
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
                  {pages.reduce((acc: number, page: PageContent) => acc + page.components.length, 0)}
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
        {categories[activeCategory].map((pageId: string) => {
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
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Performance:</span>
                    <span className="font-medium">
                      <TrendingUp className="inline-block h-4 w-4 mr-1" />
                      {Math.floor(Math.random() * 100)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">SEO Score:</span>
                    <span className="font-medium">
                      <Search className="inline-block h-4 w-4 mr-1" />
                      {Math.floor(Math.random() * 100)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Social Shares:</span>
                    <span className="font-medium">
                      <Share2 className="inline-block h-4 w-4 mr-1" />
                      {Math.floor(Math.random() * 50)}
                    </span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Manage Components
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
