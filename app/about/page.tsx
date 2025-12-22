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
        <Image  src="/elderly-person-receiving-home-care-smiling.jpg" alt="Our dedicated healthcare team" fill className="object-cover" priority/>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 grid grid-cols-1 sm:grid-cols-2 capitalize">
            <span>Your health. </span>
            <span>Your comfort.</span>
            <span className="col-span-full text-blue-100">Your home.</span>
          </h1>
        </div>
      </section>
      {/* AbOUT us */}
      <section className="py-16 md:py-24 px-4 bg-primary/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center ">Nissi Home</h2>
          <p className="text-lg text-secondary text-center mb-3">
            Nissi Home Health Care is a trusted provider of compassionate, high-quality home healthcare services dedicated to 
            improving the well-being and independence of our clients. We are committed to delivering personalized care in the 
            comfort of our clients’ homes, ensuring dignity, safety, and peace of mind for both clients and their families.
          </p>
          <p className="text-lg text-secondary  text-center grid grid-cols-1 gap-3">
            <span className="">
              Our team consists of highly trained, certified, and background-checked caregivers who are passionate about providing dependable and respectful care. From personal assistance and companionship to specialized support, we tailor every care plan to meet the unique needs, goals, and preferences of each individual.
            </span>
            <span className="">
              At Nissi Home Health Care, we believe that quality care goes beyond medical support—it’s about building meaningful relationships, promoting independence, and enhancing quality of life. We work closely with families and healthcare professionals to ensure consistent, reliable, and compassionate care you can trust.
            </span>
            <span className="col-span-full font-semibold uppercase mt-8">
              Your health. Your comfort. Your home.
            </span>
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#051E3D] mb-8 text-center">Our Mission</h1>
          <p className="text-lg text-[#6B7280] text-center mb-6">
            Our mission at Nissi Home Health Care is to provide compassionate, reliable, and high-quality home healthcare 
            services that promote independence, dignity, and improved quality of life for every client we serve. 
            We are committed to delivering personalized care that meets the physical, emotional, and daily living 
            needs of individuals in the comfort of their own homes.
          </p>
          {/* <p className="text-lg text-[#6B7280] text-center">
            We are committed to building trust through transparent communication, certified professionals, and
            personalized care plans that honor each client's unique needs, values, and preferences.
          </p> */}
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 md:py-24 px-4 bg-[#F5F7FA]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#051E3D] mb-8 text-center">Our Vision</h2>
          <p className="text-lg text-[#6B7280] text-center">
            {/* To be the most trusted home healthcare provider in Colorado, recognized for our commitment to excellence,
            innovation, and the unwavering compassion we bring to every patient interaction. We envision a healthcare
            system where quality care is accessible to all, delivered with respect, and always centered on the client's
            wellbeing. */}
            Our vision is to be a leading home health care provider recognized for excellence, integrity, and compassion. 
            We strive to set the standard for trusted home care by fostering meaningful relationships, empowering our 
            clients, and supporting families with dependable and professional care solutions.
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
                description: "We treat every client with kindness, empathy, and respect, ensuring they feel valued and always supported.",
              },
              {
                title: "Quality Care",
                description: "We are committed to delivering safe, effective, and personalized care through trained, certified, and background-checked caregivers.",
              },
              {
                title: "Integrity",
                description: "We uphold honesty, transparency, and ethical practices in all our interactions with clients, families, and partners.",
              },
              {
                title: "Respect & Dignity",
                description: "We honor each client’s individuality, preferences, and independence, providing care that preserves dignity.",
              },
              {
                title: "Reliability",
                description: "We provide consistent, dependable services families can trust, when they need it most.",
              },
              {
                title: "Collaboration",
                description: "We work closely with clients, families, and healthcare professionals to ensure coordinated and comprehensive care.",
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
                // src="/professional-healthcare-manager-portrait.jpg"
                src="diverse-healthcare-team-outdoor-smiling.jpg"
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
