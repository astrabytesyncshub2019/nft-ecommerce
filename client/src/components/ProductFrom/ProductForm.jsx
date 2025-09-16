import { Plus, Edit } from "lucide-react"

const ProductFormModal = ({
  editingProduct,
  formData,
  setFormData,
  onSubmit,
  onClose,
}) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="sticky top-0 bg-white border-b px-8 py-6 rounded-t-2xl ">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            {editingProduct ? (
              <>
                <Edit className="text-blue-600" size={24} /> Edit Product
              </>
            ) : (
              <>
                <Plus className="text-green-600" size={24} /> Add New Product
              </>
            )}
          </h2>
        </div>


        <div className="px-8 py-6">
          <form onSubmit={onSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-semibold">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>


            <div>
              <label className="block text-sm font-semibold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>


            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-semibold">Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold">Discount (₹)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="">Select Category</option>
                <option value="backpacks">Backpacks</option>
                <option value="luggage">Luggage</option>
                <option value="duffles">Duffles</option>
              </select>
            </div>


            <div>
              <label className="block text-sm font-semibold">Product Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>


            {formData.image && (
              <div className="flex justify-center">
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded-xl border"
                />
              </div>
            )}


            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-green-600 text-white rounded-xl"
              >
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductFormModal
