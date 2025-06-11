"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const controls = useAnimation()

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

  useEffect(() => {
    if (inView) controls.start("visible")
  }, [controls, inView])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section className="bg-brand-beige py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">{settings.title}</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{settings.subtitle}</p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {settings.features.map((feature: any, index: number) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Zap
            const iconClass = feature.color === "green" ? "flat-icon-secondary" : "flat-icon-primary"

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 sm:p-10 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`flat-icon ${iconClass} p-4 sm:p-5 rounded-2xl inline-block mb-6`}>
                  <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-brand" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-base sm:text-lg text-gray-600">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
