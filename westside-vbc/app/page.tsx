import Link from "next/link"
import Image from "next/image"
import { Menu, Trophy, GraduationCap, Medal, Globe } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col relative">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-primary/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-neutral font-extrabold text-2xl tracking-tighter">
            WESTSIDE VBC
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-neutral/90 text-sm font-semibold tracking-wide">
            <Link href="/events" className="hover:text-accent transition-colors">Events</Link>
            <Link href="/schedule" className="hover:text-accent transition-colors">Schedule</Link>
            <Link href="/gallery" className="hover:text-accent transition-colors">Gallery</Link>
            <Link href="/support" className="hover:text-accent transition-colors">Support Pages</Link>
            <Link href="/about" className="hover:text-accent transition-colors">About</Link>
          </div>
          
          <Link href="/register" className="hidden lg:block bg-accent text-neutral px-8 py-3 rounded-full font-bold hover:brightness-110 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
            Join Westside
          </Link>
          
          <button className="lg:hidden text-neutral">
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center pt-20 bg-primary overflow-hidden">
        
        {/* FIXED: Z-0 Image Container with Next/Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&q=80&w=2070"
            alt="Volleyball Action"
            fill
            priority
            quality={90}
            className="object-cover object-center opacity-50 grayscale-[30%]"
            sizes="100vw"
          />
        </div>

        {/* FIXED: Z-10 Gradient Overlay (Adjusted opacity to let image show) */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-background z-10"></div>
        
        {/* Content: Z-20 */}
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto flex flex-col items-center mt-10">
          <h1 className="text-6xl md:text-8xl font-black text-neutral mb-2 tracking-tighter leading-none uppercase drop-shadow-lg">
            Building Champions
          </h1>
          <h2 className="text-5xl md:text-7xl font-black text-accent mb-6 tracking-tighter leading-none uppercase drop-shadow-lg">
            On and Off the Court
          </h2>
          <p className="text-lg md:text-xl text-neutral/80 mb-10 max-w-2xl mx-auto font-medium">
            Elite volleyball training, competitive teams, and a community dedicated to athlete development
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <Link href="/register" className="bg-accent text-neutral font-bold px-10 py-4 rounded-full hover:brightness-110 transition-all text-lg w-full sm:w-auto text-center shadow-lg hover:-translate-y-1">
              Join Westside
            </Link>
            <Link href="/about" className="bg-transparent text-neutral border-2 border-neutral/40 px-10 py-4 rounded-full hover:bg-neutral hover:text-primary transition-all text-lg w-full sm:w-auto text-center font-bold">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Bento Grid Highlights */}
      <section className="relative z-30 px-6 max-w-7xl mx-auto pb-32 bg-background -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-neutral p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col items-start group">
            <div className="bg-background p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Trophy className="text-accent w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-primary mb-3 tracking-tight">Competitive Teams</h3>
            <p className="text-gray-600 font-medium leading-relaxed">Regional and national travel schedules for all age groups</p>
          </div>

          <div className="bg-neutral p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col items-start group">
            <div className="bg-background p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="text-accent w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-primary mb-3 tracking-tight">College Recruiting</h3>
            <p className="text-gray-600 font-medium leading-relaxed">Dedicated support and highlight videos for NCAA exposure</p>
          </div>

          <div className="bg-neutral p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col items-start group">
            <div className="bg-background p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Medal className="text-accent w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-primary mb-3 tracking-tight">Elite Coaching</h3>
            <p className="text-gray-600 font-medium leading-relaxed">Experienced staff focused on technical and tactical development</p>
          </div>

          <div className="bg-neutral p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col items-start group">
            <div className="bg-background p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Globe className="text-accent w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-primary mb-3 tracking-tight">National Play</h3>
            <p className="text-gray-600 font-medium leading-relaxed">Competition against top-tier organizations across the country</p>
          </div>

        </div>
      </section>
    </main>
  )
}