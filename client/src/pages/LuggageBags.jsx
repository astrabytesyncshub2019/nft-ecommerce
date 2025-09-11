import React, { useEffect, useState } from "react"
import { getProductsByCategory } from "../api/productAPI.js"
import { Handbag } from "lucide-react"
import SmoothSailing from "../components/SmoothSailing/SmoothSailing.jsx"
import AddToCartButton from "../components/AddToCartButton/AddToCart.jsx"

const LuggageBags = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const res = await getProductsByCategory("luggage")
        setProducts(Array.isArray(res) ? res : [])
      } catch (error) {
        console.error("Error fetching luggage products", error)
        setProducts([])
      }
    }
    fetchProductsByCategory()
  }, [products])

  return (
    <div className="w-full bg-white px-6 py-24">
      <h2 className="text-3xl font-bold mb-2 text-center uppercase tracking-tighter">Luggage bags</h2>
      <p className="text-gray-700 text-center">From weekend getaways to world tours — we’ve got your back..</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        {products.map((product) => {
          const discountPercent = ((product.discount / product.price) * 100).toFixed(0)
          const finalPrice = product.price - product.discount

          return (
            <div
              key={product._id}
              className="group flex flex-col items-center w-full bg-white shadow-xl rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 mb-14"
            >
              <div className="relative w-full h-[300px] overflow-hidden ">
                <span className="absolute top-2 left-2 text-red-600 text-sm  px-2 py-1 rounded z-40 font-bold">
                  {discountPercent}% OFF
                </span>

                <img
                  src={product.image.url}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                />


                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <AddToCartButton productId={product._id}/>
                </div>
              </div>


              <div className="p-4 w-full bg-[--heading-color] text-white">
                <h3 className="text-lg font-semibold tracking-tighter">{product.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold">Rs. {finalPrice}</span>
                  <span className="text-sm text-gray-300 line-through">Rs. {product.price}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <SmoothSailing/>
    </div>
  )
}

export default LuggageBags
