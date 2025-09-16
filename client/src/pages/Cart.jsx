import React, { useEffect, useState } from "react"
import { Minus, Plus, Trash2 } from "lucide-react"
import {
  getCartProducts,
  removeProductFormCart,
  incrementCartProduct,
  decrementProductFromCart,
  deleteCart
} from "../api/cartAPI"
import SmoothSailing from "../components/SmoothSailing/SmoothSailing"
import toast from "react-hot-toast"


const Cart = () => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCart = async () => {
    try {
      const data = await getCartProducts()
      setCart(data || [])
    } catch (err) {
      if (err.response?.status === 404) {
        setCart([])
      } else {
        console.error("Error fetching cart:", err)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const handleIncrease = async (productId) => {
    try {
      await incrementCartProduct(productId)
      fetchCart()
    } catch (err) {
      const message = err.response?.data?.message || "Error incrementing product"
      toast.error(message)
      console.error("Error incrementing product:", err)
    }
  }

  const handleDecrease = async (productId) => {
    try {
      await decrementProductFromCart(productId)
      fetchCart()
    } catch (err) {
      const message = err.response?.data?.message || "Error decrementing product"
      toast.error(message)
      console.error("Error decrementing product:", err)
    }
  }


  const handleRemove = async (productId) => {
    try {
      await removeProductFormCart(productId)
      fetchCart()
    } catch (err) {
      toast.error(err.response?.data?.message || "Error removing product")
    }
  }

  const handleDeleteCart = async () => {
    try {
      await deleteCart()
      setCart([])
      toast.success("Cart cleared")
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting cart")
    }
  }


  const total = cart.reduce(
    (sum, item) => sum + (item.product.price - item.product.discount) * item.quantity,
    0
  )

  if (loading) return <p className="text-center py-6">Loading cart...</p>

  return (

    <section className="min-h-screen w-full bg-white px-6 py-24">
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center uppercase">Your Cart</h1>

        {cart.length === 0 ? (

          <p className="text-lg text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid gap-6">
              {cart.map((item) => (


                <div
                  key={item.product._id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md "
                >

                  <div className="flex items-center gap-6 flex-1">
                    <img
                      src={item.product.image.url}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">{item.product.name}</h2>
                      <span className="text-gray-600 ">₹{item.product.price - item.product.discount}</span>
                      <span className="text-gray-600 line-through ml-2 text-sm">₹{item.product.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mr-8">
                    <button
                      onClick={() => handleDecrease(item.product._id)}
                      className="p-2 border rounded-md hover:bg-gray-100"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-3 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.product._id)}
                      className="p-2 border rounded-md hover:bg-gray-100"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-lg font-bold">
                      ₹{(item.product.price - item.product.discount) * item.quantity}
                    </p>
                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8 border-t pt-6">
              <h2 className="text-2xl font-bold flex-1 ">Total: ₹{total}</h2>
              <button
                onClick={handleDeleteCart}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mr-8"
              >
                Clear Cart
              </button>
              <button

                className="bg-[var(--heading-color)] text-white px-4 py-2 rounded-lg hover:bg-[#017465] capitalize"
              >
                checkout
              </button>
            </div>
          </>
        )}
      </div>
      <SmoothSailing />
    </section>
  )
}

export default Cart
