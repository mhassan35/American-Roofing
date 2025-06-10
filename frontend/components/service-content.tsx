"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLeadFormStore } from "@/lib/store"

interface ServiceContentProps {
  content?: {
    title?: string
    description?: string
    content?: string
    image?: string
  }
}

export default function ServiceContent({ content }: ServiceContentProps) {
  const { openLeadForm } = useLeadFormStore()

  const title = content?.title || "Professional Service"
  const description = content?.description || "Quality service description"
  const serviceContent = content?.content || "Detailed service content"
  const image = content?.image || "/placeholder.svg?height=400&width=800"

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={800}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-600 mb-6">{description}</p>
              <p className="text-gray-600 mb-8">{serviceContent}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={openLeadForm}
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
              >
                Get Free Estimate
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-green-500 text-green-500 hover:bg-green-50 px-8 py-3"
              >
                Call (713) 555-1234
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
