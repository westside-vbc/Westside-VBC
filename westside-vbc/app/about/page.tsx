import PageHeader from "@/components/ui/PageHeader";
import Partners from "@/components/ui/Partners";
import Image from "next/image";
import Link from "next/link";
import {Users, Medal } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <PageHeader title="About Us" imageSrc="/images/hero-volleyball.jpg" />

      {/* Stats Section */}
      <section className="bg-primary text-neutral py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">What we do</h2>
          <p className="text-neutral/80 mb-12">We provide professional, organized spaces to play, learn, and compete.</p>
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black">4750+</span>
              <span className="text-sm text-neutral/70">Followers on IG</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-10 h-10 text-secondary mb-3" />
              <span className="text-3xl font-black">250+</span>
              <span className="text-sm text-neutral/70">Members</span>
            </div>
            <div className="flex flex-col items-center">
              <Medal className="w-10 h-10 text-secondary mb-3" />
              <span className="text-3xl font-black">50+</span>
              <span className="text-sm text-neutral/70">Athletes in Elite</span>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Bento Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-black text-primary text-center mb-16 tracking-tight">Our Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Private Coaching", desc: "Skill-building with professional guidance.", img: "/images/program-private.jpg" },
            { title: "1 on 1 Coaching", desc: "One-on-one personal training.", img: "/images/program-1on1.jpg" },
            { title: "Fun Match", desc: "Casual play for networking and enjoyment.", img: "/images/program-fun.jpg" },
            { title: "Competitive Match", desc: "High-intensity games for experienced players.", img: "/images/program-comp.jpg" }
          ].map((program, i) => (
            <div key={i} className="group bg-neutral rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="relative h-64 w-full overflow-hidden">
                <Image src={program.img} alt={program.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">{program.title}</h3>
                <p className="text-gray-600">{program.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support Banner */}
      <section className="relative py-24 bg-primary text-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
           <Image src="/images/support-bg.jpg" alt="Support Us" fill className="object-cover" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center">
          <h2 className="text-5xl font-black text-neutral uppercase mb-4 tracking-tight">Support Us!</h2>
          <p className="text-lg text-neutral/90 mb-8">Supporting Westside Volleyball is more than just sponsoring a sports program, it's investing in futures.</p>
          <Link href="/support" className="bg-accent text-neutral px-8 py-3 rounded-full font-bold hover:bg-accent/90 transition-colors">
            Click Here
          </Link>
        </div>
      </section>

      <Partners />
    </main>
  );
}