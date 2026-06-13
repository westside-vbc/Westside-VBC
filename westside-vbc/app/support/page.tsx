import PageHeader from "@/components/ui/PageHeader";
import Sponsors from "@/components/ui/Sponsors";
import Image from "next/image";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <PageHeader title="Support Pages" imageSrc="/images/hero-support.jpg" />

      <section className="py-20 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-black text-primary uppercase tracking-tight mb-6">Support Westside Volleyball Community</h2>
        <p className="text-gray-600 mb-6">Di Westside Volleyball Surabaya, setiap dukungan yang diberikan langsung berdampak pada kualitas latihan dan profesionalitas komunitas Westside Volleyball Surabaya.</p>
        <p className="text-gray-600 font-medium">Supporting Westside Volleyball is more than just sponsoring a sports program, it's investing in futures.</p>
      </section>

      <section className="pb-20 max-w-6xl mx-auto px-6 w-full">
        <h2 className="text-4xl font-black text-primary uppercase tracking-tight mb-12 text-center">Where Your Support Goes</h2>
        
        <div className="flex flex-col gap-6">
          {/* Card 1 */}
          <div className="bg-[#0A2463] rounded-3xl overflow-hidden flex flex-col md:flex-row text-white shadow-xl">
            <div className="relative w-full md:w-1/3 h-64 md:h-auto">
              <Image src="/images/support-apparel.jpg" alt="Team Apparel" fill className="object-cover" />
            </div>
            <div className="p-10 md:w-2/3 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Team Identity & Apparel</h3>
              <p className="text-white/80 text-sm mb-4 leading-relaxed">Professional teams need a professional look. Your support ensures our core team has high-quality gear, putting your brand logo in the spotlight during every match.</p>
              <p className="text-secondary text-xs font-semibold uppercase tracking-wide">Example: IDR 1,500,000 funds a full set of match jerseys</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-primary rounded-3xl overflow-hidden flex flex-col md:flex-row-reverse text-white shadow-xl">
            <div className="relative w-full md:w-1/3 h-64 md:h-auto">
              <Image src="/images/support-digital.jpg" alt="Digital Exposure" fill className="object-cover" />
            </div>
            <div className="p-10 md:w-2/3 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Digital & Brand Exposure</h3>
              <p className="text-white/80 text-sm mb-4 leading-relaxed">Our website and social media are where we showcase our partners. We use these funds to create high-quality photos and videos that make your brand look its best.</p>
              <p className="text-secondary text-xs font-semibold uppercase tracking-wide">Example: Helps cover website costs and professional photographers</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0A2463] rounded-3xl overflow-hidden flex flex-col md:flex-row text-white shadow-xl">
            <div className="relative w-full md:w-1/3 h-64 md:h-auto">
              <Image src="/images/support-events.jpg" alt="Competitive Events" fill className="object-cover" />
            </div>
            <div className="p-10 md:w-2/3 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Competitive Events & Operations</h3>
              <p className="text-white/80 text-sm mb-4 leading-relaxed">This funding covers the operational costs required to run professional grade matches, events and tournaments.</p>
              <p className="text-secondary text-xs font-semibold uppercase tracking-wide">Example: IDR 500,000 fully covers the logistics of a one-day tournament</p>
            </div>
          </div>
        </div>
      </section>
      <Sponsors/>
    </main>
  );
}