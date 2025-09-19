import React, { useEffect, useRef } from "react"
import img4 from "../../assets/img4.jpg"
import gsap from "gsap"

const Heading = () => {
  const headingRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.from(headingRef.current.querySelectorAll("h1"), {
      x: -100,
      opacity: 0,
      stagger: 0.5,
      duration: 2,
    })

  }, [])

  return (
    <div className="mainsection flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 py-[12vw] gap-12 md:gap-28">
      <div
        ref={headingRef}
        className="heading text-[2.5rem] md:text-[5rem] font-bold tracking-tighter leading-[3rem] md:leading-[5rem] w-full md:w-2/3 uppercase text-[var(--text-color)] text-center md:text-left"
      >
        <h1>
          From Office to{" "}
          <span className="text-[var(--heading-color)]">Adventure</span>
        </h1>
        <h1>We’ve Got Your Back</h1>
      </div>

      {/* Image */}
      <div
        ref={imgRef}
        className="images-section w-full md:w-2/4 flex justify-center hover:scale-105 rounded-xl transition-all cursor-pointer"
      >
        <div className="img overflow-hidden shadow-2xl rounded-xl w-[80%] md:w-full">
          <img
            src={img4}
            alt="bag"
            className="object-contain w-full h-full transition-transform duration-300 shadow-xl"
          />
        </div>
      </div>
    </div>
  )
}

export default Heading
