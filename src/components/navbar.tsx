
import React from 'react'

const navbar = () => {
  return (
    <nav className="navbar bg-[#FFB800] max-w-screen w-full flex fixed top-0 left-0 right-0 z-50 justify-between items-center px-12 py-2">
  <div className="flex-1">
    <img src='/assets/logo2 2.png' alt="" className='h-12'/>
  </div>
  <div className="flex gap-4">
    <a href="/" className='text text-white font-bold hover:underline transition-all duration-100'>Home</a>
    <a href='/features' className='text text-white font-bold hover:underline transition-all duration-100'>Features</a>
    <a href='/about' className='text text-white font-bold hover:underline transition-all duration-100'>About</a>
    <a href='/login' className='text text-[#B21616] font-bold hover:underline transition-all duration-100'>Sign In</a>
  </div>
</nav>
  )
}

export default navbar