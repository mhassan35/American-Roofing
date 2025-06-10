"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Upload, ImageIcon } from "lucide-react"
import { useContentStore } from "@/lib/store"
import { toast } from "@/hooks/use-toast"

interface ImageUploadProps {
  pageId: string
  onImageUploaded?: (imageId: string) => void
}

export default function ImageUpload({ pageId, onImageUploaded }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addImage } = useContentStore()

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please select an image file.",
        variant: "destructive",
      })
      return
    }

    uploadImage(file)
  }

  const uploadImage = async (file: File) => {
    setUploading(true)

    try {
      // Create a blob URL for the image (in a real app, you'd upload to a server)
      const imageUrl = URL.createObjectURL(file)

      const newImage = {
        id: `img-${Date.now()}`,
        url: imageUrl,
        alt: file.name.replace(/\.[^/.]+$/, ""),
        title: file.name,
      }

      addImage({ pageId, image: newImage })

      toast({
        title: "Image Uploaded",
        description: "Image has been successfully uploaded.",
      })

      if (onImageUploaded) {
        onImageUploaded(newImage.id)
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Label className="text-sm font-medium">Upload Image</Label>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver ? "border-orange-500 bg-orange-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Drag and drop an image here, or click to select</p>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : "Select Image"}
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
