import React, { useState } from "react"
import toast from "react-hot-toast"
import { FaMapMarkerAlt, FaCity, FaFlag, FaGlobe, FaHome, FaLandmark } from "react-icons/fa"
import { MdOutlineMarkunreadMailbox } from "react-icons/md"

const CheckoutForm = ({ onSubmit, onCancel }) => {
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [country, setCountry] = useState("India")
    const [landmark, setLandmark] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("COD") // default

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!street || !city || !state || !postalCode) {
            return toast.error("Please fill all required fields")
        }
        onSubmit(
            { street, city, state, postalCode, country, landmark },
            paymentMethod
        )
    }

    const InputField = ({ icon: Icon, ...props }) => (
        <div className="relative mb-3">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
                {...props}
                className="w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--heading-color)] focus:border-[var(--heading-color)] outline-none transition"
            />
        </div>
    )

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <form
                className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-lg animate-fadeIn"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Shipping Address & Payment
                </h2>

                <InputField icon={FaHome} placeholder="Street Address *" value={street} onChange={e => setStreet(e.target.value)} />
                <InputField icon={FaCity} placeholder="City *" value={city} onChange={e => setCity(e.target.value)} />
                <InputField icon={FaFlag} placeholder="State *" value={state} onChange={e => setState(e.target.value)} />
                <InputField icon={MdOutlineMarkunreadMailbox} placeholder="Postal Code *" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                <InputField icon={FaGlobe} placeholder="Country *" value={country} onChange={e => setCountry(e.target.value)} />
                <InputField icon={FaLandmark} placeholder="Landmark (Optional)" value={landmark} onChange={e => setLandmark(e.target.value)} />

                {/* Payment Method Selector */}
                <div className="mt-4">
                    <label className="block mb-2 font-medium text-gray-700">Payment Method:</label>
                    <select
                        value={paymentMethod}
                        onChange={e => setPaymentMethod(e.target.value)}
                        className="w-full border rounded-xl py-2 px-3 focus:ring-2 focus:ring-[var(--heading-color)] focus:border-[var(--heading-color)] outline-none transition"
                    >
                        <option value="COD">Cash on Delivery</option>
                        <option value="ONLINE">Pay Online (Card)</option>
                    </select>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button type="button" className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="px-6 py-2.5 bg-[var(--heading-color)] hover:opacity-90 text-white font-medium rounded-xl transition">
                        Place Order
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CheckoutForm
