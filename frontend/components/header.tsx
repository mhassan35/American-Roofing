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
  const [isServicesOpen, setIsServicesOpen] = useState(false)
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
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-2" : "bg-white py-3",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
            <div className="text-lg font-bold">
              <span className="text-orange-500">American</span>
              <span className="text-gray-900">Roofing</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <div className="relative group">
            <button className="flex items-center text-gray-800 hover:text-orange-500 font-medium transition-colors">
              Services
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <Link
                href="/services/roof-replacement"
                className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
              >
                Roof Replacement
              </Link>
              <Link
                href="/services/roof-repair"
                className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
              >
                Roof Repair
              </Link>
              <Link
                href="/services/storm-damage"
                className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
              >
                Storm Damage
              </Link>
              <Link
                href="/services/inspections"
                className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
              >
                Free Inspections
              </Link>
              <Link
                href="/services/gutters"
                className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
              >
                Gutter Services
              </Link>
              <Link
                href="/services/insurance"
                className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
              >
                Insurance Claims
              </Link>
            </div>
          </div>
          <Link href="/about" className="text-gray-800 hover:text-orange-500 font-medium transition-colors">
            About Us
          </Link>
          <Link href="/gallery" className="text-gray-800 hover:text-orange-500 font-medium transition-colors">
            Project Gallery
          </Link>
          <Link href="/contact" className="text-gray-800 hover:text-orange-500 font-medium transition-colors">
            Contact
          </Link>
        </nav>

        {/* Desktop Right Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="tel:+17135551234"
            className="flex items-center text-gray-800 hover:text-orange-500 transition-colors"
          >
            <div className="bg-orange-500 p-2 rounded-full mr-3">
              <Phone className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">(713) 555-1234</span>
          </Link>
          <Button
            onClick={openLeadForm}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg"
          >
            Free Estimate
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-gray-800" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 overflow-hidden bg-white absolute left-0 right-0 shadow-lg px-4",
          isMobileMenuOpen ? "max-h-screen py-4" : "max-h-0 py-0",
        )}
      >
        {/* Services Dropdown */}
        <div>
          <button
            className="flex justify-between items-center w-full text-gray-800 font-medium py-3"
            onClick={() => setIsServicesOpen(!isServicesOpen)}
          >
            <span>Services</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", isServicesOpen && "rotate-180")} />
          </button>
          {isServicesOpen && (
            <div className="pl-4 space-y-1 transition-all">
              <Link
                href="/services/roof-replacement"
                className="block text-gray-700 py-2 hover:text-orange-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Roof Replacement
              </Link>
              <Link
                href="/services/roof-repair"
                className="block text-gray-700 py-2 hover:text-orange-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Roof Repair
              </Link>
              <Link
                href="/services/storm-damage"
                className="block text-gray-700 py-2 hover:text-orange-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Storm Damage
              </Link>
              <Link
                href="/services/inspections"
                className="block text-gray-700 py-2 hover:text-orange-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Free Inspections
              </Link>
              <Link
                href="/services/gutters"
                className="block text-gray-700 py-2 hover:text-orange-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gutter Services
              </Link>
              <Link
                href="/services/insurance"
                className="block text-gray-700 py-2 hover:text-orange-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Insurance Claims
              </Link>
            </div>
          )}
        </div>
        <Link
          href="/about"
          className="block text-gray-800 font-medium py-3 hover:text-orange-500"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          About Us
        </Link>
        <Link
          href="/gallery"
          className="block text-gray-800 font-medium py-3 hover:text-orange-500"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Project Gallery
        </Link>
        <Link
          href="/contact"
          className="block text-gray-800 font-medium py-3 hover:text-orange-500"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Contact
        </Link>

        {/* Phone + Estimate */}
        <div className="flex flex-col space-y-4 pt-4 border-t mt-4">
          <Link
            href="tel:+17135551234"
            className="flex items-center text-gray-800 hover:text-orange-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="bg-orange-500 p-2 rounded-full mr-3">
              <Phone className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">(713) 555-1234</span>
          </Link>
          <Button
            onClick={() => {
              openLeadForm()
              setIsMobileMenuOpen(false)
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold w-full py-3 rounded-lg"
          >
            Free Estimate
          </Button>
        </div>
      </div>
    </header>
  )
}
