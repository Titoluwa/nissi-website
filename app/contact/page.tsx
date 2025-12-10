"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd send this to a server/API
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setFormData({ name: "", email: "", phone: "", message: "" })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <Image
          src="/professional-medical-handshake-consultation.jpg"
          alt="Contact us for healthcare services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch With Us</h1>
          <p className="text-lg md:text-xl">We're here to answer your questions and discuss your healthcare needs</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div>
            <h2 className="text-3xl font-bold text-[#051E3D] mb-12">Contact Information</h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-[#285EAB] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-[#051E3D] mb-1">Address</h3>
                  <p className="text-[#6B7280]">
                    15290 E 6th Ave, Unit 210D
                    <br />
                    Aurora, CO 80011-0593
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-[#285EAB] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-[#051E3D] mb-1">Phone</h3>
                  <p className="text-[#6B7280]">
                    <a href="tel:720-594-0593" className="hover:text-[#285EAB] transition-colors">
                      720-594-0593
                    </a>
                    <br />
                    <a href="tel:678-267-9117" className="hover:text-[#285EAB] transition-colors">
                      678-267-9117
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-[#285EAB] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-[#051E3D] mb-1">Email</h3>
                  <p className="text-[#6B7280]">
                    <a href="mailto:info@nissihealthcare.com" className="hover:text-[#285EAB] transition-colors">
                      info@nissihealthcare.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-[#285EAB] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-[#051E3D] mb-1">Hours</h3>
                  <p className="text-[#6B7280]">
                    Available 24/7 for emergency care
                    <br />
                    Office Hours: 8:00 AM - 6:00 PM, Monday-Friday
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#F5F7FA] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#051E3D] mb-6">Send us a Message</h2>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <p className="text-green-800 font-medium mb-2">Thank you for reaching out!</p>
                <p className="text-green-700">We've received your message and will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#051E3D] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] bg-white text-[#051E3D] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#285EAB]"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#051E3D] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] bg-white text-[#051E3D] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#285EAB]"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#051E3D] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] bg-white text-[#051E3D] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#285EAB]"
                    placeholder="(720) 594-0593"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#051E3D] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg border border-[#E5E7EB] bg-white text-[#051E3D] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#285EAB]"
                    placeholder="Tell us about your healthcare needs..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#285EAB] hover:bg-[#051E3D] text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 px-4 bg-[#F5F7FA]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#051E3D] mb-12 text-center">Find Us</h2>
          <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-[#E5E7EB]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.8721885123186!2d-104.6647!3d39.7278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c6e2e5e5e5e5d%3A0x5e5e5e5e5e5e5e5e!2s15290%20E%206th%20Ave%2C%20Aurora%2C%20CO%2080011!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#051E3D] mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                question: "How do I schedule a consultation?",
                answer:
                  "Simply fill out our contact form or call us directly at 720-594-0593. We typically respond within 24 hours.",
              },
              {
                question: "Do you accept insurance?",
                answer: "We work with most major insurance plans. Please contact us to verify your specific coverage.",
              },
              {
                question: "Are your caregivers background-checked?",
                answer:
                  "Yes, all our caregivers undergo thorough background checks and are fully certified and licensed.",
              },
              {
                question: "Can services be customized?",
                answer: "Absolutely. We develop personalized care plans based on your specific needs and goals.",
              },
            ].map((faq) => (
              <div key={faq.question} className="bg-[#F5F7FA] rounded-lg p-6">
                <h3 className="font-bold text-[#051E3D] mb-2 text-lg">{faq.question}</h3>
                <p className="text-[#6B7280]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
