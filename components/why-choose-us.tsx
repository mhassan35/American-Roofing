"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Rocket, Users, HeadphonesIcon } from "lucide-react"

const features = [
  {
    id: "fast-quotes",
    title: "Fast Quotes",
    description: "Get a detailed quote for your roofing project in as little as 60 seconds.",
    icon: Rocket,
  },
  {
    id: "local-insured",
    title: "Local & Insured",
    description: "We're Houston-based, fully licensed, and insured for your complete peace of mind.",
    icon: Users,
  },
  {
    id: "human-support",
    title: "Real Human Support",
    description: "Speak directly with our roofing experts – no automated systems or outsourced support.",
    icon: HeadphonesIcon,
  },
]

export default function WhyChooseUs() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const controls = useAnimation()

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Why Choose Us
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            American Roofing is committed to providing exceptional service and quality craftsmanship on every project.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 sm:p-10 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className={`flat-icon ${index % 2 === 0 ? "flat-icon-primary" : "flat-icon-secondary"} p-4 sm:p-5 rounded-2xl inline-block mb-6`}
              >
                <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 text-brand" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-base sm:text-lg text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
