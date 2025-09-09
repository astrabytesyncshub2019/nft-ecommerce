import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Heading from '../components/Heading/Heading'
import Slider from '../components/Slider/Slider'
import NewArrival from '../components/NewArrival/NewArrival'
import Category from '../components/Category/Category'
import BrandToday from '../components/BrandToday/BrandToday'
import Footer from '../components/Footer/Footer'


const HomePage = () => {
  return (
    <>
      <div className='bg-[#f1f1f1] min-h-screen '>
        <Navbar />
        <Heading />




      </div>
      <div className='px-12 py-16' >
        <Slider />
      </div>

      <div className='px-12 py-24 bg-[#f1f1f1] min-h-screen'>
        <NewArrival />
      </div>

      <div className='px-12 py-16 min-h-screen'>
        <Category />
      </div>

      <div className='px-12 py-8 bg-[#f1f1f1] min-h-screen'>
        <BrandToday />
      </div >

      <div >
        <Footer/>
      </div>

    </>
  )
}

export default HomePage