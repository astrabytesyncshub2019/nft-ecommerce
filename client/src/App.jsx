import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import Duffles from "./pages/Duffles.jsx"
import Layout from "./pages/Layout.jsx"
import Backpacks from "./pages/BackpacksPage.jsx"
import LuggageBags from "./pages/LuggageBags.jsx"
import AuthPage from "./pages/AuthPage.jsx"
import Cart from "./pages/Cart.jsx"
import { useDispatch } from "react-redux"
import { loadUser } from "./store/authslice.js"
import { Toaster } from "react-hot-toast"
import Profile from "./components/Profile/Profile.jsx"
import ChangePassword from "./pages/ChnagePassword.jsx"
import ForgotPassword from "./pages/ForgetPassword.jsx"
import ResetPassword from "./pages/ResetPasswordPage.jsx"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"
import { LayoutDashboard } from "lucide-react"
import Dashboard from "./pages/admin/Dashboard.jsx"
import ManageProducts from "./pages/admin/ManageProducts.jsx"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/luggage" element={<LuggageBags />} />
          <Route path="/backpacks" element={<Backpacks />} />
          <Route path="/duffles" element={<Duffles />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* Public Routes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected User Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        {/* Admin Route Example */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route index path="products" element={<ManageProducts />} />

        </Route>
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App
