"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ImageIcon,
  Upload,
  Search,
  Trash2,
  Download,
  Eye,
  Folder,
  Home,
  Wrench,
  Cloud,
} from "lucide-react"

// ✅ Define TypeScript interfaces
interface ImageType {
  id: number
  name: string
  category: string
  size: string
  uploadDate: string
  alt: string
  tags: string[]
  usageCount: number
}

interface CategoryType {
  id: string
  name: string
  icon: any
  count?: number
}

const imageCategories: CategoryType[] = [
  { id: "all", name: "All Images", icon: ImageIcon },
  { id: "general", name: "General", icon: Folder },
  { id: "roof-replacement", name: "Roof Replacement", icon: Home },
  { id: "roof-repair", name: "Roof Repair", icon: Wrench },
  { id: "storm-damage", name: "Storm Damage", icon: Cloud },
  { id: "before-after", name: "Before & After", icon: Eye },
  { id: "team", name: "Team Photos", icon: Folder },
  { id: "roof-replacement-before-after", name: "Roof Replacement Before & After", icon: Eye },
  { id: "roof-repair-before-after", name: "Roof Repair Before & After", icon: Eye },
  { id: "storm-damage-before-after", name: "Storm Damage Before & After", icon: Eye },
]

export default function ImageManagement() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null)
  const [altText, setAltText] = useState<string>("")
  const [tags, setTags] = useState<string>("")

  const images: ImageType[] = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    name: `image-${i + 1}.jpg`,
    category: imageCategories[Math.floor(Math.random() * (imageCategories.length - 7)) + 1].id,
    size: `${Math.floor(Math.random() * 500 + 100)}KB`,
    uploadDate: "2024-01-15",
    alt: `Roofing project ${i + 1}`,
    tags: ["roofing", "repair", "house"],
    usageCount: Math.floor(Math.random() * 10),
  }))

  const filteredImages = images.filter((image) => {
    const matchesCategory = selectedCategory === "all" || image.category === selectedCategory
    const matchesSearch =
      image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getCategoryStats = (): CategoryType[] => {
    return imageCategories.map((category) => ({
      ...category,
      count: category.id === "all" ? images.length : images.filter((img) => img.category === category.id).length,
    }))
  }

  const handleImageClick = (image: ImageType) => {
    setSelectedImage(image)
    setAltText(image.alt)
    setTags(image.tags.join(", "))
  }

  const handleAltTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAltText(e.target.value)
  }

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value)
  }

  const handleSaveAltText = () => {
    if (selectedImage) {
      console.log(`Saving alt text "${altText}" for image ${selectedImage.id}`)
      setSelectedImage(null)
    }
  }

  const handleBulkDelete = () => {
    console.log(`Bulk deleting images in category: ${selectedCategory}`)
  }

  const handleOptimizeImages = () => {
    console.log("Optimizing images...")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Image Management</h1>
          <p className="text-gray-600">Upload and organize your website images by service category</p>
        </div>
        <Button className="mt-4 sm:mt-0 bg-orange-500 hover:bg-orange-600">
          <Upload className="h-4 w-4 mr-2" />
          Upload Images
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold">{images.length}</p>
            <p className="text-sm text-gray-600">Total Images</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold">2.4GB</p>
            <p className="text-sm text-gray-600">Storage Used</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold">{imageCategories.length - 1}</p>
            <p className="text-sm text-gray-600">Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold">12</p>
            <p className="text-sm text-gray-600">This Month</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Cards */}
      <Card>
        <CardHeader><CardTitle>Image Categories</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {getCategoryStats().map((category) => {
              const IconComponent = category.icon
              return (
                <div
                  key={category.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedCategory === category.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="text-center">
                    <div
                      className={`mx-auto w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                        selectedCategory === category.id ? "bg-orange-500" : "bg-gray-100"
                      }`}
                    >
                      <IconComponent
                        className={`h-4 w-4 ${selectedCategory === category.id ? "text-white" : "text-gray-600"}`}
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-900">{category.name}</p>
                    <p className="text-xs text-gray-500">{category.count} images</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Search and Select */}
      <Card>
        <CardContent className="p-6">
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
                {imageCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Image Grid */}
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>
            {selectedCategory === "all"
              ? "All Images"
              : imageCategories.find((c) => c.id === selectedCategory)?.name}
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredImages.length})
            </span>
          </CardTitle>
          {selectedCategory !== "all" && (
            <Badge variant="outline">
              {imageCategories.find((c) => c.id === selectedCategory)?.name}
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative bg-gray-100 rounded-lg overflow-hidden aspect-square"
                onClick={() => handleImageClick(image)}
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="text-xs">
                    {imageCategories.find((c) => c.id === image.category)?.name}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="secondary"><Eye className="h-4 w-4" /></Button>
                    <Button size="sm" variant="secondary"><Download className="h-4 w-4" /></Button>
                    <Button size="sm" variant="destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-2">
                  <p className="text-xs font-medium text-gray-900 truncate">{image.name}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{image.size}</span>
                    <span>{image.uploadDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm
                  ? `No images match "${searchTerm}" in the selected category.`
                  : "No images in this category yet."}
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Upload className="h-4 w-4 mr-2" />
                Upload Images
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Details Modal */}
      {selectedImage && (
        <Card>
          <CardHeader><CardTitle>Image Details</CardTitle></CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-gray-400" />
              </div>
              <p className="mt-2 text-sm text-gray-500">Name: {selectedImage.name}</p>
              <p className="text-sm text-gray-500">Size: {selectedImage.size}</p>
              <p className="text-sm text-gray-500">Upload Date: {selectedImage.uploadDate}</p>
              <p className="text-sm text-gray-500">Usage Count: {selectedImage.usageCount}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
              <Input type="text" value={altText} onChange={handleAltTextChange} />
              <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Tags</label>
              <Input type="text" value={tags} onChange={handleTagsChange} />
              <div className="flex justify-end mt-4">
                <Button variant="secondary" onClick={() => setSelectedImage(null)}>Cancel</Button>
                <Button className="ml-2 bg-orange-500 hover:bg-orange-600" onClick={handleSaveAltText}>Save</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bulk Operations */}
      <Card>
        <CardHeader><CardTitle>Bulk Operations</CardTitle></CardHeader>
        <CardContent className="p-6 flex space-x-4">
          <Button variant="destructive" onClick={handleBulkDelete}>Bulk Delete</Button>
          <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleOptimizeImages}>Optimize Images</Button>
        </CardContent>
      </Card>
    </div>
  )
}
