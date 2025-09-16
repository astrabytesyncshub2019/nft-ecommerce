import { Users, ShoppingBag, Package, DollarSign } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"

const Dashboard = () => {
    // Dummy data
    const ordersData = [
        { name: "Mon", orders: 12 },
        { name: "Tue", orders: 19 },
        { name: "Wed", orders: 7 },
        { name: "Thu", orders: 15 },
        { name: "Fri", orders: 22 },
    ]

    const topProducts = [
        { name: "Backpacks", sales: 45 },
        { name: "Duffles", sales: 30 },
        { name: "Luggage", sales: 20 },
    ]

    return (
        <div className="space-y-6 p-6">

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <tr className="border-b">
                            <td className="p-2">#1234</td>
                            <td className="p-2">John Doe</td>
                            <td className="p-2">$250</td>
                            <td className="p-2 text-green-600">Completed</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2">#1235</td>
                            <td className="p-2">Jane Smith</td>
                            <td className="p-2">$120</td>
                            <td className="p-2 text-yellow-600">Pending</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard
