import React from 'react'

const Landingpage = () => {
  return (
    <div className='max-w-screen h-screen py-[250px] px-[154px] flex flex-col items-center gap-8' id='LandingPage'>
    <div className='flex flex-col gap-8 w-full'>
        <p className='font-montserrat font-bold text-[70.44px] text-white'>Reach the<br/>Efficiency<br/>of Farming</p>
        <p className='font-montserrat font-medium text-[33.94px] text-white'>Order Our Smart incubator </p>
        <button className='bg-[#ffd4d4] rounded-[40px] font-montserrat text-[24px] text-[#3f2013] px-8 py-4 font-semibold w-fit'>Order Now</button>
    </div>
    <div className='flex flex-col items-center gap-6'>
        <p className='font-montserrat font-semibold text-[24px] text-white'>Trusted and Funded by </p>
        <div className='w-[934px] h-[125px] rounded-[19px] bg-white shadow-[0_11px_15px_2px_rgba(0,0,0,0.11)]'></div>
    </div>
    </div>
  )
}

export default Landingpage