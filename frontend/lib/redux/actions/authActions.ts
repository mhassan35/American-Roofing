import type { AppDispatch } from "../store"
import { loginStart, loginSuccess, loginFailure } from "../slices/authSlice"

const adminUser = {
  id: "admin001",
  email: "admin@americanroofing.com",
  password: "admin123",
  name: "Admin User",
  role: "Administrator",
}

export const login = (credentials: { email: string; password: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(loginStart())

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (credentials.email === adminUser.email && credentials.password === adminUser.password) {
        const { password, ...userWithoutPassword } = adminUser
        dispatch(loginSuccess(userWithoutPassword))
      } else {
        dispatch(loginFailure("Invalid email or password"))
      }
    } catch (error) {
      dispatch(loginFailure("Login failed. Please try again."))
    }
  }
}
