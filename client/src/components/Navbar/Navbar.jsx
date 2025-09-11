import React from "react"
import { NavLink ,Link} from "react-router-dom"
import { ShoppingCart, CircleUserRound } from "lucide-react"

const Navbar = () => {
    const links = [
        { name: "Luggage", path: "/luggage" },
        { name: "Backpacks", path: "/backpacks" },
        { name: "Duffles", path: "/duffles" }
    ]

    return (
        <nav className="navbar px-10 py-3 flex justify-between items-center bg-[#f2f2f2]  fixed w-full z-50">
            <div className="logo text-[var(--heading-color)] text-4xl font-bold tracking-tighter">
                <Link to={"/"}>
                    Scatch
                </Link>
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


                <div className="flex items-center gap-4 text-zinc-700 cursor-pointer">
                    <Link to={"/cart"}>
                    <ShoppingCart className="w-6 h-6 hover:text-[var(--primary-color)] transition" />
                    </Link>
                    <CircleUserRound className="w-6 h-6 hover:text-[var(--primary-color)] transition" />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
