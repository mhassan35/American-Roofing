"use client"

import { useLeadStore, useAuthStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, DollarSign, TrendingUp, Phone, Mail, Eye } from "lucide-react"

export default function DashboardOverview() {
  const { leads, getStats } = useLeadStore()
  const stats = getStats()
  const { user } = useAuthStore()

  const quickStats = [
    {
      title: "Total Leads",
      value: stats.total,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "New Leads",
      value: stats.new,
      icon: TrendingUp,
      color: "bg-red-500",
    },
    {
      title: "Contacted",
      value: stats.contacted,
      icon: Phone,
      color: "bg-yellow-500",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: DollarSign,
      color: "bg-green-500",
    },
  ]

  const recentLeads = leads.slice(0, 3)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800"
      case "contacted":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Mock data for service-specific lead generation metrics
  const serviceLeadMetrics = [
    { service: "Roof Repair", leads: 120, conversionRate: "15%" },
    { service: "New Roof Installation", leads: 85, conversionRate: "12%" },
    { service: "Roof Inspection", leads: 150, conversionRate: "18%" },
  ]

  // Mock data for content performance statistics
  const contentPerformance = [
    { page: "Homepage", views: 5000, bounceRate: "60%" },
    { page: "Roof Repair Service", views: 3000, bounceRate: "50%" },
    { page: "New Roof Installation Service", views: 2500, bounceRate: "45%" },
  ]

  // Mock data for recent service page updates
  const recentUpdates = [
    { page: "Homepage", lastUpdated: "2 days ago" },
    { page: "About Us", lastUpdated: "1 week ago" },
    { page: "Contact Us", lastUpdated: "3 weeks ago" },
  ]

  // Mock data for service conversion tracking
  const serviceConversions = [
    { service: "Roof Repair", conversions: 30 },
    { service: "New Roof Installation", conversions: 10 },
    { service: "Roof Inspection", conversions: 27 },
  ]

  // Mock data for image usage statistics
  const imageUsage = { totalImages: 150, optimizedImages: 120, unoptimizedImages: 30 }

  // Mock data for page view analytics for each service
  const servicePageViews = [
    { service: "Roof Repair", views: 3000 },
    { service: "New Roof Installation", views: 2500 },
    { service: "Roof Inspection", views: 3500 },
  ]

  // Mock data for system health monitoring
  const systemHealth = { cpuUsage: "60%", memoryUsage: "70%", diskUsage: "80%" }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-orange-100">Here's what's happening with your roofing business today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Leads</CardTitle>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {lead.firstName[0]}
                        {lead.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {lead.firstName} {lead.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{lead.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                    <p className="text-xs text-gray-500 mt-1">{lead.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-orange-500 hover:bg-orange-600">
              <Users className="h-4 w-4 mr-2" />
              View All Leads
            </Button>
            <Button variant="outline" className="w-full">
              <Phone className="h-4 w-4 mr-2" />
              Call New Leads
            </Button>
            <Button variant="outline" className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Send Follow-up
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Statistics and Monitoring */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Service-Specific Lead Generation Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Service Lead Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {serviceLeadMetrics.map((item) => (
                <div key={item.service} className="flex justify-between">
                  <p>{item.service}</p>
                  <p>
                    Leads: {item.leads} ({item.conversionRate})
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Performance Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Content Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {contentPerformance.map((item) => (
                <div key={item.page} className="flex justify-between">
                  <p>{item.page}</p>
                  <p>
                    Views: {item.views} (Bounce: {item.bounceRate})
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Service Page Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Page Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentUpdates.map((item) => (
                <div key={item.page} className="flex justify-between">
                  <p>{item.page}</p>
                  <p>{item.lastUpdated}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Conversion Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>Service Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {serviceConversions.map((item) => (
                <div key={item.service} className="flex justify-between">
                  <p>{item.service}</p>
                  <p>Conversions: {item.conversions}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Image Usage Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Image Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total Images: {imageUsage.totalImages}</p>
            <p>Optimized: {imageUsage.optimizedImages}</p>
            <p>Unoptimized: {imageUsage.unoptimizedImages}</p>
          </CardContent>
        </Card>

        {/* Page View Analytics for Each Service */}
        <Card>
          <CardHeader>
            <CardTitle>Service Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {servicePageViews.map((item) => (
                <div key={item.service} className="flex justify-between">
                  <p>{item.service}</p>
                  <p>Views: {item.views}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <p>CPU Usage: {systemHealth.cpuUsage}</p>
            <p>Memory Usage: {systemHealth.memoryUsage}</p>
            <p>Disk Usage: {systemHealth.diskUsage}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
