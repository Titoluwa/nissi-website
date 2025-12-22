import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Heart } from "lucide-react"
import { SERVICES } from "@/lib/constant"
import { Button } from "@/components/ui/button"
import { REASONS } from "@/lib/constant"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
        <Image
          src="/assets/care-2.jpg"
          alt="Home health care professional with patient"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance w-3/4">
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
            Nissi Home Health Care is a trusted provider of compassionate, high-quality home healthcare services dedicated to 
            improving the well-being and independence of our clients. We are committed to delivering personalized care in the 
            comfort of our clients’ homes, ensuring dignity, safety, and peace of mind for both clients and their families.
          </p>
          <a href="/about" className="flex justify-center">
            <Button variant={"outline"} size={"lg"} className="border-primary text-primary hover:bg-primary">
              More About Us
            </Button>
          </a>
          <p className="text-lg text-[#6B7280] text-center grid grid-cols-2 gap-3">
            {/* <span className="text-justify">
              Our team consists of highly trained, certified, and background-checked caregivers who are passionate about providing dependable and respectful care. From personal assistance and companionship to specialized support, we tailor every care plan to meet the unique needs, goals, and preferences of each individual.
            </span>
            <span className="text-justify">
              At Nissi Home Health Care, we believe that quality care goes beyond medical support—it’s about building meaningful relationships, promoting independence, and enhancing quality of life. We work closely with families and healthcare professionals to ensure consistent, reliable, and compassionate care you can trust.
            </span>
            {/* We believe that everyone deserves professional healthcare in the comfort and safety of their own home. With
            years of experience and a commitment to excellence, we're here to support your health and wellness journey
            every step of the way. 
            <span className="col-span-full font-semibold">
              Your health. Your comfort. Your home.
            </span> */}
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 px-4 bg-[#F5F7FA]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#051E3D] mb-4 text-center">Our Services</h2>
          <p className="text-lg text-[#6B7280] text-center mb-16 max-w-2xl mx-auto">
            We offer personalized care, addressing unique individual needs through professional support and fostering community connections. 
          </p>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {SERVICES.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="bg-white rounded-lg p-6 border border-[#E5E7EB] hover:shadow-lg transition-shadow"
                >
                  <Icon className="w-12 h-12 text-[#285EAB] mb-4" />
                  <h3 className="text-xl font-bold text-[#051E3D] mb-3">{service.title}</h3>
                  <p className="text-[#6B7280]">{service.subtitle}</p>
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
            Why Choose Our Services
          </h2>
          <p className="text-lg text-[#6B7280] text-center mb-16 max-w-2xl mx-auto">
           At <span className="text-primary font-semibold">Nissi Home Health Care</span>, we are committed to delivering exceptional care built on professionalism, compassion, and trust.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {REASONS.map((reason) => (
              <div key={reason.title} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#285EAB]">
                    <Heart className="h-6 w-6 text-white fill-blue-600" />
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
          <p className="text-lg opacity-90">— Margaret P. <br /> <span className="text-sm">Family Member</span></p>
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

      {/* Join Our Team Section */}
      {/* <section className="py-16 md:py-24 px-4 bg-[#F5F7FA]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#051E3D] mb-6">Join Our Team</h2>
          <p className="text-lg text-[#6B7280] mb-8">
            Are you passionate about providing compassionate care? We're always looking for talented, dedicated
            individuals to join our growing team of healthcare professionals.
          </p>
          <Link href="/apply/employment" className="bg-[#285EAB] hover:bg-[#051E3D] text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block" >
            Apply To Join Our Team
          </Link>
        </div>
      </section> */}

      <Footer />
    </div>
  )
}
