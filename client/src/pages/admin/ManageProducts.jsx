import React, { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import toast from "react-hot-toast"
import {
  getAllProducts,
  getProductsByCategory,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from "../../api/productAPI"
import ProductTable from "../../components/ProductTable/ProductTable"
import ProductFormModal from "../../components/ProductFrom/ProductForm"
import ConfirmDialog from "../../components/ConfirmDialogBox/ConfirmDialog"

const ManageProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    discount: "",
    stock: "",
    image: null,
  })

  const resetForm = () => {
    setEditingProduct(null)
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      discount: "",
      stock: "",
      image: null,
    })
  }

  const fetchProducts = async (category = "all") => {
    try {
      setLoading(true)
      const res =
        category === "all"
          ? await getAllProducts()
          : await getProductsByCategory(category)
      setProducts(res)
    } catch {
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
    if (!formData.name || !formData.price || !formData.category || !formData.stock) {
      toast.error("Name, price, category and stock are required")
      return
    }

    try {
      const payload = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value) payload.append(key, value)
      })

      if (editingProduct) {
        await updateProductApi(editingProduct._id, payload)
        toast.success("Product updated successfully")
      } else {
        await createProductApi(payload)
        toast.success("Product created successfully")
      }

      setShowForm(false)
      resetForm()
      fetchProducts(selectedCategory)
    } catch (err) {
      console.error(err)
      if (err.response?.status === 409) {
        toast.error(err.response.data.message || "Duplicate image detected")
      } else {
        toast.error("Failed to save product")
      }
    }
  }

  const handleDelete = async () => {
    try {
      await deleteProductApi(deleteId)
      toast.success("Product deleted")
      fetchProducts(selectedCategory)
    } catch {
      toast.error("Delete failed")
    } finally {
      setShowConfirm(false)
      setDeleteId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
            <p className="text-gray-600 mt-1">
              Add, edit, and manage your product inventory
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[var(--heading-color)] text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-sm font-medium"
          >
            <Plus size={20} /> Add Product
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
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
            {products.length} product{products.length !== 1 ? "s" : ""} found
          </div>
        </div>

        {/* Table */}
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
              stock: p.stock,
              image: null,
            })
            setShowForm(true)
          }}
          onDelete={(id) => {
            setDeleteId(id)
            setShowConfirm(true)
          }}
        />

        {/* Form Modal */}

      </div>
      {showForm && (
        <ProductFormModal
          editingProduct={editingProduct}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false)
            resetForm()
          }}
        />
      )}
      {showConfirm && (
        <ConfirmDialog
          title="Delete Product"
          message="Are you sure you want to delete this product? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  )
}

export default ManageProducts
