import React, { useState } from 'react'
import Navbar from "../components/Navbar/Navbar.jsx"
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer.jsx'


const Layout = () => {

    return (
        <>
            <Navbar toggleCart={() => setIsCartOpen(prev => !prev)} />
            <Outlet />
            <Footer />

        </>
    )
}

export default Layout