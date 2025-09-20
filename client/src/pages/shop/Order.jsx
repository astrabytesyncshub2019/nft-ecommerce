import React, { useEffect, useState, useRef } from "react"
import { getUserOrdersApi } from "../../api/ordersAPI"
import { CheckCircle, Clock, Package, MapPin, ArrowRight ,Plane,LuggageIcon} from "lucide-react"
import { useNavigate } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const sectionRef = useRef(null)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getUserOrdersApi()
                setOrders(data || [])
            } catch (err) {
                console.error("Error fetching orders:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
                <div className="flex items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--heading-color)]"></div>
                    <p className="text-lg sm:text-xl text-gray-700 font-semibold">
                        Loading your orders...
                    </p>
                </div>
            </div>
        )
    }

    if (!orders.length) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4">
                <Package className="h-16 w-16 sm:h-20 sm:w-20 text-gray-400 mb-6 animate-pulse" />
                <p className="text-lg sm:text-xl text-gray-700 font-semibold mb-6 text-center">
                    You have not placed any orders yet.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="group inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[var(--heading-color)] to-[var(--secondary-bg-color)] text-white px-6 sm:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold uppercase tracking-wide text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                    <span>Start Shopping</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
            </div>
        )
    }

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-gradient-to-br from-yellow-100 via-white to-purple-100 px-4 sm:px-6 md:px-10 py-12 sm:py-16 lg:py-20"
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 relative">
                    <div className="relative flex justify-center items-center gap-6 mb-8">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>

                        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl" >
                            <LuggageIcon className="w-8 h-8 text-white" />
                        </div>

                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                        >
                            <Plane className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    <h2 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tighter uppercase bg-gradient-to-r from-red-900 via-indigo-500 to-yellow-600 bg-clip-text text-transparent leading-tight"
                    >
                        My Orders
                    </h2>

                    <div className="relative h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-6 max-w-md mx-auto"></div>

                
                </div>

                {/* Orders Grid - 2 per row */}
                <div className="grid gap-6 sm:grid-cols-2">
                    {orders.map((order) => {
                        const firstItem = order.items[0]
                        return (
                            <div
                                key={order._id}
                                className="bg-white shadow-lg rounded-xl p-5 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-5"
                            >
                                {/* Product Image */}
                                {firstItem?.product?.image?.url && (
                                    <div className="w-full sm:w-40 h-40 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                                        <img
                                            src={firstItem.product.image.url}
                                            alt={firstItem.name}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 ease-out"
                                        />
                                    </div>
                                )}

                                {/* Order Details */}
                                <div className="flex-1 flex flex-col">
                                    {/* Header */}
                                    <div className="flex justify-between items-center mb-3">
                                        <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                                            Order #{order._id.slice(-6)}
                                        </h2>
                                        <span
                                            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${order.status === "completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {order.status === "completed" ? (
                                                <CheckCircle className="h-4 w-4" />
                                            ) : (
                                                <Clock className="h-4 w-4" />
                                            )}
                                            {order.status.charAt(0).toUpperCase() +
                                                order.status.slice(1)}
                                        </span>
                                    </div>

                                    {/* Shipping Address */}
                                    <div className="mb-3 bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-start gap-2">
                                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            {order.shippingAddress.street},{" "}
                                            {order.shippingAddress.city},{" "}
                                            {order.shippingAddress.state},{" "}
                                            {order.shippingAddress.country} -{" "}
                                            {order.shippingAddress.postalCode}
                                        </p>
                                    </div>

                                    {/* Items */}
                                    <ul className="flex-1 space-y-1 mb-3">
                                        {order.items.slice(0, 2).map((item) => (
                                            <li
                                                key={item._id}
                                                className="flex justify-between text-xs text-gray-700"
                                            >
                                                <span className="truncate flex-1">
                                                    {item.name} × {item.quantity}
                                                </span>
                                                <span className="font-medium">
                                                    ₹
                                                    {(
                                                        (item.price - item.discount) *
                                                        item.quantity
                                                    ).toLocaleString("en-IN")}
                                                </span>
                                            </li>
                                        ))}
                                        {order.items.length > 2 && (
                                            <li className="text-xs text-gray-500 italic">
                                                + {order.items.length - 2} more item
                                                {order.items.length - 2 > 1 ? "s" : ""}
                                            </li>
                                        )}
                                    </ul>

                                    {/* Footer */}
                                    <div className="flex justify-between items-center text-xs border-t pt-3 mt-auto">
                                        <p className="text-gray-600">
                                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <p className="font-semibold text-gray-800">
                                                ₹{order.totalAmount.toLocaleString("en-IN")}
                                            </p>
                                            <button
                                                className="group inline-flex items-center gap-1 bg-[var(--heading-color)] text-white px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide hover:shadow-md"
                                            >
                                                View
                                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Orders
