import React, { useEffect, useState } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { getAllProducts, getProductsByCategory, createProductApi, updateProductApi, deleteProductApi, } from "../../api/productAPI"
import ProductTable from "../../components/ProductTable/ProductTable"
import ProductFormModal from "../../components/ProductFrom/ProductForm"


const ManageProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    discount: "",
    image: null,
  })

  const fetchProducts = async (category = "all") => {
    try {
      setLoading(true)
      const res =
        category === "all"
          ? await getAllProducts()
          : await getProductsByCategory(category)
      setProducts(res)
    } catch (err) {
      toast.error("Failed to fetch products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(selectedCategory)
  }, [selectedCategory])



  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.price || !formData.category) {
      toast.error("Name, price, and category are required")
      return
    }

    try {
      const payload = new FormData()
      payload.append("name", formData.name)
      payload.append("description", formData.description)
      payload.append("price", formData.price)
      payload.append("category", formData.category)
      payload.append("discount", formData.discount || 0)

      // Only append image if new file is selected
      if (formData.image) {
        payload.append("image", formData.image)
      }

      if (editingProduct) {
  
        await updateProductApi(editingProduct._id, payload)
        toast.success("Product updated successfully")
      } else {
  
        await createProductApi(payload)
        toast.success("Product created successfully")
      }

      setShowForm(false)
      setEditingProduct(null)
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        discount: "",
        image: null,
      })


      fetchProducts(selectedCategory)

    } catch (err) {
      console.error(err)

      // Handle duplicate image error
      if (err.response && err.response.status === 409) {
        toast.error(err.response.data.message || "Duplicate image detected")
      } else {
        toast.error("Failed to save product")
      }
    }
  }






  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return
    try {
      await deleteProductApi(id)
      toast.success("Product deleted")
      fetchProducts(selectedCategory)
    } catch (err) {
      toast.error("Delete failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
              <p className="text-gray-600 mt-1">Add, edit, and manage your product inventory</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-sm font-medium min-w-fit"
            >
              <Plus size={20} /> Add Product
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <label className="text-sm font-semibold text-gray-700 min-w-fit">
              Filter by Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors duration-200 min-w-48"
            >
              <option value="all">All Products</option>
              <option value="backpacks">Backpacks</option>
              <option value="luggage">Luggage</option>
              <option value="duffles">Duffles</option>
            </select>
            <div className="text-sm text-gray-500 ml-auto">
              {products.length} product{products.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        <ProductTable
          products={products}
          loading={loading}
          onEdit={(p) => {
            setEditingProduct(p)
            setFormData({
              name: p.name,
              description: p.description,
              price: p.price,
              category: p.category,
              discount: p.discount,
              image: null,
            })
            setShowForm(true)
          }}
          onDelete={handleDelete}
        />

        {showForm && (
          <ProductFormModal
            editingProduct={editingProduct}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onClose={() => {
              setShowForm(false)
              setEditingProduct(null)
              setFormData({
                name: "",
                description: "",
                price: "",
                category: "",
                discount: "",
                image: null,
              })
            }}
          />
        )}

      </div>
    </div>
  )
}

export default ManageProducts