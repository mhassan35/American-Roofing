"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Award, Clock } from "lucide-react"

interface WhyChooseUsProps {
  content?: {
    title?: string
    subtitle?: string
    features?: Array<{
      title: string
      description: string
      icon?: string
    }>
  }
}

const iconMap = {
  shield: Shield,
  users: Users,
  award: Award,
  clock: Clock,
}

export default function WhyChooseUs({ content }: WhyChooseUsProps) {
  const title = content?.title || "Why Choose American Roofing?"
  const subtitle = content?.subtitle || "We're committed to excellence in every project"
  const features = content?.features || [
    {
      title: "Quality Guarantee",
      description: "We stand behind our work with comprehensive warranties",
      icon: "shield",
    },
    {
      title: "Expert Team",
      description: "Certified professionals with years of experience",
      icon: "users",
    },
    {
      title: "Award Winning",
      description: "Recognized for excellence with industry awards",
      icon: "award",
    },
    {
      title: "Fast Response",
      description: "Quick response times when you need us most",
      icon: "clock",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Shield

            return (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow border-0">
                <CardContent className="p-8">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
