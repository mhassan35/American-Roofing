import { Shield, Users, Award, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-stone-100 to-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">About American Roofing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Houston's most trusted roofing professionals with over 15 years of experience serving homeowners throughout
            the greater Houston area.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2008, American Roofing has been serving the Houston community with integrity, quality
                craftsmanship, and exceptional customer service. What started as a small family business has grown into
                one of Houston's most trusted roofing companies.
              </p>
              <p className="text-gray-600 mb-6">
                We understand that your roof is one of your home's most important investments. That's why we're
                committed to providing superior roofing solutions using only the highest quality materials and proven
                installation techniques.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Licensed & Insured</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">BBB A+ Rating</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">GAF Certified Installer</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Trusted by 3,000+ Homeowners</span>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="American Roofing team at work"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose American Roofing?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to excellence in every project, from small repairs to complete roof replacements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality Guarantee</h3>
                <p className="text-gray-600">
                  We stand behind our work with comprehensive warranties and use only premium materials.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Expert Team</h3>
                <p className="text-gray-600">
                  Our certified professionals have years of experience and ongoing training.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Award Winning</h3>
                <p className="text-gray-600">
                  Recognized for excellence with industry awards and customer satisfaction.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Fast Response</h3>
                <p className="text-gray-600">
                  Quick response times for estimates and emergency repairs when you need us most.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive roofing solutions for all your needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Roof Replacement</h3>
                <p className="text-gray-600 mb-4">
                  Complete roof replacement with premium materials and expert installation.
                </p>
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Roof Repair</h3>
                <p className="text-gray-600 mb-4">
                  Professional roof repairs to fix leaks, damage, and extend your roof's life.
                </p>
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Storm Damage</h3>
                <p className="text-gray-600 mb-4">Emergency storm damage repair and insurance claim assistance.</p>
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Gutter Services</h3>
                <p className="text-gray-600 mb-4">Gutter installation, repair, and maintenance to protect your home.</p>
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Roof Inspection</h3>
                <p className="text-gray-600 mb-4">Thorough roof inspections to identify potential issues early.</p>
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Commercial Roofing</h3>
                <p className="text-gray-600 mb-4">Professional commercial roofing solutions for businesses.</p>
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Contact us today for your free estimate and see why thousands of Houston homeowners trust American Roofing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Get Free Estimate
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-500 px-8 py-3 text-lg font-semibold"
            >
              Call (713) 555-1234
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
