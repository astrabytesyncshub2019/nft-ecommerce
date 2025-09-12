import React, { useState } from 'react'
import Navbar from "../components/Navbar/Navbar.jsx"
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer/Footer.jsx'
import { useDispatch } from 'react-redux'


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