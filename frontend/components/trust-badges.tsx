"use client"

import { Shield, Star, Award, Home } from "lucide-react"

interface TrustBadgesProps {
  content?: any
}

const iconMap = {
  shield: Shield,
  star: Star,
  award: Award,
  home: Home,
}

export default function TrustBadges({ content }: TrustBadgesProps) {
  const settings = content || {
    badges: [
      { icon: "shield", text: "BBB A+ Rating", color: "green" },
      { icon: "star", text: "4.9 (300+ Reviews)", color: "orange" },
      { icon: "award", text: "GAF Certified Installer", color: "green" },
      { icon: "home", text: "Local Houston-Owned", color: "orange" },
    ],
  }

  return (
    <section className="py-8 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {settings.badges.map((badge: any, index: number) => {
            const IconComponent = iconMap[badge.icon as keyof typeof iconMap] || Shield
            const bgColor = badge.color === "green" ? "bg-green-500" : "bg-orange-500"

            return (
              <div key={index} className="flex items-center justify-center space-x-3 p-4">
                <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-800 font-semibold text-sm lg:text-base">{badge.text}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
