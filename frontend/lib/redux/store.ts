import { configureStore } from "@reduxjs/toolkit"
import contentReducer from "./slices/contentSlice"
import authReducer from "./slices/authSlice"
import leadReducer from "./slices/leadSlice"
import uiReducer from "./slices/uiSlice"

export const store = configureStore({
  reducer: {
    content: contentReducer,
    auth: authReducer,
    leads: leadReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
