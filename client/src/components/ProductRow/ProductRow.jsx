import { Edit, Trash2 } from "lucide-react"

const ProductRow = ({ product, onEdit, onDelete }) => (
  <tr className="hover:bg-gray-50 transition-colors duration-150">
    <td className="py-4 px-6">
      {product.image ? (
        <img
          src={product.image.url}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
        />
      ) : (
        <div className="w-16 h-16 bg-gray-100 rounded-lg border flex items-center justify-center">
          <span className="text-gray-400 text-xs">No Image</span>
        </div>
      )}
    </td>
    <td className="py-4 px-6">
      <h3 className="font-semibold text-gray-900">{product.name}</h3>
      {product.description && (
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
      )}
    </td>
    <td className="py-4 px-6 font-bold">₹{product.price}</td>
    <td className="py-4 px-6 capitalize">{product.category}</td>
    <td className="py-4 px-6">
      {product.discount ? (
        <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
          ₹{product.discount}
        </span>
      ) : (
        <span className="text-gray-400 text-sm">No discount</span>
      )}
    </td>
    <td className="py-4 px-6 flex justify-center gap-2">
      <button
        onClick={() => onEdit(product)}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
        title="Edit product"
      >
        <Edit size={18} />
      </button>
      <button
        onClick={() => onDelete(product._id)}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
        title="Delete product"
      >
        <Trash2 size={18} />
      </button>
    </td>
  </tr>
)

export default ProductRow
