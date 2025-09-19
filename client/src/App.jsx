import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import Duffles from "./pages/shop/Duffles.jsx"
import Layout from "./pages/shop/Layout.jsx"
import Backpacks from "./pages/shop/BackpacksPage.jsx"
import LuggageBags from "./pages/shop/LuggageBags.jsx"
import AuthPage from "./pages/user/AuthPage.jsx"
import Cart from "./pages/shop/Cart.jsx"
import { useDispatch } from "react-redux"
import { loadUser } from "./store/authslice.js"
import { Toaster } from "react-hot-toast"
import Profile from "./components/Profile/Profile.jsx"
import ChangePassword from "./pages/user/ChnagePassword.jsx"
import ForgotPassword from "./pages/user/ForgetPassword.jsx"
import ResetPassword from "./pages/user/ResetPasswordPage.jsx"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"
import Dashboard from "./pages/admin/Dashboard.jsx"
import ManageProducts from "./pages/admin/ManageProducts.jsx"
import NotFound from "./pages/NotFoundPage.jsx"
import PaymentSuccess from "./pages/shop/PaymentSucess.jsx"
import PaymentCancelled from "./pages/shop/PaymentCancelled.jsx"

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


        <Route path="/auth" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/payment-sucess" element={<PaymentSuccess/>}/>
        <Route path="/payment-cancel" element={<PaymentCancelled/>}/>
        <Route path="*" element={<NotFound />} />


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
