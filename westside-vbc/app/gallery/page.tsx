"use client"

import { useState, useEffect } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback images if database is empty
  const fallbackItems = [
    "/foto1.png",
    "/foto2.png",
    "/foto3.png",
    "/team-photo.jpg",
    "/match.png",
    "/fun.png",
    "/comp.png",
    "/private.png",
    "/joinwestside.png"
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedItems = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        if (fetchedItems.length > 0) {
          setGalleryItems(fetchedItems.map((item: any) => item.url));
        } else {
          setGalleryItems(fallbackItems);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
        setGalleryItems(fallbackItems);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <PageHeader title="Gallery" imageSrc="/gallery.png" />

      <section className="py-20 max-w-7xl mx-auto px-6 w-full relative z-30">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black text-primary uppercase tracking-tight">Westside VBC Moments</h2>
          <p className="text-gray-500 mt-2 uppercase tracking-widest text-sm font-semibold">Upload your moments!</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4"
          >
            {galleryItems.map((src, index) => (
              <motion.div 
                key={index}
                variants={{
                  visible: { opacity: 1, y: 0, scale: 1 },
                  hidden: { opacity: 0, y: 30, scale: 0.95 }
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                whileHover={{ scale: 1.02, y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="break-inside-avoid mb-4 relative rounded-xl overflow-hidden group cursor-pointer bg-gray-100"
              >
                <img 
                  src={src} 
                  alt={`Westside Moment ${index + 1}`} 
                  className="w-full h-auto block"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-300">
                      {index % 4 === 0 && <span className="ml-1 text-xl">▶</span>}
                   </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}