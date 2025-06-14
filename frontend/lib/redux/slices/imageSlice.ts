import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

// Define image types
export interface ImageAsset {
  id: string
  name: string
  category: string
  size: string
  uploadDate: string
  alt: string
  tags: string[]
  url: string
}

export type ImageType = ImageAsset

export interface ImageCategory {
  id: string
  name: string
  icon: string
}

interface ImageState {
  assets: ImageAsset[]
  categories: ImageCategory[]
  selectedImage: ImageAsset | null
  selectedCategory: string
  searchTerm: string
  isLoading: boolean
  error: string | null
}

// Initial categories
const imageCategories: ImageCategory[] = [
  { id: "all", name: "All Images", icon: "image" },
  { id: "general", name: "General", icon: "folder" },
  { id: "roof-replacement", name: "Roof Replacement", icon: "home" },
  { id: "roof-repair", name: "Roof Repair", icon: "wrench" },
  { id: "storm-damage", name: "Storm Damage", icon: "cloud" },
  { id: "before-after", name: "Before & After", icon: "eye" },
  { id: "team", name: "Team Photos", icon: "users" },
]

// Generate initial images
const initialImages: ImageAsset[] = Array.from({ length: 12 }, (_, i) => ({
  id: `img-${i + 1}`,
  name: `image-${i + 1}.jpg`,
  category: imageCategories[Math.floor(Math.random() * (imageCategories.length - 1)) + 1].id,
  size: `${Math.floor(Math.random() * 500 + 100)}KB`,
  uploadDate: "2024-01-15",
  alt: `Roofing project ${i + 1}`,
  tags: ["roofing", "repair", "house"],
  url: `/placeholder.svg?height=300&width=300`,
}))

const initialState: ImageState = {
  assets: initialImages,
  categories: imageCategories,
  selectedImage: null,
  selectedCategory: "all",
  searchTerm: "",
  isLoading: false,
  error: null,
}

// Async thunks for API operations
export const uploadImage = createAsyncThunk(
  "images/uploadImage",
  async (data: { file: File; category: string; alt: string; tags: string[] }, { rejectWithValue }) => {
    try {
      // In a real implementation, this would be an API call to upload the file
      // For now, we'll simulate a successful upload
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return {
        id: `img-${Date.now()}`,
        name: data.file.name,
        category: data.category,
        size: `${Math.round(data.file.size / 1024)}KB`,
        uploadDate: new Date().toISOString().split("T")[0],
        alt: data.alt || data.file.name,
        tags: data.tags,
        url: URL.createObjectURL(data.file), // In production, this would be the URL from your server
      }
    } catch (error) {
      return rejectWithValue("Failed to upload image")
    }
  },
)

export const optimizeImages = createAsyncThunk(
  "images/optimizeImages",
  async (category: string, { getState, rejectWithValue }) => {
    try {
      // In a real implementation, this would be an API call to optimize images
      // For now, we'll simulate a successful optimization
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return { success: true, category }
    } catch (error) {
      return rejectWithValue("Failed to optimize images")
    }
  },
)

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    setSelectedImage: (state, action: PayloadAction<ImageAsset | null>) => {
      state.selectedImage = action.payload
    },
    updateImageMetadata: (state, action: PayloadAction<{ id: string; alt?: string; tags?: string[] }>) => {
      const { id, alt, tags } = action.payload
      const image = state.assets.find((img) => img.id === id)
      if (image) {
        if (alt !== undefined) image.alt = alt
        if (tags !== undefined) image.tags = tags
      }
    },
    deleteImage: (state, action: PayloadAction<string>) => {
      state.assets = state.assets.filter((img) => img.id !== action.payload)
      if (state.selectedImage && state.selectedImage.id === action.payload) {
        state.selectedImage = null
      }
    },
    bulkDeleteImages: (state, action: PayloadAction<string>) => {
      const category = action.payload
      if (category === "all") {
        state.assets = []
      } else {
        state.assets = state.assets.filter((img) => img.category !== category)
      }
      state.selectedImage = null
    },
    addCategory: (state, action: PayloadAction<{ id: string; name: string; icon: string }>) => {
      state.categories.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.assets.unshift(action.payload)
        state.isLoading = false
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(optimizeImages.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(optimizeImages.fulfilled, (state) => {
        state.isLoading = false
        // In a real implementation, we might update the optimized images here
      })
      .addCase(optimizeImages.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const {
  setSelectedCategory,
  setSearchTerm,
  setSelectedImage,
  updateImageMetadata,
  deleteImage,
  bulkDeleteImages,
  addCategory,
} = imageSlice.actions

export default imageSlice.reducer
