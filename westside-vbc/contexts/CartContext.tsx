"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export interface CartItem {
  id: string
  name: string
  price: string // e.g. "IDR 150000"
  numericPrice: number // e.g. 150000
  image: string
  quantity: number
  size?: string
  color?: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string, size?: string, color?: string) => void
  updateQuantity: (id: string, size: string | undefined, color: string | undefined, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
  isCartOpen: false,
  setIsCartOpen: () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { user } = useAuth()

  // Load cart from Firestore when user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        const cartRef = doc(db, "carts", user.uid)
        const cartSnap = await getDoc(cartRef)
        if (cartSnap.exists()) {
          setItems(cartSnap.data().items || [])
        }
      } else {
        setItems([]) // Clear cart if logged out
      }
    }
    loadCart()
  }, [user])

  // Save cart to Firestore whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      if (user) {
        const cartRef = doc(db, "carts", user.uid)
        await setDoc(cartRef, { items }, { merge: true })
      }
    }
    // Only save if it's an update after initial load
    if (user) saveCart()
  }, [items, user])

  const addToCart = (newItem: CartItem) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(
        item => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
      )

      if (existingItemIndex > -1) {
        // Item exists, increase quantity
        const updatedItems = [...currentItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity
        return updatedItems
      } else {
        // New item
        return [...currentItems, newItem]
      }
    })
    setIsCartOpen(true) // Open cart when adding an item
  }

  const removeFromCart = (id: string, size?: string, color?: string) => {
    setItems(currentItems => currentItems.filter(
      item => !(item.id === id && item.size === size && item.color === color)
    ))
  }

  const updateQuantity = (id: string, size: string | undefined, color: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color)
      return
    }
    setItems(currentItems => currentItems.map(item => {
      if (item.id === id && item.size === size && item.color === color) {
        return { ...item, quantity }
      }
      return item
    }))
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.numericPrice * item.quantity), 0)

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      totalItems, 
      totalPrice,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
