"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react"
import { useLeadFormStore } from "@/lib/store"

export default function Footer() {
  const { openLeadForm } = useLeadFormStore()

  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div>
            <div className="h-8 w-32 bg-transparent mb-4">
              <div className="text-lg font-bold">
                <span className="text-orange-500">American</span>
                <span className="text-white">Roofing</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Houston's most trusted roofing professionals, serving the community with quality craftsmanship since 2005.
            </p>
            <div className="flex space-x-3">
              <Link href="https://facebook.com" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="https://instagram.com" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="https://youtube.com" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/roof-replacement"
                  className="text-xs text-gray-400 hover:text-orange-500 transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-1" />
                  Roof Replacement
                </Link>
              </li>
              <li>
                <Link
                  href="/services/roof-repair"
                  className="text-xs text-gray-400 hover:text-orange-500 transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-1" />
                  Roof Repair
                </Link>
              </li>
              <li>
                <Link
                  href="/services/storm-damage"
                  className="text-xs text-gray-400 hover:text-orange-500 transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-1" />
                  Storm Damage Restoration
                </Link>
              </li>
              <li>
                <Link
                  href="/services/inspections"
                  className="text-xs text-gray-400 hover:text-orange-500 transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-1" />
                  Free Inspections
                </Link>
              </li>
              <li>
                <Link
                  href="/services/gutters"
                  className="text-xs text-gray-400 hover:text-orange-500 transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-1" />
                  Gutter Services
                </Link>
              </li>
              <li>
                <Link
                  href="/services/insurance"
                  className="text-xs text-gray-400 hover:text-orange-500 transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-1" />
                  Insurance Claim Help
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-xs text-gray-400 hover:text-orange-500 transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-1" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-xs text-gray-400 hover:text-orange-500 transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-1" />
                  Project Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-xs text-gray-400 hover:text-orange-500 transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-1" />
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-xs text-gray-400 hover:text-orange-500 transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-1" />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-xs text-gray-400 hover:text-orange-500 transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-1" />
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-xs text-gray-400 hover:text-orange-500 transition-colors flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-1" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-gray-400">
                  1234 Roofing Way
                  <br />
                  Houston, TX 77001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-orange-500" />
                <Link href="tel:+17135551234" className="text-xs text-gray-400 hover:text-orange-500 transition-colors">
                  (713) 555-1234
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-orange-500" />
                <Link
                  href="mailto:info@americanroofinghouston.com"
                  className="text-xs text-gray-400 hover:text-orange-500 transition-colors"
                >
                  info@americanroofinghouston.com
                </Link>
              </li>
            </ul>
            <div className="mt-4">
              <Button
                onClick={openLeadForm}
                className="bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-md py-2 px-4"
              >
                Get a Free Estimate
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500 mb-3 md:mb-0">
              © {new Date().getFullYear()} American Roofing. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link href="/privacy" className="text-xs text-gray-500 hover:text-orange-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-gray-500 hover:text-orange-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-xs text-gray-500 hover:text-orange-500 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
