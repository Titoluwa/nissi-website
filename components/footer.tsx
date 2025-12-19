import Link from "next/link"
import Image from "next/image"
import { FaXTwitter, FaFacebookF, FaLinkedin, FaInstagram } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg">Contact</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative">
              <Image
                src="/images/nissi-logo-3.png"
                alt="Nissi Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <span className="text-sm">Nissi Home Health Care</span>
          </div>
          <p className="text-sm text-gray-300">
            15290 E 6th Ave, Unit 210D
            <br />
            Aurora, CO 80011-0593
          </p>
          <div className="flex gap-4">
            <a href="tel:720-594-0593" className="text-sm hover:text-[#60A5FA] transition-colors">
              720-594-0593
            </a>
            <a href="tel:678-267-9117" className="text-sm hover:text-[#60A5FA] transition-colors">
              678-267-9117
            </a>
          </div>
          <a href="mailto:info@nissihomehealth.com" className="text-sm hover:text-[#60A5FA] transition-colors">
            info@nissihomehealth.com
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg">Quick Links</h3>
          <Link href="/" className="text-sm hover:text-[#60A5FA] transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm hover:text-[#60A5FA] transition-colors">
            About Us
          </Link>
          <Link href="/services" className="text-sm hover:text-[#60A5FA] transition-colors">
            Services
          </Link>
          <Link href="/contact" className="text-sm hover:text-[#60A5FA] transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">APPLY</h3>
          <div className="flex flex-col gap-3">
            <Link href="/apply/employment" target="_blank" className="bg-[#285EAB] w-3/6 flex justify-center text-white px-6 py-2 rounded-lg hover:bg-primary/60 transition-colors font-medium">
              Join Our Team
            </Link>
            <Link href="/apply/host-home" target="_blank" className="bg-[#285EAB] w-4/6 flex justify-center text-white px-6 py-2 rounded-lg hover:bg-primary/60 transition-colors font-medium">
              Host Home Provider
            </Link>
          </div>
          <h3 className="font-bold text-lg">Follow Us</h3>
          <p className="text-sm text-gray-300">Connect with us on social media for updates and health tips.</p>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-[#60A5FA] transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[#60A5FA] transition-colors">
              <FaLinkedin size={20}/>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[#60A5FA] transition-colors">
              <FaXTwitter size={20}/>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#60A5FA] transition-colors">
              <FaInstagram size={20}/>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
          <p>&copy; 2025 Nissi Home Health Care. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#60A5FA] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[#60A5FA] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
