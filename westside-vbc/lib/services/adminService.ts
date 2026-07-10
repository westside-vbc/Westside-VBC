import { db } from "@/lib/firebase"
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
import { compressImageToBase64 } from "@/lib/utils/imageCompression"

// --- ORDERS ---
export const fetchOrders = async () => {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const updateOrderStatus = async (orderId: string, newStatus: string) => {
  const orderRef = doc(db, "orders", orderId)
  await updateDoc(orderRef, { status: newStatus })
}

export const deleteOrder = async (orderId: string) => {
  await deleteDoc(doc(db, "orders", orderId))
}

// --- EVENTS ---
export const fetchEvents = async () => {
  const q = query(collection(db, "events"), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const createEvent = async (eventData: any, imageFile?: File | null) => {
  let imageUrl = eventData.imageUrl
  if (imageFile) {
    imageUrl = await compressImageToBase64(imageFile)
  }

  if (!imageUrl) {
    throw new Error("Please upload an image for new events.")
  }

  await addDoc(collection(db, "events"), {
    title: eventData.title,
    date: eventData.date,
    time: eventData.time,
    location: eventData.location,
    description: eventData.description,
    imageUrl,
    createdAt: serverTimestamp()
  })
}

export const updateEvent = async (eventId: string, eventData: any, imageFile?: File | null) => {
  let imageUrl = eventData.imageUrl
  if (imageFile) {
    imageUrl = await compressImageToBase64(imageFile)
  }

  await updateDoc(doc(db, "events", eventId), {
    title: eventData.title,
    date: eventData.date,
    time: eventData.time,
    location: eventData.location,
    description: eventData.description,
    ...(imageUrl ? { imageUrl } : {})
  })
}

export const deleteEvent = async (eventId: string) => {
  await deleteDoc(doc(db, "events", eventId))
}

// --- PRODUCTS ---
export const fetchProducts = async () => {
  const q = query(collection(db, "products"), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const createProduct = async (productData: any, imageFiles: FileList) => {
  const imageUrls = []
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i]
    const base64Str = await compressImageToBase64(file)
    imageUrls.push(base64Str)
  }

  const sizesArray = productData.sizes.split(",").map((s: string) => s.trim()).filter((s: string) => s)
  const colorsArray = productData.colors.split(",").map((c: string) => c.trim()).filter((c: string) => c)
  
  await addDoc(collection(db, "products"), {
    name: productData.name,
    price: productData.price,
    numericPrice: Number(productData.numericPrice),
    description: productData.description,
    sizes: sizesArray,
    colors: colorsArray,
    images: imageUrls,
    createdAt: serverTimestamp()
  })
}

export const deleteProduct = async (productId: string) => {
  await deleteDoc(doc(db, "products", productId))
}

// --- GALLERY ---
export const fetchGallery = async () => {
  const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const uploadGalleryImage = async (file: File) => {
  const base64Str = await compressImageToBase64(file, 1200, 0.7) // Slightly higher quality for gallery

  const docRef = await addDoc(collection(db, "gallery"), {
    url: base64Str,
    createdAt: serverTimestamp()
  })
  return { id: docRef.id, url: base64Str }
}

export const deleteGalleryImage = async (id: string, storagePath?: string) => {
  // We no longer use storagePath since we are purely in Firestore
  await deleteDoc(doc(db, "gallery", id))
}
