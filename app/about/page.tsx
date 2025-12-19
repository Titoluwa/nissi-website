import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <Image
          src="/assets/team.jpg"
          alt="Our dedicated healthcare team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#051E3D] mb-8 text-center">Our Mission</h1>
          <p className="text-lg text-[#6B7280] text-center mb-6">
            At Nissi Home Health Care, our mission is to provide exceptional, compassionate healthcare services that
            empower individuals to maintain independence, dignity, and quality of life in their own homes. We believe
            that every person deserves professional care delivered with genuine care and respect.
          </p>
          <p className="text-lg text-[#6B7280] text-center">
            We are committed to building trust through transparent communication, certified professionals, and
            personalized care plans that honor each client's unique needs, values, and preferences.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 md:py-24 px-4 bg-[#F5F7FA]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#051E3D] mb-8 text-center">Our Vision</h2>
          <p className="text-lg text-[#6B7280] text-center">
            To be the most trusted home healthcare provider in Colorado, recognized for our commitment to excellence,
            innovation, and the unwavering compassion we bring to every patient interaction. We envision a healthcare
            system where quality care is accessible to all, delivered with respect, and always centered on the client's
            wellbeing.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#051E3D] mb-16 text-center">Our Core Values</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Compassion",
                description: "We deliver care with empathy and genuine concern for our clients and their families.",
              },
              {
                title: "Excellence",
                description: "We maintain the highest standards of professional care and continuous improvement.",
              },
              {
                title: "Integrity",
                description: "We conduct ourselves with honesty, transparency, and ethical responsibility.",
              },
              {
                title: "Respect",
                description: "We honor the dignity, autonomy, and individual preferences of every person we serve.",
              },
              {
                title: "Safety",
                description: "We prioritize the physical, emotional, and medical safety of our clients at all times.",
              },
              {
                title: "Reliability",
                description: "We are dependable, responsive, and committed to supporting our clients consistently.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="text-xl font-bold text-[#285EAB] mb-4">{value.title}</h3>
                <p className="text-[#6B7280]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 px-4 bg-[#F5F7FA]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#051E3D] mb-12 text-center">Our Leadership</h2>

          <div className="text-center">
            <div className="mb-8">
              <Image
                src="/professional-healthcare-manager-portrait.jpg"
                alt="Leadership team member"
                width={200}
                height={200}
                className="w-48 h-48 rounded-lg mx-auto object-cover mb-6"
              />
              <h3 className="text-2xl font-bold text-[#051E3D] mb-2">Dedicated Care Team</h3>
              <p className="text-[#6B7280] mb-4">
                Our leadership team brings decades of combined experience in healthcare administration, clinical care,
                and patient services. We are dedicated to setting the highest standards of care and ensuring every team
                member shares our commitment to excellence.
              </p>
              <p className="text-[#6B7280]">
                Our caregivers are carefully selected, thoroughly trained, and committed to delivering compassionate,
                professional care that makes a real difference in the lives of our clients and their families.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-bold text-[#285EAB] mb-6">
            "Nissi Home Health Care transformed our experience. Their team brought not just medical expertise, but
            genuine care and compassion into our home. We felt heard, respected, and well-cared for."
          </blockquote>
          <p className="text-lg text-[#6B7280]">— Robert M.<br /> <span className="text-[16px]">Patient</span> </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 bg-[#285EAB]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Care Community</h2>
          <p className="text-lg text-white mb-8 opacity-90">
            Experience the Nissi difference. Let us help you or your loved ones live independently and comfortably.
          </p>
          <Link
            href="/contact"
            className="bg-white hover:bg-gray-100 text-[#285EAB] px-8 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
