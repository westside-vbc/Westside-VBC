"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import PageHeader from "@/components/ui/PageHeader"
import { ExternalLink, Eye, X, Trash2 } from "lucide-react"

// Authorized admin emails
const ADMIN_EMAILS = ["filemonjose13@gmail.com", "jason4realyt@gmail.com"]

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProof, setSelectedProof] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading) return

    if (!user || !ADMIN_EMAILS.includes(user.email || "")) {
      router.push("/") // Redirect non-admins to home
      return
    }

    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(q)
        const fetchedOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setOrders(fetchedOrders)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user, authLoading, router])

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const orderRef = doc(db, "orders", orderId)
      await updateDoc(orderRef, { status: newStatus })
      
      // Update local state
      setOrders(currentOrders => 
        currentOrders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      )
    } catch (error) {
      console.error("Error updating status:", error)
      alert("Failed to update status")
    }
  }

  const deleteOrder = async (orderId: string) => {
    if (!window.confirm("Are you sure you want to completely delete this order? This cannot be undone.")) {
      return
    }

    try {
      await deleteDoc(doc(db, "orders", orderId))
      setOrders(currentOrders => currentOrders.filter(order => order.id !== orderId))
    } catch (error) {
      console.error("Error deleting order:", error)
      alert("Failed to delete order")
    }
  }

  if (authLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading Dashboard...</div>
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <PageHeader title="Admin Dashboard" imageSrc="/merchlogo.png" />

      <section className="max-w-7xl mx-auto px-6 py-12 w-full">
        <h2 className="text-3xl font-black text-[#00274c] mb-8">Recent Orders</h2>

        {orders.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-500 font-medium">No orders found.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-8">
                
                {/* Order Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-4">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order ID</p>
                      <p className="text-sm font-mono text-gray-800">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date</p>
                      <p className="text-sm text-gray-800">
                        {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Customer</p>
                      <p className="font-bold text-[#00274c]">{order.customerName}</p>
                      <p className="text-sm text-gray-600">{order.userEmail}</p>
                      <p className="text-sm text-gray-600">{order.phoneNumber}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Items</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {order.items.map((item: any, i: number) => (
                        <li key={i} className="flex justify-between">
                          <span>{item.quantity}x {item.name} ({item.size})</span>
                          <span>Rp {(item.numericPrice * item.quantity).toLocaleString('id-ID')}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 pt-2 border-t border-gray-50 flex justify-between font-bold text-[#00274c]">
                      <span>Total</span>
                      <span>Rp {order.totalAmount.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="w-full lg:w-72 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-8">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Payment Proof</p>
                    <button 
                      onClick={() => setSelectedProof(order.paymentProofUrl)}
                      className="w-full inline-flex items-center justify-center gap-2 text-sm bg-blue-50 text-blue-600 font-bold px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Eye className="w-4 h-4" /> View Receipt
                    </button>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Status</p>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg font-bold text-sm border-2 outline-none cursor-pointer ${
                        order.status === 'Pending' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' :
                        order.status === 'Processing' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                        'bg-green-50 border-green-200 text-green-700'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => deleteOrder(order.id)}
                      className="w-full inline-flex items-center justify-center gap-2 text-sm bg-red-50 text-red-600 font-bold px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" /> Delete Order
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* Image Modal */}
      {selectedProof && (
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