"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux"
import {
  setLeads,
  setSearchTerm,
  setStatusFilter,
  updateLeadStatus,
  selectLead,
  type Lead,
} from "@/lib/store/slices/leadsSlice"
import { useLeadStore } from "@/lib/zustand-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, Eye, Phone, Mail, MapPin, Clock, Home, AlertCircle } from "lucide-react"

export default function LeadsManagement() {
  const dispatch = useAppDispatch()
  const { filteredLeads, searchTerm, statusFilter, selectedLead, stats } = useAppSelector((state) => state.leads)

  // Get leads from Zustand store
  const { leads: zustandLeads, getStats } = useLeadStore()

  // Sync Zustand leads with Redux
  useEffect(() => {
    dispatch(setLeads(zustandLeads))
  }, [zustandLeads, dispatch])

  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800 border-red-200"
      case "contacted":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getUrgencyIcon = (urgency?: string) => {
    switch (urgency) {
      case "urgent":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "soon":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "planning":
        return <Clock className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getServiceDisplayName = (service: string) => {
    const serviceMap: Record<string, string> = {
      "roof-replacement": "Roof Replacement",
      "roof-repair": "Roof Repair",
      "storm-damage": "Storm Damage",
      inspection: "Free Inspection",
      gutters: "Gutter Services",
      insurance: "Insurance Claim",
    }
    return serviceMap[service] || service
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600">Manage and track your roofing leads from the website</p>
        </div>
        <Button variant="outline" className="mt-4 sm:mt-0">
          <Download className="h-4 w-4 mr-2" />
          Export Leads
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Leads</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-500">{stats.new}</p>
              <p className="text-sm text-gray-600">New Leads</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-500">{stats.contacted}</p>
              <p className="text-sm text-gray-600">Contacted</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">{stats.completed}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={(value) => dispatch(setStatusFilter(value))}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-medium text-gray-900">Lead</th>
                  <th className="text-left p-4 font-medium text-gray-900">Contact</th>
                  <th className="text-left p-4 font-medium text-gray-900">Service</th>
                  <th className="text-left p-4 font-medium text-gray-900">Location</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Date</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead : any) => (
                  <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
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
                          <div className="flex items-center text-xs text-gray-500">
                            {getUrgencyIcon(lead.urgency)}
                            {lead.urgency && <span className="ml-1 capitalize">{lead.urgency}</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <p className="text-gray-900">{lead.email}</p>
                        <p className="text-gray-500">{lead.phone}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <p className="text-gray-900">{getServiceDisplayName(lead.service)}</p>
                        {lead.propertyType && (
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Home className="h-3 w-3 mr-1" />
                            <span className="capitalize">{lead.propertyType}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {lead.address && (
                        <div className="text-sm">
                          <div className="flex items-center text-gray-900">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{lead.address}</span>
                          </div>
                          <p className="text-gray-500">{lead.zipCode}</p>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <Select
                        value={lead.status}
                        onValueChange={(value) =>
                          dispatch(updateLeadStatus({ id: lead.id, status: value as Lead["status"] }))
                        }
                      >
                        <SelectTrigger className="w-32">
                          <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-500">{lead.date}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => dispatch(selectLead(lead))}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={`tel:${lead.phone}`}>
                            <Phone className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={`mailto:${lead.email}`}>
                            <Mail className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Lead Details
                <Button variant="ghost" size="sm" onClick={() => dispatch(selectLead(null))}>
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <p className="text-gray-900">
                    {selectedLead.firstName} {selectedLead.lastName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900">{selectedLead.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Service</label>
                  <p className="text-gray-900">{getServiceDisplayName(selectedLead.service)}</p>
                </div>
                {selectedLead.address && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Address</label>
                      <p className="text-gray-900">{selectedLead.address}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Zip Code</label>
                      <p className="text-gray-900">{selectedLead.zipCode}</p>
                    </div>
                  </>
                )}
                {selectedLead.propertyType && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Property Type</label>
                    <p className="text-gray-900 capitalize">{selectedLead.propertyType}</p>
                  </div>
                )}
                {selectedLead.urgency && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Urgency</label>
                    <div className="flex items-center">
                      {getUrgencyIcon(selectedLead.urgency)}
                      <p className="text-gray-900 capitalize ml-2">{selectedLead.urgency}</p>
                    </div>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <p className="text-gray-900">{selectedLead.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <Badge className={getStatusColor(selectedLead.status)}>{selectedLead.status}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Source</label>
                  <p className="text-gray-900">{selectedLead.source}</p>
                </div>
              </div>

              {selectedLead.message && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <div className="mt-1 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-900">{selectedLead.message}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => dispatch(selectLead(null))}>
                  Close
                </Button>
                <Button variant="outline" asChild>
                  <a href={`tel:${selectedLead.phone}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </a>
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                  <a href={`mailto:${selectedLead.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
