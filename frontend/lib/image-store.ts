"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

// Enhanced image interface with usage tracking
export interface ManagedImage {
  id: string
  url: string
  alt: string
  title?: string
  category: string
  size: string
  uploadDate: string
  tags: string[]
  usageCount: number
  usedIn: Array<{
    pageId: string
    pageName: string
    componentId: string
    componentName: string
    location: string
  }>
  originalName: string
  mimeType: string
  exists: boolean // Track if file actually exists
}

export interface ImageCategory {
  id: string
  name: string
  icon: string
  count: number
}

interface ImageManagementState {
  // Core image data
  images: ManagedImage[]
  categories: ImageCategory[]

  // UI state
  selectedImage: ManagedImage | null
  searchTerm: string
  selectedCategory: string

  // Statistics
  stats: {
    total: number
    used: number
    unused: number
    storageUsed: string
  }

  // Frontend-only actions (replace the old ones)
  addImageFromUrl: (imageUrl: string, metadata?: Partial<ManagedImage>) => Promise<string>
  updateImage: (imageId: string, updates: Partial<ManagedImage>) => void
  deleteImage: (imageId: string) => Promise<void>
  replaceImageAtUrl: (imageId: string, newFile: File) => Promise<void>
  scanForImages: () => Promise<void>
  checkImageExists: (url: string) => Promise<boolean>

  // Usage tracking
  registerImageUsage: (imageId: string, usage: ManagedImage["usedIn"][0]) => void
  unregisterImageUsage: (imageId: string, pageId: string, componentId: string, location: string) => void
  getImageUsage: (imageId: string) => ManagedImage["usedIn"]
  findUnusedImages: () => ManagedImage[]

  // Search and filter
  setSearchTerm: (term: string) => void
  setSelectedCategory: (category: string) => void
  getFilteredImages: () => ManagedImage[]

  // Selection
  selectImage: (imageId: string | null) => void

  // Bulk operations
  bulkDelete: (imageIds: string[]) => Promise<void>
  bulkUpdateCategory: (imageIds: string[], category: string) => void

  // Statistics
  updateStats: () => void

  // Category management
  addCategory: (category: Omit<ImageCategory, "count">) => void
  updateCategory: (categoryId: string, updates: Partial<ImageCategory>) => void
  deleteCategory: (categoryId: string) => void

  notifyImageChange?: (imageId: string, action: "replace" | "delete", oldUrl: string, newUrl: string) => void
}

const defaultCategories: ImageCategory[] = [
  { id: "general", name: "General", icon: "folder", count: 0 },
  { id: "roof-replacement", name: "Roof Replacement", icon: "home", count: 0 },
  { id: "roof-repair", name: "Roof Repair", icon: "wrench", count: 0 },
  { id: "storm-damage", name: "Storm Damage", icon: "cloud", count: 0 },
  { id: "before-after", name: "Before & After", icon: "eye", count: 0 },
  { id: "team", name: "Team Photos", icon: "users", count: 0 },
  { id: "hero-images", name: "Hero Images", icon: "image", count: 0 },
  { id: "gallery", name: "Gallery", icon: "grid", count: 0 },
]

// Common image paths to scan
const commonImagePaths = ["/images/", "/assets/", "/uploads/", "/media/", "/public/images/", "/static/images/"]

// Common image extensions
const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"]

export const useImageManagementStore = create<ImageManagementState>()(
  persist(
    (set, get) => ({
      images: [],
      categories: defaultCategories,
      selectedImage: null,
      searchTerm: "",
      selectedCategory: "all",
      stats: {
        total: 0,
        used: 0,
        unused: 0,
        storageUsed: "0 MB",
      },

      addImageFromUrl: async (imageUrl: string, metadata: Partial<ManagedImage> = {}) => {
        try {
          const exists = await get().checkImageExists(imageUrl)

          // Extract filename and extension
          const urlParts = imageUrl.split("/")
          const filename = urlParts[urlParts.length - 1]
          const extension = filename.split(".").pop()?.toLowerCase() || "jpg"

          // Try to get image size
          let size = "Unknown"
          if (exists) {
            try {
              const response = await fetch(imageUrl, { method: "HEAD" })
              const contentLength = response.headers.get("content-length")
              if (contentLength) {
                const sizeInKB = Math.round(Number.parseInt(contentLength) / 1024)
                size = `${sizeInKB}KB`
              }
            } catch (error) {
              console.warn("Could not get image size:", error)
            }
          }

          const newImage: ManagedImage = {
            id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            url: imageUrl,
            alt: metadata.alt || filename.replace(/\.[^/.]+$/, ""),
            title: metadata.title || filename,
            category: metadata.category || "general",
            size,
            uploadDate: new Date().toISOString(),
            tags: metadata.tags || [],
            usageCount: 0,
            usedIn: [],
            originalName: filename,
            mimeType: `image/${extension}`,
            exists,
            ...metadata,
          }

          set((state) => ({
            images: [...state.images, newImage],
          }))

          get().updateStats()
          return newImage.id
        } catch (error) {
          console.error("Failed to add image:", error)
          throw error
        }
      },

      updateImage: (imageId, updates) => {
        set((state) => ({
          images: state.images.map((img) => (img.id === imageId ? { ...img, ...updates } : img)),
          selectedImage:
            state.selectedImage?.id === imageId ? { ...state.selectedImage, ...updates } : state.selectedImage,
        }))
        get().updateStats()
      },

      deleteImage: async (imageId: string) => {
        const image = get().images.find((img) => img.id === imageId)
        if (!image) return

        try {
          // For frontend-only deletion, we just remove from our store
          // The actual file deletion would need to be handled manually or through file system access
          const wasInUse = image.usedIn.length > 0

          set((state) => ({
            images: state.images.filter((img) => img.id !== imageId),
            selectedImage: state.selectedImage?.id === imageId ? null : state.selectedImage,
          }))

          get().updateStats()

          // Notify subscribers of the change for real-time sync
          if (wasInUse) {
            get().notifyImageChange?.(imageId, "delete", image.url, "/placeholder.svg?height=400&width=600")
          }

          // Show instructions for manual file deletion
          console.log(`To complete deletion, manually remove file: ${image.url}`)
        } catch (error) {
          console.error("Failed to delete image:", error)
          throw error
        }
      },

      replaceImageAtUrl: async (imageId: string, newFile: File) => {
        const oldImage = get().images.find((img) => img.id === imageId)
        if (!oldImage) return

        try {
          // Create a new blob URL for preview
          const newUrl = URL.createObjectURL(newFile)
          const sizeInKB = Math.round(newFile.size / 1024)

          // Update the image in our store
          set((state) => ({
            images: state.images.map((img) =>
              img.id === imageId
                ? {
                    ...img,
                    url: newUrl, // Use blob URL temporarily
                    originalName: newFile.name,
                    size: `${sizeInKB}KB`,
                    mimeType: newFile.type,
                    uploadDate: new Date().toISOString(),
                    exists: true,
                  }
                : img,
            ),
          }))

          get().updateStats()

          // Notify subscribers of the change for real-time sync
          get().notifyImageChange?.(imageId, "replace", oldImage.url, newUrl)

          // Show instructions for manual file replacement
          console.log(`To complete replacement, save the new file to: ${oldImage.url}`)

          // Create download link for the user
          const link = document.createElement("a")
          link.href = newUrl
          link.download = oldImage.originalName
          link.style.display = "none"
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } catch (error) {
          console.error("Failed to replace image:", error)
          throw error
        }
      },

      checkImageExists: async (url: string): Promise<boolean> => {
        try {
          const response = await fetch(url, { method: "HEAD" })
          return response.ok
        } catch (error) {
          return false
        }
      },

      scanForImages: async () => {
        const foundImages: string[] = []

        // Scan common image paths
        for (const basePath of commonImagePaths) {
          for (const ext of imageExtensions) {
            // Try common naming patterns
            const commonNames = [
              "hero",
              "banner",
              "logo",
              "about",
              "contact",
              "team",
              "service1",
              "service2",
              "service3",
              "gallery1",
              "gallery2",
              "before1",
              "after1",
              "roof1",
              "roof2",
              "storm1",
              "repair1",
            ]

            for (const name of commonNames) {
              const url = `${basePath}${name}.${ext}`
              const exists = await get().checkImageExists(url)
              if (exists && !foundImages.includes(url)) {
                foundImages.push(url)
              }
            }
          }
        }

        // Add found images to store
        for (const url of foundImages) {
          const existingImage = get().images.find((img) => img.url === url)
          if (!existingImage) {
            await get().addImageFromUrl(url)
          }
        }

        console.log(`Found ${foundImages.length} images during scan`)
      },

      registerImageUsage: (imageId, usage) => {
        set((state) => ({
          images: state.images.map((img) => {
            if (img.id === imageId) {
              const existingUsage = img.usedIn.find(
                (u) =>
                  u.pageId === usage.pageId && u.componentId === usage.componentId && u.location === usage.location,
              )

              if (!existingUsage) {
                return {
                  ...img,
                  usedIn: [...img.usedIn, usage],
                  usageCount: img.usedIn.length + 1,
                }
              }
            }
            return img
          }),
        }))
        get().updateStats()
      },

      unregisterImageUsage: (imageId, pageId, componentId, location) => {
        set((state) => ({
          images: state.images.map((img) => {
            if (img.id === imageId) {
              const updatedUsedIn = img.usedIn.filter(
                (u) => !(u.pageId === pageId && u.componentId === componentId && u.location === location),
              )
              return {
                ...img,
                usedIn: updatedUsedIn,
                usageCount: updatedUsedIn.length,
              }
            }
            return img
          }),
        }))
        get().updateStats()
      },

      getImageUsage: (imageId) => {
        const image = get().images.find((img) => img.id === imageId)
        return image?.usedIn || []
      },

      findUnusedImages: () => {
        return get().images.filter((img) => img.usedIn.length === 0)
      },

      setSearchTerm: (term) => {
        set({ searchTerm: term })
      },

      setSelectedCategory: (category) => {
        set({ selectedCategory: category })
      },

      getFilteredImages: () => {
        const { images, searchTerm, selectedCategory } = get()

        return images.filter((image) => {
          const matchesCategory =
            selectedCategory === "all" ||
            (selectedCategory === "unused" && image.usedIn.length === 0) ||
            image.category === selectedCategory
          const matchesSearch =
            image.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

          return matchesCategory && matchesSearch
        })
      },

      selectImage: (imageId) => {
        const image = imageId ? get().images.find((img) => img.id === imageId) : null
        set({ selectedImage: image || null })
      },

      bulkDelete: async (imageIds) => {
        const imagesToDelete = imageIds.map((id) => get().images.find((img) => img.id === id)).filter(Boolean)
        const imagesInUse = imagesToDelete.filter((img) => img && img.usedIn.length > 0)

        if (imagesInUse.length > 0) {
          console.warn(`Deleting ${imagesInUse.length} images that are still in use`)
        }

        // Show instructions for manual deletion
        imagesToDelete.forEach((img) => {
          if (img) {
            console.log(`To complete deletion, manually remove file: ${img.url}`)
          }
        })

        set((state) => ({
          images: state.images.filter((img) => !imageIds.includes(img.id)),
          selectedImage: imageIds.includes(state.selectedImage?.id || "") ? null : state.selectedImage,
        }))

        get().updateStats()
      },

      bulkUpdateCategory: (imageIds, category) => {
        set((state) => ({
          images: state.images.map((img) => (imageIds.includes(img.id) ? { ...img, category } : img)),
        }))
        get().updateStats()
      },

      updateStats: () => {
        const { images } = get()
        const used = images.filter((img) => img.usedIn.length > 0).length
        const totalSize = images.reduce((acc, img) => {
          const sizeInKB = Number.parseInt(img.size.replace(/[^\d]/g, "")) || 0
          return acc + sizeInKB
        }, 0)

        set({
          stats: {
            total: images.length,
            used,
            unused: images.length - used,
            storageUsed: totalSize > 1024 ? `${(totalSize / 1024).toFixed(1)} MB` : `${totalSize} KB`,
          },
        })

        // Update category counts
        set((state) => ({
          categories: state.categories.map((cat) => ({
            ...cat,
            count: images.filter((img) => img.category === cat.id).length,
          })),
        }))
      },

      addCategory: (categoryData) => {
        const newCategory: ImageCategory = {
          ...categoryData,
          count: 0,
        }
        set((state) => ({
          categories: [...state.categories, newCategory],
        }))
      },

      updateCategory: (categoryId, updates) => {
        set((state) => ({
          categories: state.categories.map((cat) => (cat.id === categoryId ? { ...cat, ...updates } : cat)),
        }))
      },

      deleteCategory: (categoryId) => {
        set((state) => ({
          categories: state.categories.filter((cat) => cat.id !== categoryId),
          images: state.images.map((img) => (img.category === categoryId ? { ...img, category: "general" } : img)),
        }))
        get().updateStats()
      },

      notifyImageChange: (imageId, action, oldUrl, newUrl) => {
        console.log(`Image ${action}: ${imageId}, ${oldUrl} -> ${newUrl}`)
      },
    }),
    {
      name: "image-management-storage",
      version: 1,
    },
  ),
)
