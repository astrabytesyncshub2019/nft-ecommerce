import React, { useState } from "react"
import { NavLink, Link, useNavigate } from "react-router-dom"
import { ShoppingCart, CircleUserRound, X } from "lucide-react"
import Profile from "../Profile/Profile"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"

const Navbar = () => {
    const [showProfile, setShowProfile] = useState(false)
    const { user, isAuthenticated } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const links = [
        { name: "Luggage", path: "/luggage" },
        { name: "Backpacks", path: "/backpacks" },
        { name: "Duffles", path: "/duffles" }
    ]

    const handleProfileClick = () => {
        if (!isAuthenticated || !user) {
            toast.error("Please login to view your profile")
            navigate("/auth")
            return
        }
        setShowProfile((prev) => !prev)
    }

    return (
        <nav className="navbar px-10 py-3 flex justify-between items-center bg-[#f2f2f2] fixed w-full z-50">
            <div className="logo text-[var(--heading-color)] text-4xl font-bold tracking-tighter">
                <Link to={"/"}>Scatch</Link>
            </div>

            <div className="flex items-center gap-20">
                <div className="flex gap-6 text-zinc-700 text-[1rem]">
                    {links.map((link, index) => (
                        <NavLink
                            key={index}
                            to={link.path}
                            className={({ isActive }) =>
                                `capitalize transition-colors duration-200 ${isActive
                                    ? "text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]"
                                    : "hover:text-[var(--primary-color)]"
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                <div className="flex items-center gap-4 text-zinc-700 cursor-pointer w-full">
                    <Link to={"/cart"}>
                        <ShoppingCart className="w-6 h-6 hover:text-[var(--primary-color)] transition" />
                    </Link>
                    <CircleUserRound
                        className="w-6 h-6 hover:text-[var(--primary-color)] transition"
                        onClick={handleProfileClick}
                    />
                </div>
            </div>

            {showProfile && isAuthenticated && user && (
                <Profile setShowProfile={setShowProfile} />
            )}
        </nav>
    )
}

export default Navbar