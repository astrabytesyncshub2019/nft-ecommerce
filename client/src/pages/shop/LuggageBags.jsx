import React, { useEffect, useState, useRef, useLayoutEffect } from "react"
import { getProductsByCategory } from "../../api/productAPI.js"
import { Luggage, MapPin, Plane,Mountain,Backpack,Compass,Star } from "lucide-react"
import SmoothSailing from "../../components/SmoothSailing/SmoothSailing.jsx"
import AddToCartButton from "../../components/AddToCartButton/AddToCart.jsx"

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
  }, []) 


  return (
    <div
      className="relative w-full bg-gradient-to-br from-indigo-100 via-white to-purple-200 px-4 sm:px-6 md:px-12 py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      
      <div className="text-center mb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-5 blur-3xl rounded-full transform scale-150"></div>
        
        <div className="relative flex justify-center items-center gap-6 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl" >
            <Luggage className="w-8 h-8 text-white" />
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <Plane className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <h2 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tighter uppercase bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight"
        >
          Luggage Bags
        </h2>
        
        <div className="relative h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-6 max-w-md mx-auto"></div>
        
        <p 
          
          className="text-gray-600 text-lg sm:text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed"
        >
          From weekend getaways to world tours — we've got your back.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="flex justify-center items-center h-80">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-100 to-sky-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Backpack className="w-10 h-10 text-emerald-600" />
            </div>
            <p className="text-gray-500 text-xl font-medium">
              No products available in this category.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Check back soon for new adventures!
            </p>
          </div>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
        >
          {products.map((product, idx) => {
            const discountPercent = (
              (product.discount / product.price) *
              100
            ).toFixed(0)
            const finalPrice = product.price - product.discount

            return (
              <div
                key={product._id}
                className="group relative flex flex-col w-full bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 hover:shadow-3xl "
              >

                <div className="relative w-full h-[340px] sm:h-[400px] overflow-hidden rounded-t-3xl">
                  <div className="absolute top-5 left-5 z-40">
                    <span className="bg-gradient-to-r from-red-400 to-pink-400 text-white text-xs sm:text-sm px-4 py-2 rounded-2xl font-bold shadow-xl backdrop-blur-sm border border-white/30 transform hover:scale-105 transition-transform">
                      {discountPercent}% OFF
                    </span>
                  </div>

          
                  <div className="absolute top-5 right-5 z-40">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs px-3 py-2 rounded-2xl font-bold shadow-xl flex items-center gap-1 uppercase">
                      <Plane className="w-3 h-3" />
                      travel
                    </span>
                  </div>

        
                  {discountPercent >= 35 && (
                    <div className="absolute top-20 right-5 z-40">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-3 py-2 rounded-2xl font-bold shadow-xl flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        PREMIUM
                      </span>
                    </div>
                  )}

              
                  <div className="relative w-full h-full overflow-hidden rounded-t-3xl">
                    <img
                      src={product.image.url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-115 group-hover:rotate-2"
                    />

                  
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>

                
                  <div className="absolute bottom-5 right-5 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                      <AddToCartButton productId={product._id} />
               
                  </div>
                </div>

          
                <div className="relative p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white flex-1 rounded-b-3xl">
            
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_60%)] opacity-30"></div>
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:20px_20px] opacity-20"></div>

                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 line-clamp-2 group-hover:text-emerald-300 transition-colors duration-500">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-baseline gap-4">
                        <span className="font-bold text-2xl sm:text-3xl text-green-400 drop-shadow-sm">
                          ₹{finalPrice.toLocaleString()}
                        </span>
                        <span className="text-base text-gray-400 line-through">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>

                  
                      <div className="text-sm bg-green-500/20 text-green-300 px-3 py-2 rounded-2xl border border-green-500/40 backdrop-blur-sm">
                        Save ₹{product.discount.toLocaleString()}
                      </div>
                    </div>

                  
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">Travel Ready</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-emerald-300">
                        <Compass className="w-4 h-4" />
                        <span>Explore More</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <SmoothSailing />
    </div>
  )
}

export default LuggageBags