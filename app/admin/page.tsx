"use client"
import { Provider } from "react-redux"
import { store } from "@/lib/store/index"
import AdminDashboard from "@/components/admin/AdminDashboard"

export default function AdminPage() {
  return (
    <Provider store={store}>
      <AdminDashboard />
    </Provider>
  )
}
