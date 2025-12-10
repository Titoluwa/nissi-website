import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Heart, Shield, Users, ClipboardList, Smile } from "lucide-react"

export default function Home() {
  const services = [
    {
      icon: Heart,
      title: "Skilled Nursing",
      description: "Professional nursing care including wound care, medication management, and post-operative support.",
    },
    {
      icon: Users,
      title: "Physical Therapy",
      description: "Personalized rehabilitation programs to improve mobility and strength in the comfort of your home.",
    },
    {
      icon: Shield,
      title: "Home Health Aides",
      description: "Compassionate assistance with daily living activities and personal care needs.",
    },
    {
      icon: Smile,
      title: "Personal Care",
      description: "Support with bathing, dressing, grooming, and other daily personal hygiene tasks.",
    },
    {
      icon: ClipboardList,
      title: "Companionship Services",
      description: "Meaningful social interaction and emotional support to combat isolation.",
    },
    {
      icon: Shield,
      title: "Specialized Care",
      description: "Customized care plans tailored to your specific medical and personal needs.",
    },
  ]

  const reasons = [
    {
      title: "Compassionate Professionals",
      description:
        "Our caregivers are trained, certified, and dedicated to providing the highest quality care with genuine compassion.",
    },
    {
      title: "Personalized Care Plans",
      description: "We develop individualized care strategies that respect your preferences and goals.",
    },
    {
      title: "Safety and Trust",
      description:
        "Background-checked staff, secure processes, and transparent communication ensure your peace of mind.",
    },
    {
      title: "Flexibility and Support",
      description: "Available when you need us, with flexible scheduling and responsive customer service.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
        <Image
          src="/elderly-person-receiving-home-care-smiling.jpg"
          alt="Home health care professional with patient"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
            Compassionate Home Healthcare You Can Trust
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl">
            Professional, personalized care for you and your loved ones. Available when you need us most.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-[#285EAB] hover:bg-[#051E3D] text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Book a Consultation
            </Link>
            <Link
              href="/services"
              className="bg-white hover:bg-gray-100 text-[#051E3D] px-8 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#051E3D] mb-8 text-center">Who We Are</h2>
          <p className="text-lg text-[#6B7280] text-center mb-6">
            Nissi Home Health Care is dedicated to providing exceptional, compassionate in-home healthcare services to
            our community. Our team of certified professionals is committed to enhancing the quality of life for our
            clients through personalized care plans that respect individual needs and preferences.
          </p>
          <p className="text-lg text-[#6B7280] text-center">
            We believe that everyone deserves professional healthcare in the comfort and safety of their own home. With
            years of experience and a commitment to excellence, we're here to support your health and wellness journey
            every step of the way.
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 px-4 bg-[#F5F7FA]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#051E3D] mb-4 text-center">Our Services</h2>
          <p className="text-lg text-[#6B7280] text-center mb-16 max-w-2xl mx-auto">
            Comprehensive healthcare solutions tailored to your needs
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="bg-white rounded-lg p-6 border border-[#E5E7EB] hover:shadow-lg transition-shadow"
                >
                  <Icon className="w-12 h-12 text-[#285EAB] mb-4" />
                  <h3 className="text-xl font-bold text-[#051E3D] mb-3">{service.title}</h3>
                  <p className="text-[#6B7280]">{service.description}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="bg-[#285EAB] hover:bg-[#051E3D] text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#051E3D] mb-4 text-center">
            Why Choose Nissi Home Health Care
          </h2>
          <p className="text-lg text-[#6B7280] text-center mb-16 max-w-2xl mx-auto">
            We're committed to excellence in every aspect of care
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {reasons.map((reason) => (
              <div key={reason.title} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#285EAB]">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#051E3D] mb-2">{reason.title}</h3>
                  <p className="text-[#6B7280]">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-24 px-4 bg-[#285EAB] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-bold mb-6">
            "The care and compassion Nissi provided to my mother was exceptional. Their team treated her with dignity
            and respect while providing excellent professional care. I couldn't be more grateful."
          </blockquote>
          <p className="text-lg opacity-90">— Margaret P., Family Member</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#051E3D] mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-[#6B7280] mb-8">
            Contact us today to discuss your healthcare needs and schedule a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#285EAB] hover:bg-[#051E3D] text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Contact Us Now
            </Link>
            <a
              href="tel:720-594-0593"
              className="bg-[#F5F7FA] hover:bg-[#E5E7EB] text-[#051E3D] px-8 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Call: 720-594-0593
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
