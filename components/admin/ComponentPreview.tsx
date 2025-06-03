"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, ToggleLeft, ToggleRight } from "lucide-react"

interface ComponentPreviewProps {
  component: {
    id: string
    name: string
    type: string
    isActive: boolean
    settings: Record<string, any>
  }
  onEdit: () => void
  onToggle: () => void
}

export default function ComponentPreview({ component, onEdit, onToggle }: ComponentPreviewProps) {
  const getPreviewContent = () => {
    switch (component.type) {
      case "hero":
        return (
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded">
            <h3 className="text-lg font-bold mb-2">{component.settings.title}</h3>
            <p className="text-sm opacity-90">{component.settings.subtitle}</p>
            <div className="mt-3">
              <span className="bg-white text-orange-600 px-3 py-1 rounded text-xs font-medium">
                {component.settings.ctaText}
              </span>
            </div>
          </div>
        )
      case "services":
        return (
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-bold mb-2">{component.settings.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{component.settings.subtitle}</p>
            <div className="grid grid-cols-2 gap-2">
              {component.settings.services?.slice(0, 4).map((service: any, idx: number) => (
                <div key={idx} className="bg-white p-2 rounded text-xs">
                  <div className="font-medium">{service.name}</div>
                </div>
              ))}
            </div>
          </div>
        )
      case "social-proof":
        return (
          <div className="p-4 bg-yellow-50 rounded">
            <h3 className="font-bold mb-2">{component.settings.title}</h3>
            <div className="flex items-center mb-2">
              <span className="text-2xl font-bold text-yellow-600">{component.settings.rating}</span>
              <span className="text-sm text-gray-600 ml-2">★★★★★</span>
            </div>
            <p className="text-xs text-gray-600">{component.settings.reviewCount} reviews</p>
          </div>
        )
      case "cta":
        return (
          <div className="p-4 bg-orange-50 rounded">
            <h3 className="font-bold mb-2">{component.settings.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{component.settings.subtitle}</p>
            <div className="space-x-2">
              <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs">
                {component.settings.primaryCta}
              </span>
              <span className="border border-orange-500 text-orange-500 px-2 py-1 rounded text-xs">
                {component.settings.secondaryCta}
              </span>
            </div>
          </div>
        )
      default:
        return (
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">{component.name}</h3>
            <p className="text-sm text-gray-600">Component preview not available</p>
          </div>
        )
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{component.name}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant={component.isActive ? "default" : "secondary"} className="text-xs">
              {component.isActive ? "Active" : "Inactive"}
            </Badge>
            <Button variant="ghost" size="sm" onClick={onToggle} className="h-6 w-6 p-0">
              {component.isActive ? (
                <ToggleRight className="h-4 w-4 text-green-600" />
              ) : (
                <ToggleLeft className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Preview */}
        <div className="mb-4">{getPreviewContent()}</div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={onEdit} className="flex-1">
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-3 w-3 mr-1" />
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
