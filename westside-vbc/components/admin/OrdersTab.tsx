"use client"

import { useState, useEffect } from "react"
import { Eye, Trash2, Loader2 } from "lucide-react"
import { fetchOrders, updateOrderStatus as updateOrderService, deleteOrder as deleteOrderService } from "@/lib/services/adminService"
import toast from "react-hot-toast"

export default function OrdersTab({ setSelectedProof }: { setSelectedProof: (url: string | null) => void }) {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchOrders()
        setOrders(data)
      } catch (error) {
        toast.error("Failed to load orders")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderService(orderId, newStatus)
      setOrders(currentOrders => 
        currentOrders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      )
      toast.success("Order status updated")
    } catch (error) {
      console.error("Error updating status:", error)
      toast.error("Failed to update status")
    }
  }

  const deleteOrder = async (orderId: string) => {
    if (!window.confirm("Are you sure you want to completely delete this order?")) {
      return
    }

    try {
      await deleteOrderService(orderId)
      setOrders(currentOrders => currentOrders.filter(order => order.id !== orderId))
      toast.success("Order deleted")
    } catch (error) {
      console.error("Error deleting order:", error)
      toast.error("Failed to delete order")
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-black text-[#00274c] mb-8">Recent Orders</h2>
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-blue-600" /></div>
      ) : orders.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl shadow-sm border border-gray-100">
          <p className="text-gray-500 font-medium">No orders found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 border-b border-gray-50 pb-4 gap-4">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order ID</p>
                    <p className="text-sm font-mono text-gray-800 break-all">{order.id}</p>
                  </div>
                  <div className="text-left sm:text-right">
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
                      order.status === 'Cancelled' ? 'bg-red-50 border-red-200 text-red-700' :
                      'bg-green-50 border-green-200 text-green-700'
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Done">Done</option>
                    <option value="Cancelled">Cancelled</option>
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
    </div>
  )
}
