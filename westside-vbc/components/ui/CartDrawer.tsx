"use client"

import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import Image from "next/image"
import Link from "next/link"

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, totalPrice } = useCart()

  if (!isCartOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-[#00274c]">
            <ShoppingBag className="w-6 h-6" />
            <h2 className="text-xl font-black tracking-tight">Your Cart</h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p className="font-medium text-lg">Your cart is empty</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-[#00274c] font-bold mt-4 hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b border-gray-50 pb-6">
                <div className="relative w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-[#00274c] leading-tight">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 font-medium mb-1">
                      Size: <span className="text-[#00274c]">{item.size || 'One Size'}</span>
                    </p>
                    <p className="text-[#00274c] font-bold">
                      Rp {item.numericPrice.toLocaleString('id-ID')}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="p-1.5 rounded-full border border-gray-200 hover:border-gray-300 text-gray-500 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="p-1.5 rounded-full border border-gray-200 hover:border-gray-300 text-gray-500 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-between items-center mb-6 text-lg">
              <span className="font-bold text-gray-600">Total</span>
              <span className="font-black text-[#00274c]">Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
            <Link 
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full bg-[#00274c] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-blue-900 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}