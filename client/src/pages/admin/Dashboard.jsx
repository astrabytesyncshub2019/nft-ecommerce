import { useEffect, useState } from "react"
import { getAllOrdersApi } from "../../api/ordersAPI"

const Dashboard = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await getAllOrdersApi()
        const sortedOrders = [...orders].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )

        const formattedOrders = sortedOrders.map((o) => ({
          id: o._id,
          user: `${o.user?.fullname?.firstname || ""} ${o.user?.fullname?.lastname || ""}`,
          userId: o.user?._id || "N/A",
          total: o.totalAmount,
          status: o.status,
          date: new Date(o.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          address: `${o.shippingAddress?.street || ""}, ${o.shippingAddress?.city || ""}, ${o.shippingAddress?.state || ""}, ${o.shippingAddress?.zip || ""}`,
        }))

        setOrders(formattedOrders)
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-6 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-6 border-b pb-3">All Orders</h3>
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 sticky top-0">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">User</th>
              <th className="p-3">User ID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Address</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
            </tr>
          </thead >
          <tbody >
            {orders.map((order, idx) => (
              <tr
                key={idx}
                className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-gray-100 transition`}
              >
                <td className="p-3 font-mono text-sm">{order.id}</td>
                <td className="p-3">{order.user}</td>
                <td className="p-3 text-gray-600 text-sm">{order.userId}</td>
                <td className="p-3 text-sm">{order.date}</td>
                <td className="p-3 w-64 text-sm">{order.address}</td>
                <td className="p-3 font-semibold">₹{order.total}</td>
                <td
                  className={`p-3 font-medium ${order.status === "Completed"
                      ? "text-green-600"
                      : order.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
