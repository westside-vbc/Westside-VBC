"use client"

import PageHeader from "@/components/ui/PageHeader"
import Image from "next/image"
import { ShoppingBag, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

interface Product {
  id: string
  name: string
  price: string
  numericPrice: number
  images: string[]
  description: string
  sizes: string[]
}

export default function MerchPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string>("")
  
  const { addToCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const products: Product[] = [
    { 
      id: "westside-tshirt",
      name: "Westside T-Shirt", 
      price: "IDR 90.000", 
      numericPrice: 90000,
      images: [
        "/white3d.png",
        "/black3d.png",
        "/black.png",
        "/white.png",
        "/size.png"
      ], 
      description: "Official Westside VBC jersey. Lightweight and breathable.",
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    { 
      id: "westside-sleeveless",
      name: "Westside Sleeveless", 
      price: "IDR 90.000", 
      numericPrice: 90000,
      images: [
        "/whiteless.png",
        "/blackless.png",
        "/less3d.png",
        "/size.png"
      ], 
      description: "Official Westside VBC sleeveless. Lightweight and breathable.",
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
  ]

  // Auto-rotate product images every 3 seconds
  useEffect(() => {
    if (selectedProduct) return // Pause auto-rotate when popup is open
    const timer = setInterval(() => {
      setImageIndex((prev) => prev + 1)
    }, 3000)
    return () => clearInterval(timer)
  }, [selectedProduct])

  const handleAddToCart = () => {
    if (!user) {
      router.push("/login")
      return
    }

    if (!selectedSize) {
      alert("Please select a size first")
      return
    }

    if (selectedProduct) {
      addToCart({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        numericPrice: selectedProduct.numericPrice,
        image: selectedProduct.images[0],
        quantity: 1,
        size: selectedSize
      })
      setSelectedProduct(null)
      setSelectedSize("")
    }
  }

  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setSelectedSize("") // Reset size when opening a new product
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <PageHeader title="" imageSrc="/merchlogo.png" />

      <section className="max-w-7xl mx-auto px-6 py-24 w-full relative z-30">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-black text-[#00274c] uppercase tracking-tight">Merchs</h2>
          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{products.length} Items</span>
        </div>

        {/* Standard Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => {
            const currentImg = product.images[imageIndex % product.images.length];
            return (
              <div 
                key={i} 
                onClick={() => openProductModal(product)}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                  <Image 
                    src={currentImg} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-opacity duration-1000 ease-in-out" 
                  />
                  <div className="absolute inset-0 bg-[#00274c]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white text-[#00274c] font-bold px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <ShoppingBag className="w-4 h-4" /> Quick View
                    </button>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-[#00274c] text-lg mb-1 tracking-tight">{product.name}</h3>
                  <p className="text-gray-600 font-bold">{product.price}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Popup Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden relative shadow-2xl">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm hover:bg-white p-2 rounded-full transition-colors shadow-sm"
            >
              <X className="w-6 h-6 text-[#00274c]" />
            </button>
            
            <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:h-auto overflow-hidden bg-gray-100">
              <Image 
                src={selectedProduct.images[imageIndex % selectedProduct.images.length]} 
                alt={selectedProduct.name} 
                fill 
                className="object-cover transition-opacity duration-700"
              />
            </div>
            
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
              <h3 className="text-3xl font-black text-[#00274c] mb-2 tracking-tight">{selectedProduct.name}</h3>
              <p className="text-2xl font-bold text-blue-600 mb-6">{selectedProduct.price}</p>
              <p className="text-gray-600 mb-8 leading-relaxed font-medium">
                {selectedProduct.description}
              </p>

              <div className="mb-8">
                <p className="font-bold text-[#00274c] mb-3">Select Size:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-full font-bold transition-all border-2 ${
                        selectedSize === size 
                          ? 'border-[#00274c] bg-[#00274c] text-white' 
                          : 'border-gray-200 text-gray-600 hover:border-[#00274c]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full bg-[#00274c] text-white font-bold py-4 rounded-full hover:bg-blue-900 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg"
              >
                <ShoppingBag className="w-5 h-5" />
                Pre-order Now
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}