"use client"

import PageHeader from "@/components/ui/PageHeader"
import Image from "next/image"
import { ClipboardList, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, getDocs } from "firebase/firestore"

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <PageHeader title="Schedule" imageSrc="/schedule.jpg" />

      <section className="py-20 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black text-primary uppercase tracking-tight mb-4">Jadwal & Pendaftaran</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Pilih sesi yang sesuai dengan targetmu. Mau fokus asah skill atau langsung seru-seruan di lapangan? Amankan slotmu sekarang!</p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            hidden: { opacity: 0 }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24"
        >
          <motion.div 
            variants={{
              visible: { opacity: 1, y: 0, scale: 1 },
              hidden: { opacity: 0, y: 30, scale: 0.95 }
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
            className="bg-white rounded-3xl p-8 shadow-md border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-6 border-b pb-6">
              <div className="bg-accent text-neutral rounded-full w-12 h-12 flex items-center justify-center font-bold text-xs shrink-0">VBC</div>
              <h3 className="text-xl font-bold text-primary leading-tight">WEEKDAY FUN MATCH<br/>SMA MDC</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><strong className="text-primary">Sesi:</strong> Kamis</li>
              <li><strong className="text-primary">Tipe:</strong> Fun Match</li>
              <li><strong className="text-primary">Waktu:</strong> 19.00 - 21.00 (7 - 9PM)</li>
              <li><strong className="text-primary">HTM:</strong> Rp. 20.000 / Person</li>
              <li><strong className="text-primary">Lokasi:</strong> SMA MDC</li>
            </ul>
          </motion.div>

          <motion.div 
            variants={{
              visible: { opacity: 1, y: 0, scale: 1 },
              hidden: { opacity: 0, y: 30, scale: 0.95 }
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
            className="bg-white rounded-3xl p-8 shadow-md border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-6 border-b pb-6">
              <div className="bg-accent text-neutral rounded-full w-12 h-12 flex items-center justify-center font-bold text-xs shrink-0">VBC</div>
              <h3 className="text-xl font-bold text-primary leading-tight">SUNDAY SESSIONS<br/>SMA CIPUTRA / MDC</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><strong className="text-primary">Sesi:</strong> Minggu</li>
              <li><strong className="text-primary">Tipe:</strong> Private Coaching</li>
              <li><strong className="text-primary">Waktu:</strong> 12.00 - 14.00 (12 - 2PM)</li>
              <li><strong className="text-primary">HTM:</strong> Rp. 35.000 / Person</li>
              <li><strong className="text-primary">Lokasi:</strong> SMA Ciputra / MDC</li>
            </ul>
          </motion.div>

          <motion.div 
            variants={{
              visible: { opacity: 1, y: 0, scale: 1 },
              hidden: { opacity: 0, y: 30, scale: 0.95 }
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
            className="bg-white rounded-3xl p-8 shadow-md border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-6 border-b pb-6">
              <div className="bg-accent text-neutral rounded-full w-12 h-12 flex items-center justify-center font-bold text-xs shrink-0">VBC</div>
              <h3 className="text-xl font-bold text-primary leading-tight">WEEKEND<br/>FUN MATCH</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><strong className="text-primary">Sesi:</strong> Minggu</li>
              <li><strong className="text-primary">Tipe:</strong> Open Play</li>
              <li><strong className="text-primary">Waktu:</strong> 14.00 - 18.00 (2 - 6PM)</li>
              <li><strong className="text-primary">HTM:</strong> Rp. 20.000 / Person</li>
              <li><strong className="text-primary">Lokasi:</strong> SMA Ciputra / MDC</li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-12">Cara Mendaftar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="relative w-16 h-16 mb-4 rounded-2xl overflow-hidden group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300 shadow-md">
                <Image src="/insta.png" alt="Instagram" fill className="object-cover" />
              </div>
              <h4 className="font-bold text-primary mb-2 transition-colors group-hover:text-blue-600">Follow & DM Instagram</h4>
              <p className="text-xs text-gray-500 max-w-50">@westside.vbc untuk meminta link Whatsapp</p>
            </div>
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="relative w-16 h-16 mb-4 rounded-2xl overflow-hidden group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300 shadow-md">
                <Image src="/wa.png" alt="WhatsApp" fill className="object-cover" />
              </div>
              <h4 className="font-bold text-primary mb-2 transition-colors group-hover:text-blue-600">Join our Community</h4>
              <p className="text-xs text-gray-500 max-w-50">Join grup Whatsapp Westside untuk list nama dan info lainnya</p>
            </div>
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="bg-primary p-4 rounded-2xl mb-4 text-white group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300 shadow-md">
                <ClipboardList className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-primary mb-2 transition-colors group-hover:text-blue-600">List your name</h4>
              <p className="text-xs text-gray-500 max-w-50">List nama di group Whatsapp untuk ikut acara Westside</p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}