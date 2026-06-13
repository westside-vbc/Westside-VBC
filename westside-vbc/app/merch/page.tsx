import PageHeader from "@/components/ui/PageHeader"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"

export default function MerchPage() {
  const products = [
    { name: "Pro Training Jersey", price: "IDR 150.000", image: "https://images.unsplash.com/photo-1518331647614-7a1f04cd34ce?auto=format&fit=crop&q=80&w=2000" },
    { name: "Westside Essential Tee", price: "IDR 120.000", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=2000" },
    { name: "Elite Warmup Jacket", price: "IDR 350.000", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=2000" },
    { name: "VBC Court Shorts", price: "IDR 135.000", image: "https://images.unsplash.com/photo-1533681436303-38012bb50e18?auto=format&fit=crop&q=80&w=2000" },
  ]

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <PageHeader title="Merch" imageSrc="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=2000" />

      <section className="max-w-7xl mx-auto px-6 py-24 w-full relative z-30">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-black text-primary uppercase tracking-tight">Latest Gear</h2>
          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">4 Items</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <div key={i} className="group bg-neutral rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
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
    </main>
  )
}