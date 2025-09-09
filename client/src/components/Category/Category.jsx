import React from 'react'
import cat1 from "../../assets/cat1.jpeg"
import cat2 from "../../assets/cat2.jpeg"
import cat3 from "../../assets/cat3.jpeg"
import { Link } from "react-router"
import SmoothSailing from '../SmoothSailing/SmoothSailing'

const Category = () => {
    return (
        <>
            <h1 className='text-[2.3rem] uppercase tracking-tighter text-center'>Shop by Category</h1>
            <div className="cards w-full flex flex-row gap-4 mt-8">
                <div className="card w-full h-[450px] relative cursor-pointer">
                    <img src={cat1} alt="image" className='rounded-lg h-full' />

                    <div className="links text-3xl uppercase font-bold  text-white absolute bottom-4 left-4">
                        <div>Luggage</div>
                        <div className='text-lg underline hover:text-[var(--secondary-bg-color)] '>
                            <Link to={"/Luggage"}>more</Link>
                        </div>

                    </div>

                </div>
                <div className="card w-full h-[450px] relative cursor-pointer">
                    <img src={cat2} alt="image" className='rounded-lg h-full' />
                    <div className="links text-3xl uppercase font-bold  text-white absolute bottom-4 left-4">
                        <div>Backpacks</div>
                        <div className='text-lg underline hover:text-[var(--secondary-bg-color)] '>
                            <Link to={"/Backpacks"}>more</Link>
                        </div>

                    </div>



                </div>
                <div className="card w-full h-[450px] relative cursor-pointer">
                    <img src={cat3} alt="image" className='rounded-lg h-full' />
                    <div className="links text-3xl uppercase font-bold  text-white absolute bottom-4 left-4">
                        <div>Duffles</div>
                        <div className='text-lg underline hover:text-[var(--secondary-bg-color)] '>
                            <Link to={"/Duffles"}>more</Link>
                        </div>

                    </div>


                </div>

            </div>
            <SmoothSailing/>
        </>
    )
}

export default Category