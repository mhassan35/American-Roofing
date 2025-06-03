import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import leadsSlice from "./slices/leadsSlice"
import contentSlice from "./slices/contentSlice"
import servicesSlice from "./slices/servicesSlice"
import uiSlice from "./slices/uiSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    leads: leadsSlice,
    content: contentSlice,
    services: servicesSlice,
    ui: uiSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
