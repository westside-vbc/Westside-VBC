"use client"

import { useState, useEffect } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

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
          setGalleryItems(fetchedItems.map(item => item.url));
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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-primary uppercase tracking-tight">Westside VBC Moments</h2>
          <p className="text-gray-500 mt-2 uppercase tracking-widest text-sm font-semibold">Upload your moments!</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {galleryItems.map((src, index) => (
              <div key={index} className="break-inside-avoid mb-4 relative rounded-xl overflow-hidden group cursor-pointer bg-gray-100">
                <img 
                  src={src} 
                  alt={`Westside Moment ${index + 1}`} 
                  className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      {index % 4 === 0 && <span className="ml-1 text-xl">▶</span>}
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}