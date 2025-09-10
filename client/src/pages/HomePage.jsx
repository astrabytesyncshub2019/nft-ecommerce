import React from 'react'
import Heading from '../components/Heading/Heading'
import Slider from '../components/Slider/Slider'
import NewArrival from '../components/NewArrival/NewArrival'
import Category from '../components/Category/Category'
import BrandToday from '../components/BrandToday/BrandToday'

const HomePage = () => {
  return (
    <>
      <section className="bg-[#f1f1f1] min-h-screen ">
        <Heading />
      </section>

      <section className="px-12 py-16">
        <Slider />
      </section>

      <section className="px-12 py-24 bg-[#f1f1f1] min-h-screen">
        <NewArrival />
      </section>

      <section className="px-12 py-16 min-h-screen">
        <Category />
      </section>

      <section className="px-12 py-8 bg-[#f1f1f1]">
        <BrandToday />
      </section>
    </>
  )
}

export default HomePage
