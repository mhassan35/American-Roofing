"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux"
import { logout } from "@/lib/store/slices/authSlice"
import { toggleSidebar } from "@/lib/store/slices/uiSlice"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LayoutDashboard, Users, FileText, ImageIcon, Settings, Menu, LogOut } from "lucide-react"
import Sidebar from "./Sidebar"
import DashboardOverview from "./DashboardOverview"
import LeadsManagement from "./LeadsManagement"
import ContentManagement from "./ContentManagement"
import ImageManagement from "./ImageManagement"
import SettingsPanel from "./SettingsPanel"
import ServicesManagement from "./ServicesManagement"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb"

const navigation = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "leads", name: "Leads", icon: Users },
  { id: "content", name: "Content", icon: FileText },
  { id: "services", name: "Services", icon: Settings },
  { id: "images", name: "Images", icon: ImageIcon },
  { id: "settings", name: "Settings", icon: Settings },
]

export default function DashboardLayout() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { sidebarOpen, activeTab, isMobile } = useAppSelector((state) => state.ui)
  const [searchTerm, setSearchTerm] = useState("")
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New content added: 'Latest Trends'", read: false },
    { id: 2, message: "Service update: Maintenance scheduled", read: true },
  ])

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("adminAuth")
    localStorage.removeItem("adminUser")
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />
      case "leads":
        return <LeadsManagement />
      case "content":
        return <ContentManagement />
      case "services":
        return <ServicesManagement />
      case "images":
        return <ImageManagement />
      case "settings":
        return <SettingsPanel />
      default:
        return <DashboardOverview />
    }
  }

  const unreadNotificationsCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar navigation={navigation} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={() => dispatch(toggleSidebar())} className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900 ml-4 lg:ml-0">
                {navigation.find((nav) => nav.id === activeTab)?.name || "Dashboard"}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Input */}
              <Input
                type="search"
                placeholder="Search..."
                className="max-w-sm mr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Notification Badge */}
              <div className="relative">
                <Button variant="ghost" size="sm">
                  {/* Placeholder for Notification Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M6 8a6 6 0 0 0 12 0M13 16v-2a2 2 0 0 0-4 0v2"></path>
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3H22.47a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  </svg>
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </Button>
              </div>

              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.role}</div>
              </div>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-orange-500 text-white">
                  {user?.name
                    ?.split(" ")
                    .map((n:any) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbItem>Dashboard</BreadcrumbItem>
              <BreadcrumbItem>{navigation.find((nav) => nav.id === activeTab)?.name || "Dashboard"}</BreadcrumbItem>
            </Breadcrumb>
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}
    </div>
  )
}
