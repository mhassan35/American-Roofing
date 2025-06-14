"use client"

import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { updateComponentSettings, toggleComponent } from "@/lib/redux/slices/contentSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Save, Undo } from "lucide-react"
import ComponentImageField from "./ComponentImageField"

export default function ComponentEditor() {
  const dispatch = useAppDispatch()
  const selectedPage = useAppSelector((state) => state.content.selectedPage)
  const selectedComponent = useAppSelector((state) => state.content.selectedComponent)

  const [settings, setSettings] = useState<Record<string, any>>({})
  const [hasChanges, setHasChanges] = useState(false)

  // Initialize settings when component changes
  useEffect(() => {
    if (selectedComponent) {
      setSettings(selectedComponent.settings)
      setHasChanges(false)
    } else {
      setSettings({})
    }
  }, [selectedComponent])

  if (!selectedPage || !selectedComponent) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">Select a component to edit its settings</p>
        </CardContent>
      </Card>
    )
  }

  // Handle input change
  const handleInputChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
    setHasChanges(true)
  }

  // Handle nested input change (for objects)
  const handleNestedInputChange = (parentKey: string, childKey: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value,
      },
    }))
    setHasChanges(true)
  }

  // Save changes
  const saveChanges = () => {
    dispatch(
      updateComponentSettings({
        componentId: selectedComponent.id,
        settings,
      }),
    )
    setHasChanges(false)
  }

  // Discard changes
  const discardChanges = () => {
    if (selectedComponent) {
      setSettings(selectedComponent.settings)
      setHasChanges(false)
    }
  }

  // Toggle component visibility
  const toggleComponentVisibility = () => {
    dispatch(toggleComponent(selectedComponent.id))
  }

  // Render form fields based on settings
  const renderFormFields = () => {
    return Object.entries(settings).map(([key, value]) => {
      // Skip rendering arrays or complex objects directly
      if (Array.isArray(value) || (typeof value === "object" && value !== null && !key.includes("image"))) {
        return null
      }

      // Handle image fields
      if (
        typeof value === "string" &&
        (key.includes("image") || key.includes("img") || key.includes("background")) &&
        (value.includes("/") || value.includes("http"))
      ) {
        return (
          <ComponentImageField
            key={key}
            pageId={selectedPage.id}
            componentId={selectedComponent.id}
            fieldName={key}
            currentValue={value}
            label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
          />
        )
      }

      // Handle text fields
      if (typeof value === "string") {
        if (value.length > 100) {
          return (
            <div key={key} className="space-y-2">
              <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}</Label>
              <Textarea id={key} value={value} onChange={(e) => handleInputChange(key, e.target.value)} rows={4} />
            </div>
          )
        } else {
          return (
            <div key={key} className="space-y-2">
              <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}</Label>
              <Input id={key} value={value} onChange={(e) => handleInputChange(key, e.target.value)} />
            </div>
          )
        }
      }

      // Handle boolean fields
      if (typeof value === "boolean") {
        return (
          <div key={key} className="flex items-center justify-between">
            <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}</Label>
            <Switch id={key} checked={value} onCheckedChange={(checked) => handleInputChange(key, checked)} />
          </div>
        )
      }

      // Handle number fields
      if (typeof value === "number") {
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}</Label>
            <Input
              id={key}
              type="number"
              value={value}
              onChange={(e) => handleInputChange(key, Number.parseFloat(e.target.value))}
            />
          </div>
        )
      }

      return null
    })
  }

  // Render nested objects
  const renderNestedObjects = () => {
    return Object.entries(settings).map(([key, value]) => {
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        return (
          <Card key={key} className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(value).map(([childKey, childValue]) => {
                if (typeof childValue === "string") {
                  if (
                    (childKey.includes("image") || childKey.includes("img") || childKey.includes("background")) &&
                    (childValue.includes("/") || childValue.includes("http"))
                  ) {
                    return (
                      <ComponentImageField
                        key={`${key}.${childKey}`}
                        pageId={selectedPage.id}
                        componentId={selectedComponent.id}
                        fieldName={`${key}.${childKey}`}
                        currentValue={childValue}
                        label={childKey.charAt(0).toUpperCase() + childKey.slice(1).replace(/([A-Z])/g, " $1")}
                      />
                    )
                  }

                  if (childValue.length > 100) {
                    return (
                      <div key={`${key}.${childKey}`} className="space-y-2">
                        <Label htmlFor={`${key}.${childKey}`}>
                          {childKey.charAt(0).toUpperCase() + childKey.slice(1).replace(/([A-Z])/g, " $1")}
                        </Label>
                        <Textarea
                          id={`${key}.${childKey}`}
                          value={childValue}
                          onChange={(e) => handleNestedInputChange(key, childKey, e.target.value)}
                          rows={4}
                        />
                      </div>
                    )
                  } else {
                    return (
                      <div key={`${key}.${childKey}`} className="space-y-2">
                        <Label htmlFor={`${key}.${childKey}`}>
                          {childKey.charAt(0).toUpperCase() + childKey.slice(1).replace(/([A-Z])/g, " $1")}
                        </Label>
                        <Input
                          id={`${key}.${childKey}`}
                          value={childValue}
                          onChange={(e) => handleNestedInputChange(key, childKey, e.target.value)}
                        />
                      </div>
                    )
                  }
                }

                return null
              })}
            </CardContent>
          </Card>
        )
      }
      return null
    })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{selectedComponent.name}</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleComponentVisibility}>
              {selectedComponent.isActive ? (
                <>
                  <Eye className="h-4 w-4 mr-1" />
                  Visible
                </>
              ) : (
                <>
                  <EyeOff className="h-4 w-4 mr-1" />
                  Hidden
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic">
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Basic Settings</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              {renderFormFields()}
              {renderNestedObjects()}
            </TabsContent>

            <TabsContent value="advanced">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-500">
                    Component ID: <span className="font-mono">{selectedComponent.id}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Component Type: <span className="font-mono">{selectedComponent.type}</span>
                  </p>
                </div>

                {/* Add more advanced settings here */}
              </div>
            </TabsContent>
          </Tabs>

          {hasChanges && (
            <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={discardChanges}>
                <Undo className="h-4 w-4 mr-1" />
                Discard
              </Button>
              <Button className="bg-brand-orange hover:bg-orange-600" onClick={saveChanges}>
                <Save className="h-4 w-4 mr-1" />
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
