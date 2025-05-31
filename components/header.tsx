"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Menu, X, ChevronDown } from "lucide-react"
import { useLeadFormStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { openLeadForm } = useLeadFormStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-2" : "bg-transparent py-3",
      )}
    >
      <div className="corporate-container flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="h-10 w-32 bg-white rounded-md flex items-center justify-center">
            <div className="text-base font-bold">
              <span className="text-brand-orange">American</span>
              <span className="text-brand-green">Roofing</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <div className="relative group">
            <button className="flex items-center text-sm text-gray-800 hover:text-brand-orange font-medium transition-colors">
              Services
              <ChevronDown className="ml-1 h-3 w-3" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <Link
                href="/services/roof-replacement"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-orange/10 hover:text-brand-orange"
              >
                Roof Replacement
              </Link>
              <Link
                href="/services/roof-repair"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-orange/10 hover:text-brand-orange"
              >
                Roof Repair
              </Link>
              <Link
                href="/services/storm-damage"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-orange/10 hover:text-brand-orange"
              >
                Storm Damage
              </Link>
              <Link
                href="/services/inspections"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-orange/10 hover:text-brand-orange"
              >
                Inspections
              </Link>
            </div>
          </div>
          <Link href="/about" className="text-sm text-gray-800 hover:text-brand-orange font-medium transition-colors">
            About Us
          </Link>
          <Link href="/gallery" className="text-sm text-gray-800 hover:text-brand-orange font-medium transition-colors">
            Project Gallery
          </Link>
          <Link href="/contact" className="text-sm text-gray-800 hover:text-brand-orange font-medium transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="tel:+17135551234"
            className="flex items-center text-sm text-gray-800 hover:text-brand-orange transition-colors"
          >
            <div className="flat-icon-primary mr-2 p-1.5 rounded-full">
              <Phone className="h-3 w-3" />
            </div>
            <span className="font-medium">(713) 555-1234</span>
          </Link>
          <Button
            onClick={openLeadForm}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white font-medium text-sm rounded-md px-4 py-2"
          >
            Free Estimate
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg py-4 px-4 flex flex-col space-y-3">
          <Link
            href="/services"
            className="text-sm text-gray-800 hover:text-brand-orange font-medium py-2 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/about"
            className="text-sm text-gray-800 hover:text-brand-orange font-medium py-2 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/gallery"
            className="text-sm text-gray-800 hover:text-brand-orange font-medium py-2 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Project Gallery
          </Link>
          <Link
            href="/contact"
            className="text-sm text-gray-800 hover:text-brand-orange font-medium py-2 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <div className="flex flex-col space-y-3 pt-3 border-t">
            <Link
              href="tel:+17135551234"
              className="flex items-center text-sm text-gray-800 hover:text-brand-orange transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flat-icon-primary mr-2 p-1.5 rounded-full">
                <Phone className="h-3 w-3" />
              </div>
              <span className="font-medium">(713) 555-1234</span>
            </Link>
            <Button
              onClick={() => {
                openLeadForm()
                setIsMobileMenuOpen(false)
              }}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white font-medium text-sm rounded-md w-full py-2"
            >
              Free Estimate
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
