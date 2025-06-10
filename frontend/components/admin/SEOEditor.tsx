"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Save, Search } from "lucide-react"
import { useContentStore, type SEOData } from "@/lib/store"
import { toast } from "@/hooks/use-toast"

interface SEOEditorProps {
  pageId: string
  currentSEO: SEOData
}

export default function SEOEditor({ pageId, currentSEO }: SEOEditorProps) {
  const [seoData, setSeoData] = useState<SEOData>(currentSEO)
  const [saving, setSaving] = useState(false)
  const { updatePageSEO } = useContentStore()

  const handleSave = async () => {
    setSaving(true)

    try {
      updatePageSEO({ pageId, seo: seoData })

      toast({
        title: "SEO Updated",
        description: "SEO settings have been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update SEO settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: keyof SEOData, value: string) => {
    setSeoData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Search className="h-5 w-5" />
          <span>SEO Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Page Title</Label>
          <Input
            id="title"
            value={seoData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter page title"
            maxLength={60}
          />
          <p className="text-xs text-gray-500">{seoData.title.length}/60 characters (recommended)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Meta Description</Label>
          <Textarea
            id="description"
            value={seoData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Enter meta description"
            rows={3}
            maxLength={160}
          />
          <p className="text-xs text-gray-500">{seoData.description.length}/160 characters (recommended)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords</Label>
          <Input
            id="keywords"
            value={seoData.keywords}
            onChange={(e) => handleChange("keywords", e.target.value)}
            placeholder="Enter keywords separated by commas"
          />
          <p className="text-xs text-gray-500">Separate keywords with commas</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ogImage">Open Graph Image URL</Label>
          <Input
            id="ogImage"
            value={seoData.ogImage || ""}
            onChange={(e) => handleChange("ogImage", e.target.value)}
            placeholder="Enter image URL for social sharing"
          />
          <p className="text-xs text-gray-500">Recommended size: 1200x630 pixels</p>
        </div>

        {/* SEO Preview */}
        <div className="space-y-4">
          <Label>Search Engine Preview</Label>
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="space-y-2">
              <h3 className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
                {seoData.title || "Page Title"}
              </h3>
              <p className="text-green-700 text-sm">
                https://americanroofing.com{pageId === "home" ? "" : `/${pageId}`}
              </p>
              <p className="text-gray-600 text-sm">{seoData.description || "Meta description will appear here..."}</p>
            </div>
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save SEO Settings"}
        </Button>
      </CardContent>
    </Card>
  )
}
