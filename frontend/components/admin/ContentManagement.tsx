"use client"

import { useState } from "react"
import { useContentStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit2, Trash2, Save, Copy, Settings, ImageIcon, Type, Layout, Eye, EyeOff } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import SEOEditor from "./SEOEditor"
import ImageUpload from "./ImageUpload"

export default function ContentManagement() {
  const {
    pages,
    selectedPage,
    selectedComponent,
    selectPage,
    selectComponent,
    updateComponentSettings,
    toggleComponent,
    addComponent,
    deleteComponent,
    duplicateComponent,
    removeImage,
  } = useContentStore()

  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [selectedPageId, setSelectedPageId] = useState("home")

  const handleSelectPage = (pageId: string) => {
    setSelectedPageId(pageId)
    selectPage(pageId)
  }

  const handleEditField = (fieldPath: string, currentValue: any) => {
    setEditingField(fieldPath)
    setEditValue(typeof currentValue === "object" ? JSON.stringify(currentValue, null, 2) : String(currentValue))
  }

  const handleSaveField = () => {
    if (!selectedComponent || !editingField) return

    try {
      let newValue = editValue

      // Try to parse as JSON if it looks like an object/array
      if (editValue.trim().startsWith("{") || editValue.trim().startsWith("[")) {
        try {
          newValue = JSON.parse(editValue)
        } catch {
          // Keep as string if JSON parsing fails
        }
      }

      const fieldParts = editingField.split(".")
      const newSettings = { ...selectedComponent.settings }

      if (fieldParts.length === 1) {
        newSettings[fieldParts[0]] = newValue
      } else if (fieldParts.length === 2) {
        if (!newSettings[fieldParts[0]]) newSettings[fieldParts[0]] = {}
        newSettings[fieldParts[0]][fieldParts[1]] = newValue
      }

      updateComponentSettings({
        componentId: selectedComponent.id,
        settings: newSettings,
      })

      setEditingField(null)
      setEditValue("")

      toast({
        title: "Content Updated",
        description: "Content has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content. Please check your input.",
        variant: "destructive",
      })
    }
  }

  const handleAddComponent = (type: string) => {
    if (!selectedPage) return

    const newComponent = {
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      type: type as any,
      isActive: true,
      settings: getDefaultSettings(type),
    }

    addComponent({
      pageId: selectedPage.id,
      component: newComponent,
    })

    toast({
      title: "Component Added",
      description: `New ${type} component has been added.`,
    })
  }

  const handleDeleteComponent = (componentId: string) => {
    if (!selectedPage) return

    deleteComponent({
      pageId: selectedPage.id,
      componentId,
    })

    toast({
      title: "Component Deleted",
      description: "Component has been deleted.",
      variant: "destructive",
    })
  }

  const handleDuplicateComponent = (componentId: string) => {
    if (!selectedPage) return

    duplicateComponent({
      pageId: selectedPage.id,
      componentId,
    })

    toast({
      title: "Component Duplicated",
      description: "Component has been duplicated.",
    })
  }

  const getDefaultSettings = (type: string) => {
    const defaults: Record<string, any> = {
      hero: {
        title: "New Hero Title",
        subtitle: "New hero subtitle",
        primaryButton: "Primary Button",
        secondaryButton: "Secondary Button",
      },
      services: {
        title: "New Services Section",
        subtitle: "Services description",
        services: [],
      },
      "why-choose": {
        title: "Why Choose Us",
        subtitle: "Benefits description",
        features: [],
      },
      testimonials: {
        title: "Customer Reviews",
        subtitle: "What our customers say",
        reviews: [],
      },
      gallery: {
        title: "Project Gallery",
        subtitle: "Our recent work",
        projects: [],
      },
      "trust-badges": {
        badges: [],
      },
      "trust-section": {
        title: "Trust & Certifications",
        certifications: [],
        stats: [],
      },
      "service-layout": {
        title: "Service Title",
        description: "Service description",
        content: "Service content",
      },
      "service-benefits": {
        title: "Service Benefits",
        benefits: [],
      },
      "service-process": {
        title: "Our Process",
        steps: [],
      },
      "service-faqs": {
        title: "Frequently Asked Questions",
        faqs: [],
      },
    }

    return defaults[type] || { title: "New Component", content: "Component content" }
  }

  const renderFieldEditor = (fieldPath: string, value: any, label: string) => {
    const isEditing = editingField === fieldPath
    const displayValue = typeof value === "object" ? JSON.stringify(value, null, 2) : String(value || "")

    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {isEditing ? (
          <div className="space-y-2">
            {typeof value === "object" || displayValue.length > 100 ? (
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                rows={6}
                className="w-full font-mono text-sm"
              />
            ) : (
              <Input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full" />
            )}
            <div className="flex space-x-2">
              <Button onClick={handleSaveField} size="sm">
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant="outline" onClick={() => setEditingField(null)} size="sm">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div
              className="p-3 bg-gray-50 rounded border min-h-[40px] cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleEditField(fieldPath, value)}
            >
              <p className="text-sm whitespace-pre-wrap break-words">
                {displayValue || <span className="text-gray-400">Click to edit</span>}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleEditField(fieldPath, value)}>
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <Select value={selectedPageId} onValueChange={handleSelectPage}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select page" />
          </SelectTrigger>
          <SelectContent>
            {pages.map((page) => (
              <SelectItem key={page.id} value={page.id}>
                {page.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedPage && (
        <Tabs defaultValue="components" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="components">
              <Layout className="h-4 w-4 mr-2" />
              Components
            </TabsTrigger>
            <TabsTrigger value="seo">
              <Settings className="h-4 w-4 mr-2" />
              SEO Settings
            </TabsTrigger>
            <TabsTrigger value="images">
              <ImageIcon className="h-4 w-4 mr-2" />
              Images
            </TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Components List */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Components</h3>
                {selectedPage.components.map((component, index) => (
                  <Card
                    key={component.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedComponent?.id === component.id ? "ring-2 ring-orange-500 shadow-lg" : "hover:shadow-md"
                    }`}
                    onClick={() => selectComponent(component.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Switch
                            checked={component.isActive}
                            onCheckedChange={() => toggleComponent(component.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div>
                            <h4 className="font-medium">{component.name}</h4>
                            <p className="text-sm text-gray-500 capitalize">{component.type.replace("-", " ")}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={component.isActive ? "default" : "secondary"}>
                            {component.isActive ? (
                              <>
                                <Eye className="h-3 w-3 mr-1" />
                                Active
                              </>
                            ) : (
                              <>
                                <EyeOff className="h-3 w-3 mr-1" />
                                Inactive
                              </>
                            )}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDuplicateComponent(component.id)
                            }}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteComponent(component.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Component Editor */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Component Editor</h3>
                {selectedComponent ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Editing: {selectedComponent.name}</span>
                        <Badge variant="outline" className="capitalize">
                          {selectedComponent.type.replace("-", " ")}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Component Settings */}
                      <div className="space-y-4">
                        <h4 className="font-medium">Settings</h4>
                        {Object.entries(selectedComponent.settings).map(([key, value]) => (
                          <div key={key}>
                            {renderFieldEditor(
                              key,
                              value,
                              key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Type className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Select a component to edit its content</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <SEOEditor pageId={selectedPage.id} currentSEO={selectedPage.seo} />
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <ImageUpload pageId={selectedPage.id} />

              <Card>
                <CardHeader>
                  <CardTitle>Current Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedPage.images.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.alt}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeImage({ pageId: selectedPage.id, imageId: image.id })}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-gray-600 truncate">{image.alt}</p>
                        </div>
                      </div>
                    ))}
                    {selectedPage.images.length === 0 && (
                      <div className="col-span-2 text-center py-8 text-gray-500">No images uploaded yet</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
