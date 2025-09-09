import React from 'react'

const BrandToday = () => {
    return (
        <>
            <div className="new-aarival w-full flex justify-between flex-row-reverse mt-5">
                <div className="leftsection w-1/2 flex flex-col gap-2">
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
                        <img src="https://images.pexels.com/photos/1426497/pexels-photo-1426497.jpeg" alt="image" className='rounded-lg h-full' />
                    </div>

                    <div className="img1 w-full rounded-lg absolute top-[40%] left-60 h-[400px]  ">
                        <img src="https://images.pexels.com/photos/7625308/pexels-photo-7625308.jpeg" alt="image" className='rounded-lg h-full ' />
                    </div>

                </div>
            </div>
        </>
    )
}

export default BrandToday