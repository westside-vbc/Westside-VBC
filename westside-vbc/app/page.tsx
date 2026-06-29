"use client"

import Link from "next/link"
import Image from "next/image"
import { User, Award } from "lucide-react"
import { motion } from "framer-motion"

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
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative z-10 flex flex-col items-center mt-16 px-4"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-white font-black text-5xl sm:text-7xl md:text-9xl lg:text-[130px] leading-none tracking-tight text-center"
          >
            WESTSIDE
          </motion.h1>
          <div className="flex items-center justify-center w-full mt-2 md:mt-4 overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="h-1 bg-white w-12 sm:w-20 md:w-48"
            />
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="text-white font-bold text-2xl sm:text-3xl md:text-5xl tracking-widest px-4 md:px-8 text-center"
            >
              VBC
            </motion.h2>
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="h-1 bg-white w-12 sm:w-20 md:w-48"
            />
          </div>
        </motion.div>
      </section>

      <section className="bg-[#00274c] text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What we do</h2>
          <p className="text-lg md:text-xl text-white/90 mb-20 font-light">
            We provide professional, organized spaces to play, learn, and compete.
          </p>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8"
          >
            <motion.div 
              variants={{
                visible: { opacity: 1, y: 0, scale: 1 },
                hidden: { opacity: 0, y: 30, scale: 0.95 }
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="flex flex-col items-center"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative w-16 h-16 md:w-20 md:h-20 mb-6 rounded-full overflow-hidden shadow-lg cursor-pointer"
              >
                <Image src="/insta.png" alt="Instagram Followers" fill className="object-cover" />
              </motion.div>
              <h3 className="text-4xl font-normal mb-2">4750+</h3>
              <p className="text-sm font-light tracking-wide text-white/80">Followers on ig</p>
            </motion.div>
            
            <motion.div 
              variants={{
                visible: { opacity: 1, y: 0, scale: 1 },
                hidden: { opacity: 0, y: 30, scale: 0.95 }
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="flex flex-col items-center"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-6"
              >
                <User className="w-12 h-12 md:w-16 md:h-16 text-white drop-shadow-md" />
              </motion.div>
              <h3 className="text-4xl font-normal mb-2">250+</h3>
              <p className="text-sm font-light tracking-wide text-white/80">Members</p>
            </motion.div>
            
            <motion.div 
              variants={{
                visible: { opacity: 1, y: 0, scale: 1 },
                hidden: { opacity: 0, y: 30, scale: 0.95 }
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="flex flex-col items-center"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-6"
              >
                <Award className="w-12 h-12 md:w-16 md:h-16 text-white drop-shadow-md" />
              </motion.div>
              <h3 className="text-4xl font-normal mb-2">50+</h3>
              <p className="text-sm font-light tracking-wide text-white/80">Pro Athletes & Crew</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#e6e6e6] py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {}
            }}
            className="w-full md:w-1/2 grid grid-cols-2 gap-4"
          >
            {[ 
              { src: "/final.png", alt: "Merch" },
              { src: "/foto1.png", alt: "Tips" },
              { src: "/foto2.png", alt: "LNYB" },
              { src: "/foto3.png", alt: "Wanna Rock" }
            ].map((img, i) => (
              <motion.div 
                key={i}
                variants={{
                  visible: { opacity: 1, scale: 1, y: 0 },
                  hidden: { opacity: 0, scale: 0.8, y: 20 }
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                whileHover={{ scale: 1.05, zIndex: 10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="relative aspect-square w-full overflow-hidden bg-gray-300 rounded-2xl cursor-pointer"
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </motion.div>
            ))}
          </motion.div>
          
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
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {}
          }}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20"
        >
          
          <motion.div 
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 40 }
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex flex-col items-center text-center"
          >
            <h3 className="text-3xl font-black text-[#00274c] mb-2">Private Coaching</h3>
            <p className="text-[#00274c]/80 mb-6 font-medium text-lg">Skill-building with professional<br/>guidance</p>
            <motion.div 
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              className="relative w-full aspect-4/5 bg-gray-200 overflow-hidden shadow-md group cursor-pointer rounded-[2rem]"
            >
              <Image src="/private.png" alt="Private Coaching" fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </motion.div>
          </motion.div>

          <motion.div 
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 40 }
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex flex-col items-center text-center"
          >
            <h3 className="text-3xl font-black text-[#00274c] mb-2">1 on 1 Coaching</h3>
            <p className="text-[#00274c]/80 mb-6 font-medium text-lg">One-on-one personal training<br/>and guidance</p>
            <motion.div 
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              className="relative w-full aspect-4/5 bg-gray-200 overflow-hidden shadow-md group cursor-pointer rounded-[2rem]"
            >
              <Image src="/one.png" alt="1 on 1 Coaching" fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"/>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 40 }
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex flex-col items-center text-center"
          >
            <h3 className="text-3xl font-black text-[#00274c] mb-2">Fun Match</h3>
            <p className="text-[#00274c]/80 mb-6 font-medium text-lg">Casual play for networking and<br/>enjoyment.</p>
            <motion.div 
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              className="relative w-full aspect-4/5 bg-gray-200 overflow-hidden shadow-md group cursor-pointer rounded-[2rem]"
            >
              <Image src="/fun.png" alt="Fun Match" fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </motion.div>
          </motion.div>

          <motion.div 
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 40 }
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex flex-col items-center text-center"
          >
            <h3 className="text-3xl font-black text-[#00274c] mb-2">Competitive Match</h3>
            <p className="text-[#00274c]/80 mb-6 font-medium text-lg">High-intensity games for<br/>experienced players.</p>
            <motion.div 
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              className="relative w-full aspect-4/5 bg-gray-200 overflow-hidden shadow-md group cursor-pointer rounded-[2rem]"
            >
              <Image src="/comp.png" alt="Competitive Match" fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </motion.div>
          </motion.div>

        </motion.div>
      </section>

      <section className="relative w-full h-[60vh] flex items-center justify-center bg-black">
        <Image 
          src="/support.png" 
          alt="Support Us" 
          fill 
          className="object-cover opacity-30" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center"
        >
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">SUPPORT US!</h2>
          <p className="text-xl md:text-2xl text-white/90 mb-10 font-light leading-relaxed">
            Supporting Westside Volleyball is more than just sponsoring a sports program, it&apos;s investing in futures
          </p>
          <Link href="/support-us/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#00274c] text-white px-10 py-3 text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-shadow"
            >
              Click Here
            </motion.div>
          </Link>
        </motion.div>
      </section>
    </main>
  )
}