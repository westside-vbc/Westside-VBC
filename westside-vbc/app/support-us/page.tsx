"use client"

import PageHeader from "@/components/ui/PageHeader"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col w-full">
      <PageHeader title="Support Us" imageSrc="/foto1.png" />

      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black text-[#00274c] uppercase tracking-tight mb-6">
            Invest In Our Future
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Support Westside Volleyball. Build champions on and off the court.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {}
          }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full items-start"
        >
          
          <motion.div 
            variants={{
              visible: { opacity: 1, y: 0, scale: 1 },
              hidden: { opacity: 0, y: 30, scale: 0.95 }
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col group cursor-pointer"
          >
            <div className="relative w-full overflow-hidden bg-gray-100">
              <Image 
                src="/apparel.png" 
                alt="Apparel" 
                width={1200}
                height={1200}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
              />
            </div>
            <div className="p-10 flex flex-col items-center text-center">
              <h3 className="text-3xl font-black text-[#00274c] mb-4">Team Identity & Apparel</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Professional teams need a professional look. Your support ensures our core team has high-quality gear, putting your brand logo in the spotlight during every match.
              </p>
              <Link href="/merch" className="mt-auto w-full">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#00274c] text-white px-8 py-4 rounded-full font-bold shadow-md"
                >
                  Shop Gear
                </motion.div>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            variants={{
              visible: { opacity: 1, y: 0, scale: 1 },
              hidden: { opacity: 0, y: 30, scale: 0.95 }
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col group cursor-pointer"
          >
            <div className="relative w-full overflow-hidden bg-gray-100">
              <Image 
                src="/comp.png" 
                alt="Donations" 
                width={1200}
                height={1200}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
              />
            </div>
            <div className="p-10 flex flex-col items-center text-center">
              <h3 className="text-3xl font-black text-[#00274c] mb-4">Competitive Events & Operations</h3>  
              <p className="text-gray-600 mb-8 leading-relaxed">
              This funding covers the operational costs required to run professional grade matches, events and tournaments.
              </p>
              <Link href="/contact" className="mt-auto w-full">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#00274c] text-white px-8 py-4 rounded-full font-bold shadow-md"
                >
                  Donate Now
                </motion.div>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            variants={{
              visible: { opacity: 1, y: 0, scale: 1 },
              hidden: { opacity: 0, y: 30, scale: 0.95 }
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col group cursor-pointer"
          >
            <div className="relative w-full overflow-hidden bg-gray-100">
              <Image 
                src="/brand.png" 
                alt="Partnerships" 
                width={1200}
                height={1200}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
              />
            </div>
            <div className="p-10 flex flex-col items-center text-center">
              <h3 className="text-3xl font-black text-[#00274c] mb-4">Digital & Brand Exposure</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
              Our website and social media are where we showcase our partners. We use these funds to create high-quality photos and videos that make your brand look its best.
              </p>
              <Link href="/contact" className="mt-auto w-full">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#00274c] text-white px-8 py-4 rounded-full font-bold shadow-md"
                >
                  Partner With Us
                </motion.div>
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </section>
    </main>
  )
}