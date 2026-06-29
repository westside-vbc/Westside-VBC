"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingBag, LogOut, User as UserIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import CartDrawer from "./CartDrawer"
import { motion, AnimatePresence } from "framer-motion"

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Events", href: "/events" },
    { name: "Merch", href: "/merch" },
    { name: "Schedule", href: "/schedule" },
    { name: "Gallery", href: "/gallery" },
    { name: "Support Us", href: "/support-us" },
  ]
  if (user) navLinks.push({ name: "My Orders", href: "/my-orders" })

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 transition-all duration-300 ${scrolled ? 'shadow-md py-2' : 'shadow-sm py-4'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          <Link 
            href="/" 
            className="flex items-center gap-3 z-50 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 md:w-12 md:h-12"
            >
              <Image 
                src="/logo.png" 
                alt="Westside VBC Logo" 
                fill
                className="object-contain"
              />
            </motion.div>
            <span className="font-black text-xl md:text-2xl tracking-tighter text-[#00274c] transition-colors">
              WESTSIDE VBC
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-2 text-sm font-bold tracking-wide">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname === link.href.replace(/\/$/, '')
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`relative px-4 py-2 transition-colors duration-300 rounded-full hover:bg-gray-100 ${isActive ? 'text-blue-600' : 'text-[#00274c]'}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-blue-50/50 border border-blue-100 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full transition-colors text-[#00274c] hover:bg-gray-100"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>
            
            {user ? (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="p-2 rounded-full transition-colors text-[#00274c] hover:bg-red-50"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            ) : (
              <Link 
                href="/login"
                className="p-2 rounded-full transition-colors text-[#00274c] hover:bg-gray-100"
                title="Login"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <UserIcon className="w-5 h-5" />
                </motion.div>
              </Link>
            )}

            <Link href="/contact">
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#00274c] text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg transition-all ml-2"
              >
                Join Westside
              </motion.div>
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-3 z-50">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#00274c]"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>

            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="text-[#00274c] p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}>
                {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden pointer-events-auto"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-40 lg:hidden shadow-2xl flex flex-col pt-24 pb-8 px-8 overflow-y-auto"
            >
              <motion.div 
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
                className="flex flex-col gap-6 text-2xl font-black text-[#00274c]"
              >
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || pathname === link.href.replace(/\/$/, '')
                  return (
                    <motion.div 
                      key={link.name}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: 20 }
                      }}
                    >
                      <Link 
                        href={link.href}
                        className={`block border-b border-gray-100 pb-4 ${isActive ? 'text-blue-600' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  )
                })}
                
                <motion.div 
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: 20 }
                  }}
                  className="border-t border-gray-100 pt-6 flex flex-col gap-4 mt-4"
                >
                  {user ? (
                    <button 
                      onClick={() => {
                        logout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="text-red-500 text-left font-bold text-xl"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link 
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-[#00274c] font-bold text-xl"
                    >
                      Login
                    </Link>
                  )}
                  
                  <Link 
                    href="/contact"
                    className="bg-[#00274c] text-white text-center py-4 rounded-2xl mt-4 hover:bg-blue-900 transition-colors text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Join Westside
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-auto pt-10"
              >
                <p className="text-sm font-bold text-gray-400 mb-4">CONNECT</p>
                <a href="https://instagram.com/westside.vbc" target="_blank" rel="noreferrer" className="text-[#00274c] font-bold">
                  @westside.vbc
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <CartDrawer />
    </>
  )
}