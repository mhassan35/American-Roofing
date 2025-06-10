"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Zap, Users, Headphones } from "lucide-react"

interface WhyChooseUsProps {
  content?: any
}

const iconMap = {
  zap: Zap,
  users: Users,
  headphones: Headphones,
}

export default function WhyChooseUs({ content }: WhyChooseUsProps) {
  const settings = content || {
    title: "Why Choose Us",
    subtitle:
      "American Roofing is committed to providing exceptional service and quality craftsmanship on every project.",
    features: [
      {
        icon: "zap",
        title: "Fast Quotes",
        description: "Get a detailed quote for your roofing project in as little as 60 seconds.",
        color: "orange",
      },
      {
        icon: "users",
        title: "Local & Insured",
        description: "We're Houston-based, fully licensed, and insured for your complete peace of mind.",
        color: "green",
      },
      {
        icon: "headphones",
        title: "Real Human Support",
        description: "Speak directly with our roofing experts – no automated systems or offshore support.",
        color: "orange",
      },
    ],
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{settings.title}</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{settings.subtitle}</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {settings.features.map((feature: any, index: number) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Zap
            const bgColor = feature.color === "green" ? "bg-green-500" : "bg-orange-500"

            return (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow border-0 bg-white">
                <CardContent className="p-8">
                  {/* Icon Pill */}
                  <div className={`${bgColor} rounded-full w-32 h-16 flex items-center justify-center mx-auto mb-8`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
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
