"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Edit } from "lucide-react"
import Link from "next/link"

type PageKey = "home" | "about"
type HomeContent = {
  hero: {
    title: string
    subtitle: string
    ctaText: string
  }
  features: string[]
}
type AboutContent = {
  hero: {
    title: string
    subtitle: string
  }
  story: {
    title: string
    content: string
  }
}
type PageContent = {
  home: HomeContent
  about: AboutContent
}

const initialContent: PageContent = {
  home: {
    hero: {
      title: "Houston's Most Trusted Roofing Pros",
      subtitle: "Request a fast, free quote in under 60 seconds.",
      ctaText: "Get Free Estimate",
    },
    features: ["Licensed & Insured", "4.9⭐ on Google", "Trusted by 3,000+ Homeowners"],
  },
  about: {
    hero: {
      title: "About American Roofing",
      subtitle:
        "Houston's most trusted roofing professionals with over 15 years of experience serving homeowners throughout the greater Houston area.",
    },
    story: {
      title: "Our Story",
      content:
        "Founded in 2008, American Roofing has been serving the Houston community with integrity, quality craftsmanship, and exceptional customer service...",
    },
  },
}

export default function ContentEditor() {
  const [selectedPage, setSelectedPage] = useState<PageKey>("home")
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [content, setContent] = useState<PageContent>(initialContent)

  const handleSave = (page: PageKey, section: string, newContent: any) => {
    setContent((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [section]: newContent,
      },
    }))
    setEditingSection(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900 ml-4">Content Editor</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Page Selector */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Pages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {(Object.keys(initialContent) as PageKey[]).map((page) => (
                  <Button
                    key={page}
                    variant={selectedPage === page ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedPage(page)}
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)} Page
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Editing: {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)} Page</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(content[selectedPage]).map(([section, sectionContent]) => {
                  const isEditing = editingSection === `${selectedPage}-${section}`
                  return (
                    <div key={section} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold capitalize">{section}</h3>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingSection(`${selectedPage}-${section}`)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>

                      {isEditing ? (
                        <div className="space-y-4">
                          {typeof sectionContent === "object" && sectionContent !== null ? (
                            Object.entries(sectionContent).map(([key, value]) => (
                              <div key={key}>
                                <label className="block text-sm font-medium mb-2 capitalize">{key}</label>
                                {key === "content" ? (
                                  <Textarea defaultValue={String(value)} rows={4} className="w-full" />
                                ) : (
                                  <Input defaultValue={String(value)} className="w-full" />
                                )}
                              </div>
                            ))
                          ) : (
                            <Textarea defaultValue={String(sectionContent)} rows={4} className="w-full" />
                          )}
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => setEditingSection(null)}
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingSection(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded">
                          {typeof sectionContent === "object" && sectionContent !== null ? (
                            Object.entries(sectionContent).map(([key, value]) => (
                              <div key={key} className="mb-2">
                                <strong className="capitalize">{key}:</strong> {String(value)}
                              </div>
                            ))
                          ) : (
                            <p>{String(sectionContent)}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
