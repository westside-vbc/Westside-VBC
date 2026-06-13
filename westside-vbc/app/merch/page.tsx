"use client"

import PageHeader from "@/components/ui/PageHeader"
import Image from "next/image"
import { ShoppingBag, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function MerchPage() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const products = [
    { name: "Pro Training Jersey", price: "IDR 150.000", image: "https://images.unsplash.com/photo-1518331647614-7a1f04cd34ce?auto=format&fit=crop&q=80&w=2000", description: "Official Westside VBC training jersey. Lightweight and breathable." },
    { name: "Westside Essential Tee", price: "IDR 120.000", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=2000", description: "Everyday cotton tee perfect for casual wear or warmups." },
    { name: "Elite Warmup Jacket", price: "IDR 350.000", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=2000", description: "Premium warmup jacket with embroidered club logo." },
    { name: "VBC Court Shorts", price: "IDR 135.000", image: "https://images.unsplash.com/photo-1533681436303-38012bb50e18?auto=format&fit=crop&q=80&w=2000", description: "Flexible court shorts designed for maximum mobility." },
  ]

  useEffect(() => {
    if (selectedProduct) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [selectedProduct, products.length])

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <PageHeader title="Merch" imageSrc="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=2000" />

      <section className="max-w-7xl mx-auto px-6 py-24 w-full relative z-30 overflow-hidden">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-black text-primary uppercase tracking-tight">Latest Gear</h2>
          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{products.length} Items</span>
        </div>

        <div 
          className="flex transition-transform duration-700 ease-in-out gap-8"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedProduct(product)}
              className="min-w-full sm:min-w-[calc(50%-1rem)] lg:min-w-[calc(25%-1.5rem)] shrink-0 group bg-neutral rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-primary font-bold px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <ShoppingBag className="w-4 h-4" /> Quick View
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-primary text-lg mb-1">{product.name}</h3>
                <p className="text-secondary font-black">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProduct ? (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 bg-white/50 hover:bg-white p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-primary" />
            </button>
            
            <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto h-64 md:h-auto">
              <Image 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                fill 
                className="object-cover"
              />
            </div>
            
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-3xl font-black text-primary mb-2 tracking-tight">{selectedProduct.name}</h3>
              <p className="text-2xl font-bold text-accent mb-6">{selectedProduct.price}</p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {selectedProduct.description}
              </p>
              <button className="w-full bg-primary text-white font-bold py-4 rounded-full hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-lg">
                <ShoppingBag className="w-5 h-5" />
                Pre-order Now
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}