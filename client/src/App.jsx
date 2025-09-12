import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import Duffles from "./pages/Duffles.jsx"
import Layout from "./pages/Layout.jsx"
import Backpacks from "./pages/BackpacksPage.jsx"
import LuggageBags from "./pages/LuggageBags.jsx"
import AuthPage from "./pages/AuthPage.jsx"
import Cart from "./pages/Cart.jsx"
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from "./store/authslice.js"
import { Toaster } from "react-hot-toast"

const App = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)   
    

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  if (loading) return <div className="text-white">Loading...</div>

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

      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App
