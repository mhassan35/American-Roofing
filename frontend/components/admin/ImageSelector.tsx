"use client"

import { useState, useEffect } from "react"
import { useAppSelector } from "@/lib/redux/hooks"
import type { ImageAsset } from "@/lib/redux/slices/contentSlice"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImageIcon, Search, Upload } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ImageSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (image: ImageAsset) => void
  title?: string
  description?: string
}

export default function ImageSelector({
  open,
  onOpenChange,
  onSelect,
  title = "Select an Image",
  description = "Choose an image from your library or upload a new one.",
}: ImageSelectorProps) {
  const pages = useAppSelector((state) => state.content.pages)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPage, setSelectedPage] = useState<string>("all")

  // Get all images from all pages
  const allImages = pages.flatMap((page) =>
    page.images.map((image) => ({
      ...image,
      pageId: page.id,
      pageName: page.name,
    })),
  )

  // Filter images based on page and search term
  const filteredImages = allImages.filter((image) => {
    const matchesPage = selectedPage === "all" || image.pageId === selectedPage
    const matchesSearch =
      image.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesPage && matchesSearch
  })

  // Reset search when dialog opens
  useEffect(() => {
    if (open) {
      setSearchTerm("")
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Search and filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pages</SelectItem>
                {pages.map((page) => (
                  <SelectItem key={page.id} value={page.id}>
                    {page.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="aspect-square rounded-md overflow-hidden bg-gray-100 cursor-pointer hover:ring-2 hover:ring-brand-orange transition-all"
                onClick={() => onSelect(image)}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=100&width=100"
                  }}
                />
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
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-brand-orange hover:bg-orange-600">
            <Upload className="h-4 w-4 mr-2" />
            Upload New
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
