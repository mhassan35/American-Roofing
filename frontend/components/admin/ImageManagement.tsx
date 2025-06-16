// "use client"

// import { useState } from "react"
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import {
//   ImageIcon,
//   Upload,
//   Search,
//   Trash2,
//   Download,
//   Eye,
//   Folder,
//   Home,
//   Wrench,
//   Cloud,
// } from "lucide-react"

// // ✅ Define TypeScript interfaces
// interface ImageType {
//   id: number
//   name: string
//   category: string
//   size: string
//   uploadDate: string
//   alt: string
//   tags: string[]
//   usageCount: number
// }

// interface CategoryType {
//   id: string
//   name: string
//   icon: any
//   count?: number
// }

// const imageCategories: CategoryType[] = [
//   { id: "all", name: "All Images", icon: ImageIcon },
//   { id: "general", name: "General", icon: Folder },
//   { id: "roof-replacement", name: "Roof Replacement", icon: Home },
//   { id: "roof-repair", name: "Roof Repair", icon: Wrench },
//   { id: "storm-damage", name: "Storm Damage", icon: Cloud },
//   { id: "before-after", name: "Before & After", icon: Eye },
//   { id: "team", name: "Team Photos", icon: Folder },
//   { id: "roof-replacement-before-after", name: "Roof Replacement Before & After", icon: Eye },
//   { id: "roof-repair-before-after", name: "Roof Repair Before & After", icon: Eye },
//   { id: "storm-damage-before-after", name: "Storm Damage Before & After", icon: Eye },
// ]

// export default function ImageManagement() {
//   const [selectedCategory, setSelectedCategory] = useState<string>("all")
//   const [searchTerm, setSearchTerm] = useState<string>("")
//   const [selectedImage, setSelectedImage] = useState<ImageType | null>(null)
//   const [altText, setAltText] = useState<string>("")
//   const [tags, setTags] = useState<string>("")

//   const images: ImageType[] = Array.from({ length: 24 }, (_, i) => ({
//     id: i + 1,
//     name: `image-${i + 1}.jpg`,
//     category: imageCategories[Math.floor(Math.random() * (imageCategories.length - 7)) + 1].id,
//     size: `${Math.floor(Math.random() * 500 + 100)}KB`,
//     uploadDate: "2024-01-15",
//     alt: `Roofing project ${i + 1}`,
//     tags: ["roofing", "repair", "house"],
//     usageCount: Math.floor(Math.random() * 10),
//   }))

//   const filteredImages = images.filter((image) => {
//     const matchesCategory = selectedCategory === "all" || image.category === selectedCategory
//     const matchesSearch =
//       image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       image.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
//     return matchesCategory && matchesSearch
//   })

//   const getCategoryStats = (): CategoryType[] => {
//     return imageCategories.map((category) => ({
//       ...category,
//       count: category.id === "all" ? images.length : images.filter((img) => img.category === category.id).length,
//     }))
//   }

//   const handleImageClick = (image: ImageType) => {
//     setSelectedImage(image)
//     setAltText(image.alt)
//     setTags(image.tags.join(", "))
//   }

//   const handleAltTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setAltText(e.target.value)
//   }

//   const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTags(e.target.value)
//   }

//   const handleSaveAltText = () => {
//     if (selectedImage) {
//       console.log(`Saving alt text "${altText}" for image ${selectedImage.id}`)
//       setSelectedImage(null)
//     }
//   }

//   const handleBulkDelete = () => {
//     console.log(`Bulk deleting images in category: ${selectedCategory}`)
//   }

//   const handleOptimizeImages = () => {
//     console.log("Optimizing images...")
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Image Management</h1>
//           <p className="text-gray-600">Upload and organize your website images by service category</p>
//         </div>
//         <Button className="mt-4 sm:mt-0 bg-orange-500 hover:bg-orange-600">
//           <Upload className="h-4 w-4 mr-2" />
//           Upload Images
//         </Button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="p-4 text-center">
//             <p className="text-xl font-bold">{images.length}</p>
//             <p className="text-sm text-gray-600">Total Images</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4 text-center">
//             <p className="text-xl font-bold">2.4GB</p>
//             <p className="text-sm text-gray-600">Storage Used</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4 text-center">
//             <p className="text-xl font-bold">{imageCategories.length - 1}</p>
//             <p className="text-sm text-gray-600">Categories</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4 text-center">
//             <p className="text-xl font-bold">12</p>
//             <p className="text-sm text-gray-600">This Month</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Category Cards */}
//       <Card>
//         <CardHeader><CardTitle>Image Categories</CardTitle></CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
//             {getCategoryStats().map((category) => {
//               const IconComponent = category.icon
//               return (
//                 <div
//                   key={category.id}
//                   className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
//                     selectedCategory === category.id
//                       ? "border-orange-500 bg-orange-50"
//                       : "border-gray-200 hover:border-gray-300"
//                   }`}
//                   onClick={() => setSelectedCategory(category.id)}
//                 >
//                   <div className="text-center">
//                     <div
//                       className={`mx-auto w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
//                         selectedCategory === category.id ? "bg-orange-500" : "bg-gray-100"
//                       }`}
//                     >
//                       <IconComponent
//                         className={`h-4 w-4 ${selectedCategory === category.id ? "text-white" : "text-gray-600"}`}
//                       />
//                     </div>
//                     <p className="text-sm font-medium text-gray-900">{category.name}</p>
//                     <p className="text-xs text-gray-500">{category.count} images</p>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Search and Select */}
//       <Card>
//         <CardContent className="p-6">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search images..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//               <SelectTrigger className="w-48">
//                 <SelectValue placeholder="Filter by category" />
//               </SelectTrigger>
//               <SelectContent>
//                 {imageCategories.map((category) => (
//                   <SelectItem key={category.id} value={category.id}>
//                     {category.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Image Grid */}
//       <Card>
//         <CardHeader className="flex flex-row justify-between">
//           <CardTitle>
//             {selectedCategory === "all"
//               ? "All Images"
//               : imageCategories.find((c) => c.id === selectedCategory)?.name}
//             <span className="ml-2 text-sm font-normal text-gray-500">
//               ({filteredImages.length})
//             </span>
//           </CardTitle>
//           {selectedCategory !== "all" && (
//             <Badge variant="outline">
//               {imageCategories.find((c) => c.id === selectedCategory)?.name}
//             </Badge>
//           )}
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//             {filteredImages.map((image) => (
//               <div
//                 key={image.id}
//                 className="group relative bg-gray-100 rounded-lg overflow-hidden aspect-square"
//                 onClick={() => handleImageClick(image)}
//               >
//                 <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
//                   <ImageIcon className="h-8 w-8 text-gray-400" />
//                 </div>
//                 <div className="absolute top-2 left-2">
//                   <Badge variant="secondary" className="text-xs">
//                     {imageCategories.find((c) => c.id === image.category)?.name}
//                   </Badge>
//                 </div>
//                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
//                   <div className="flex space-x-2">
//                     <Button size="sm" variant="secondary"><Eye className="h-4 w-4" /></Button>
//                     <Button size="sm" variant="secondary"><Download className="h-4 w-4" /></Button>
//                     <Button size="sm" variant="destructive"><Trash2 className="h-4 w-4" /></Button>
//                   </div>
//                 </div>
//                 <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-2">
//                   <p className="text-xs font-medium text-gray-900 truncate">{image.name}</p>
//                   <div className="flex justify-between text-xs text-gray-500">
//                     <span>{image.size}</span>
//                     <span>{image.uploadDate}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {filteredImages.length === 0 && (
//             <div className="text-center py-12">
//               <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
//               <p className="text-gray-500 mb-4">
//                 {searchTerm
//                   ? `No images match "${searchTerm}" in the selected category.`
//                   : "No images in this category yet."}
//               </p>
//               <Button className="bg-orange-500 hover:bg-orange-600">
//                 <Upload className="h-4 w-4 mr-2" />
//                 Upload Images
//               </Button>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Image Details Modal */}
//       {selectedImage && (
//         <Card>
//           <CardHeader><CardTitle>Image Details</CardTitle></CardHeader>
//           <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
//                 <ImageIcon className="h-16 w-16 text-gray-400" />
//               </div>
//               <p className="mt-2 text-sm text-gray-500">Name: {selectedImage.name}</p>
//               <p className="text-sm text-gray-500">Size: {selectedImage.size}</p>
//               <p className="text-sm text-gray-500">Upload Date: {selectedImage.uploadDate}</p>
//               <p className="text-sm text-gray-500">Usage Count: {selectedImage.usageCount}</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
//               <Input type="text" value={altText} onChange={handleAltTextChange} />
//               <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Tags</label>
//               <Input type="text" value={tags} onChange={handleTagsChange} />
//               <div className="flex justify-end mt-4">
//                 <Button variant="secondary" onClick={() => setSelectedImage(null)}>Cancel</Button>
//                 <Button className="ml-2 bg-orange-500 hover:bg-orange-600" onClick={handleSaveAltText}>Save</Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Bulk Operations */}
//       <Card>
//         <CardHeader><CardTitle>Bulk Operations</CardTitle></CardHeader>
//         <CardContent className="p-6 flex space-x-4">
//           <Button variant="destructive" onClick={handleBulkDelete}>Bulk Delete</Button>
//           <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleOptimizeImages}>Optimize Images</Button>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }



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
  Upload,
  Search,
  Trash2,
  Eye,
  Edit,
  AlertTriangle,
  RefreshCw,
  Grid,
  List,
  MoreHorizontal,
  MapPin,
} from "lucide-react"
import { useImageManagementStore, type ManagedImage } from "@/lib/image-store"
import { toast } from "@/hooks/use-toast"
import { useImageSync } from "@/hooks/use-image-sync"

export default function EnhancedImageManagement() {
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
    selectImage,
    updateImage,
    deleteImage,
    replaceImage,
    bulkDelete,
    bulkUpdateCategory,
    findUnusedImages,
    addImage,
    updateStats,
  } = useImageManagementStore()

  const { updateImageReferences, forceComponentUpdate } = useImageSync()

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showReplaceDialog, setShowReplaceDialog] = useState(false)
  const [showImageDetails, setShowImageDetails] = useState(false)
  const [editingAlt, setEditingAlt] = useState("")
  const [editingTags, setEditingTags] = useState("")
  const [uploading, setUploading] = useState(false)

  const filteredImages = getFilteredImages()
  const unusedImages = findUnusedImages()

  useEffect(() => {
    updateStats()
  }, [images, updateStats])

  useEffect(() => {
    // Load existing images from server when component mounts
    const loadImages = async () => {
      try {
        await useImageManagementStore.getState().loadImagesFromServer?.()
      } catch (error) {
        console.error("Failed to load images:", error)
      }
    }

    loadImages()
  }, [])

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
      description: "Image details have been updated successfully.",
    })

    setShowImageDetails(false)
  }

  const handleDeleteSelected = () => {
    // Get images that are in use before deletion
    const imagesInUse = selectedImages
      .map((id) => {
        const image = images.find((img) => img.id === id)
        return image && image.usedIn.length > 0 ? { id, url: image.url } : null
      })
      .filter(Boolean)

    // Delete the images
    bulkDelete(selectedImages)

    // Update references for images that were in use
    imagesInUse.forEach((imageInfo) => {
      if (imageInfo) {
        updateImageReferences(imageInfo.url, "/placeholder.svg?height=400&width=600")
      }
    })

    // Force immediate update
    forceComponentUpdate()

    setSelectedImages([])
    setShowDeleteDialog(false)

    toast({
      title: "Images Deleted",
      description: `${selectedImages.length} images have been deleted and references updated.`,
    })
  }

  const handleFileUpload = async (files: FileList) => {
    setUploading(true)

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue

        try {
          await addImage(
            {
              url: "", // Will be set by server
              alt: file.name.replace(/\.[^/.]+$/, ""),
              title: file.name,
              category: "general",
              size: `${Math.round(file.size / 1024)}KB`,
              tags: [],
              originalName: file.name,
              mimeType: file.type,
            },
            file,
          )
        } catch (error) {
          console.error(`Failed to upload ${file.name}:`, error)
        }
      }

      toast({
        title: "Images Uploaded",
        description: `${files.length} images have been uploaded successfully.`,
      })
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload some images. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSingleImageDelete = (imageId: string) => {
    const image = images.find((img) => img.id === imageId)
    if (!image) return

    const wasInUse = image.usedIn.length > 0

    deleteImage(imageId)

    if (wasInUse) {
      updateImageReferences(image.url, "/placeholder.svg?height=400&width=600")
      forceComponentUpdate()
    }

    toast({
      title: "Image Deleted",
      description: wasInUse
        ? "Image deleted and all references updated with placeholder."
        : "Image deleted successfully.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enhanced Image Management</h1>
          <p className="text-gray-600">Centralized management for all website images</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button
            variant="outline"
            onClick={() => {
              const input = document.createElement("input")
              input.type = "file"
              input.multiple = true
              input.accept = "image/*"
              input.onchange = (e) => {
                const files = (e.target as HTMLInputElement).files
                if (files) handleFileUpload(files)
              }
              input.click()
            }}
            disabled={uploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? "Uploading..." : "Upload Images"}
          </Button>
          <Button onClick={updateStats}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Statistics */}
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

      {/* Unused Images Alert */}
      {unusedImages.length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You have {unusedImages.length} unused images that can be safely deleted to free up storage space.
            <Button variant="link" className="p-0 h-auto ml-2" onClick={() => setSelectedCategory("unused")}>
              View unused images
            </Button>
          </AlertDescription>
        </Alert>
      )}

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
                {categories.map((category) => (
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
                <Select onValueChange={(category) => bulkUpdateCategory(selectedImages, category)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Change category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  className="group relative bg-gray-100 rounded-lg overflow-hidden aspect-square cursor-pointer"
                >
                  <div className="absolute top-2 left-2 z-10">
                    <Checkbox
                      checked={selectedImages.includes(image.id)}
                      onCheckedChange={() => handleImageSelect(image.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  <div
                    className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
                    onClick={() => handleImageClick(image)}
                  >
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>

                  <div className="absolute top-2 right-2">
                    <Badge variant={image.usedIn.length > 0 ? "default" : "secondary"} className="text-xs">
                      {image.usedIn.length > 0 ? `Used ${image.usageCount}x` : "Unused"}
                    </Badge>
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
                          handleSingleImageDelete(image.id)
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
                <div key={image.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
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
              <Button
                onClick={() => {
                  const input = document.createElement("input")
                  input.type = "file"
                  input.multiple = true
                  input.accept = "image/*"
                  input.onchange = (e) => {
                    const files = (e.target as HTMLInputElement).files
                    if (files) handleFileUpload(files)
                  }
                  input.click()
                }}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Images
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

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
                <TabsTrigger value="replace">Replace</TabsTrigger>
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

                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <Select
                        value={selectedImage.category}
                        onValueChange={(category) => updateImage(selectedImage.id, { category })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="usage" className="space-y-4">
                {selectedImage.usedIn.length > 0 ? (
                  <div className="space-y-3">
                    {selectedImage.usedIn.map((usage, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <MapPin className="h-4 w-4 text-gray-400" />
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
                    <AlertTriangle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">This image is not currently used anywhere on the website.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="replace" className="space-y-4">
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    Replace this image with a new one. All usages will be automatically updated.
                  </p>
                  <Button
                    onClick={() => {
                      const input = document.createElement("input")
                      input.type = "file"
                      input.accept = "image/*"
                      input.onchange = async (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0]
                        if (file && selectedImage) {
                          try {
                            const oldUrl = selectedImage.url

                            await replaceImage(selectedImage.id, file)

                            // Update all references immediately
                            updateImageReferences(oldUrl, selectedImage.url)

                            // Force immediate update
                            forceComponentUpdate()

                            toast({
                              title: "Image Replaced",
                              description: "The image has been replaced and all references updated immediately.",
                            })

                            setShowImageDetails(false)
                          } catch (error) {
                            toast({
                              title: "Replace Failed",
                              description: "Failed to replace image. Please try again.",
                              variant: "destructive",
                            })
                          }
                        }
                      }
                      input.click()
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose New Image
                  </Button>
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
          <p>Are you sure you want to delete {selectedImages.length} selected images? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSelected}>
              Delete Images
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
