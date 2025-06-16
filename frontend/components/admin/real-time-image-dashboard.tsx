"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ImageIcon,
  Search,
  Trash2,
  Eye,
  Edit,
  RefreshCw,
  Grid,
  List,
  MoreHorizontal,
  FolderOpen,
  Plus,
  Move,
  ToggleLeft,
  ToggleRight,
  Activity,
} from "lucide-react"
import { useEnhancedImageStore, type ManagedImage } from "@/lib/enhanced-image-store"
import { toast } from "@/hooks/use-toast"
import CategoryImageUpload from "./category-image-upload"

export default function RealTimeImageDashboard() {
  const {
    images,
    categories,
    selectedImage,
    searchTerm,
    selectedCategory,
    stats,
    setSearchTerm,
    setSelectedCategory,
    getFilteredImages,
    getImagesByCategory,
    selectImage,
    updateImage,
    deleteImage,
    moveImageToCategory,
    bulkMoveToCategory,
    bulkDelete,
    bulkToggleActive,
    toggleImageActive,
    updateStats,
    syncWithFileSystem,
    addListener,
  } = useEnhancedImageStore()

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showImageDetails, setShowImageDetails] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [editingAlt, setEditingAlt] = useState("")
  const [editingTags, setEditingTags] = useState("")
  const [realTimeUpdates, setRealTimeUpdates] = useState(0)

  const filteredImages = getFilteredImages()
  const activeCategories = categories.filter((cat) => cat.isActive)

  // Real-time updates listener
  useEffect(() => {
    const unsubscribe = addListener((updatedImages, updatedCategories) => {
      setRealTimeUpdates((prev) => prev + 1)
      console.log("Real-time update received:", {
        images: updatedImages.length,
        categories: updatedCategories.length,
        timestamp: new Date().toISOString(),
      })
    })

    return unsubscribe
  }, [addListener])

  // Update stats on mount and when images change
  useEffect(() => {
    updateStats()
  }, [images, updateStats])

  const handleImageSelect = (imageId: string) => {
    setSelectedImages((prev) => (prev.includes(imageId) ? prev.filter((id) => id !== imageId) : [...prev, imageId]))
  }

  const handleSelectAll = () => {
    if (selectedImages.length === filteredImages.length) {
      setSelectedImages([])
    } else {
      setSelectedImages(filteredImages.map((img) => img.id))
    }
  }

  const handleImageClick = (image: ManagedImage) => {
    selectImage(image.id)
    setEditingAlt(image.alt)
    setEditingTags(image.tags.join(", "))
    setShowImageDetails(true)
  }

  const handleUpdateImage = () => {
    if (!selectedImage) return

    updateImage(selectedImage.id, {
      alt: editingAlt,
      tags: editingTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    })

    toast({
      title: "Image Updated",
      description: "Image details have been updated and synced across the website.",
    })

    setShowImageDetails(false)
  }

  const handleDeleteSelected = async () => {
    try {
      await bulkDelete(selectedImages)
      setSelectedImages([])
      setShowDeleteDialog(false)

      toast({
        title: "Images Deleted",
        description: `${selectedImages.length} images have been deleted and removed from the website.`,
      })
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete some images. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleBulkMoveToCategory = (newCategoryId: string) => {
    bulkMoveToCategory(selectedImages, newCategoryId)
    const categoryName = categories.find((c) => c.id === newCategoryId)?.name

    toast({
      title: "Images Moved",
      description: `${selectedImages.length} images moved to ${categoryName}.`,
    })

    setSelectedImages([])
  }

  const handleToggleActive = (imageId: string) => {
    toggleImageActive(imageId)
    const image = images.find((img) => img.id === imageId)

    toast({
      title: image?.isActive ? "Image Activated" : "Image Deactivated",
      description: image?.isActive ? "Image is now visible on the website." : "Image is now hidden from the website.",
    })
  }

  const handleImageUploaded = (imageId: string, categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    toast({
      title: "Image Uploaded Successfully",
      description: `Image has been added to ${category?.name} and is now live on the website.`,
    })
    setShowUploadDialog(false)
  }

  return (
    <div className="space-y-6">
      {/* Header with Real-time Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Image Management Dashboard</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-gray-600">Real-time image management with live website updates</p>
            <Badge variant="outline" className="flex items-center gap-1">
              <Activity className="h-3 w-3 text-green-500" />
              Live ({realTimeUpdates} updates)
            </Badge>
          </div>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0 flex-wrap">
          <Button onClick={() => setShowUploadDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Upload Images
          </Button>
          <Button variant="outline" onClick={syncWithFileSystem}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Storage
          </Button>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            <p className="text-sm text-gray-600">Total Images</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.used}</p>
            <p className="text-sm text-gray-600">In Use</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{stats.unused}</p>
            <p className="text-sm text-gray-600">Unused</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{stats.storageUsed}</p>
            <p className="text-sm text-gray-600">Storage Used</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Categories Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {activeCategories.map((category) => (
              <div
                key={category.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedCategory === category.id ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{category.name}</span>
                  <Badge variant="secondary">{category.count}</Badge>
                </div>
                {category.description && <p className="text-xs text-gray-500 mt-1 truncate">{category.description}</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search images by name, alt text, or tags..."
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
                <SelectItem value="unused">Unused Images</SelectItem>
                {activeCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedImages.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Checkbox checked={selectedImages.length === filteredImages.length} onCheckedChange={handleSelectAll} />
                <span className="text-sm font-medium">
                  {selectedImages.length} of {filteredImages.length} selected
                </span>
              </div>
              <div className="flex gap-2">
                <Select onValueChange={handleBulkMoveToCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Move to category" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <Move className="h-3 w-3" />
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => bulkToggleActive(selectedImages)}>
                  <ToggleLeft className="h-4 w-4 mr-2" />
                  Toggle Active
                </Button>
                <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Images Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              Images ({filteredImages.length})
              {selectedCategory !== "all" && (
                <Badge variant="outline" className="ml-2">
                  {categories.find((c) => c.id === selectedCategory)?.name || "Unused"}
                </Badge>
              )}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className={`group relative bg-gray-100 rounded-lg overflow-hidden aspect-square cursor-pointer ${
                    !image.isActive ? "opacity-50" : ""
                  }`}
                >
                  <div className="absolute top-2 left-2 z-10">
                    <Checkbox
                      checked={selectedImages.includes(image.id)}
                      onCheckedChange={() => handleImageSelect(image.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  <div
                    className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative overflow-hidden"
                    onClick={() => handleImageClick(image)}
                  >
                    {image.exists ? (
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        onError={() => updateImage(image.id, { exists: false })}
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                        <span className="text-xs text-gray-500 mt-1">Not Found</span>
                      </div>
                    )}
                  </div>

                  <div className="absolute top-2 right-2 flex gap-1">
                    <Badge variant={image.usedIn.length > 0 ? "default" : "secondary"} className="text-xs">
                      {image.usedIn.length > 0 ? `Used ${image.usageCount}x` : "Unused"}
                    </Badge>
                    <Button
                      size="sm"
                      variant={image.isActive ? "default" : "secondary"}
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleActive(image.id)
                      }}
                    >
                      {image.isActive ? <ToggleRight className="h-3 w-3" /> : <ToggleLeft className="h-3 w-3" />}
                    </Button>
                  </div>

                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteImage(image.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-2">
                    <p className="text-xs font-medium text-gray-900 truncate">{image.originalName}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{image.size}</span>
                      <span>{categories.find((c) => c.id === image.category)?.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className={`flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 ${
                    !image.isActive ? "opacity-50" : ""
                  }`}
                >
                  <Checkbox
                    checked={selectedImages.includes(image.id)}
                    onCheckedChange={() => handleImageSelect(image.id)}
                  />
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{image.originalName}</h3>
                    <p className="text-sm text-gray-500">{image.alt}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {categories.find((c) => c.id === image.category)?.name}
                      </Badge>
                      <span className="text-xs text-gray-500">{image.size}</span>
                      {image.usedIn.length > 0 && (
                        <Badge variant="default" className="text-xs">
                          Used in {image.usageCount} places
                        </Badge>
                      )}
                      <Badge variant={image.isActive ? "default" : "secondary"} className="text-xs">
                        {image.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleImageClick(image)}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm
                  ? `No images match "${searchTerm}" in the selected category.`
                  : "No images in this category yet."}
              </p>
              <Button onClick={() => setShowUploadDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Upload Images
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload Images to Category</DialogTitle>
          </DialogHeader>
          <CategoryImageUpload
            selectedCategoryId={selectedCategory !== "all" ? selectedCategory : undefined}
            onImageUploaded={handleImageUploaded}
            multiple={true}
          />
        </DialogContent>
      </Dialog>

      {/* Image Details Dialog */}
      <Dialog open={showImageDetails} onOpenChange={setShowImageDetails}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Image Details</DialogTitle>
          </DialogHeader>

          {selectedImage && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="usage">Usage ({selectedImage.usedIn.length})</TabsTrigger>
                <TabsTrigger value="category">Category</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-16 w-16 text-gray-400" />
                    </div>
                    <div className="mt-4 space-y-2 text-sm">
                      <p>
                        <strong>File:</strong> {selectedImage.originalName}
                      </p>
                      <p>
                        <strong>Size:</strong> {selectedImage.size}
                      </p>
                      <p>
                        <strong>Type:</strong> {selectedImage.mimeType}
                      </p>
                      <p>
                        <strong>Uploaded:</strong> {new Date(selectedImage.uploadDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Category:</strong> {categories.find((c) => c.id === selectedImage.category)?.name}
                      </p>
                      <p>
                        <strong>Status:</strong>
                        <Badge variant={selectedImage.isActive ? "default" : "secondary"} className="ml-2">
                          {selectedImage.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Alt Text</label>
                      <Input
                        value={editingAlt}
                        onChange={(e) => setEditingAlt(e.target.value)}
                        placeholder="Describe this image..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Tags</label>
                      <Input
                        value={editingTags}
                        onChange={(e) => setEditingTags(e.target.value)}
                        placeholder="tag1, tag2, tag3..."
                      />
                      <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="usage" className="space-y-4">
                {selectedImage.usedIn.length > 0 ? (
                  <div className="space-y-3">
                    {selectedImage.usedIn.map((usage, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">{usage.pageName}</p>
                          <p className="text-sm text-gray-500">
                            {usage.componentName} • {usage.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">This image is not currently used anywhere on the website.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="category" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Move to Category</label>
                  <Select
                    value={selectedImage.category}
                    onValueChange={(categoryId) => moveImageToCategory(selectedImage.id, categoryId)}
                  >
                    <SelectTrigger>
                      <SelectValue />
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
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImageDetails(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateImage}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Images</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to permanently delete {selectedImages.length} selected images?</p>
            <Alert>
              <Trash2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Warning:</strong> This action cannot be undone. The images will be removed from storage and all
                website references will be updated immediately.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSelected}>
              Delete Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
