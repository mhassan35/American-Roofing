import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UIState {
  sidebarOpen: boolean
  activeTab: string
  theme: "light" | "dark"
}

const initialState: UIState = {
  sidebarOpen: true,
  activeTab: "overview",
  theme: "light",
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload
    },
  },
})

export const { toggleSidebar, setActiveTab, setTheme } = uiSlice.actions
export default uiSlice.reducer
