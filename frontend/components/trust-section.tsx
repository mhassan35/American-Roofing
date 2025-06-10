"use client"

import { Shield, Award, Star, BadgeIcon as Certificate, Trophy, Medal } from "lucide-react"

interface TrustSectionProps {
  content?: any
}

const iconMap = {
  shield: Shield,
  award: Award,
  star: Star,
  certificate: Certificate,
  trophy: Trophy,
  medal: Medal,
}

export default function TrustSection({ content }: TrustSectionProps) {
  const settings = content || {
    title: "Trusted by Homeowners & Industry Leaders",
    certifications: [
      { name: "BBB A+ Rating", icon: "shield" },
      { name: "GAF Certified", icon: "award" },
      { name: "Owens Corning Preferred", icon: "star" },
      { name: "CertainTeed SELECT ShingleMaster", icon: "certificate" },
      { name: "HomeAdvisor Top Rated", icon: "trophy" },
      { name: "Angi Super Service Award", icon: "medal" },
    ],
    stats: [
      { number: "3,000+", label: "Happy Customers" },
      { number: "15+", label: "Years Experience" },
      { number: "100%", label: "Satisfaction Guarantee" },
      { number: "5,000+", label: "Projects Completed" },
    ],
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{settings.title}</h2>
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {settings.certifications.map((cert: any, index: number) => {
            const IconComponent = iconMap[cert.icon as keyof typeof iconMap] || Shield

            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-800">{cert.name}</p>
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {settings.stats.map((stat: any, index: number) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">{stat.number}</div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
