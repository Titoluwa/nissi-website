import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SERVICES } from "@/lib/constant"

export default function Services() {

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <Image
          src="/assets/services-2.jpg"
          alt="Our comprehensive healthcare services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Comprehensive Healthcare Services</h1>
          <p className="text-lg md:text-xl max-w-2xl">Professional care tailored to your individual needs</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {SERVICES.map((service, index) => (
            <div key={service.title} className="mb-20">
              <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:grid-cols-2" : ""}`}>
                {/* Image on left for even indexes, right for odd */}
                <div className={`${index % 2 === 1 ? "order-2" : "order-1"}`}>
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "order-1" : "order-2"}`}>
                  <h2 className="text-3xl font-bold text-[#051E3D] mb-4">{service.title}</h2>
                  <p className="text-lg text-[#6B7280] mb-6">{service.description}</p>

                  <h3 className="text-lg font-semibold text-[#051E3D] mb-4">What's Included:</h3>
                  <ul className="space-y-2 mb-8">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3">
                        <span className="text-[#285EAB] font-bold flex-shrink-0">✓</span>
                        <span className="text-[#6B7280]">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="inline-block bg-[#285EAB] hover:bg-[#051E3D] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {index < SERVICES.length - 1 && <div className="my-16 border-b border-[#E5E7EB]"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* Why Our Services Section */}
      <section className="py-16 md:py-24 px-4 bg-[#F5F7FA]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#051E3D] mb-12 text-center">Why Choose Our Services</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Certified Professionals",
                description: "All our caregivers are licensed, certified, and thoroughly background-checked.",
              },
              {
                title: "Personalized Care Plans",
                description: "Each service is tailored to your specific health needs and lifestyle preferences.",
              },
              {
                title: "Flexible Scheduling",
                description: "Services available 24/7 to match your schedule and changing needs.",
              },
              {
                title: "Professional Support",
                description: "Ongoing supervision, training, and quality assurance for all services.",
              },
              {
                title: "Compassionate Care",
                description: "We treat every client with dignity, respect, and genuine compassion.",
              },
              {
                title: "Affordable Options",
                description: "We work with you to find care solutions that fit your budget and needs.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#285EAB] mb-3">{item.title}</h3>
                <p className="text-[#6B7280]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#051E3D] mb-6">Let's Discuss Your Care Needs</h2>
          <p className="text-lg text-[#6B7280] mb-8">
            Contact us today for a free consultation. We'll work with you to create a personalized care plan that meets
            your specific needs and goals.
          </p>
          <Link
            href="/contact"
            className="bg-[#285EAB] hover:bg-[#051E3D] text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            Schedule a Free Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
