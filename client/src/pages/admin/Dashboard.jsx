import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { getAllProducts } from "../../api/productAPI"

const Dashboard = () => {
  const [ordersData, setOrdersData] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [recentOrders, setRecentOrders] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {

        const products = await getAllProducts()
        const ordersTrend = [
          { name: "Mon", orders: 12 },
          { name: "Tue", orders: 19 },
          { name: "Wed", orders: 7 },
          { name: "Thu", orders: 15 },
          { name: "Fri", orders: 22 },
        ]
        const productSales = products.map((p, i) => ({
          name: p.name,
          sales: Math.floor(Math.random() * 100) + 10, // dummy random sales
        }))

        const orders = [
          { id: "#1234", user: "John Doe", total: 250, status: "Completed" },
          { id: "#1235", user: "Jane Smith", total: 120, status: "Pending" },
        ]

        setOrdersData(ordersTrend)
        setTopProducts(productSales.slice(0, 5)) 
        setRecentOrders(orders)
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-6 p-6">
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Orders Trend */}
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h3 className="text-lg font-semibold mb-4">Orders Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white shadow-lg rounded-2xl p-4">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">Order ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.user}</td>
                <td className="p-2">${order.total}</td>
                <td
                  className={`p-2 ${
                    order.status === "Completed"
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
