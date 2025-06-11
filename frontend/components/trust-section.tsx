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
    <section className="corporate-section bg-white">
      <div className="corporate-container">
        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h3 className="text-center text-lg font-semibold mb-6 text-gray-800">{settings.title}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {settings.certifications.map((badge: any, index: number) => {
              const IconComponent = iconMap[badge.icon as keyof typeof iconMap] || Shield
              return (
                <div key={index} className="flex flex-col items-center justify-center bg-gray-50 p-3 rounded-md">
                  <div
                    className={`p-2 rounded-md mb-2 ${index % 2 === 0 ? "bg-brand-green/10" : "bg-brand-orange/10"}`}
                  >
                    <IconComponent className="h-4 w-4 text-brand-green" />
                  </div>
                  <span className="text-xs text-center text-gray-700">{badge.name}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {settings.stats.map((stat: any, idx: number) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-md text-center">
              <div className="text-2xl font-bold text-brand-orange mb-1">{stat.number}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
