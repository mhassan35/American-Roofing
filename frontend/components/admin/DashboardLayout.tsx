"use client"
import { useAuthStore, useUIStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LayoutDashboard, Users, FileText, ImageIcon, Settings, Menu, LogOut } from "lucide-react"
import Sidebar from "./Sidebar"
import DashboardOverview from "./DashboardOverview"
import LeadsManagement from "./LeadsManagement"
import ContentManagement from "./ContentManagement"
import ImageManagement from "./real-time-image-dashboard"
// import SettingsPanel from "./SettingsPanel"
// import ServicesManagement from "./ServicesManagement"

const navigation = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "leads", name: "Leads", icon: Users },
  { id: "content", name: "Content", icon: FileText },
  { id: "services", name: "Services", icon: Settings },
  { id: "images", name: "Images", icon: ImageIcon },
  { id: "settings", name: "Settings", icon: Settings },
]

export default function DashboardLayout() {
  const { user, logout } = useAuthStore()
  const { sidebarOpen, activeTab, isMobile, toggleSidebar } = useUIStore()

  const handleLogout = () => {
    logout()
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />
      case "leads":
        return <LeadsManagement />
      case "content":
        return <ContentManagement />
      case "images":
        return <ImageManagement />
      default:
        return <DashboardOverview />
    }
  }

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
              <Button variant="ghost" size="sm" onClick={toggleSidebar} className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900 ml-4 lg:ml-0">
                {navigation.find((nav) => nav.id === activeTab)?.name || "Dashboard"}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.role}</div>
              </div>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-orange-500 text-white">
                  {user?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
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
          <div className="p-4 sm:p-6 lg:p-8">{renderContent()}</div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={toggleSidebar} />
      )}
    </div>
  )
}
