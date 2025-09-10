import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage.jsx"
import Duffles from "./pages/Duffles.jsx"
import Layout from './pages/Layout.jsx'
import BackpacksPage from "./pages/BackpacksPage.jsx"
import LuggageBags from "./pages/LuggageBags.jsx"
import AuthPage from './pages/AuthPage.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/luggage" element={<LuggageBags/>} />
        <Route path="/backpacks" element={<BackpacksPage />} />
        <Route path="/duffles" element={<Duffles />} />
        
      </Route>
        <Route path="/user" element={<AuthPage/>}/>
    </Routes>
  )
}

export default App
