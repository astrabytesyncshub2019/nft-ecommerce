import React, { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Truck, Shield, Star, Clock, ArrowRight, Sparkles, Package } from "lucide-react"
import bag1 from "../../assets/bag1.jpeg"
import bag2 from "../../assets/bg2.jpeg"

gsap.registerPlugin(ScrollTrigger)

const BrandToday = () => {
    const sectionRef = useRef(null)
    const textRef = useRef(null)
    const buttonRef = useRef(null)
    const img1Ref = useRef(null)
    const img2Ref = useRef(null)



    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                    once: true
                }
            })

            tl.from(textRef.current, {
                x: -80,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            })

            tl.from([img1Ref.current, img2Ref.current], {
                scale: 0,
                opacity: 0,
                duration: 1.5,
                stagger: 1,
                ease: "power3.out"
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="w-full min-h-screen flex flex-col lg:flex-row-reverse items-center justify-between gap-10 px-6 md:px-12 lg:px-16 py-12 lg:py-20 bg-gray-50"
        >
            {/* Left Section (Text) - ENHANCED WITH ICONS */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center gap-8 text-center lg:text-left">
                <div ref={textRef} className="space-y-6">
                    {/* Simple Badge */}
                    <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-[var(--secondary-bg-color)] to-[var(--heading-color)] text-white rounded-full text-sm font-semibold w-fit mx-auto lg:mx-0 shadow-lg">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="tracking-wide uppercase">Just In</span>
                    </div>

                    {/* Main Heading */}
                    <div className="heading space-y-3 lg:space-y-4">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight font-extrabold leading-tight">
                            <span className="block lg:inline text-gray-900">New</span>
                            <span className="block lg:inline text-transparent bg-clip-text bg-gradient-to-r from-[var(--heading-color)] to-[var(--secondary-bg-color)]">
                                Arrivals
                            </span>
                        </h2>
                        <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[var(--heading-color)] to-[var(--secondary-bg-color)] rounded-full mx-auto lg:mx-0"></div>
                    </div>

                    {/* Clean Description */}
                    <div className="space-y-4">
                        <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-md mx-auto lg:mx-0">
                            Redefining travel gear for a new generation of explorers
                        </p>
                        <p className="text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                            Crafted with precision and designed for adventure,
                            our collection blends functionality with timeless style.
                        </p>
                    </div>

                    {/* Feature Icons Grid */}
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

                    {/* Simple CTA Button */}
                    <div className="pt-4">
                        <button
                            ref={buttonRef}
                            className="group inline-flex items-center gap-2 bg-[var(--heading-color)] hover:bg-[var(--secondary-bg-color)] text-white px-8 py-3 lg:py-4 rounded-lg font-semibold uppercase tracking-wide transition-all duration-300 mx-auto lg:mx-0 shadow-md hover:shadow-lg"
                        >
                            <span>Discover</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Section (Images) - UNCHANGED */}
            <div className="w-full lg:w-1/2 relative flex justify-center items-center h-[400px] sm:h-[500px] md:h-[550px]">
                <div
                    ref={img1Ref}
                    className="absolute w-2/3 sm:w-1/2 md:w-[320px] lg:w-[380px] h-[280px] sm:h-[350px] md:h-[400px] rounded-lg shadow-xl overflow-hidden left-0"
                >
                    <img
                        src={bag1}
                        alt="bag1"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Second image */}
                <div
                    ref={img2Ref}
                    className="absolute top-[45%] left-[20%] sm:left-[35%] md:left-[40%] w-1/2 sm:w-[220px] md:w-[260px] lg:w-[300px] h-[220px] sm:h-[280px] md:h-[320px] lg:h-[360px] rounded-lg shadow-xl overflow-hidden "
                >
                    <img
                        src={bag2}
                        alt="bag2"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            </div>
        </section>
    )
}

export default BrandToday