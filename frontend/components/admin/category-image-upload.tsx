"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, ImageIcon, X, FolderOpen, CheckCircle } from "lucide-react"
import { useEnhancedImageStore } from "@/lib/enhanced-image-store"
import { toast } from "@/hooks/use-toast"

interface CategoryImageUploadProps {
  selectedCategoryId?: string
  onImageUploaded?: (imageId: string, categoryId: string) => void
  multiple?: boolean
}

export default function CategoryImageUpload({
  selectedCategoryId,
  onImageUploaded,
  multiple = true,
}: CategoryImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [categoryId, setCategoryId] = useState(selectedCategoryId || "general")
  const [altText, setAltText] = useState("")
  const [tags, setTags] = useState("")
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { categories, uploadImageToCategory, uploadingToCategory, getImagesByCategory } = useEnhancedImageStore()

  const activeCategories = categories.filter((cat) => cat.isActive)
  const selectedCategory = categories.find((cat) => cat.id === categoryId)
  const categoryImages = getImagesByCategory(categoryId)

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
    if (selectedFiles.length === 0 || !categoryId) return

    setUploading(true)
    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        const fileKey = `${file.name}-${i}`

        try {
          // Update progress
          setUploadProgress((prev) => ({ ...prev, [fileKey]: 0 }))

          const imageId = await uploadImageToCategory(file, categoryId, {
            alt: altText || file.name.replace(/\.[^/.]+$/, ""),
            tags: tagArray,
          })

          // Simulate progress for better UX
          setUploadProgress((prev) => ({ ...prev, [fileKey]: 100 }))

          if (onImageUploaded) {
            onImageUploaded(imageId, categoryId)
          }

          toast({
            title: "Image Uploaded Successfully",
            description: `${file.name} has been added to ${selectedCategory?.name || categoryId}.`,
          })
        } catch (error) {
          console.error(`Failed to upload ${file.name}:`, error)
          toast({
            title: "Upload Failed",
            description: `Failed to upload ${file.name}. Please try again.`,
            variant: "destructive",
          })
        }
      }

      // Reset form
      setSelectedFiles([])
      setAltText("")
      setTags("")
      setUploadProgress({})
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload images. Please try again.",
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
    <div className="space-y-6">
      {/* Category Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Select Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Upload to Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {activeCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{category.name}</span>
                        <Badge variant="outline" className="ml-2">
                          {category.count}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCategory && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">{selectedCategory.name}</span>
                  <Badge variant="secondary">{categoryImages.length} images</Badge>
                </div>
                {selectedCategory.description && (
                  <p className="text-sm text-blue-700">{selectedCategory.description}</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver
                ? "border-blue-500 bg-blue-50"
                : uploadingToCategory === categoryId
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-300 hover:border-gray-400"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              {uploadingToCategory === categoryId
                ? "Uploading to category..."
                : "Drag and drop images here, or click to select"}
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || uploadingToCategory === categoryId}
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : "Select Images"}
            </Button>
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Selected Files</Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedFiles.map((file, index) => {
                  const fileKey = `${file.name}-${index}`
                  const progress = uploadProgress[fileKey]

                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3 flex-1">
                        <ImageIcon className="h-4 w-4 text-gray-400" />
                        <div className="flex-1">
                          <span className="text-sm font-medium truncate block">{file.name}</span>
                          <span className="text-xs text-gray-500">
                            {Math.round(file.size / 1024)}KB • {selectedCategory?.name}
                          </span>
                          {progress !== undefined && (
                            <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                              <div
                                className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      {progress !== 100 && (
                        <Button variant="ghost" size="sm" onClick={() => removeFile(index)} disabled={uploading}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                      {progress === 100 && <CheckCircle className="h-4 w-4 text-green-600" />}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Upload Settings */}
          {selectedFiles.length > 0 && (
            <div className="space-y-4 pt-4 border-t">
              <div>
                <Label className="text-sm font-medium mb-1 block">Alt Text (Optional)</Label>
                <Input
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Describe the images..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to use filename. Applied to all selected images.
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-1 block">Tags (Optional)</Label>
                <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="tag1, tag2, tag3..." />
                <p className="text-xs text-gray-500 mt-1">Separate tags with commas. Applied to all selected images.</p>
              </div>
            </div>
          )}

          {/* Upload Button */}
          {selectedFiles.length > 0 && (
            <Button
              onClick={uploadImages}
              disabled={uploading || !categoryId || uploadingToCategory === categoryId}
              className="w-full"
              size="lg"
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading
                ? `Uploading ${selectedFiles.length} image(s)...`
                : `Upload ${selectedFiles.length} image(s) to ${selectedCategory?.name || categoryId}`}
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
        </CardContent>
      </Card>
    </div>
  )
}
