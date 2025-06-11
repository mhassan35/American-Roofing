"use client"

import { Shield, Users, Award, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface AboutContentProps {
  content?: any
}

export default function AboutContent({ content }: AboutContentProps) {
  const settings = content || {}

  // Default values with safe fallbacks
  const hero = settings.hero || {
    title: "About American Roofing",
    subtitle:
      "Houston's most trusted roofing professionals with over 15 years of experience serving homeowners throughout the greater Houston area.",
  }

  const story = settings.story || {
    title: "Our Story",
    content:
      "Founded in 2008, American Roofing has been serving the Houston community with integrity, quality craftsmanship, and exceptional customer service. What started as a small family business has grown into one of Houston's most trusted roofing companies.\n\nWe understand that your roof is one of your home's most important investments. That's why we're committed to providing superior roofing solutions using only the highest quality materials and proven installation techniques.",
    image: "/placeholder.svg?height=400&width=600",
  }

  const mission = settings.mission || {
    title: "Our Mission",
    content:
      "Our mission is to protect Houston homes and families by providing exceptional roofing services with unmatched quality, reliability, and customer satisfaction.",
  }

  const credentials = settings.credentials || [
    "Licensed & Insured",
    "BBB A+ Rating",
    "GAF Certified Installer",
    "Trusted by 3,000+ Homeowners",
  ]

  const whyChooseUs = settings.whyChooseUs || {
    title: "Why Choose American Roofing?",
    subtitle: "We're committed to excellence in every project, from small repairs to complete roof replacements.",
    features: [
      {
        icon: Shield,
        title: "Quality Guarantee",
        description: "We stand behind our work with comprehensive warranties and use only premium materials.",
        color: "orange",
      },
      {
        icon: Users,
        title: "Expert Team",
        description: "Our certified professionals have years of experience and ongoing training.",
        color: "green",
      },
      {
        icon: Award,
        title: "Award Winning",
        description: "Recognized for excellence with industry awards and customer satisfaction.",
        color: "orange",
      },
      {
        icon: Clock,
        title: "Fast Response",
        description: "Quick response times for estimates and emergency repairs when you need us most.",
        color: "green",
      },
    ],
  }

  const services = settings.services || {
    title: "Our Services",
    subtitle: "Comprehensive roofing solutions for all your needs",
    serviceList: [
      {
        title: "Roof Replacement",
        description: "Complete roof replacement with premium materials and expert installation.",
      },
      {
        title: "Roof Repair",
        description: "Professional roof repairs to fix leaks, damage, and extend your roof's life.",
      },
      {
        title: "Storm Damage",
        description: "Emergency storm damage repair and insurance claim assistance.",
      },
      {
        title: "Gutter Services",
        description: "Gutter installation, repair, and maintenance to protect your home.",
      },
      {
        title: "Roof Inspection",
        description: "Thorough roof inspections to identify potential issues early.",
      },
      {
        title: "Commercial Roofing",
        description: "Professional commercial roofing solutions for businesses.",
      },
    ],
  }

  const cta = settings.cta || {
    title: "Ready to Get Started?",
    subtitle:
      "Contact us today for your free estimate and see why thousands of Houston homeowners trust American Roofing.",
    primaryButton: "Get Free Estimate",
    secondaryButton: "Call (713) 555-1234",
  }

  return (
    <div>
      {/* Hero Section */}
      {hero && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">
              {hero.title || "About American Roofing"}
            </h1>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              {hero.subtitle || "Houston's most trusted roofing professionals"}
            </p>
          </div>
        </section>
      )}

      {/* Our Story */}
      {story && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">{story.title || "Our Story"}</h2>
                <div className="text-gray-600 mb-3 whitespace-pre-line">
                  {story.content || "Founded in 2008, American Roofing has been serving the Houston community..."}
                </div>

                {mission?.title && (
                  <>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800 mt-6">{mission.title}</h3>
                    <p className="text-gray-600 mb-6">{mission.content}</p>
                  </>
                )}

                {credentials && credentials.length > 0 && (
                  <div className="space-y-4">
                    {credentials.map((credential: string, index: number) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">{credential}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <Image
                  src={story.image || "/placeholder.svg?height=400&width=600"}
                  alt="American Roofing team at work"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      {whyChooseUs && whyChooseUs.features && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">
                {whyChooseUs.title || "Why Choose Us?"}
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                {whyChooseUs.subtitle || "We're committed to excellence in every project"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.features.map((feature: any, index: number) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div
                      className={`${
                        feature.color === "orange" ? "bg-orange-100" : "bg-green-100"
                      } w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <feature.icon
                        className={`w-8 h-8 ${feature.color === "orange" ? "text-orange-500" : "text-green-600"}`}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Services */}
      {services && services.serviceList && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">
                {services.title || "Our Services"}
              </h2>
              <p className="text-base text-gray-600">{services.subtitle || "Comprehensive roofing solutions"}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.serviceList.map((service: any, index: number) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Button
                      variant="outline"
                      className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      {cta && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">
              {cta.title || "Ready to Get Started?"}
            </h2>
            <p className="text-base text-gray-600 mb-4 max-w-2xl mx-auto">
              {cta.subtitle || "Contact us today for your free estimate"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-orange-500 px-8 py-3 text-lg font-semibold">
                {cta.primaryButton || "Get Free Estimate"}
              </Button>
              <Button
                variant="outline"
                className="text-gray-600 bg-gray-100 hover:bg-gray-200 px-8 py-3 text-lg font-semibold"
              >
                {cta.secondaryButton || "Call (713) 555-1234"}
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
