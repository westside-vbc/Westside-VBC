import PageHeader from "@/components/ui/PageHeader"
import Image from "next/image"
import Link from "next/link"

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col w-full">
      <PageHeader title="Support Us" imageSrc="/foto1.png" />

      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-[#00274c] uppercase tracking-tight mb-6">
            Invest In Our Future
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Support Westside Volleyball. Build champions on and off the court.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full items-start">
          
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
            <div className="relative w-full overflow-hidden bg-gray-100">
              <Image 
                src="/apparel.png" 
                alt="Apparel" 
                width={1200}
                height={1200}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="p-10 flex flex-col items-center text-center">
              <h3 className="text-3xl font-black text-[#00274c] mb-4">Team Identity & Apparel</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Professional teams need a professional look. Your support ensures our core team has high-quality gear, putting your brand logo in the spotlight during every match.
              </p>
              <Link href="/merch" className="mt-auto bg-[#00274c] text-white px-8 py-4 rounded-full font-bold hover:bg-blue-900 transition-colors w-full">
                Shop Gear
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
            <div className="relative w-full overflow-hidden bg-gray-100">
              <Image 
                src="/comp.png" 
                alt="Donations" 
                width={1200}
                height={1200}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="p-10 flex flex-col items-center text-center">
              <h3 className="text-3xl font-black text-[#00274c] mb-4">Competitive Events & Operations</h3>  
              <p className="text-gray-600 mb-8 leading-relaxed">
              This funding covers the operational costs required to run professional grade matches, events and tournaments.
              </p>
              <Link href="/contact" className="mt-auto bg-[#00274c] text-white px-8 py-4 rounded-full font-bold hover:bg-blue-900 transition-colors w-full">
                Donate Now
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
            <div className="relative w-full overflow-hidden bg-gray-100">
              <Image 
                src="/brand.png" 
                alt="Partnerships" 
                width={1200}
                height={1200}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="p-10 flex flex-col items-center text-center">
              <h3 className="text-3xl font-black text-[#00274c] mb-4">Digital & Brand Exposure</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
              Our website and social media are where we showcase our partners. We use these funds to create high-quality photos and videos that make your brand look its best.
              </p>
              <Link href="/contact" className="mt-auto bg-[#00274c] text-white px-8 py-4 rounded-full font-bold hover:bg-blue-900 transition-colors w-full">
                Partner With Us
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}