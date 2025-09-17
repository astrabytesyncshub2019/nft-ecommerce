import { useEffect } from "react"
import { useLocation, useNavigate, Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../store/authslice.js"
import Navbar from "../../components/Navbar/Navbar.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import toast from "react-hot-toast"

const Layout = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const googleStatus = params.get("google")

        if (googleStatus === "success") {
            toast.success(`Welcome Back,${user.fullname.firstname}`)
            navigate("/")
        } else if (googleStatus === "failed") {
            toast.error("Google login failed, please try again.")
            navigate("/login")
        }
    }, [location, dispatch, navigate])

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
