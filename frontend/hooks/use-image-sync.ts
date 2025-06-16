"use client"

import { useEffect } from "react"
import { useImageManagementStore } from "@/lib/image-store"
import { useContentStore } from "@/lib/store"

/**
 * Hook to sync images between the centralized image store and content store
 * This ensures that when images are updated in the management system,
 * the changes are reflected across all components that use those images
 */
export function useImageSync() {
  const { images, registerImageUsage, unregisterImageUsage } = useImageManagementStore()
  const { pages, updateComponentSettings } = useContentStore()

  // Function to update all component references when an image is replaced
  const updateImageReferences = (oldUrl: string, newUrl: string) => {
    pages.forEach((page) => {
      page.components.forEach((component) => {
        let hasChanges = false
        const updatedSettings = { ...component.settings }

        // Update direct image references
        Object.entries(updatedSettings).forEach(([key, value]) => {
          if (value === oldUrl) {
            updatedSettings[key] = newUrl
            hasChanges = true
          }

          // Handle nested objects
          if (typeof value === "object" && value !== null) {
            if (Array.isArray(value)) {
              const updatedArray = value.map((item) => {
                if (typeof item === "object" && item !== null) {
                  const updatedItem = { ...item }
                  Object.entries(updatedItem).forEach(([nestedKey, nestedValue]) => {
                    if (nestedValue === oldUrl) {
                      updatedItem[nestedKey] = newUrl
                      hasChanges = true
                    }
                  })
                  return updatedItem
                }
                return item
              })
              updatedSettings[key] = updatedArray
            }
          }
        })

        if (hasChanges) {
          updateComponentSettings({
            componentId: component.id,
            settings: updatedSettings,
          })
        }
      })
    })
  }

  // Sync image usage tracking
  useEffect(() => {
    pages.forEach((page) => {
      page.components.forEach((component) => {
        // Check component settings for image references
        const settings = component.settings

        // Look for image URLs in component settings
        Object.entries(settings).forEach(([key, value]) => {
          if (typeof value === "string" && value.startsWith("blob:")) {
            // Find the image in our store
            const image = images.find((img) => img.url === value)
            if (image) {
              registerImageUsage(image.id, {
                pageId: page.id,
                pageName: page.name,
                componentId: component.id,
                componentName: component.name,
                location: key,
              })
            }
          }

          // Handle nested objects (like gallery items)
          if (typeof value === "object" && value !== null) {
            if (Array.isArray(value)) {
              value.forEach((item, index) => {
                if (typeof item === "object" && item !== null) {
                  Object.entries(item).forEach(([nestedKey, nestedValue]) => {
                    if (typeof nestedValue === "string" && nestedValue.startsWith("blob:")) {
                      const image = images.find((img) => img.url === nestedValue)
                      if (image) {
                        registerImageUsage(image.id, {
                          pageId: page.id,
                          pageName: page.name,
                          componentId: component.id,
                          componentName: component.name,
                          location: `${key}[${index}].${nestedKey}`,
                        })
                      }
                    }
                  })
                }
              })
            }
          }
        })
      })
    })
  }, [pages, images, registerImageUsage])

  // Listen for image store changes and update references automatically
  useEffect(() => {
    const unsubscribe = useImageManagementStore.subscribe((state, prevState) => {
      // Check if any images were updated (replaced)
      state.images.forEach((currentImage) => {
        const prevImage = prevState.images.find((img) => img.id === currentImage.id)
        if (prevImage && prevImage.url !== currentImage.url) {
          // Image was replaced - update all references
          updateImageReferences(prevImage.url, currentImage.url)
        }
      })

      // Check if any images were deleted
      prevState.images.forEach((prevImage) => {
        const currentImage = state.images.find((img) => img.id === prevImage.id)
        if (!currentImage) {
          // Image was deleted - remove all references
          updateImageReferences(prevImage.url, "/placeholder.svg?height=400&width=600")
        }
      })
    })

    return unsubscribe
  }, [pages, images, updateComponentSettings])

  // Add this function before the return statement
  const forceComponentUpdate = () => {
    // Trigger a store update to force re-render of all components
    useContentStore.getState().updateStore()
  }

  return {
    updateImageReferences,
    forceComponentUpdate,
  }
}
