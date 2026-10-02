"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import PageHeader from "@/components/ui/PageHeader"
import { X, Image as ImageIcon, ShoppingBag, PackagePlus, Calendar, Bot } from "lucide-react"

import OrdersTab from "@/components/admin/OrdersTab"
import EventsTab from "@/components/admin/EventsTab"
import ProductsTab from "@/components/admin/ProductsTab"
import GalleryTab from "@/components/admin/GalleryTab"
import AIChatTab from "@/components/admin/AIChatTab"

// Authorized admin emails
const ADMIN_EMAILS = ["filemonjose13@gmail.com", "jason4realyt@gmail.com"]

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"orders" | "gallery" | "products" | "events" | "ai-chat">("orders")
  const [selectedProof, setSelectedProof] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading) return

    if (!user || !ADMIN_EMAILS.includes(user.email || "")) {
      router.push("/") // Redirect non-admins to home
      return
    }
  }, [user, authLoading, router])

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user || !ADMIN_EMAILS.includes(user.email || "")) {
    return null; // Prevent flash of content
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <PageHeader title="Admin Dashboard" imageSrc="/merchlogo.png" imageClassName="object-[center_48%]" />

      <section className="max-w-7xl mx-auto px-6 py-12 w-full">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap ${
              activeTab === "orders" ? "bg-primary text-white shadow-lg" : "bg-white text-gray-500 hover:bg-gray-100"
            }`}
          >
            <ShoppingBag className="w-5 h-5" /> Orders
          </button>
          <button 
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap ${
              activeTab === "products" ? "bg-primary text-white shadow-lg" : "bg-white text-gray-500 hover:bg-gray-100"
            }`}
          >
            <PackagePlus className="w-5 h-5" /> Products
          </button>
          <button 
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap ${
              activeTab === "gallery" ? "bg-primary text-white shadow-lg" : "bg-white text-gray-500 hover:bg-gray-100"
            }`}
          >
            <ImageIcon className="w-5 h-5" /> Gallery
          </button>
          <button 
            onClick={() => setActiveTab("events")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap ${
              activeTab === "events" ? "bg-primary text-white shadow-lg" : "bg-white text-gray-500 hover:bg-gray-100"
            }`}
          >
            <Calendar className="w-5 h-5" /> Events
          </button>
          <button 
            onClick={() => setActiveTab("ai-chat")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap ${
              activeTab === "ai-chat" ? "bg-primary text-white shadow-lg" : "bg-white text-gray-500 hover:bg-gray-100"
            }`}
          >
            <Bot className="w-5 h-5" /> AI Chat
          </button>
        </div>

        {activeTab === "events" && <EventsTab />}
        {activeTab === "orders" && <OrdersTab setSelectedProof={setSelectedProof} />}
        {activeTab === "products" && <ProductsTab />}
        {activeTab === "gallery" && <GalleryTab />}
        {activeTab === "ai-chat" && <AIChatTab userEmail={user?.email || ""} />}
      </section>

      {/* Image Modal (for Order Payment Proof) */}
      {selectedProof && activeTab === "orders" && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedProof(null)}
        >
          <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
            <button 
              onClick={() => setSelectedProof(null)}
              className="absolute top-0 right-0 z-10 bg-white p-2 rounded-full hover:bg-gray-100 transition-colors shadow-lg translate-x-1/2 -translate-y-1/2"
            >
              <X className="w-6 h-6 text-[#00274c]" />
            </button>
            <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-4">
              <img 
                src={selectedProof} 
                alt="Payment Proof" 
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}