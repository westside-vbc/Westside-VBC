"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { db } from "@/lib/firebase"
import { collection, query, where, orderBy, getDocs } from "firebase/firestore"
import PageHeader from "@/components/ui/PageHeader"
import Image from "next/image"
import Link from "next/link"

export default function MyOrdersPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push("/login")
      return
    }

    const fetchMyOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"), 
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        )
        const querySnapshot = await getDocs(q)
        const fetchedOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setOrders(fetchedOrders)
      } catch (error: any) {
        console.error("Full Error:", error)
        setErrorMsg(error.code || error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMyOrders()
  }, [user, authLoading, router])

  if (authLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading Your Orders...</div>
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <PageHeader title="My Orders" imageSrc="/merchlogo.png" />

      <section className="max-w-4xl mx-auto px-6 py-12 w-full">
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-3xl mb-8 text-center">
            <p className="font-bold">Connection Error</p>
            <p className="text-sm font-mono mt-2">{errorMsg}</p>
            <p className="text-xs mt-4 text-gray-500">If it says 'failed-precondition', click the link in your browser console (F12) to create an index.</p>
          </div>
        )}

        {orders.length === 0 && !errorMsg ? (
          <div className="bg-white p-12 text-center rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-[#00274c] mb-4">No orders yet</h2>
            <p className="text-gray-500 mb-8 font-medium">You haven't placed any orders yet. Check out our merch!</p>
            <Link href="/merch" className="bg-[#00274c] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-900 transition-colors">
              Browse Merch
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-50 pb-4 gap-4">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order ID</p>
                    <p className="font-mono text-sm font-black text-[#00274c]">{order.id}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
                    order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                    order.status === 'Processing' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                    'bg-green-50 text-green-600 border border-green-100'
                  }`}>
                    {order.status}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {order.items.map((item: any, i: number) => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="relative w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#00274c] text-sm leading-tight">{item.name}</h4>
                        <p className="text-xs text-gray-500">Size: {item.size} | Qty: {item.quantity}</p>
                      </div>
                      <div className="font-bold text-[#00274c] text-sm">
                        Rp {(item.numericPrice * item.quantity).toLocaleString('id-ID')}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-500">Total Paid</span>
                  <span className="text-xl font-black text-[#00274c]">Rp {order.totalAmount.toLocaleString('id-ID')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}