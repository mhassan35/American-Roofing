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
    location: string // e.g., "hero-background", "gallery-item-1"
  }>
  originalName: string
  mimeType: string
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

  // Actions
  addImage: (
    imageData: Omit<ManagedImage, "id" | "uploadDate" | "usageCount" | "usedIn">,
    file?: File,
  ) => Promise<string>
  updateImage: (imageId: string, updates: Partial<ManagedImage>) => void
  deleteImage: (imageId: string) => Promise<void>
  replaceImage: (imageId: string, newFile: File) => Promise<void>

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
  bulkDelete: (imageIds: string[]) => void
  bulkUpdateCategory: (imageIds: string[], category: string) => void

  // Statistics
  updateStats: () => void

  // Category management
  addCategory: (category: Omit<ImageCategory, "count">) => void
  updateCategory: (categoryId: string, updates: Partial<ImageCategory>) => void
  deleteCategory: (categoryId: string) => void

  // Add this to the interface
  notifyImageChange?: (imageId: string, action: "replace" | "delete", oldUrl: string, newUrl: string) => void

  loadImagesFromServer: () => Promise<void>
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

      addImage: async (imageData: Omit<ManagedImage, "id" | "uploadDate" | "usageCount" | "usedIn">, file?: File) => {
        try {
          let imageUrl = imageData.url

          // If a file is provided, upload it to the server
          if (file) {
            const formData = new FormData()
            formData.append("image", file)
            formData.append("category", imageData.category)
            formData.append("alt", imageData.alt)

            const response = await fetch("/api/images/upload", {
              method: "POST",
              body: formData,
            })

            if (!response.ok) {
              throw new Error("Failed to upload image")
            }

            const result = await response.json()
            imageUrl = result.url // Use the server-returned URL
          }

          const newImage: ManagedImage = {
            ...imageData,
            url: imageUrl,
            id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            uploadDate: new Date().toISOString(),
            usageCount: 0,
            usedIn: [],
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
          // Delete from server/filesystem
          const response = await fetch("/api/images/delete", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              imageId: imageId,
              url: image.url,
            }),
          })

          if (!response.ok) {
            throw new Error("Failed to delete image from server")
          }

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
        } catch (error) {
          console.error("Failed to delete image:", error)
          throw error
        }
      },

      replaceImage: async (imageId: string, newFile: File) => {
        const oldImage = get().images.find((img) => img.id === imageId)
        if (!oldImage) return

        try {
          const formData = new FormData()
          formData.append("image", newFile)
          formData.append("oldImageId", imageId)
          formData.append("oldImageUrl", oldImage.url)

          const response = await fetch("/api/images/replace", {
            method: "POST",
            body: formData,
          })

          if (!response.ok) {
            throw new Error("Failed to replace image")
          }

          const result = await response.json()
          const sizeInKB = Math.round(newFile.size / 1024)

          set((state) => ({
            images: state.images.map((img) =>
              img.id === imageId
                ? {
                    ...img,
                    url: result.url,
                    originalName: newFile.name,
                    size: `${sizeInKB}KB`,
                    mimeType: newFile.type,
                    uploadDate: new Date().toISOString(),
                  }
                : img,
            ),
          }))

          get().updateStats()

          // Notify subscribers of the change for real-time sync
          get().notifyImageChange?.(imageId, "replace", oldImage.url, result.url)
        } catch (error) {
          console.error("Failed to replace image:", error)
          throw error
        }
      },

      registerImageUsage: (imageId, usage) => {
        set((state) => ({
          images: state.images.map((img) => {
            if (img.id === imageId) {
              // Check if this usage already exists
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
          const matchesCategory = selectedCategory === "all" || image.category === selectedCategory
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

      bulkDelete: (imageIds) => {
        const imagesInUse = imageIds.filter((id) => {
          const image = get().images.find((img) => img.id === id)
          return image && image.usedIn.length > 0
        })

        if (imagesInUse.length > 0) {
          console.warn(`Cannot delete ${imagesInUse.length} images: still in use`)
          return
        }

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
        // Move images from deleted category to "general"
        set((state) => ({
          categories: state.categories.filter((cat) => cat.id !== categoryId),
          images: state.images.map((img) => (img.category === categoryId ? { ...img, category: "general" } : img)),
        }))
        get().updateStats()
      },
      // Add this to the store implementation
      notifyImageChange: (imageId, action, oldUrl, newUrl) => {
        // This will be used by the sync hook to trigger immediate updates
        console.log(`Image ${action}: ${imageId}, ${oldUrl} -> ${newUrl}`)
      },

      loadImagesFromServer: async () => {
        try {
          const response = await fetch("/api/images/list")
          if (!response.ok) {
            throw new Error("Failed to load images")
          }

          const serverImages = await response.json()

          // Convert server images to ManagedImage format
          const managedImages: ManagedImage[] = serverImages.map((img: any) => ({
            id: img.id || `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            url: img.url,
            alt: img.alt || img.name || "Image",
            title: img.title || img.name,
            category: img.category || "general",
            size: img.size || "0KB",
            uploadDate: img.uploadDate || new Date().toISOString(),
            tags: img.tags || [],
            usageCount: 0,
            usedIn: [],
            originalName: img.originalName || img.name || "image",
            mimeType: img.mimeType || "image/jpeg",
          }))

          set({ images: managedImages })
          get().updateStats()
        } catch (error) {
          console.error("Failed to load images from server:", error)
        }
      },
    }),
    {
      name: "image-management-storage",
      version: 1,
    },
  ),
)
