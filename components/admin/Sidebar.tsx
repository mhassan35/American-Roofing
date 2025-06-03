"use client"

import type React from "react"

import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux"
import { setActiveTab, toggleSidebar } from "@/lib/store/slices/uiSlice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Home, X } from "lucide-react"

interface SidebarProps {
  navigation: Array<{
    id: string
    name: string
    icon: React.ComponentType<{ className?: string }>
  }>
}

export default function Sidebar({ navigation }: SidebarProps) {
  const dispatch = useAppDispatch()
  const { sidebarOpen, activeTab, isMobile } = useAppSelector((state) => state.ui)
  const { stats } = useAppSelector((state) => state.leads)

  return (
    <div
      className={cn(
        "bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out z-50",
        isMobile ? "fixed inset-y-0 left-0" : "relative",
        sidebarOpen ? "w-64" : "w-0 lg:w-16",
        isMobile && !sidebarOpen && "hidden",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className={cn("flex items-center", !sidebarOpen && "lg:justify-center")}>
            <div className="flex items-center justify-center w-10 h-10 bg-orange-500 rounded-lg">
              <Home className="h-6 w-6 text-white" />
            </div>
            {sidebarOpen && (
              <div className="ml-3">
                <h2 className="text-lg font-bold text-gray-900">American</h2>
                <p className="text-xs text-gray-500">Roofing Admin</p>
              </div>
            )}
          </div>
          {isMobile && (
            <Button variant="ghost" size="sm" onClick={() => dispatch(toggleSidebar())}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = activeTab === item.id
            const badgeCount = item.id === "leads" ? stats.new : 0

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start relative group",
                  isActive ? "bg-orange-500 text-white hover:bg-orange-600" : "text-gray-700 hover:bg-gray-100",
                  !sidebarOpen && "lg:justify-center lg:px-2",
                )}
                onClick={() => {
                  dispatch(setActiveTab(item.id))
                  if (isMobile) dispatch(toggleSidebar())
                }}
              >
                <item.icon className={cn("h-5 w-5", sidebarOpen ? "mr-3" : "mr-0")} />
                {sidebarOpen && (
                  <>
                    <span className="truncate">{item.name}</span>
                    {badgeCount > 0 && (
                      <Badge
                        className={cn(
                          "ml-auto h-5 w-5 rounded-full text-xs flex items-center justify-center",
                          isActive ? "bg-white text-orange-500" : "bg-red-500 text-white",
                        )}
                      >
                        {badgeCount}
                      </Badge>
                    )}
                  </>
                )}

                {/* Tooltip for collapsed state */}
                {!sidebarOpen && !isMobile && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.name}
                    {badgeCount > 0 && (
                      <span className="ml-2 bg-red-500 text-white rounded-full px-1 text-xs">{badgeCount}</span>
                    )}
                  </div>
                )}
              </Button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {sidebarOpen ? (
            <div className="text-center">
              <p className="text-xs text-gray-500">v1.0.0</p>
              <p className="text-xs text-gray-400">© 2024 American Roofing</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
