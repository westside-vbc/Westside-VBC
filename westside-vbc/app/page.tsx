import Link from "next/link"
import Image from "next/image"
import { User, Award } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col w-full">
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
        <Image
          src="/team-photo.jpg"
          alt="Westside VBC Team"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="relative z-10 flex flex-col items-center mt-16">
          <h1 className="text-white font-black text-7xl md:text-[130px] leading-none tracking-tight">
            WESTSIDE
          </h1>
          <div className="flex items-center justify-center w-full mt-2 md:mt-4">
            <div className="h-1 bg-white w-20 md:w-48"></div>
            <h2 className="text-white font-bold text-3xl md:text-5xl tracking-widest px-4 md:px-8">
              VBC
            </h2>
            <div className="h-1 bg-white w-20 md:w-48"></div>
          </div>
        </div>
      </section>

      <section className="bg-[#00274c] text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What we do</h2>
          <p className="text-lg md:text-xl text-white/90 mb-20 font-light">
            We provide professional, organized spaces to play, learn, and compete.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 md:w-20 md:h-20 mb-6 rounded-full overflow-hidden shadow-lg group cursor-pointer hover:scale-105 transition-all duration-300">
                <Image src="/insta.png" alt="Instagram Followers" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-4xl font-normal mb-2">4750+</h3>
              <p className="text-sm font-light tracking-wide text-white/80">Followers on ig</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-6">
                <User className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
              <h3 className="text-4xl font-normal mb-2">250+</h3>
              <p className="text-sm font-light tracking-wide text-white/80">Members</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-6">
                <Award className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
              <h3 className="text-4xl font-normal mb-2">50+</h3>
              <p className="text-sm font-light tracking-wide text-white/80">Pro Athletes & Crew</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e6e6e6] py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16">
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            <div className="relative aspect-square w-full overflow-hidden bg-gray-300">
              <Image src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=800" alt="Merch" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 text-center">
                <h4 className="text-white font-black text-xl md:text-3xl leading-none">WESTSIDE<br/>MERCH</h4>
              </div>
            </div>
            <div className="relative aspect-square w-full overflow-hidden bg-gray-300">
              <Image src="https://images.unsplash.com/photo-1593786481079-065a3cb8cb27?auto=format&fit=crop&q=80&w=800" alt="Tips" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center">
                <h4 className="text-white font-bold text-sm md:text-lg leading-tight mb-2">TIPS BIAR GAK JADI BEBAN<br/>PAS MAIN VOLI</h4>
              </div>
            </div>
            <div className="relative aspect-square w-full overflow-hidden bg-gray-300">
              <Image src="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800" alt="LNYB" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-4 text-center">
                <h4 className="text-white font-black text-4xl tracking-tighter drop-shadow-md">LNYB</h4>
              </div>
            </div>
            <div className="relative aspect-square w-full overflow-hidden bg-gray-300">
              <Image src="https://images.unsplash.com/photo-1512719994953-eabf50895df7?auto=format&fit=crop&q=80&w=800" alt="Wanna Rock" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4 text-center">
                <h4 className="text-white font-black text-xl md:text-2xl">WANNA ROCK</h4>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block w-0.5 h-72 bg-[#00274c]"></div>
          
          <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center">
            <h2 className="text-5xl md:text-6xl font-black text-[#00274c] mb-4">Beyond the Court</h2>
            <p className="text-2xl text-[#00274c] mb-6">Follow our journey on Instagram</p>
            <a href="https://instagram.com/westside.vbc" target="_blank" rel="noreferrer" className="text-xl text-[#00274c] hover:underline font-medium">
              @westside.vbc
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#f8f9fa]">
        <h2 className="text-5xl md:text-6xl font-black text-[#00274c] text-center mb-20 tracking-tight">Our Programs</h2>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
          
          <div className="flex flex-col items-center text-center">
            <h3 className="text-3xl font-black text-[#00274c] mb-2">Private Coaching</h3>
            <p className="text-[#00274c]/80 mb-6 font-medium text-lg">Skill-building with professional<br/>guidance</p>
            <div className="relative w-full aspect-4/5 bg-gray-200 overflow-hidden shadow-md">
              <Image src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=800" alt="Private Coaching" fill className="object-cover" />
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <h3 className="text-3xl font-black text-[#00274c] mb-2">1 on 1 Coaching</h3>
            <p className="text-[#00274c]/80 mb-6 font-medium text-lg">One-on-one personal training.</p>
            <div className="relative w-full aspect-4/5 bg-gray-200 overflow-hidden shadow-md">
              <Image src="https://images.unsplash.com/photo-1593786481079-065a3cb8cb27?auto=format&fit=crop&q=80&w=800" alt="1 on 1 Coaching" fill className="object-cover" />
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <h3 className="text-3xl font-black text-[#00274c] mb-2">Fun Match</h3>
            <p className="text-[#00274c]/80 mb-6 font-medium text-lg">Casual play for networking and<br/>enjoyment.</p>
            <div className="relative w-full aspect-4/5 bg-gray-200 overflow-hidden shadow-md">
              <Image src="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800" alt="Fun Match" fill className="object-cover" />
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <h3 className="text-3xl font-black text-[#00274c] mb-2">Competitive Match</h3>
            <p className="text-[#00274c]/80 mb-6 font-medium text-lg">High-intensity games for<br/>experienced players.</p>
            <div className="relative w-full aspect-4/5 bg-gray-200 overflow-hidden shadow-md">
              <Image src="https://images.unsplash.com/photo-1512719994953-eabf50895df7?auto=format&fit=crop&q=80&w=800" alt="Competitive Match" fill className="object-cover" />
            </div>
          </div>

        </div>
      </section>

      <section className="relative w-full h-[60vh] flex items-center justify-center bg-black">
        <Image 
          src="https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&q=80&w=2070" 
          alt="Support Us" 
          fill 
          className="object-cover opacity-30" 
        />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">SUPPORT US!</h2>
          <p className="text-xl md:text-2xl text-white/90 mb-10 font-light leading-relaxed">
            Supporting Westside Volleyball is more than just sponsoring a sports program, it's investing in futures
          </p>
          <Link 
            href="/support" 
            className="bg-[#00274c] text-white px-10 py-3 text-xl hover:bg-blue-900 transition-colors"
          >
            Click Here
          </Link>
        </div>
      </section>
    </main>
  )
}