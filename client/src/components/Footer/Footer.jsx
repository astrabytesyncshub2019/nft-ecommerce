import React from "react"
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa"
import { Link } from "react-router"

const Footer = () => {
  return (
    <footer className="w-full">

      <div className="bg-[var(--heading-color)] text-white px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold uppercase mb-4">Support</h4>
            <ul className="space-y-2">
              <li className="hover:underline cursor-pointer">Service and Warranty</li>
              <li className="hover:underline cursor-pointer">Return and Exchange</li>
              <li className="hover:underline cursor-pointer">Contact</li>
              <li className="hover:underline cursor-pointer">TSA Lock Instructions</li>
            </ul>
          </div>


          <div>
            <h4 className="font-bold uppercase mb-4">Quick Link</h4>
            <ul className="space-y-2">
              <li className="hover:underline cursor-pointer">Damage Policy</li>
              <li className="hover:underline cursor-pointer">Care and Cleaning</li>
              <li className="hover:underline cursor-pointer">Packing Tips</li>
              <li className="hover:underline cursor-pointer">Sustainability</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase mb-4">Account</h4>
            <ul className="space-y-2">
              <Link to="/sign-in" className="hover:underline cursor-pointer block">Sign In</Link>
              <Link className="hover:underline cursor-pointer block">Shop all products</Link>
            </ul>
          </div>
        </div>


        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/30 pt-6">
          <div className="flex gap-6 text-2xl">
            <Link className="hover:text-[var(--secondary-bg-color)] transition-colors"><FaInstagram /></Link>
            <Link  className="hover:text-[var(--secondary-bg-color)] transition-colors"><FaFacebook /></Link>
            <Link  className="hover:text-[var(--secondary-bg-color)] transition-colors"><FaYoutube /></Link>
          </div>

          <p className="text-sm text-center md:text-right">
            © 2025, Your Brand. Powered by <span className="underline">Marmeto</span>.
          </p>
        </div>

        <div className="mt-4 text-sm flex flex-wrap justify-center gap-6">
          <Link to="#" className="hover:underline">Terms & Condition</Link>
          <Link to="#" className="hover:underline">Privacy</Link>
          <Link to="#" className="hover:underline">Personal Information Collection Statement</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
