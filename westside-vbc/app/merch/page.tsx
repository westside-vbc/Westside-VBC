"use client"

import PageHeader from "@/components/ui/PageHeader"
import Image from "next/image"
import { ShoppingBag, X, ChevronLeft, ChevronRight, ZoomIn, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

interface Product {
  id: string
  name: string
  price: string
  numericPrice: number
  images: string[]
  description: string
  sizes: string[]
  colors?: string[]
}

export default function MerchPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [modalImageIndex, setModalImageIndex] = useState(0)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [customProducts, setCustomProducts] = useState<Product[]>([])
  
  const { addToCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const hardcodedProducts: Product[] = [
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
      sizes: ["S", "M", "L", "XL", "XXL", "3L", "4L", "5L", "6L"],
      colors: ["Black", "White"]
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
      sizes: ["S", "M", "L", "XL", "XXL", "3L", "4L", "5L", "6L"],
      colors: ["Black", "White"]
    },
  ]

  // Fetch custom products from Firestore
  useEffect(() => {
    const fetchCustomProducts = async () => {
      try {
        const { db } = await import("@/lib/firebase")
        const { collection, getDocs, query, orderBy } = await import("firebase/firestore")
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(q)
        
        const fetched = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          price: doc.data().price,
          numericPrice: doc.data().numericPrice,
          description: doc.data().description,
          sizes: doc.data().sizes || ["S", "M", "L", "XL"],
          colors: doc.data().colors || [],
          images: doc.data().images || [],
        })) as Product[]
        
        setCustomProducts(fetched)
      } catch (error) {
        console.error("Error fetching custom products:", error)
      }
    }
    
    fetchCustomProducts()
  }, [])

  const products = [...hardcodedProducts, ...customProducts]

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

    if (selectedProduct?.colors && selectedProduct.colors.length > 0 && !selectedColor) {
      alert("Please select a color first")
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
        size: selectedSize,
        color: selectedColor || undefined
      })
      setSelectedProduct(null)
      setSelectedSize("")
      setSelectedColor("")
    }
  }

  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setSelectedSize("") // Reset size when opening a new product
    setSelectedColor("") // Reset color when opening a new product
    setModalImageIndex(0) // Start at the first image
  }

  const nextModalImage = () => {
    if (selectedProduct) {
      setModalImageIndex((prev) => (prev + 1) % selectedProduct.images.length)
    }
  }

  const prevModalImage = () => {
    if (selectedProduct) {
      setModalImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  }

  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col">
      <PageHeader title="" imageSrc="/merchlogo.png" imageClassName="object-[center_48%]" />
      <section className="max-w-7xl mx-auto px-6 py-24 w-full relative z-30">
        <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00274c] to-blue-600 uppercase tracking-tight">
              Merchandise
            </h2>
          </div>
          <span className="text-sm font-bold bg-blue-100 text-blue-800 px-4 py-2 rounded-full uppercase tracking-widest shadow-sm">
            {products.length} Items
          </span>
        </div>

        {/* Standard Grid Layout */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {products.map((product, i) => {
            const currentImg = product.images[imageIndex % product.images.length];
            return (
              <motion.div 
                key={i} 
                variants={itemVariants}
                onClick={() => openProductModal(product)}
                className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col relative"
              >
                {/* Decorative glowing orb behind the card on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] z-0 pointer-events-none"></div>

                <div className="relative aspect-square w-full bg-[#f4f5f7] overflow-hidden z-10 p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImg}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="relative w-full h-full"
                    >
                      <Image 
                        src={currentImg} 
                        alt={product.name} 
                        fill 
                        className="object-contain drop-shadow-xl" 
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Enhanced Quick View Overlay */}
                  <div className="absolute inset-0 bg-[#00274c]/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
                    <button className="bg-white text-[#00274c] font-black px-8 py-4 rounded-full flex items-center gap-3 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-2xl hover:scale-105">
                      <ShoppingBag className="w-5 h-5" /> Quick View
                    </button>
                  </div>
                </div>
                <div className="p-8 text-center bg-white z-10">
                  <h3 className="font-black text-[#00274c] text-xl mb-2 tracking-tight group-hover:text-blue-600 transition-colors">{product.name}</h3>
                  <p className="text-gray-500 font-bold text-lg bg-gray-50 inline-block px-4 py-1 rounded-full">{product.price}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-[2rem] max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative shadow-2xl border border-white/20"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-md hover:bg-gray-100 p-3 rounded-full transition-colors shadow-md border border-gray-200"
              >
                <X className="w-6 h-6 text-[#00274c]" />
              </button>
              
              <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:h-auto overflow-hidden bg-[#f4f5f7] group flex-shrink-0 p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={modalImageIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image 
                      src={selectedProduct.images[modalImageIndex]} 
                      alt={selectedProduct.name} 
                      fill 
                      className="object-contain cursor-zoom-in drop-shadow-2xl"
                      onClick={() => setZoomedImage(selectedProduct.images[modalImageIndex])}
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Navigation Arrows */}
                <button 
                  onClick={(e) => { e.stopPropagation(); prevModalImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all z-20 opacity-100 md:opacity-0 group-hover:opacity-100 focus:opacity-100 border border-gray-100"
                >
                  <ChevronLeft className="w-6 h-6 text-[#00274c]" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextModalImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all z-20 opacity-100 md:opacity-0 group-hover:opacity-100 focus:opacity-100 border border-gray-100"
                >
                  <ChevronRight className="w-6 h-6 text-[#00274c]" />
                </button>

                {/* Image Dots Indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {selectedProduct.images.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === modalImageIndex ? "bg-[#00274c] w-6" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Zoom Icon Hint */}
                <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md p-3 rounded-full pointer-events-none opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-sm text-[#00274c]">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
              
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                <h3 className="text-4xl font-black text-[#00274c] mb-3 tracking-tight leading-tight">{selectedProduct.name}</h3>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#00274c] mb-6">{selectedProduct.price}</p>
                <p className="text-gray-600 mb-10 leading-relaxed font-medium text-lg">
                  {selectedProduct.description}
                </p>

                <div className="mb-6">
                  <div className="flex justify-between items-end mb-4">
                    <p className="font-black text-[#00274c] text-lg uppercase tracking-wide">Select Size</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {selectedProduct.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-14 h-14 rounded-2xl font-black transition-all duration-300 border-2 ${
                          selectedSize === size 
                            ? 'border-[#00274c] bg-[#00274c] text-white shadow-lg scale-105' 
                            : 'border-gray-200 text-gray-500 hover:border-[#00274c] hover:text-[#00274c] hover:bg-gray-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                  <div className="mb-10">
                    <div className="flex justify-between items-end mb-4">
                      <p className="font-black text-[#00274c] text-lg uppercase tracking-wide">Select Color</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {selectedProduct.colors.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-6 py-3 rounded-2xl font-black transition-all duration-300 border-2 ${
                            selectedColor === color 
                              ? 'border-[#00274c] bg-[#00274c] text-white shadow-lg scale-105' 
                              : 'border-gray-200 text-gray-500 hover:border-[#00274c] hover:text-[#00274c] hover:bg-gray-50'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-[#00274c] text-white font-black py-5 rounded-2xl hover:bg-blue-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 text-xl"
                >
                  <ShoppingBag className="w-6 h-6" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 cursor-zoom-out"
            onClick={() => setZoomedImage(null)}
          >
            <button 
              onClick={() => setZoomedImage(null)}
              className="absolute top-6 right-6 z-10 bg-white/10 hover:bg-white/30 p-3 rounded-full transition-colors shadow-sm"
            >
              <X className="w-8 h-8 text-white" />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full h-full max-w-6xl max-h-screen"
            >
              <Image 
                src={zoomedImage} 
                alt="Zoomed Product" 
                fill 
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}