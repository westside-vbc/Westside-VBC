import PageHeader from "@/components/ui/PageHeader";
import Image from "next/image";

export default function GalleryPage() {
  // Mock array for masonry layout mapping
  const galleryItems = Array.from({ length: 14 }).map((_, i) => `/images/gallery-${(i % 5) + 1}.jpg`);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <PageHeader title="Gallery" imageSrc="/gallery.png" />

      <section className="py-20 max-w-7xl mx-auto px-6 w-full relative z-30">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-primary uppercase tracking-tight">Westside VBC Moments</h2>
          <p className="text-gray-500 mt-2 uppercase tracking-widest text-sm font-semibold">Upload your moments!</p>
        </div>

        {/* Masonry Grid Simulation */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryItems.map((src, index) => (
            <div key={index} className="break-inside-avoid relative rounded-xl overflow-hidden group cursor-pointer">
              {/* Added variable height simulation for masonry effect */}
              <div className={`relative w-full ${index % 3 === 0 ? 'h-80' : index % 2 === 0 ? 'h-64' : 'h-48'}`}>
                <Image 
                  src={src} 
                  alt={`Westside Moment ${index + 1}`} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      {/* Play icon simulation for videos */}
                      {index % 4 === 0 && <span className="ml-1">▶</span>}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}