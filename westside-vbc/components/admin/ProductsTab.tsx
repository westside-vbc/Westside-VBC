"use client"

import { useState, useEffect } from "react"
import { Trash2, Loader2, PackagePlus, Upload } from "lucide-react"
import { fetchProducts, createProduct, deleteProduct as deleteProductService } from "@/lib/services/adminService"
import toast from "react-hot-toast"

export default function ProductsTab() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploadingProduct, setUploadingProduct] = useState(false)
  
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    numericPrice: 0,
    description: "",
    sizes: "S, M, L, XL, XXL",
    colors: "Black, White",
  })
  const [productImages, setProductImages] = useState<FileList | null>(null)

  const loadData = async () => {
    setLoading(true)
    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch (error) {
      toast.error("Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProduct.name || !productImages || productImages.length === 0) {
      toast.error("Please fill all required fields and upload at least one image.")
      return
    }

    setUploadingProduct(true)
    try {
      await createProduct(newProduct, productImages)
      toast.success("Product added successfully!")
      
      setNewProduct({ name: "", price: "", numericPrice: 0, description: "", sizes: "S, M, L, XL, XXL", colors: "Black, White" })
      setProductImages(null)
      
      // Reset file input by using a ref or just triggering re-render of input, 
      // but simpler to just clear state. Form reset might be needed if input stays populated.
      
      loadData()
    } catch (error: any) {
      console.error("Error adding product:", error)
      toast.error(error.message || "Failed to add product")
    } finally {
      setUploadingProduct(false)
    }
  }

  const deleteProduct = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return
    try {
      await deleteProductService(productId)
      setProducts(prev => prev.filter(p => p.id !== productId))
      toast.success("Product deleted")
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error("Delete failed")
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-black text-[#00274c] mb-8">Merchandise Management</h2>
      
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
        <h3 className="text-xl font-bold mb-6">Add New Product</h3>
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
            <input required type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-blue-600" placeholder="e.g. Westside Hoodie" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Display Price Label</label>
            <input required type="text" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-blue-600" placeholder="e.g. IDR 150.000" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Numeric Price (No commas/dots)</label>
            <input required type="number" value={newProduct.numericPrice} onChange={e => setNewProduct({...newProduct, numericPrice: parseInt(e.target.value) || 0})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Available Sizes (Comma separated)</label>
            <input required type="text" value={newProduct.sizes} onChange={e => setNewProduct({...newProduct, sizes: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Available Colors (Comma separated)</label>
            <input required type="text" value={newProduct.colors} onChange={e => setNewProduct({...newProduct, colors: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-blue-600" placeholder="e.g. Black, White, Red" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
            <textarea required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-blue-600" rows={3}></textarea>
          </div>
          <div className="md:col-span-2 border-2 border-dashed border-gray-200 p-6 rounded-2xl text-center">
            <label className="flex flex-col items-center justify-center cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-gray-600 font-medium">Upload Product Images</span>
              <span className="text-sm text-gray-400 mt-1">Select multiple images (PNG/JPG)</span>
              <input type="file" multiple accept="image/*" className="hidden" onChange={e => setProductImages(e.target.files)} />
            </label>
            {productImages && <p className="mt-4 text-sm font-bold text-blue-600">{productImages.length} images selected</p>}
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" disabled={uploadingProduct} className="bg-[#00274c] text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-900 transition-colors flex items-center gap-2">
              {uploadingProduct ? <Loader2 className="animate-spin w-5 h-5" /> : <PackagePlus className="w-5 h-5" />}
              {uploadingProduct ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>

      <h3 className="text-2xl font-bold text-[#00274c] mb-6">Added Products</h3>
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-blue-600" /></div>
      ) : products.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl shadow-sm border border-gray-100">
          <p className="text-gray-500 font-medium">No custom products added yet.</p>
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
                <p className="text-blue-600 font-bold mb-4">{product.price}</p>
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
  )
}
