"use client"

import PageHeader from "@/components/ui/PageHeader"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, getDocs } from "firebase/firestore"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, "events"), orderBy("createdAt", "desc"))
        const snapshot = await getDocs(q)
        setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <PageHeader title="Events" imageSrc="/events.png" />

      <section className="py-20 max-w-6xl mx-auto px-6 w-full flex flex-col items-center relative z-30">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-black text-primary uppercase tracking-tight mb-12 text-center"
        >
          Community Events
        </motion.h2>

        {/* Featured Hardcoded Event */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          whileHover={{ y: -10, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl mb-16 relative aspect-4/5 cursor-pointer"
        >
          <Image 
            src="/event.png" 
            alt="Jumping Works Surabaya Event Flyer" 
            fill 
            className="object-cover"
          />
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin w-10 h-10 text-primary" />
          </div>
        ) : events.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-gray-500 font-medium">No upcoming events right now. Stay tuned!</p>
          </motion.div>
        ) : (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
              hidden: { opacity: 0 }
            }}
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {events.map((evt) => (
              <motion.div 
                key={evt.id}
                variants={{
                  visible: { opacity: 1, y: 0, scale: 1 },
                  hidden: { opacity: 0, y: 30, scale: 0.95 }
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col"
              >
                <div className="relative w-full aspect-video bg-gray-100">
                  {evt.imageUrl ? (
                    <Image src={evt.imageUrl} alt={evt.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-primary mb-3">{evt.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4 flex-grow">
                    <p><strong className="text-primary">Date:</strong> {evt.date}</p>
                    <p><strong className="text-primary">Time:</strong> {evt.time}</p>
                    <p><strong className="text-primary">Location:</strong> {evt.location}</p>
                  </div>
                  <p className="text-gray-700 text-sm mb-6 line-clamp-3">{evt.description}</p>
                  
                  <Link href="/contact" className="mt-auto">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-center bg-accent text-neutral px-6 py-3 rounded-xl font-bold text-sm shadow-md"
                    >
                      Register for Event
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <h2 className="text-4xl font-black text-primary uppercase tracking-tight mb-8">
            Don't Miss Out!
          </h2>
          <Link href="/contact">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-primary text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg"
            >
              Join the Community
            </motion.div>
          </Link>
        </motion.div>
      </section>
    </main>
  )
}