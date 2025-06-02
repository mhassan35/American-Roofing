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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
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
    <section className="clickfunnels-section bg-brand-beige">
      <div className="clickfunnels-container">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Why Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            American Roofing is committed to providing exceptional service and quality craftsmanship on every project.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="bg-white rounded-2xl p-10 shadow-soft hover:shadow-hover transition-all duration-300"
            >
              <div
                className={`flat-icon ${index % 2 === 0 ? "flat-icon-primary" : "flat-icon-secondary"} p-5 rounded-2xl inline-block mb-8`}
              >
                <feature.icon className="h-10 w-10" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">{feature.title}</h3>
              <p className="text-xl text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
