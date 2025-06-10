"use client"

import { CheckCircle } from "lucide-react"
import Image from "next/image"

interface AboutContentProps {
  content?: any
}

export default function AboutContent({ content }: AboutContentProps) {
  const settings = content || {
    story: {
      title: "Our Story",
      content:
        "Founded in 2008, American Roofing has been serving the Houston community with integrity, quality craftsmanship, and exceptional customer service. What started as a small family business has grown into one of Houston's most trusted roofing companies.\n\nWe understand that your roof is one of your home's most important investments. That's why we're committed to providing superior roofing solutions using only the highest quality materials and proven installation techniques.",
    },
    mission: {
      title: "Our Mission",
      content:
        "Our mission is to protect Houston homes and families by providing exceptional roofing services with unmatched quality, reliability, and customer satisfaction.",
    },
    credentials: [
      "Licensed & Insured",
      "BBB A+ Rating",
      "GAF Certified Installer",
      "Trusted by 3,000+ Homeowners",
      "15+ Years Experience",
      "Emergency Services Available",
    ],
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">{settings.story.title}</h2>
            <div className="text-gray-600 mb-6 leading-relaxed whitespace-pre-line">{settings.story.content}</div>

            {settings.mission.title && (
              <>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{settings.mission.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{settings.mission.content}</p>
              </>
            )}

            {settings.credentials && settings.credentials.length > 0 && (
              <div className="space-y-4">
                {settings.credentials.map((credential: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{credential}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="American Roofing team"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
