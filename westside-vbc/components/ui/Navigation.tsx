import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-primary/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        
        {/* Clicking this logo or text takes you back to the home page */}
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/west.png" 
            alt="Westside VBC Logo" 
            width={48} 
            height={48} 
            className="w-12 h-auto"
          />
          <span className="text-neutral font-extrabold text-2xl tracking-tighter hidden sm:block">
            WESTSIDE VBC
          </span>
        </Link>

        {/* Merch is placed exactly to the right of Events */}
        <div className="hidden lg:flex items-center gap-8 text-neutral/90 text-sm font-semibold tracking-wide">
          <Link href="/events" className="hover:text-accent transition-colors">Events</Link>
          <Link href="/merch" className="hover:text-accent transition-colors">Merch</Link>
          <Link href="/schedule" className="hover:text-accent transition-colors">Schedule</Link>
          <Link href="/gallery" className="hover:text-accent transition-colors">Gallery</Link>
          <Link href="/support" className="hover:text-accent transition-colors">Support Pages</Link>
          <Link href="/about" className="hover:text-accent transition-colors">About</Link>
        </div>

        <Link href="/contact" className="hidden lg:block bg-accent text-neutral px-8 py-3 rounded-full font-bold hover:brightness-110 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
          Join Westside
        </Link>

        <button className="lg:hidden text-neutral">
          <Menu className="w-7 h-7" />
        </button>
      </div>
    </nav>
  )
}