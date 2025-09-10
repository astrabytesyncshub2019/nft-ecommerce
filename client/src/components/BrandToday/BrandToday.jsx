import React from 'react'
import bag1 from "../../assets/bag1.jpeg"
import bag2 from "../../assets/bg2.jpeg"

const BrandToday = () => {
    return (
        <>
            <div className="new-aarival w-full min-h-screen flex justify-between flex-row-reverse mt-5 ">
                <div className="leftsection w-1/2 flex flex-col  justify-center ">
                    <div className="heading">
                        <h2 className='uppercase text-[2.4vw] tracking-tighter border-b-2 border-[#f2f2f2] hover:border-black inline-block cursor-pointer'>The brand <span className='text-[var(--heading-color)]'>today</span></h2>
                    </div>
                    <div className="textcol">
                        <span className='text-xl tracking-tighter  '>Redefining travel gear for a new generation of explorers</span>
                    </div>


                    <button className='bg-[var(--heading-color)] px-10 py-4 text-white rounded-lg uppercase mt-10 cursor-pointer hover:bg-[#01806f] w-1/2'>Dicover</button>
                </div>

                <div className="rightsection w-1/2 cursor-pointer relative z-20">
                    <div className="img1 w-full rounded-lg absolute h-[450px] ">
                        <img src={bag1} alt="image" className='rounded-lg h-full' />
                    </div>

                    <div className="img1 w-full rounded-lg absolute top-[20%] left-60 h-[400px]  ">
                        <img src={bag2} alt="image" className='rounded-lg h-full ' />
                    </div>

                </div>
            </div>
        </>
    )
}

export default BrandToday