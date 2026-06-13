"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: "Events", href: "/events" },
    { name: "Merch", href: "/merch" },
    { name: "Schedule", href: "/schedule" },
    { name: "Gallery", href: "/gallery" },
    { name: "Support Pages", href: "/support" },
  ]

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3 z-50">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image 
                src="/logo.png" 
                alt="Westside VBC Logo" 
                fill
                className="object-contain"
              />
            </div>
            <span className="text-[#00274c] font-black text-xl md:text-2xl tracking-tighter">
              WESTSIDE VBC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 text-[#00274c]/90 text-sm font-bold tracking-wide">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`hover:text-blue-600 transition-colors ${pathname === link.href ? 'text-blue-600' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link href="/contact" className="bg-[#00274c] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-900 transition-all shadow-md hover:-translate-y-0.5 inline-block">
              Join Westside
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-[#00274c] z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Navigation Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-40 lg:hidden transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col pt-24 pb-8 px-6 overflow-y-auto ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 text-xl font-black text-[#00274c]">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className={`border-b border-gray-100 pb-4 ${pathname === link.href ? 'text-blue-600' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/contact"
            className="bg-[#00274c] text-white text-center py-4 rounded-2xl mt-4 hover:bg-blue-900 transition-colors"
          >
            Join Westside
          </Link>
        </div>

        <div className="mt-auto pt-10">
          <p className="text-sm font-bold text-gray-400 mb-4">CONNECT</p>
          <a href="https://instagram.com/westside.vbc" target="_blank" rel="noreferrer" className="text-[#00274c] font-bold">
            @westside.vbc
          </a>
        </div>
      </div>
    </>
  )
}