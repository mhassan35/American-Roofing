"use client"

import { useLeadFormStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function CTASection() {
  const { openLeadForm } = useLeadFormStore()
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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
    <section className="corporate-section bg-brand-orange/5">
      <div className="corporate-container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
            Ready to Transform Your Roof?
          </motion.h2>

          <motion.p variants={itemVariants} className="text-base text-gray-600 mb-6">
            Get a free, no-obligation quote in under 60 seconds and see why Houston homeowners trust American Roofing.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Button
              onClick={openLeadForm}
              className="btn-corporate bg-brand-orange hover:bg-brand-orange/90 text-white shadow-sm hover:shadow-md"
            >
              Start Your Free Estimate
            </Button>
            <Button
              variant="outline"
              className="btn-corporate border-brand-green text-brand-green hover:bg-brand-green/10"
            >
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="flex items-start mb-3">
                <div className="flat-icon-secondary rounded-full mr-3 p-1.5">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1 text-gray-800">No Obligation</h3>
                  <p className="text-sm text-gray-600">Get a detailed quote with no pressure or commitment required.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="flex items-start mb-3">
                <div className="flat-icon-secondary rounded-full mr-3 p-1.5">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1 text-gray-800">Fast Response</h3>
                  <p className="text-sm text-gray-600">
                    Our team will contact you quickly to discuss your roofing needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="flex items-start mb-3">
                <div className="flat-icon-secondary rounded-full mr-3 p-1.5">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1 text-gray-800">Transparent Pricing</h3>
                  <p className="text-sm text-gray-600">No hidden fees or surprises - just honest, upfront pricing.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
