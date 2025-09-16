import ProductRow from "../ProductRow/ProductRow"

const ProductTable = ({ products, loading, onEdit, onDelete }) => (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-50 border-b">
                        <th className="py-4 px-6 text-left">Image</th>
                        <th className="py-4 px-6 text-left">Product Details</th>
                        <th className="py-4 px-6 text-left">Price</th>
                        <th className="py-4 px-6 text-left">Category</th>
                        <th className="py-4 px-6 text-left">Discount</th>
                        <th className="py-4 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6" className="py-12 text-center">Loading products...</td>
                        </tr>
                    ) : products.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="py-12 text-center text-gray-500">No products found</td>
                        </tr>
                    ) : (
                        products.map((p) => (
                            <ProductRow key={p._id} product={p} onEdit={onEdit} onDelete={onDelete} />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </div>
)

export default ProductTable
