"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useLeadFormStore } from "@/lib/store"
import { Phone, MessageSquare, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function FloatingCTA() {
  const { openLeadForm } = useLeadFormStore()
  const [isOpen, setIsOpen] = useState(false)
  const [showBottomBar, setShowBottomBar] = useState(false)

  // Show bottom bar on mobile after scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        setShowBottomBar(window.scrollY > 300)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Floating contact widget */}
      <div className="fixed bottom-4 right-4 z-40">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-4 mb-3 w-64"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-gray-800">Contact Us</h3>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-xs py-2 border-brand-green" asChild>
                  <a href="tel:+17135551234">
                    <div className="flat-icon-primary mr-2 p-1.5 rounded-full">
                      <Phone className="h-3 w-3" />
                    </div>
                    (713) 555-1234
                  </a>
                </Button>

                <Button variant="outline" className="w-full justify-start text-xs py-2 border-brand-green" asChild>
                  <a href="sms:+17135551234">
                    <div className="flat-icon-primary mr-2 p-1.5 rounded-full">
                      <MessageSquare className="h-3 w-3" />
                    </div>
                    Text Us
                  </a>
                </Button>

                <Button
                  className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white text-xs font-medium py-2"
                  onClick={() => {
                    openLeadForm()
                    setIsOpen(false)
                  }}
                >
                  Get a Free Estimate
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-full h-10 w-10 shadow-md ${
            isOpen ? "bg-gray-200 text-gray-800" : "bg-brand-orange text-white"
          }`}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
        </Button>
      </div>

      {/* Bottom sticky bar for mobile */}
      <AnimatePresence>
        {showBottomBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)] p-3 z-30 md:hidden"
          >
            <Button
              onClick={openLeadForm}
              className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white text-sm font-medium rounded-md py-2"
            >
              Get a Free Estimate Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
