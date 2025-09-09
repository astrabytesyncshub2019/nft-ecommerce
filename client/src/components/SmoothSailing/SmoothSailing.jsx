import React from "react"
import { FaTruck, FaGlobe, FaShieldAlt } from "react-icons/fa"

const SmoothSailing = () => {
    return (
        <div className="bg-[var(--heading-color)] text-white rounded-2xl w-full px-8 md:px-16 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-12 mt-10">

            <div className="md:w-1/2 text-left">
                <h2 className="text-3xl md:text-4xl font-light leading-snug">
                    It's all smooth sailing, <br />
                    when you roll with us.
                </h2>
            </div>

            <div className="md:w-1/2 grid grid-cols-2 gap-8 text-center">
                <div className="flex flex-col items-center gap-3">
                    <FaTruck className="text-4xl" />
                    <span className="text-lg font-medium">Express Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <FaGlobe className="text-4xl" />
                    <span className="text-lg font-medium">All-India Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <FaShieldAlt className="text-4xl" />
                    <span className="text-lg font-medium">5-year Lifespan</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <FaTruck className="text-4xl" />
                    <span className="text-lg font-medium">Express Delivery</span>
                </div>
            </div>
        </div>
    )
}

export default SmoothSailing
