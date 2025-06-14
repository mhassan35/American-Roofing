"use client"

import { useState } from "react"
import { useAppDispatch } from "@/lib/redux/hooks"
import type { ImageAsset } from "@/lib/redux/slices/contentSlice"
import { Button } from "@/components/ui/button"
import { ImageIcon, Edit } from "lucide-react"
import ImageSelector from "./ImageSelector"

interface ComponentImageFieldProps {
  pageId: string
  componentId: string
  fieldName: string
  currentValue: string
  label?: string
}

export default function ComponentImageField({
  pageId,
  componentId,
  fieldName,
  currentValue,
  label,
}: ComponentImageFieldProps) {
  const dispatch = useAppDispatch()
  const [isSelectingImage, setIsSelectingImage] = useState(false)

  // Handle image selection
  const handleImageSelect = (image: ImageAsset) => {
    // Create updated settings with the new image URL
    dispatch({
      type: "content/updateComponentSettings",
      payload: {
        componentId,
        settings: {
          [fieldName]: image.url,
        },
      },
    })

    setIsSelectingImage(false)
  }

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium">{label}</p>}

      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
          {currentValue ? (
            <img
              src={currentValue || "/placeholder.svg"}
              alt={fieldName}
              className="w-full h-full object-cover"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=64&width=64"
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="h-6 w-6 text-gray-400" />
            </div>
          )}
        </div>

        <div className="flex-grow">
          <p className="text-sm font-medium">{fieldName}</p>
          <p className="text-xs text-gray-500 truncate">{currentValue || "No image selected"}</p>
        </div>

        <Button size="sm" variant="outline" onClick={() => setIsSelectingImage(true)}>
          <Edit className="h-4 w-4 mr-1" />
          Change
        </Button>
      </div>

      <ImageSelector
        open={isSelectingImage}
        onOpenChange={setIsSelectingImage}
        onSelect={handleImageSelect}
        title={`Select Image for ${fieldName}`}
      />
    </div>
  )
}
