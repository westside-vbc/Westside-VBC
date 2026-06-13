import PageHeader from "@/components/ui/PageHeader"
import Image from "next/image"
import Link from "next/link"

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <PageHeader title="Events" imageSrc="/images/hero-events.jpg" />

      <section className="py-20 max-w-4xl mx-auto px-6 w-full flex flex-col items-center relative z-30">
        <h2 className="text-4xl font-black text-primary uppercase tracking-tight mb-12 text-center">
          Community Events
        </h2>
        
        <div className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl mb-16 relative aspect-4/5 hover:scale-[1.02] transition-transform duration-500">
          <Image 
            src="/images/event-banner.jpg" 
            alt="Jumping Works Surabaya Event Flyer" 
            fill 
            className="object-cover"
          />
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-black text-primary uppercase tracking-tight mb-8">
            Register Now!
          </h2>
          <Link href="/contact" className="bg-accent text-neutral px-10 py-4 rounded-full font-bold text-lg hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl">
            Join the Next Event
          </Link>
        </div>
      </section>
    </main>
  )
}