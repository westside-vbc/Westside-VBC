"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingBag, LogOut, User as UserIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import CartDrawer from "./CartDrawer"

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { totalItems, setIsCartOpen } = useCart()
  const { user, logout } = useAuth()

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
    // Trailing slash forces Next.js to load the page, not the image file
    { name: "Support Pages", href: "/support-us/" },
  ]

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <Link 
            href="/" 
            className="flex items-center gap-3 z-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
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

          <div className="hidden lg:flex items-center gap-8 text-[#00274c]/90 text-sm font-bold tracking-wide">
            {navLinks.map((link) => {
              // Highlight active link whether it has a trailing slash or not
              const isActive = pathname === link.href || pathname === link.href.replace(/\/$/, '')
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`hover:text-blue-600 transition-colors ${isActive ? 'text-blue-600' : ''}`}
                >
                  {link.name}
                </Link>
              )
            })}
            {user && (
              <Link 
                href="/my-orders" 
                className={`hover:text-blue-600 transition-colors ${pathname === '/my-orders' ? 'text-blue-600' : ''}`}
              >
                My Orders
              </Link>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#00274c] hover:text-blue-600 transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
            
            {user ? (
              <button 
                onClick={logout}
                className="p-2 text-[#00274c] hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            ) : (
              <Link 
                href="/login"
                className="p-2 text-[#00274c] hover:text-blue-600 transition-colors"
                title="Login"
              >
                <UserIcon className="w-5 h-5" />
              </Link>
            )}

            <Link href="/contact" className="bg-[#00274c] text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-900 transition-all shadow-md hover:-translate-y-0.5 ml-2">
              Join Westside
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-4 z-50">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#00274c]"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            <button 
              className="text-[#00274c] p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </nav>

      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-40 lg:hidden transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col pt-24 pb-8 px-6 overflow-y-auto ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 text-xl font-black text-[#00274c]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname === link.href.replace(/\/$/, '')
            return (
              <Link 
                key={link.name}
                href={link.href}
                className={`border-b border-gray-100 pb-4 ${isActive ? 'text-blue-600' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            )
          })}
          {user && (
            <Link 
              href="/my-orders"
              className={`border-b border-gray-100 pb-4 ${pathname === '/my-orders' ? 'text-blue-600' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Orders
            </Link>
          )}
          
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-4">
            {user ? (
              <button 
                onClick={() => {
                  logout()
                  setIsMobileMenuOpen(false)
                }}
                className="text-red-500 text-left font-bold"
              >
                Logout
              </button>
            ) : (
              <Link 
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#00274c] font-bold"
              >
                Login
              </Link>
            )}
            
            <Link 
              href="/contact"
              className="bg-[#00274c] text-white text-center py-4 rounded-2xl mt-2 hover:bg-blue-900 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Join Westside
            </Link>
          </div>
        </div>

        <div className="mt-auto pt-10">
          <p className="text-sm font-bold text-gray-400 mb-4">CONNECT</p>
          <a href="https://instagram.com/westside.vbc" target="_blank" rel="noreferrer" className="text-[#00274c] font-bold">
            @westside.vbc
          </a>
        </div>
      </div>
      
      <CartDrawer />
    </>
  )
}