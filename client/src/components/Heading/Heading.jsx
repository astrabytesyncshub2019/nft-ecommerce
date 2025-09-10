import React from 'react'
import img3 from '../../assets/img3.jpg'

const Heading = () => {
  return (
   <>
   <div className="mainsection flex items-center justify-between px-12 py-[12vw] gap-28">
             <div className="heading text-[5.5rem] font-bold tracking-tighter leading-[5rem] w-2/3 uppercase text-[var(--text-color)]">
               <h1>
                 From Office to <span className="text-[var(--primary-color)]">Adventure</span>
               </h1>
               <h1>We’ve Got Your Back</h1>
             </div>
   
             <div className="images-section w-1/3 flex justify-center ">
               <div className="img  overflow-hidden shadow-2xl rounded-xl ">
                 <img
                   src={img3}
                   alt="bag"
                   className="object-contain w-full h-full transition-transform duration-300 hover:scale-105 rounded-xl shadow-xl"
                 />
               </div>
             </div>
           </div></>
  )
}

export default Heading