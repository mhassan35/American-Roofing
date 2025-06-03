import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
}

// Simple admin user
const adminUser = {
  id: "admin001",
  email: "admin@americanroofing.com",
  password: "admin123",
  name: "Admin User",
  role: "Administrator",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true
      state.user = action.payload
      state.isLoading = false
      state.error = null
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false
      state.user = null
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.isLoading = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions

export const loginUser = (credentials: { email: string; password: string }) => {
  return async (dispatch: any) => {
    dispatch(loginStart())

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (
        (credentials.email === adminUser.email || credentials.email === adminUser.id) &&
        credentials.password === adminUser.password
      ) {
        const { password, ...userWithoutPassword } = adminUser
        dispatch(loginSuccess(userWithoutPassword))
        localStorage.setItem("adminAuth", "true")
        localStorage.setItem("adminUser", JSON.stringify(userWithoutPassword))
      } else {
        dispatch(loginFailure("Invalid email or password"))
      }
    } catch (error) {
      dispatch(loginFailure("Login failed. Please try again."))
    }
  }
}

export default authSlice.reducer
