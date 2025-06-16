"use client"

import { create } from "zustand"
import { persist, subscribeWithSelector } from "zustand/middleware"

// Enhanced image interface with strict category handling
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
  exists: boolean
  isActive: boolean // For soft delete/hide functionality
}

export interface ImageCategory {
  id: string
  name: string
  icon: string
  count: number
  description?: string
  isActive: boolean
}

interface ImageManagementState {
  // Core image data
  images: ManagedImage[]
  categories: ImageCategory[]

  // UI state
  selectedImage: ManagedImage | null
  selectedCategory: string
  searchTerm: string
  uploadingToCategory: string | null

  // Statistics
  stats: {
    total: number
    used: number
    unused: number
    byCategory: Record<string, number>
    storageUsed: string
  }

  // Real-time update listeners
  listeners: Set<(images: ManagedImage[], categories: ImageCategory[]) => void>

  // Category-specific actions
  uploadImageToCategory: (file: File, categoryId: string, metadata?: Partial<ManagedImage>) => Promise<string>
  getImagesByCategory: (categoryId: string) => ManagedImage[]
  moveImageToCategory: (imageId: string, newCategoryId: string) => void

  // Image management
  updateImage: (imageId: string, updates: Partial<ManagedImage>) => void
  deleteImage: (imageId: string) => Promise<void>
  replaceImage: (imageId: string, newFile: File) => Promise<void>
  toggleImageActive: (imageId: string) => void

  // Category management
  createCategory: (category: Omit<ImageCategory, "count">) => void
  updateCategory: (categoryId: string, updates: Partial<ImageCategory>) => void
  deleteCategory: (categoryId: string) => void

  // Search and filter
  setSearchTerm: (term: string) => void
  setSelectedCategory: (category: string) => void
  getFilteredImages: () => ManagedImage[]

  // Selection
  selectImage: (imageId: string | null) => void

  // Bulk operations
  bulkMoveToCategory: (imageIds: string[], categoryId: string) => void
  bulkDelete: (imageIds: string[]) => Promise<void>
  bulkToggleActive: (imageIds: string[]) => void

  // Statistics and sync
  updateStats: () => void
  syncWithFileSystem: () => Promise<void>

  // Real-time listeners
  addListener: (listener: (images: ManagedImage[], categories: ImageCategory[]) => void) => () => void
  notifyListeners: () => void

  // File system operations
  scanStorageDirectory: () => Promise<void>
  saveImageToStorage: (file: File, categoryId: string) => Promise<string>
  deleteImageFromStorage: (imageUrl: string) => Promise<void>
}

const defaultCategories: ImageCategory[] = [
  {
    id: "hero-images",
    name: "Hero Images",
    icon: "image",
    count: 0,
    description: "Main banner and hero section images",
    isActive: true,
  },
  {
    id: "gallery",
    name: "Gallery",
    icon: "grid",
    count: 0,
    description: "Project gallery and portfolio images",
    isActive: true,
  },
  {
    id: "before-after",
    name: "Before & After",
    icon: "eye",
    count: 0,
    description: "Transformation showcase images",
    isActive: true,
  },
  {
    id: "team",
    name: "Team Photos",
    icon: "users",
    count: 0,
    description: "Staff and team member photos",
    isActive: true,
  },
  { id: "services", name: "Services", icon: "wrench", count: 0, description: "Service-related images", isActive: true },
  {
    id: "testimonials",
    name: "Testimonials",
    icon: "quote",
    count: 0,
    description: "Customer testimonial images",
    isActive: true,
  },
  {
    id: "logos",
    name: "Logos & Branding",
    icon: "award",
    count: 0,
    description: "Company logos and branding materials",
    isActive: true,
  },
  { id: "general", name: "General", icon: "folder", count: 0, description: "Miscellaneous images", isActive: true },
]

export const useEnhancedImageStore = create<ImageManagementState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        images: [],
        categories: defaultCategories,
        selectedImage: null,
        selectedCategory: "all",
        searchTerm: "",
        uploadingToCategory: null,
        stats: {
          total: 0,
          used: 0,
          unused: 0,
          byCategory: {},
          storageUsed: "0 MB",
        },
        listeners: new Set(),

        uploadImageToCategory: async (file: File, categoryId: string, metadata: Partial<ManagedImage> = {}) => {
          try {
            set({ uploadingToCategory: categoryId })

            // Save to storage directory
            const imageUrl = await get().saveImageToStorage(file, categoryId)

            const newImage: ManagedImage = {
              id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              url: imageUrl,
              alt: metadata.alt || file.name.replace(/\.[^/.]+$/, ""),
              title: metadata.title || file.name,
              category: categoryId, // Ensure it goes to the selected category
              size: `${Math.round(file.size / 1024)}KB`,
              uploadDate: new Date().toISOString(),
              tags: metadata.tags || [],
              usageCount: 0,
              usedIn: [],
              originalName: file.name,
              mimeType: file.type,
              exists: true,
              isActive: true,
              ...metadata,
            }

            set((state) => ({
              images: [...state.images, newImage],
              uploadingToCategory: null,
            }))

            get().updateStats()
            get().notifyListeners()

            return newImage.id
          } catch (error) {
            set({ uploadingToCategory: null })
            console.error("Failed to upload image:", error)
            throw error
          }
        },

        getImagesByCategory: (categoryId: string) => {
          const { images } = get()
          if (categoryId === "all") return images.filter((img) => img.isActive)
          if (categoryId === "unused") return images.filter((img) => img.isActive && img.usedIn.length === 0)
          return images.filter((img) => img.isActive && img.category === categoryId)
        },

        moveImageToCategory: (imageId: string, newCategoryId: string) => {
          set((state) => ({
            images: state.images.map((img) => (img.id === imageId ? { ...img, category: newCategoryId } : img)),
          }))
          get().updateStats()
          get().notifyListeners()
        },

        updateImage: (imageId: string, updates: Partial<ManagedImage>) => {
          set((state) => ({
            images: state.images.map((img) => (img.id === imageId ? { ...img, ...updates } : img)),
            selectedImage:
              state.selectedImage?.id === imageId ? { ...state.selectedImage, ...updates } : state.selectedImage,
          }))
          get().updateStats()
          get().notifyListeners()
        },

        deleteImage: async (imageId: string) => {
          const image = get().images.find((img) => img.id === imageId)
          if (!image) return

          try {
            // Delete from storage
            await get().deleteImageFromStorage(image.url)

            // Remove from store
            set((state) => ({
              images: state.images.filter((img) => img.id !== imageId),
              selectedImage: state.selectedImage?.id === imageId ? null : state.selectedImage,
            }))

            get().updateStats()
            get().notifyListeners()
          } catch (error) {
            console.error("Failed to delete image:", error)
            throw error
          }
        },

        replaceImage: async (imageId: string, newFile: File) => {
          const oldImage = get().images.find((img) => img.id === imageId)
          if (!oldImage) return

          try {
            // Delete old file
            await get().deleteImageFromStorage(oldImage.url)

            // Save new file to same category
            const newUrl = await get().saveImageToStorage(newFile, oldImage.category)

            // Update image record
            get().updateImage(imageId, {
              url: newUrl,
              originalName: newFile.name,
              size: `${Math.round(newFile.size / 1024)}KB`,
              mimeType: newFile.type,
              uploadDate: new Date().toISOString(),
            })

            get().notifyListeners()
          } catch (error) {
            console.error("Failed to replace image:", error)
            throw error
          }
        },

        toggleImageActive: (imageId: string) => {
          set((state) => ({
            images: state.images.map((img) => (img.id === imageId ? { ...img, isActive: !img.isActive } : img)),
          }))
          get().updateStats()
          get().notifyListeners()
        },

        createCategory: (categoryData: Omit<ImageCategory, "count">) => {
          const newCategory: ImageCategory = {
            ...categoryData,
            count: 0,
          }
          set((state) => ({
            categories: [...state.categories, newCategory],
          }))
          get().updateStats()
          get().notifyListeners()
        },

        updateCategory: (categoryId: string, updates: Partial<ImageCategory>) => {
          set((state) => ({
            categories: state.categories.map((cat) => (cat.id === categoryId ? { ...cat, ...updates } : cat)),
          }))
          get().notifyListeners()
        },

        deleteCategory: (categoryId: string) => {
          // Move all images from deleted category to general
          set((state) => ({
            categories: state.categories.filter((cat) => cat.id !== categoryId),
            images: state.images.map((img) => (img.category === categoryId ? { ...img, category: "general" } : img)),
          }))
          get().updateStats()
          get().notifyListeners()
        },

        setSearchTerm: (term: string) => {
          set({ searchTerm: term })
        },

        setSelectedCategory: (category: string) => {
          set({ selectedCategory: category })
        },

        getFilteredImages: () => {
          const { images, searchTerm, selectedCategory } = get()

          let filtered = images.filter((img) => img.isActive)

          // Filter by category
          if (selectedCategory !== "all") {
            if (selectedCategory === "unused") {
              filtered = filtered.filter((img) => img.usedIn.length === 0)
            } else {
              filtered = filtered.filter((img) => img.category === selectedCategory)
            }
          }

          // Filter by search term
          if (searchTerm) {
            const term = searchTerm.toLowerCase()
            filtered = filtered.filter(
              (img) =>
                img.alt.toLowerCase().includes(term) ||
                img.title?.toLowerCase().includes(term) ||
                img.originalName.toLowerCase().includes(term) ||
                img.tags.some((tag) => tag.toLowerCase().includes(term)),
            )
          }

          return filtered
        },

        selectImage: (imageId: string | null) => {
          const image = imageId ? get().images.find((img) => img.id === imageId) : null
          set({ selectedImage: image || null })
        },

        bulkMoveToCategory: (imageIds: string[], categoryId: string) => {
          set((state) => ({
            images: state.images.map((img) => (imageIds.includes(img.id) ? { ...img, category: categoryId } : img)),
          }))
          get().updateStats()
          get().notifyListeners()
        },

        bulkDelete: async (imageIds: string[]) => {
          const imagesToDelete = get().images.filter((img) => imageIds.includes(img.id))

          try {
            // Delete files from storage
            await Promise.all(imagesToDelete.map((img) => get().deleteImageFromStorage(img.url)))

            // Remove from store
            set((state) => ({
              images: state.images.filter((img) => !imageIds.includes(img.id)),
              selectedImage: imageIds.includes(state.selectedImage?.id || "") ? null : state.selectedImage,
            }))

            get().updateStats()
            get().notifyListeners()
          } catch (error) {
            console.error("Failed to bulk delete images:", error)
            throw error
          }
        },

        bulkToggleActive: (imageIds: string[]) => {
          set((state) => ({
            images: state.images.map((img) => (imageIds.includes(img.id) ? { ...img, isActive: !img.isActive } : img)),
          }))
          get().updateStats()
          get().notifyListeners()
        },

        updateStats: () => {
          const { images, categories } = get()
          const activeImages = images.filter((img) => img.isActive)
          const used = activeImages.filter((img) => img.usedIn.length > 0).length

          // Calculate by category
          const byCategory: Record<string, number> = {}
          categories.forEach((cat) => {
            byCategory[cat.id] = activeImages.filter((img) => img.category === cat.id).length
          })

          // Calculate total size
          const totalSize = activeImages.reduce((acc, img) => {
            const sizeInKB = Number.parseInt(img.size.replace(/[^\d]/g, "")) || 0
            return acc + sizeInKB
          }, 0)

          set({
            stats: {
              total: activeImages.length,
              used,
              unused: activeImages.length - used,
              byCategory,
              storageUsed: totalSize > 1024 ? `${(totalSize / 1024).toFixed(1)} MB` : `${totalSize} KB`,
            },
          })

          // Update category counts
          set((state) => ({
            categories: state.categories.map((cat) => ({
              ...cat,
              count: byCategory[cat.id] || 0,
            })),
          }))
        },

        syncWithFileSystem: async () => {
          try {
            await get().scanStorageDirectory()
            get().updateStats()
            get().notifyListeners()
          } catch (error) {
            console.error("Failed to sync with file system:", error)
          }
        },

        addListener: (listener) => {
          const state = get()
          // Ensure listeners is a Set
          if (!state.listeners || typeof state.listeners.add !== "function") {
            set({ listeners: new Set() })
          }

          const currentListeners = get().listeners
          currentListeners.add(listener)

          return () => {
            const currentState = get()
            if (currentState.listeners && typeof currentState.listeners.delete === "function") {
              currentState.listeners.delete(listener)
            }
          }
        },

        notifyListeners: () => {
          const { images, categories, listeners } = get()
          // Ensure listeners exists and is a Set
          if (listeners && typeof listeners.forEach === "function") {
            listeners.forEach((listener) => {
              try {
                listener(images, categories)
              } catch (error) {
                console.error("Error in listener:", error)
              }
            })
          }
        },

        scanStorageDirectory: async () => {
          // This would scan the storage directory for existing images
          // For now, we'll simulate this functionality
          console.log("Scanning storage directory...")

          // In a real implementation, this would:
          // 1. Read the storage directory
          // 2. Find all image files
          // 3. Organize them by subdirectory (category)
          // 4. Add missing images to the store
          // 5. Mark non-existent images as inactive
        },

        saveImageToStorage: async (file: File, categoryId: string): Promise<string> => {
          // Create a blob URL for immediate preview
          const blobUrl = URL.createObjectURL(file)

          // In a real implementation, this would:
          // 1. Create category directory if it doesn't exist
          // 2. Generate unique filename
          // 3. Save file to storage/[category]/[filename]
          // 4. Return the public URL

          // For now, we'll return the blob URL and log instructions
          const fileName = `${Date.now()}-${file.name}`
          const storagePath = `/storage/${categoryId}/${fileName}`

          console.log(`Image processed for category: ${categoryId}`)
          console.log(`Storage path would be: ${storagePath}`)

          // Return the blob URL for immediate use
          return blobUrl
        },

        deleteImageFromStorage: async (imageUrl: string): Promise<void> => {
          // In a real implementation, this would delete the file from storage
          console.log(`Image marked for deletion: ${imageUrl}`)

          // Clean up blob URLs
          if (imageUrl.startsWith("blob:")) {
            URL.revokeObjectURL(imageUrl)
          }
        },
      }),
      {
        name: "enhanced-image-storage",
        version: 2,
        partialize: (state) => ({
          ...state,
          listeners: undefined, // Don't persist listeners
        }),
        onRehydrateStorage: () => (state) => {
          // Reinitialize listeners after rehydration
          if (state) {
            state.listeners = new Set()
          }
        },
      },
    ),
  ),
)

// Real-time sync hook for components
export const useImageSync = () => {
  const store = useEnhancedImageStore()

  return {
    images: store.images,
    categories: store.categories,
    stats: store.stats,
    addListener: store.addListener,
    getImagesByCategory: store.getImagesByCategory,
    updateStats: store.updateStats,
  }
}
