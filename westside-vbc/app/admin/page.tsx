"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { db, storage } from "@/lib/firebase"
import { 
  collection, 
  query, 
  orderBy, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore"
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from "firebase/storage"
import PageHeader from "@/components/ui/PageHeader"
import { ExternalLink, Eye, X, Trash2, Upload, Image as ImageIcon, ShoppingBag, Loader2, PackagePlus, Calendar } from "lucide-react"

// Authorized admin emails
const ADMIN_EMAILS = ["filemonjose13@gmail.com", "jason4realyt@gmail.com"]

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"orders" | "gallery" | "products" | "events">("orders")
  const [orders, setOrders] = useState<any[]>([])
  const [gallery, setGallery] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [addingEvent, setAddingEvent] = useState(false)
  const [editingEventId, setEditingEventId] = useState<string | null>(null)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    imageUrl: ""
  })
  const [eventImage, setEventImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadingProduct, setUploadingProduct] = useState(false)
  const [selectedProof, setSelectedProof] = useState<string | null>(null)

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    numericPrice: 0,
    description: "",
    sizes: "S, M, L, XL, XXL",
    colors: "Black, White",
  })
  const [productImages, setProductImages] = useState<FileList | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      if (activeTab === "orders") {
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(q)
        setOrders(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      } else if (activeTab === "gallery") {
        const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(q)
        setGallery(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      } else if (activeTab === "products") {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(q)
        setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      } else if (activeTab === "events") {
        const q = query(collection(db, "events"), orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(q)
        setEvents(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) {
      alert("Please fill all required fields.")
      return
    }
    setAddingEvent(true)
    try {
      let imageUrl = newEvent.imageUrl
      if (eventImage) {
        const storageRef = ref(storage, `events/${Date.now()}_${eventImage.name.replace(/[^a-zA-Z0-9.]/g, '')}`)
        await uploadBytes(storageRef, eventImage)
        imageUrl = await getDownloadURL(storageRef)
      }

      if (editingEventId) {
        await updateDoc(doc(db, "events", editingEventId), {
          title: newEvent.title,
          date: newEvent.date,
          time: newEvent.time,
          location: newEvent.location,
          description: newEvent.description,
          ...(imageUrl ? { imageUrl } : {})
        })
        alert("Event updated successfully!")
      } else {
        if (!imageUrl) {
          alert("Please upload an image for new events.")
          setAddingEvent(false)
          return
        }
        await addDoc(collection(db, "events"), {
          title: newEvent.title,
          date: newEvent.date,
          time: newEvent.time,
          location: newEvent.location,
          description: newEvent.description,
          imageUrl,
          createdAt: serverTimestamp()
        })
        alert("Event added successfully!")
      }
      
      setNewEvent({ title: "", date: "", time: "", location: "", description: "", imageUrl: "" })
      setEventImage(null)
      setEditingEventId(null)
      fetchData()
    } catch (error) {
      console.error("Error saving event:", error)
      alert("Failed to save event")
    } finally {
      setAddingEvent(false)
    }
  }

  const cancelEdit = () => {
    setNewEvent({ title: "", date: "", time: "", location: "", description: "", imageUrl: "" })
    setEventImage(null)
    setEditingEventId(null)
  }

  const deleteEvent = async (eventId: string, imageUrl?: string) => {
    if (!window.confirm("Delete this event?")) return
    try {
      await deleteDoc(doc(db, "events", eventId))
      setEvents(prev => prev.filter(e => e.id !== eventId))
    } catch (error) {
      console.error("Error deleting event:", error)
      alert("Delete failed")
    }
  }

  useEffect(() => {
    if (authLoading) return

    if (!user || !ADMIN_EMAILS.includes(user.email || "")) {
      router.push("/") // Redirect non-admins to home
      return
    }

    fetchData()
  }, [user, authLoading, router, activeTab])

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const orderRef = doc(db, "orders", orderId)
      await updateDoc(orderRef, { status: newStatus })
      
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
    if (!window.confirm("Are you sure you want to completely delete this order?")) {
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)

      const docRef = await addDoc(collection(db, "gallery"), {
        url,
        storagePath: storageRef.fullPath,
        createdAt: serverTimestamp()
      })

      setGallery(prev => [{ id: docRef.id, url, storagePath: storageRef.fullPath }, ...prev])
      alert("Image uploaded successfully!")
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const deleteGalleryItem = async (id: string, storagePath: string) => {
    if (!window.confirm("Delete this image from gallery?")) return

    try {
      if (storagePath) {
        const storageRef = ref(storage, storagePath)
        await deleteObject(storageRef)
      }
      await deleteDoc(doc(db, "gallery", id))
      setGallery(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      console.error("Error deleting image:", error)
      alert("Delete failed")
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProduct.name || !productImages || productImages.length === 0) {
      alert("Please fill all required fields and upload at least one image.")
      return
    }

    setUploadingProduct(true)
    try {
      const imageUrls = []
      for (let i = 0; i < productImages.length; i++) {
        const file = productImages[i]
        const storageRef = ref(storage, `products/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`)
        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)
        imageUrls.push(url)
      }

      const sizesArray = newProduct.sizes.split(",").map(s => s.trim()).filter(s => s)
      const colorsArray = newProduct.colors.split(",").map(c => c.trim()).filter(c => c)
      
      const docRef = await addDoc(collection(db, "products"), {
        name: newProduct.name,
        price: newProduct.price,
        numericPrice: Number(newProduct.numericPrice),
        description: newProduct.description,
        sizes: sizesArray,
        colors: colorsArray,
        images: imageUrls,
        createdAt: serverTimestamp()
      })

      alert("Product added successfully!")
      setNewProduct({ name: "", price: "", numericPrice: 0, description: "", sizes: "S, M, L, XL, XXL", colors: "Black, White" })
      setProductImages(null)
      fetchData()
    } catch (error) {
      console.error("Error adding product:", error)
      alert("Failed to add product")
    } finally {
      setUploadingProduct(false)
    }
  }

  const deleteProduct = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return
    try {
      await deleteDoc(doc(db, "products", productId))
      setProducts(prev => prev.filter(p => p.id !== productId))
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Delete failed")
    }
  }

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
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
        </div>

        {activeTab === "events" ? (
          <div>
            <h2 className="text-3xl font-black text-[#00274c] mb-8">Events Management</h2>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
              <h3 className="text-xl font-bold mb-6">{editingEventId ? "Edit Event" : "Create New Event"}</h3>
              <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Event Banner / Image {editingEventId && "(Leave blank to keep current image)"}</label>
                  <input type="file" accept="image/*" onChange={e => setEventImage(e.target.files?.[0] || null)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-primary" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Event Title</label>
                  <input required type="text" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-primary" placeholder="e.g. Summer Tournament" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                  <input required type="date" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-primary" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Time</label>
                  <input required type="text" value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-primary" placeholder="e.g. 19.00 - 21.00" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                  <input required type="text" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-primary" placeholder="e.g. SMA MDC" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea required value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-primary" rows={3} placeholder="Event description..."></textarea>
                </div>
                <div className="md:col-span-2 flex justify-end gap-4">
                  {editingEventId && (
                    <button type="button" onClick={cancelEdit} className="bg-gray-200 text-gray-700 font-bold px-8 py-3 rounded-xl hover:bg-gray-300 transition-colors">
                      Cancel
                    </button>
                  )}
                  <button type="submit" disabled={addingEvent} className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-900 transition-colors flex items-center gap-2">
                    {addingEvent ? <Loader2 className="animate-spin w-5 h-5" /> : <PackagePlus className="w-5 h-5" />}
                    {addingEvent ? "Saving..." : editingEventId ? "Update Event" : "Create Event"}
                  </button>
                </div>
              </form>
            </div>

            <h3 className="text-2xl font-bold text-[#00274c] mb-6">Upcoming Events</h3>
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>
            ) : events.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl shadow-sm border border-gray-100">
                <p className="text-gray-500 font-medium">No events found. Add your first event!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((evt) => (
                  <div key={evt.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="relative h-48 w-full bg-gray-100">
                      {evt.imageUrl && <img src={evt.imageUrl} alt={evt.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h4 className="font-bold text-lg mb-2 text-primary">{evt.title}</h4>
                      <ul className="text-sm text-gray-600 space-y-1 mb-4 flex-grow">
                        <li><strong>Date:</strong> {evt.date}</li>
                        <li><strong>Time:</strong> {evt.time}</li>
                        <li><strong>Location:</strong> {evt.location}</li>
                      </ul>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4">{evt.description}</p>
                      <div className="mt-auto flex gap-2">
                        <button onClick={() => {
                          setNewEvent({
                            title: evt.title || "",
                            date: evt.date || "",
                            time: evt.time || "",
                            location: evt.location || "",
                            description: evt.description || "",
                            imageUrl: evt.imageUrl || ""
                          })
                          setEditingEventId(evt.id)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }} className="flex-1 py-2 bg-blue-50 text-blue-600 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
                          Edit
                        </button>
                        <button onClick={() => deleteEvent(evt.id, evt.imageUrl)} className="flex-1 py-2 bg-red-50 text-red-600 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === "orders" ? (
          <div>
            <h2 className="text-3xl font-black text-[#00274c] mb-8">Recent Orders</h2>
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>
            ) : orders.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl shadow-sm border border-gray-100">
                <p className="text-gray-500 font-medium">No orders found.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-8">
                    {/* Order Info (Same as before) */}
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
        ) : activeTab === "products" ? (
          <div>
            <h2 className="text-3xl font-black text-[#00274c] mb-8">Merchandise Management</h2>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
              <h3 className="text-xl font-bold mb-6">Add New Product</h3>
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                  <input required type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-primary" placeholder="e.g. Westside Hoodie" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Display Price Label (Buat tampilan di merch page)</label>
                  <input required type="text" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-primary" placeholder="e.g. IDR 150.000" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Price (Masukin tanpa koma atau titik)</label>
                  <input required type="number" value={newProduct.numericPrice} onChange={e => setNewProduct({...newProduct, numericPrice: parseInt(e.target.value) || 0})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-primary" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Available Sizes (Pisahin pake koma)</label>
                  <input required type="text" value={newProduct.sizes} onChange={e => setNewProduct({...newProduct, sizes: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-primary" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Available Colors (Pisahin pake koma)</label>
                  <input required type="text" value={newProduct.colors} onChange={e => setNewProduct({...newProduct, colors: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-primary" placeholder="e.g. Black, White, Red" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-primary" rows={3}></textarea>
                </div>
                <div className="md:col-span-2 border-2 border-dashed border-gray-200 p-6 rounded-2xl text-center">
                  <label className="flex flex-col items-center justify-center cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-gray-600 font-medium">Upload Product Images</span>
                    <span className="text-sm text-gray-400 mt-1">Select multiple images (PNG/JPG)</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={e => setProductImages(e.target.files)} />
                  </label>
                  {productImages && <p className="mt-4 text-sm font-bold text-primary">{productImages.length} images selected</p>}
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button type="submit" disabled={uploadingProduct} className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-900 transition-colors flex items-center gap-2">
                    {uploadingProduct ? <Loader2 className="animate-spin w-5 h-5" /> : <PackagePlus className="w-5 h-5" />}
                    {uploadingProduct ? "Adding Product..." : "Add Product"}
                  </button>
                </div>
              </form>
            </div>

            <h3 className="text-2xl font-bold text-[#00274c] mb-6">Added Products</h3>
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>
            ) : products.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl shadow-sm border border-gray-100">
                <p className="text-gray-500 font-medium">No custom products added yet. Note: Hardcoded products will still appear on the merch page.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="h-48 bg-gray-50 relative">
                      {product.images && product.images.length > 0 && (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain p-4" />
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h4 className="font-bold text-lg mb-1">{product.name}</h4>
                      <p className="text-primary font-bold mb-4">{product.price}</p>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4">{product.description}</p>
                      <div className="mt-auto">
                        <button onClick={() => deleteProduct(product.id)} className="w-full py-2 bg-red-50 text-red-600 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-[#00274c]">Gallery Management</h2>
              <label className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold cursor-pointer hover:scale-105 transition-transform shadow-lg">
                {uploading ? <Loader2 className="animate-spin w-5 h-5" /> : <Upload className="w-5 h-5" />}
                {uploading ? "Uploading..." : "Upload Image"}
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
              </label>
            </div>

            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>
            ) : gallery.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl shadow-sm border border-gray-100">
                <p className="text-gray-500 font-medium">No gallery items found. Upload your first image!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {gallery.map((item) => (
                  <div key={item.id} className="group relative aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                    <img src={item.url} alt="Gallery" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => deleteGalleryItem(item.id, item.storagePath)}
                        className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Image Modal (for Order Payment Proof) */}
      {selectedProof && ( activeTab === "orders" && (
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
      ))}
    </main>
  )
}