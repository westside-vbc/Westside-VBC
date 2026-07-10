"use client"

import { useState, useEffect } from "react"
import { Trash2, Loader2, Upload } from "lucide-react"
import { fetchGallery, uploadGalleryImage, deleteGalleryImage as deleteGalleryImageService } from "@/lib/services/adminService"
import toast from "react-hot-toast"

export default function GalleryTab() {
  const [gallery, setGallery] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  const loadData = async () => {
    setLoading(true)
    try {
      const data = await fetchGallery()
      setGallery(data)
    } catch (error) {
      toast.error("Failed to load gallery")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const newImage = await uploadGalleryImage(file)
      setGallery(prev => [newImage, ...prev])
      toast.success("Image uploaded successfully!")
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Upload failed")
    } finally {
      setUploading(false)
      // reset file input
      e.target.value = ""
    }
  }

  const deleteGalleryItem = async (id: string, storagePath: string) => {
    if (!window.confirm("Delete this image from gallery?")) return

    try {
      await deleteGalleryImageService(id, storagePath)
      setGallery(prev => prev.filter(item => item.id !== id))
      toast.success("Image deleted")
    } catch (error) {
      console.error("Error deleting image:", error)
      toast.error("Delete failed")
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-[#00274c]">Gallery Management</h2>
        <label className="flex items-center gap-2 bg-[#00274c] text-white px-6 py-3 rounded-2xl font-bold cursor-pointer hover:scale-105 transition-transform shadow-lg">
          {uploading ? <Loader2 className="animate-spin w-5 h-5" /> : <Upload className="w-5 h-5" />}
          {uploading ? "Uploading..." : "Upload Image"}
          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
        </label>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-blue-600" /></div>
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
  )
}
