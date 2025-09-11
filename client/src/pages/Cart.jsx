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

const Cart = () => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)


  const fetchCart = async () => {
    try {
      const data = await getCartProducts()
      setCart(data || [])
    } catch (err) {
      console.error("Error fetching cart:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [cart])


  const handleIncrease = async (id) => {
    try {
      await incrementCartProduct(id)
      fetchCart()
    } catch (err) {
      console.error("Error incrementing product:", err)
    }
  }

  const handleDecrease = async (id) => {
    try {
      await decrementProductFromCart(id)
      fetchCart()
    } catch (err) {
      console.error("Error decrementing product:", err)
    }
  }

  const handleRemove = async (id) => {
    try {
      await removeProductFormCart(id)
      fetchCart()
    } catch (err) {
      console.error("Error removing product:", err)
    }
  }

  const handleDeleteCart = async () => {
    try {
      await deleteCart()
      setCart([])
    } catch (err) {
      console.error("Error deleting cart:", err)
    }
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (loading) return <p className="text-center py-6">Loading cart...</p>

  return (
    <>
    <section className="min-h-screen w-full bg-white px-6 py-24" >

      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center uppercase">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-lg text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid gap-6">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">{item.name}</h2>
                      <p className="text-gray-600">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDecrease(item.productId)}
                      className="p-2 border rounded-md hover:bg-gray-100"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-3 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.productId)}
                      className="p-2 border rounded-md hover:bg-gray-100"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-lg font-bold">
                      ₹{item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8 border-t pt-6">
              <h2 className="text-2xl font-bold">Total: ₹{total}</h2>
              <button
                onClick={handleDeleteCart}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    <SmoothSailing/>
    </section>
    </>
  )
}

export default Cart
