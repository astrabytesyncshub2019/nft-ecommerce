import React from 'react'
import img4 from '../../assets/img4.jpg'

const Heading = () => {
  return (
   <>
   <div className="mainsection flex items-center justify-between px-12 py-[12vw] gap-28">
             <div className="heading text-[5rem] font-bold tracking-tighter leading-[5rem] w-2/3 uppercase text-[var(--text-color)]">
               <h1>
                 From Office to <span className="text-[var(--heading-color)]">Adventure</span>
               </h1>
               <h1> We’ve Got Your Back</h1>
             </div>
   
             <div className="images-section w-2/4 flex justify-center  hover:scale-105 rounded-xl transition-all cursor-pointer">
               <div className="img  overflow-hidden shadow-2xl rounded-xl ">
                 <img
                   src={img4}
                   alt="bag"
                   className="object-contain w-full h-full transition-transform duration-300 shadow-xl"
                 />
               </div>
             </div>
           </div></>
  )
}

export default Heading