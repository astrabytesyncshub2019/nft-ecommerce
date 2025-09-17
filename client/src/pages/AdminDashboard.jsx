import { useState } from "react"
import { Outlet, Link, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { logout as logoutAction } from "../store/authslice"
import { logoutUserApi } from "../api/userAPI"
import toast from "react-hot-toast"

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = async () => {
    try {
      await logoutUserApi()
      dispatch(logoutAction())
      navigate("/")
      toast.success("Logout successfully")
    } catch (err) {
      dispatch(logoutAction())
      navigate("/")
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-[var(--heading-color)] text-white p-4 flex flex-col justify-between ${
          collapsed ? "w-20" : ""
        } transition-all`}
      >
        <div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mb-6 text-gray-400 hover:text-white flex items-center"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
          <nav className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 hover:text-green-400">
              <Home size={20} /> {!collapsed && "Home"}
            </Link>
            <Link to="/admin" className="flex items-center gap-2 hover:text-green-400">
              <LayoutDashboard size={20} /> {!collapsed && "Dashboard"}
            </Link>
            <Link to="#" className="flex items-center gap-2 hover:text-green-400">
              <Users size={20} /> {!collapsed && "Users"}
            </Link>
            <Link to="/admin/products" className="flex items-center gap-2 hover:text-green-400">
              <ShoppingBag size={20} /> {!collapsed && "Products"}
            </Link>

          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-600 mt-6"
        >
          <LogOut size={20} /> {!collapsed && "Logout"}
        </button>
      </aside>

      {/* Content */}
      <div className="flex flex-col flex-1 bg-gray-100">
        {/* Topbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-700">Admin Panel</h1>
          <div className="flex items-center gap-3">
            <span className="text-gray-600">Hello, {user?.fullname?.firstname}</span>
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullname?.firstname}`}
              alt="Admin"
              className="w-8 h-8 rounded-full border"
            />
          </div>
        </header>

        {/* Inner Page (scrollable area) */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
