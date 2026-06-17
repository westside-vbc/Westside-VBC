"use client"

import { useState } from "react"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import PageHeader from "@/components/ui/PageHeader"
import Image from "next/image"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [name, setName] = useState(user?.displayName || "")
  const [phone, setPhone] = useState("")
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  if (!user) {
    router.push("/login")
    return null
  }

  if (items.length === 0 && !success) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <PageHeader title="Checkout" imageSrc="/merchlogo.png" />
        <section className="flex-grow flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-black text-[#00274c] mb-4">Your cart is empty</h2>
            <button onClick={() => router.push("/merch")} className="text-blue-600 font-bold hover:underline">
              Go back to Merch
            </button>
          </div>
        </section>
      </main>
    )
  }

  // Convert File to Base64 String
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result as string)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!proofFile) {
      setError("Please upload proof of payment")
      return
    }

    // Check file size (Firestore document limit is 1MB, so we keep image under 500KB)
    if (proofFile.size > 500 * 1024) {
      setError("Image is too large. Please upload an image smaller than 500KB.")
      return
    }

    setLoading(true)
    setError("")

    try {
      // 1. Convert image to base64 string
      const base64Image = await convertToBase64(proofFile)

      // 2. Save order to Firestore with the image string
      const orderData = {
        userId: user.uid,
        userEmail: user.email,
        customerName: name,
        phoneNumber: phone,
        items: items,
        totalAmount: totalPrice,
        paymentProofUrl: base64Image, // Save the base64 string here
        status: "Pending", // Pending, Processing, Shipped
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, "orders"), orderData)

      // 3. Clear cart & show success
      clearCart()
      setSuccess(true)

    } catch (err: any) {
      console.error(err)
      setError("Failed to process order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <PageHeader title="Order Placed" imageSrc="/merchlogo.png" />
        <section className="flex-grow flex items-center justify-center py-20 px-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg border border-gray-100 text-center">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-3xl font-black text-[#00274c] mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-8">Your order has been received. Our admin will verify your payment and process your order shortly.</p>
            <button onClick={() => router.push("/")} className="bg-[#00274c] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-900 transition-colors">
              Return Home
            </button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <PageHeader title="Checkout" imageSrc="/merchlogo.png" />

      <section className="max-w-7xl mx-auto px-6 py-20 w-full flex flex-col lg:flex-row gap-12">
        
        {/* Left Col: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-2xl font-black text-[#00274c] mb-6">Order Summary</h3>
            <div className="flex flex-col gap-4 mb-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#00274c] text-sm leading-tight">{item.name}</h4>
                    <p className="text-xs text-gray-500">Size: {item.size}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-bold text-[#00274c] text-sm">
                    Rp {(item.numericPrice * item.quantity).toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-xl">
              <span className="font-bold text-gray-600">Total</span>
              <span className="font-black text-[#00274c]">Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* Right Col: Form & Payment */}
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleCheckout} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col gap-8">
            
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-bold">
                {error}
              </div>
            )}

            <div>
              <h3 className="text-xl font-black text-[#00274c] mb-4">1. Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number (WhatsApp active)</label>
                  <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-8">
              <h3 className="text-xl font-black text-[#00274c] mb-4">2. Payment Method</h3>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-6">
                <p className="text-[#00274c] font-medium mb-6">Please transfer the exact amount of <strong className="text-xl tracking-tight">Rp {totalPrice.toLocaleString('id-ID')}</strong> to the following account or scan the QRIS below:</p>
                
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 flex-1 w-full">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Bank BCA</p>
                    <p className="text-2xl font-black text-[#00274c] tracking-tight mb-1">0905035555</p>
                    <p className="text-sm font-bold text-gray-600">A/N: JASON KRISHNA SINDHU F</p>
                  </div>

                  <div className="relative w-48 h-48 bg-white p-2 rounded-xl shadow-md border border-gray-100">
                    <Image 
                      src="/qris.png" 
                      alt="QRIS Payment" 
                      fill 
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Upload Proof of Payment (Screenshot/Photo)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => setProofFile(e.target.files?.[0] || null)}
                  required
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-3 file:px-6
                    file:rounded-full file:border-0
                    file:text-sm file:font-bold
                    file:bg-[#00274c] file:text-white
                    hover:file:bg-blue-900 transition-colors file:cursor-pointer"
                />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-8 mt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#00274c] text-white font-bold py-4 rounded-full hover:bg-blue-900 transition-all shadow-md hover:shadow-lg text-lg disabled:opacity-50"
              >
                {loading ? "Processing Order..." : "Place Order"}
              </button>
            </div>

          </form>
        </div>

      </section>
    </main>
  )
}