"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#051E3D] text-white py-2 px-4 relative fixed">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm">
          <div className="flex gap-6">
            <a href="tel:720-594-0593" className="hover:text-[#60A5FA] transition-colors">
              720-594-0593
            </a>
            <a href="tel:678-267-9117" className="hover:text-[#60A5FA] transition-colors">
              678-267-9117
            </a>
          </div>
          <a href="mailto:info@nissihealthcare.com" className="hover:text-[#60A5FA] transition-colors">
            info@nissihealthcare.com
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-16 h-12 relative">
              <Image
                src="/images/nissi-logo-3.png"
                alt="Nissi Home Health Care"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            <div className="hidden md:flex flex-col text-primary">
              <span className="font-bold text-xl">Nissi Home</span>
              <span className="text-sm font-semibold">Home Health Care</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-[#051E3D] hover:text-[#285EAB] font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-[#051E3D] hover:text-[#285EAB] font-medium transition-colors">
              About Us
            </Link>
            <Link href="/services" className="text-[#051E3D] hover:text-[#285EAB] font-medium transition-colors">
              Services
            </Link>
            <Link
              href="/contact"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-[#051E3D] transition-colors font-medium"
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#051E3D]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[#E5E7EB] bg-white">
            <nav className="flex flex-col p-4 gap-4">
              <Link href="/" className="text-[#051E3D] hover:text-[#285EAB] font-medium transition-colors py-2">
                Home
              </Link>
              <Link href="/about" className="text-[#051E3D] hover:text-[#285EAB] font-medium transition-colors py-2">
                About Us
              </Link>
              <Link href="/services" className="text-[#051E3D] hover:text-[#285EAB] font-medium transition-colors py-2">
                Services
              </Link>
              <Link
                href="/contact"
                className="bg-[#285EAB] text-white px-6 py-2 rounded-lg hover:bg-[#051E3D] transition-colors font-medium text-center"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
