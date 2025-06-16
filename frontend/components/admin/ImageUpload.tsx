"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, ImageIcon, X } from "lucide-react"
import { useImageManagementStore } from "@/lib/image-store"
import { toast } from "@/hooks/use-toast"

interface EnhancedImageUploadProps {
  onImageUploaded?: (imageId: string) => void
  defaultCategory?: string
  multiple?: boolean
}

export default function EnhancedImageUpload({
  onImageUploaded,
  defaultCategory = "general",
  multiple = true,
}: EnhancedImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [category, setCategory] = useState(defaultCategory)
  const [tags, setTags] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addImageFromUrl, categories } = useImageManagementStore()

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"))

    if (imageFiles.length === 0) {
      toast({
        title: "Invalid Files",
        description: "Please select image files only.",
        variant: "destructive",
      })
      return
    }

    if (!multiple && imageFiles.length > 1) {
      setSelectedFiles([imageFiles[0]])
    } else {
      setSelectedFiles(imageFiles)
    }
  }

  const uploadImages = async () => {
    if (selectedFiles.length === 0) return

    setUploading(true)

    try {
      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)

      for (const file of selectedFiles) {
        try {
          // Create blob URL for immediate preview
          const blobUrl = URL.createObjectURL(file)

          const imageId = await addImageFromUrl(blobUrl, {
            alt: file.name.replace(/\.[^/.]+$/, ""),
            title: file.name,
            category,
            size: `${Math.round(file.size / 1024)}KB`,
            tags: tagArray,
            originalName: file.name,
            mimeType: file.type,
          })

          // Create download link for manual saving
          const link = document.createElement("a")
          link.href = blobUrl
          link.download = file.name
          link.style.display = "none"
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)

          if (onImageUploaded) {
            onImageUploaded(imageId)
          }

          // Show instructions
          toast({
            title: "Image Ready",
            description: `${file.name} is ready. Save it to your desired location manually.`,
          })
        } catch (error) {
          console.error(`Failed to process ${file.name}:`, error)
          toast({
            title: "Processing Failed",
            description: `Failed to process ${file.name}. Please try again.`,
            variant: "destructive",
          })
        }
      }

      // Reset form
      setSelectedFiles([])
      setTags("")
      setCategory(defaultCategory)
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to process images. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
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
          <Label className="text-sm font-medium">Upload Images</Label>

          {/* Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver ? "border-orange-500 bg-orange-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Drag and drop images here, or click to select</p>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : "Select Images"}
            </Button>
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Selected Files</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm truncate">{file.name}</span>
                      <span className="text-xs text-gray-500">({Math.round(file.size / 1024)}KB)</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Settings */}
          {selectedFiles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-1">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-1">Tags</Label>
                <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="tag1, tag2, tag3..." />
              </div>
            </div>
          )}

          {/* Upload Button */}
          {selectedFiles.length > 0 && (
            <Button onClick={uploadImages} disabled={uploading} className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : `Upload ${selectedFiles.length} Image(s)`}
            </Button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
