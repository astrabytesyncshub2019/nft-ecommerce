import React, { useState } from "react"
import toast from "react-hot-toast"

const CheckoutForm = ({ onSubmit, onCancel }) => {
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [country, setCountry] = useState("India")
    const [landmark, setLandmark] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!street || !city || !state || !postalCode) {
            return toast.error("Please fill all required fields")
        }

        onSubmit({ street, city, state, postalCode, country, landmark })
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form className="bg-white p-6 rounded-lg w-full max-w-md" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

                <input className="w-full mb-2 p-2 border rounded" placeholder="Street" value={street} onChange={e => setStreet(e.target.value)} />
                <input className="w-full mb-2 p-2 border rounded" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                <input className="w-full mb-2 p-2 border rounded" placeholder="State" value={state} onChange={e => setState(e.target.value)} />
                <input className="w-full mb-2 p-2 border rounded" placeholder="Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                <input className="w-full mb-2 p-2 border rounded" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} />
                <input className="w-full mb-2 p-2 border rounded" placeholder="Landmark (Optional)" value={landmark} onChange={e => setLandmark(e.target.value)} />

                <div className="flex justify-end gap-2 mt-4">
                    <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-[var(--heading-color)] text-white rounded">Place Order</button>
                </div>
            </form>
        </div>
    )
}

export default CheckoutForm
