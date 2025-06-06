"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save, Globe, Phone } from "lucide-react"

export default function SettingsPanel() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your website settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Site Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Site Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Site Title</label>
              <Input defaultValue="American Roofing" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tagline</label>
              <Input defaultValue="Houston's Most Trusted Roofing Professionals" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                defaultValue="Professional roofing services in Houston. Roof replacement, repair, storm damage restoration, and more."
                rows={3}
              />
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <Input defaultValue="(713) 555-1234" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input defaultValue="info@americanroofing.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <Textarea defaultValue="123 Main Street, Houston, TX 77001" rows={2} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Business Hours</label>
              <Textarea
                defaultValue="Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 4:00 PM, Sun: Emergency calls only"
                rows={2}
              />
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Meta Title</label>
            <Input defaultValue="American Roofing - Houston's Most Trusted Roofing Professionals" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Meta Description</label>
            <Textarea
              defaultValue="Professional roofing services in Houston. Roof replacement, repair, storm damage restoration. Licensed & insured. Free estimates."
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Keywords</label>
            <Input defaultValue="roofing, Houston, roof repair, roof replacement, storm damage, gutters" />
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Save className="h-4 w-4 mr-2" />
            Save SEO Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
