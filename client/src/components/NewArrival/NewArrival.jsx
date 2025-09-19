import React, { useLayoutEffect, useRef } from "react"
import { Link } from "react-router-dom"
import arrivalImg1 from "../../assets/arriavlimg1.jpeg"
import arrivalImg2 from "../../assets/arrivalimg.jpeg"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, ShoppingBag, Sparkles, Package, MapPin, Truck } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const NewArrival = () => {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reset",
          once: true,
        },
      })
        .from(".leftsection > *", {
          x: -60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        })
        .from(
          ".rightsection img",
          {
            x: 60,
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            stagger: 0.3,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="new-arrival relative py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--heading-color)]/3 via-transparent to-transparent opacity-50"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-8 lg:gap-16">

        {/* Left Section - FIXED ALIGNMENT */}
        <div className="leftsection w-full lg:w-1/2 xl:w-2/5 flex flex-col gap-6 lg:gap-8 text-center lg:text-left">

          {/* Badge */}
          <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-[var(--secondary-bg-color)] to-[var(--heading-color)] text-white rounded-full text-sm font-semibold w-fit mx-auto lg:mx-0 shadow-lg">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="tracking-wide uppercase">Just In</span>
          </div>

          {/* Heading */}
          <div className="heading space-y-3 lg:space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight font-extrabold leading-tight">
              <span className="block lg:inline text-gray-900">New</span>
              <span className="block lg:inline text-transparent bg-clip-text bg-gradient-to-r from-[var(--heading-color)] to-[var(--secondary-bg-color)]">
                Arrivals
              </span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[var(--heading-color)] to-[var(--secondary-bg-color)] rounded-full mx-auto lg:mx-0"></div>
          </div>

          {/* Description */}
          <div className="textcol space-y-3 max-w-lg mx-auto lg:mx-0">
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed font-light">
              Shop the latest carry-on luggage to backpacks. Freshen up your next trip
              with cutting-edge travel gear designed for modern explorers.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Limited edition pieces crafted with premium materials and innovative design.
            </p>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 max-w-md mx-auto lg:mx-0">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:bg-white hover:shadow-sm transition-all duration-300 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight group-hover:text-[var(--heading-color)] transition-colors">
                  Free Shipping
                </h4>
                <p className="text-xs text-gray-500 leading-tight">On all orders</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:bg-white hover:shadow-sm transition-all duration-300 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight group-hover:text-[var(--heading-color)] transition-colors">
                  Limited Stock
                </h4>
                <p className="text-xs text-gray-500 leading-tight">Only a few left</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-6 flex justify-center lg:justify-start">
            <button
              className="group inline-flex items-center gap-2 bg-[var(--heading-color)] hover:bg-[#4f8951] text-white px-8 py-3 lg:py-4 rounded-lg font-semibold uppercase tracking-wide transition-all duration-300 mx-auto lg:mx-0 shadow-md group-hover:shadow-lg"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>


        <div className="rightsection w-full lg:w-1/2 relative flex justify-center lg:block mt-8 lg:mt-0">
          <div className="relative w-full h-[350px] sm:h-[350px] lg:h-[450px] xl:h-[500px] max-w-md lg:max-w-lg mx-auto">

            <div className="img1 relative w-full h-full rounded-2xl shadow-2xl border-2 border-white/50 overflow-hidden hover:scale-105 transition-transform duration-300">
              <img
                src={arrivalImg2}
                alt="New Arrival Collection"
                className="w-full h-full object-cover rounded-2xl"
              />

              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1.5 shadow-lg z-20">
                <span className="text-xs font-semibold text-gray-700 tracking-wide flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-[var(--heading-color)] rounded-full"></div>
                  NEW
                </span>
              </div>
            </div>

            <div className="img2 absolute top-[70%] right-4 w-[50%] sm:w-[45%] lg:w-[40%] rounded-xl shadow-2xl border-2 border-white/50 overflow-hidden hover:scale-105 transition-transform duration-300">
              <img
                src={arrivalImg1}
                alt="Featured Product"
                className="w-full h-full object-cover rounded-xl"
              />

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default NewArrival