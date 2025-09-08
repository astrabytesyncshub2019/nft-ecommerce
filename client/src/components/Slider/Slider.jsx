import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import allProducts from "../../assets/allProducts.jpeg"
import { getAllProducts } from '../../api/productAPI.js'

const Slider = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts()
        console.log("API Response:", res)
        setProducts(Array.isArray(res) ? res : [])
      } catch (err) {
        console.error("Error fetching products:", err)
        setProducts([])
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="my-10">
      <h2 className="text-3xl text-[var(--text-color)] uppercase font-bold tracking-tighter mb-2">
        Shop Product
      </h2>
      <p className="text-xl capitalize tracking-tight text-gray-600 mb-6">
        Our favorite picks for the season
      </p>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        navigation={{clickable:true}}
        pagination={{ clickable: true }}
        className="py-4"
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        <SwiperSlide>
          <div className="flex flex-col items-center justify-between w-full h-full   rounded-xl shadow-lg">
            <img
              src={allProducts}
              alt="Hardcoded Product"
              className="w-full h-[430px] object-cover rounded-lg"
            />

          </div>
        </SwiperSlide>

        {products.map((product) => (
          <SwiperSlide key={product._id || product.name}>
            <div className="flex flex-col items-center justify-between w-full h-full rounded-xl shadow-lg">
              <img
                src={product.image.url}
                alt={product.name || "Product"}
                className="w-full h-full object-cover rounded-lg mb-4"
              />

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Slider
