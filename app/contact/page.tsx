import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-stone-100 to-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with Houston's most trusted roofing professionals. We're here to help with all your roofing
            needs.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Get Your Free Estimate</h2>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <Input
                          type="text"
                          placeholder="John"
                          className="w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <Input
                          type="text"
                          placeholder="Doe"
                          className="w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <Input
                        type="tel"
                        placeholder="(713) 555-1234"
                        className="w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Service Needed</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-orange-500 focus:ring-orange-500">
                        <option>Select a service</option>
                        <option>Roof Replacement</option>
                        <option>Roof Repair</option>
                        <option>Storm Damage</option>
                        <option>Gutter Projects</option>
                        <option>Inspection</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <Textarea
                        placeholder="Tell us about your roofing project..."
                        rows={4}
                        className="w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>

                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h2>
                <p className="text-gray-600 mb-8">
                  Ready to start your roofing project? Contact us today for a free estimate. Our experienced team is
                  here to help you with all your roofing needs.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-white shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-100 p-3 rounded-full">
                        <Phone className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Phone</h3>
                        <p className="text-gray-600">(713) 555-1234</p>
                        <p className="text-sm text-gray-500">Call us for immediate assistance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <Mail className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Email</h3>
                        <p className="text-gray-600">info@americanroofing.com</p>
                        <p className="text-sm text-gray-500">Send us your questions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-100 p-3 rounded-full">
                        <MapPin className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Address</h3>
                        <p className="text-gray-600">
                          123 Main Street
                          <br />
                          Houston, TX 77001
                        </p>
                        <p className="text-sm text-gray-500">Visit our office</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <Clock className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Business Hours</h3>
                        <p className="text-gray-600">
                          Mon - Fri: 8:00 AM - 6:00 PM
                          <br />
                          Sat: 9:00 AM - 4:00 PM
                          <br />
                          Sun: Emergency calls only
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-green-600">B</span>
              </div>
              <h3 className="font-semibold text-gray-800">BBB A+ Rating</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-orange-500">★</span>
              </div>
              <h3 className="font-semibold text-gray-800">4.9 (300+ Reviews)</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-green-600">G</span>
              </div>
              <h3 className="font-semibold text-gray-800">GAF Certified Installer</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-orange-500">🏠</span>
              </div>
              <h3 className="font-semibold text-gray-800">Local Houston-Owned</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
