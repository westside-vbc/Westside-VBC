"use client"

import Image from "next/image"
import { motion, Variants } from "framer-motion"

export default function Sponsors() {
  const partners = [
    { src: "/mdc.png", alt: "MDC" },
    { src: "/ue.png", alt: "Universal Ethnic" },
  ]

  const sponsors = [
    { src: "/elken.png", alt: "Elken Coffee" },
    { src: "/toko12.png", alt: "Toko 12" },
    { src: "/cap.png", alt: "Sinde" },
    { src: "/rose.png", alt: "Rose Brand" },
    { src: "/shoo.png", alt: "Shoovior" },
    { src: "/tugu.png", alt: "Tugu" },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <section className="py-24 bg-gray-50 text-center border-t border-gray-200 mt-auto overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="flex flex-col items-center"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black text-[#00274c] mb-4 tracking-tight">
            Trusted Partners & Sponsors
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto mb-20 font-medium leading-relaxed">
            Proudly supported by organizations that help our athletes, families, and community thrive.
          </motion.p>

          <motion.h3 variants={itemVariants} className="text-xl font-bold text-gray-400 mb-10 uppercase tracking-widest">
            Official Partners
          </motion.h3>
          
          <motion.div variants={containerVariants} className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mb-24 w-full max-w-4xl">
            {partners.map((partner, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative group bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center w-[45%] md:w-auto min-w-55"
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={200}
                  height={100}
                  className="object-contain h-20 w-auto group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.h3 variants={itemVariants} className="text-xl font-bold text-gray-400 mb-10 uppercase tracking-widest">
            Sponsors
          </motion.h3>
          
          <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 w-full">
            {sponsors.map((sponsor, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative group bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center w-full aspect-4/3"
              >
                <Image
                  src={sponsor.src}
                  alt={sponsor.alt}
                  width={150}
                  height={80}
                  className="object-contain h-14 w-auto group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}