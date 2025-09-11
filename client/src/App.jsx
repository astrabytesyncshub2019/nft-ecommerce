import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage.jsx"
import Duffles from "./pages/Duffles.jsx"
import Layout from './pages/Layout.jsx'
import Backpacks from "./pages/BackpacksPage.jsx"
import LuggageBags from "./pages/LuggageBags.jsx"
import AuthPage from './pages/AuthPage.jsx'
import Cart from './pages/Cart.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/luggage" element={<LuggageBags />} />
        <Route path="/backpacks" element={<Backpacks />} />
        <Route path="/duffles" element={<Duffles />} />
        <Route path="/cart" element={<Cart />} />

      </Route>
      <Route path="/user" element={<AuthPage />} />
    </Routes>
  )
}

export default App
