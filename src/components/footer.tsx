import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"

const Footer = () => {
  return (
    <div>
      <div className="bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">
        <div className="p-5 ">
          <ul>
            
            <div className="flex gap-6 pb-5">
              <a href="" className='hover:text-yellow-600'><img src="/assets/Linkedin.png" alt="" /></a>
              <a href="" className='hover:text-yellow-600'><img src="/assets/Facebook.png" alt="" /></a>
              <a href="" className='hover:text-yellow-600'><img src="/assets/instagram.png" alt="" /></a>
              <a href="" className='hover:text-yellow-600'><img src="/assets/Twitter.png" alt="" /></a>
          
            </div>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-yellow-600 cursor-pointer">
              Help Center
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-yellow-600 cursor-pointer">
              Account Infformation
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-yellow-600 cursor-pointer">
              About
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-yellow-600 cursor-pointer">
              Contact us
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-yellow-600 cursor-pointer">
              Talk to Support
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-yellow-600 cursor-pointer">
              Support docs
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-yellow-600 cursor-pointer">
              System status
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-yellow-600 cursor-pointer">
              Covid responde
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-yellow-600 cursor-pointer">
              Update
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-yellow-600 cursor-pointer">
              Security
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-yellow-600 cursor-pointer">
              Beta Test
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-yellow-600 cursor-pointer">
              Pricing Product
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center  p-5 bg-gray-50">
        <h1 className=" text-gray-800 font-semibold">
          © 2024 All rights reserved | Build with ❤ by{" "}
          <span className="hover:text-yellow-600 font-semibold cursor-pointer">
            Incube{" "}
          </span>
        </h1>
      </div>
    </div>
  )
}

export default Footer