import React from 'react'
import arrivalImg1 from "../../assets/arriavlimg1.jpeg"
import arrivalImg2 from "../../assets/arrivalimg.jpeg"

const NewArrival = () => {
  return (
    <>
    <div className="new-aarival w-full flex justify-between">
        <div className="leftsection w-1/3 flex flex-col gap-10">
        <div className="heading">
            <h2 className='uppercase text-[2.2vw] tracking-tighter border-b-2 border-[#f2f2f2] hover:border-black inline-block cursor-pointer'>new arrivals</h2>
        </div>
        <div className="textcol">
            <span className='text-xl tracking-tighter  '>Shop new carry-on luggage to backpacks. Freshen up your next trip with the latest in luggage and travel gear.</span>
        </div>
    

        <button className='bg-[var(--heading-color)] px-10 py-4 text-white rounded-lg uppercase mt-10 cursor-pointer hover:bg-[#01806f] w-1/2'>shop now</button>
        </div>

        <div className="rightsection w-1/2 cursor-pointer relative">
        <div className="img1 w-3/4 rounded-lg absolute hover:scale-105">
            <img src={arrivalImg2} alt="image"  className='rounded-lg'/>
        </div>

        <div className="img1 w-[40%] rounded-lg absolute top-[50%] right-7 shadow-xl ">
            <img src={arrivalImg1} alt="image"  className='rounded-lg'/>
        </div>

        </div>
    </div>

    </>
  )
}

export default NewArrival