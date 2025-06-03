"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Save, X } from "lucide-react"

interface ContentEditorProps {
  title: string
  content: string
  onSave: (newContent: string) => void
}

export default function ContentEditor({ title, content, onSave }: ContentEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)

  const handleSave = () => {
    onSave(editedContent)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedContent(content)
    setIsEditing(false)
  }

  if (!isEditing) {
    return (
      <div className="relative group">
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <Button
          size="sm"
          variant="outline"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsEditing(true)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <Card className="border-orange-200">
      <CardHeader>
        <CardTitle className="text-sm">Editing: {title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          rows={6}
          className="font-mono text-sm"
        />
        <div className="flex space-x-2">
          <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
