import React from 'react'
import { Routes, Route } from 'react-router'
import HomePage from "./pages/HomePage.jsx"
import Duffles from "./pages/Duffles.jsx"

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path='/Duffles' element={<Duffles />} />

            </Routes>
        </>
    )
}

export default App