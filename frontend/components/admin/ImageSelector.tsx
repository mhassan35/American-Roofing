"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, Search, MapPin } from "lucide-react"
import { useImageManagementStore, type ManagedImage } from "@/lib/image-store"
import EnhancedImageUpload from "./ImageUpload"

interface EnhancedImageSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (image: ManagedImage) => void
  title?: string
  description?: string
  category?: string
  multiple?: boolean
}

export default function EnhancedImageSelector({
  open,
  onOpenChange,
  onSelect,
  title = "Select an Image",
  description = "Choose an image from your library or upload a new one.",
  category,
  multiple = false,
}: EnhancedImageSelectorProps) {
  const {
    images,
    categories,
    searchTerm,
    selectedCategory,
    setSearchTerm,
    setSelectedCategory,
    getFilteredImages,
    selectImage,
    selectedImage,
  } = useImageManagementStore()

  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("library")

  const filteredImages = getFilteredImages()

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setSearchTerm("")
      setSelectedCategory(category || "all")
      setSelectedImages([])
      setActiveTab("library")
    }
  }, [open, category, setSearchTerm, setSelectedCategory])

  const handleImageSelect = (image: ManagedImage) => {
    if (multiple) {
      setSelectedImages((prev) =>
        prev.includes(image.id) ? prev.filter((id) => id !== image.id) : [...prev, image.id],
      )
    } else {
      onSelect(image)
      onOpenChange(false)
    }
  }

  const handleConfirmSelection = () => {
    if (multiple && selectedImages.length > 0) {
      selectedImages.forEach((imageId) => {
        const image = images.find((img) => img.id === imageId)
        if (image) onSelect(image)
      })
    }
    onOpenChange(false)
  }

  const handleImageUploaded = (imageId: string) => {
    const image = images.find((img) => img.id === imageId)
    if (image) {
      if (multiple) {
        setSelectedImages((prev) => [...prev, imageId])
      } else {
        onSelect(image)
        onOpenChange(false)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library">Image Library</TabsTrigger>
            <TabsTrigger value="upload">Upload New</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-4">
            {/* Search and filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name} ({cat.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className={`relative aspect-square rounded-md overflow-hidden bg-gray-100 cursor-pointer transition-all ${
                    selectedImages.includes(image.id) ? "ring-2 ring-orange-500" : "hover:ring-2 hover:ring-gray-300"
                  }`}
                  onClick={() => handleImageSelect(image)}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-gray-400" />
                  </div>

                  {/* Usage indicator */}
                  <div className="absolute top-1 right-1">
                    <Badge variant={image.usedIn.length > 0 ? "default" : "secondary"} className="text-xs px-1 py-0">
                      {image.usedIn.length > 0 ? image.usageCount : "0"}
                    </Badge>
                  </div>

                  {/* Selection indicator */}
                  {multiple && selectedImages.includes(image.id) && (
                    <div className="absolute inset-0 bg-orange-500 bg-opacity-20 flex items-center justify-center">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    </div>
                  )}

                  {/* Image info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-1">
                    <p className="text-xs truncate">{image.originalName}</p>
                  </div>
                </div>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-8">
                <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {searchTerm ? `No images match "${searchTerm}"` : "No images available"}
                </p>
                <p className="text-xs text-gray-500 mt-1">Try uploading a new image</p>
              </div>
            )}

            {/* Selected image details */}
            {selectedImage && !multiple && (
              <div className="border-t pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{selectedImage.originalName}</h3>
                    <p className="text-sm text-gray-500">{selectedImage.alt}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {categories.find((c) => c.id === selectedImage.category)?.name}
                      </Badge>
                      <span className="text-xs text-gray-500">{selectedImage.size}</span>
                    </div>
                    {selectedImage.usedIn.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Used in:</p>
                        <div className="space-y-1">
                          {selectedImage.usedIn.slice(0, 3).map((usage, index) => (
                            <div key={index} className="flex items-center gap-1 text-xs text-gray-600">
                              <MapPin className="h-3 w-3" />
                              <span>
                                {usage.pageName} • {usage.componentName}
                              </span>
                            </div>
                          ))}
                          {selectedImage.usedIn.length > 3 && (
                            <p className="text-xs text-gray-500">+{selectedImage.usedIn.length - 3} more locations</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upload">
            <EnhancedImageUpload
              onImageUploaded={handleImageUploaded}
              defaultCategory={category || "general"}
              multiple={false} pageId={""}            />
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between">
          <div className="flex items-center gap-2">
            {multiple && selectedImages.length > 0 && (
              <span className="text-sm text-gray-600">{selectedImages.length} image(s) selected</span>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {multiple && selectedImages.length > 0 && (
              <Button onClick={handleConfirmSelection}>Select {selectedImages.length} Image(s)</Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
