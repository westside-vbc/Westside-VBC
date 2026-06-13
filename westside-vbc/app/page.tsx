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
              <div className="bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-3xl p-4 mb-6 shadow-lg">
                <Image
                    src="/insta.png"
                    alt="insta"
                    fill
                    priority
                    className="object-cover opacity-40"
                 />
              </div>
              <h3 className="text-4xl font-normal mb-2">4750+</h3>
              <p className="text-sm font-light tracking-wide text-white/80">Followers on ig</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <User className="w-20 h-20 text-white" fill="white" />
              </div>
              <h3 className="text-4xl font-normal mb-2">250+</h3>
              <p className="text-sm font-light tracking-wide text-white/80">Members</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <Award className="w-20 h-20 text-white" />
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

      <section className="py-24 bg-white text-center">
        <h2 className="text-3xl font-black text-[#00274c] mb-12 uppercase tracking-tight">Official Partners</h2>
        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 mb-24 px-6">
          <div className="text-center flex flex-col items-center">
            <span className="text-5xl font-black text-teal-600 tracking-tighter mb-2">MDC</span>
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-6xl font-black">U</span>
              <div className="flex flex-col gap-1.5">
                <div className="w-8 h-2 bg-green-500 rounded-full"></div>
                <div className="w-8 h-2 bg-green-500 rounded-full"></div>
                <div className="w-8 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <span className="text-sm font-bold tracking-widest uppercase">Production</span>
          </div>
        </div>
        
        <h2 className="text-3xl font-black text-[#00274c] mb-12 uppercase tracking-tight">Sponsors</h2>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 max-w-5xl mx-auto px-6 opacity-90">
          <div className="font-bold text-xl flex items-center gap-2">
            <div className="w-10 h-10 border-2 border-black rotate-45 flex items-center justify-center">
              <span className="-rotate-45 text-xs">W</span>
            </div>
            <div className="flex flex-col text-left leading-none">
              <span>ELKEN</span>
              <span>COFFEE</span>
            </div>
          </div>
          <div className="font-black text-3xl flex flex-col leading-none">
            <span>TOKO 12</span>
            <span className="text-lg">BLITAR</span>
          </div>
          <div className="font-script text-4xl text-blue-600 border-2 border-blue-600 rounded-full w-24 h-24 flex items-center justify-center rotate-[-10deg]">
            Sinde
          </div>
          <div className="font-bold text-xl text-red-600 flex flex-col items-center">
            <div className="w-10 h-10 bg-red-600 rounded-full mb-1"></div>
            ROSE BRAND
          </div>
          <div className="font-black text-3xl text-red-800 flex flex-col items-center">
            shoovior
            <span className="text-[10px] uppercase tracking-widest">Shoes & Apparel Laundry</span>
          </div>
          <div className="font-black text-5xl tracking-tighter">
            tugu
          </div>
        </div>
      </section>
    </main>
  )
}