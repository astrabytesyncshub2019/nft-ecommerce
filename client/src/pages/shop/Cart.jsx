import React, { useEffect, useState } from "react"
import { Minus, Plus, Trash2, ShoppingCart, Package, Mountain, Compass, Backpack } from "lucide-react"
import {
  getCartProducts,
  removeProductFormCart,
  incrementCartProduct,
  decrementProductFromCart,
  deleteCart
} from "../../api/cartAPI"
import SmoothSailing from "../../components/SmoothSailing/SmoothSailing"
import CheckoutForm from "../../components/CheckOutForm/CheckOutForm"
import ConfirmDialog from "../../components/ConfirmDialogBox/ConfirmDialog"
import toast from "react-hot-toast"
import { addAddressApi } from "../../api/userAPI"
import { palceOrderApi } from "../../api/ordersAPI"

const Cart = () => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

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
      setShowConfirm((prev) => !prev)
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting cart")
    }
  }

  const total = cart.reduce(
    (sum, item) => sum + (item.product.price - item.product.discount) * item.quantity,
    0
  )

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckoutItem = (item) => {
    setSelectedProduct(item)
    setShowCheckout(true)
  }

  const handlePlaceOrder = async (addressData, paymentMethod = "COD") => {
    try {
      // 1️⃣ Save shipping address
      const newAddress = await addAddressApi(addressData)
      const addressId = newAddress._id

      // 2️⃣ Place order with payment method
      let orderRes
      if (selectedProduct) {
        orderRes = await palceOrderApi(addressId, selectedProduct.product._id, selectedProduct.quantity, paymentMethod)
      } else {
        orderRes = await palceOrderApi(addressId, null, null, paymentMethod)
      }

      const order = orderRes.data

      if (paymentMethod === "ONLINE") {

        const stripeRes = await fetch("http://localhost:8000/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            items: selectedProduct
              ? [{
                name: selectedProduct.product.name,
                price: selectedProduct.product.price - selectedProduct.product.discount,
                quantity: selectedProduct.quantity,
              }]
              : cart.map(item => ({
                name: item.product.name,
                price: item.product.price - item.product.discount,
                quantity: item.quantity,
              })),
            orderId: order._id
          })
        })

        const data = await stripeRes.json()
        if (!data.success) throw new Error(data.message || "Payment initiation failed")

        // Redirect to payment page - cart will only be cleared after successful payment
        window.location.href = data.url
      } else {

        toast.success("Order placed successfully with COD")
        setShowCheckout(false)
        setSelectedProduct(null)
        fetchCart()
      }
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || err.message || "Failed to place order")
    }
  }

  if (loading) {
    return (
      <section className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--heading-color)]"></div>
            <p className="text-gray-600 mt-4 text-lg">Loading your cart...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-teal-100  px-4 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative flex justify-center items-center gap-8 mb-4">
            <div
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform cursor-pointer"
            >
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2
            className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-2 tracking-tighter uppercase bg-gradient-to-r from-gray-900 via-teal-500 to-red-800 bg-clip-text text-transparent leading-tight drop-shadow-sm"
          >
            Cart
          </h2>
          {cart.length > 0 && (
            <p className="text-gray-600">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
              <button className="bg-[var(--heading-color)] text-white px-6 py-3 rounded-lg hover:bg-[#017465] transition-colors duration-200">
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product._id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
                  >
                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center p-6">
                      <div className="flex items-center gap-6 flex-1">
                        <div className="relative">
                          <img
                            src={item.product.image.url}
                            alt={item.product.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-gray-800 mb-1">
                            {item.product.name}
                          </h2>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-[var(--heading-color)]">
                              ₹{item.product.price - item.product.discount}
                            </span>
                            {item.product.discount > 0 && (
                              <span className="text-gray-500 line-through text-sm">
                                ₹{item.product.price}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => handleDecrease(item.product._id)}
                            className="p-2 hover:bg-white rounded-md transition-colors duration-150"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-1 font-semibold min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrease(item.product._id)}
                            className="p-2 hover:bg-white rounded-md transition-colors duration-150"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Total Price */}
                        <div className="text-right min-w-[100px]">
                          <p className="text-lg font-bold text-gray-800">
                            ₹{(item.product.price - item.product.discount) * item.quantity}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRemove(item.product._id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-150"
                            title="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                          <button
                            onClick={() => handleCheckoutItem(item)}
                            className="bg-[var(--heading-color)] text-white px-4 py-2 rounded-lg hover:bg-[#017465] transition-colors duration-200 text-sm font-medium"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden p-4">
                      <div className="flex gap-4 mb-4">
                        <img
                          src={item.product.image.url}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                            {item.product.name}
                          </h2>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg font-bold text-[var(--heading-color)]">
                              ₹{item.product.price - item.product.discount}
                            </span>
                            {item.product.discount > 0 && (
                              <span className="text-gray-500 line-through text-sm">
                                ₹{item.product.price}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            Total: ₹{(item.product.price - item.product.discount) * item.quantity}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemove(item.product._id)}
                          className="p-1 text-red-500 hover:text-red-700 self-start"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => handleDecrease(item.product._id)}
                            className="p-2 hover:bg-white rounded-md transition-colors duration-150"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 py-1 font-semibold text-center min-w-[2.5rem]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrease(item.product._id)}
                            className="p-2 hover:bg-white rounded-md transition-colors duration-150"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => handleCheckoutItem(item)}
                          className="bg-[var(--heading-color)] text-white px-4 py-2 rounded-lg hover:bg-[#017465] transition-colors duration-200 text-sm font-medium"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary - Sticky Sidebar */}
            <div className="mt-8 lg:mt-0">
              <div className="bg-white rounded-xl shadow-md p-6 lg:sticky lg:top-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items ({totalItems})</span>
                    <span className="font-medium">₹{total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold text-[var(--heading-color)]">₹{total}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleCheckoutItem()}
                    className="w-full bg-[var(--heading-color)] text-white py-3 rounded-lg hover:bg-[#017465] transition-colors duration-200 font-medium"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="w-full bg-red-50 text-red-600 py-3 rounded-lg hover:bg-red-100 transition-colors duration-200 font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showCheckout && (
        <CheckoutForm onSubmit={handlePlaceOrder} onCancel={() => setShowCheckout(false)} />
      )}

      <SmoothSailing />

      {showConfirm && (
        <ConfirmDialog
          title="Clear Cart"
          message="Are you sure you want to clear your entire cart? This action cannot be undone."
          onConfirm={handleDeleteCart}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </section>
  )
}

export default Cart