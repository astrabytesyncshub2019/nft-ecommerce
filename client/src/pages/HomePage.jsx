import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Heading from '../components/Heading/Heading'
import Slider from '../components/Slider/Slider'


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

    </>
  )
}

export default HomePage