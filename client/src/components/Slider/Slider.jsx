import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import allProducts from "../../assets/allProducts.jpeg"
import { getAllProducts } from '../../api/productAPI.js'
import { Handbag } from "lucide-react"

const Slider = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts()
        setProducts(Array.isArray(res) ? res : [])
      } catch (err) {
        console.error(err)
        setProducts([])
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="my-10 relative">
      <h2 className="text-3xl text-[var(--text-color)] uppercase font-bold tracking-tighter mb-2">
        Shop Products
      </h2>
      <p className="text-xl capitalize tracking-tight text-gray-600 mb-6">
        Our favorite picks for the season
      </p>

      <Swiper
        modules={[Navigation, Pagination ,Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        autoplay={{
          delay:3000,
          pauseOnMouseEnter:true
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center w-full h-[470px] bg-green-100 rounded-2xl relative cursor-pointer">
            <img src={allProducts} alt="View All" className="w-full h-full object-cover rounded-lg" />
            <button className="absolute bottom-4 left-4  bg-white text-black px-4 py-2 rounded-lg shadow hover:bg-[--secondary-bg-color] hover:scale-105 ">VIEW ALL</button>
            <span className='tracking-tighter absolute top-5 right-3 font-bold text-white text-mb'>{products.length} Products</span>
          </div>
        </SwiperSlide>

        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="group flex flex-col items-center w-full bg-white shadow-xl rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 mb-14 text-white">

              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={product.image.url}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110"
                />

          
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white p-3 rounded-full shadow-md text-black hover:bg-[--heading-color] hover:text-white transition">
                    <Handbag size={24} />
                  </button>
                </div>
              </div>

    
              <div className="p-4 w-full bg-[--heading-color]">
                <h3 className=" text-lg tracking-tighter">{product.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-semibold">Rs. {product.price}</span>
                  <span className="text-sm text-gray-300 line-through">
                    Rs. {product.price - product.discount}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>

        ))}
      </Swiper>
    </div>
  )
}

export default Slider
