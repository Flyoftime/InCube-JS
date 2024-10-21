import React from 'react'

const Landingpage = () => {
  return (
    <div className='max-w-screen h-screen py-[150px] md:py-[250px] px-8 md:px-[154px] flex flex-col items-center gap-8' id='LandingPage'>
      <div className='flex flex-col gap-4 md:gap-8 w-full text-center md:text-left'>
        <p className='font-montserrat font-bold text-[36px] md:text-[70.44px] text-white'>
          Reach the<br />Efficiency<br />of Farming
        </p>
        <p className='font-montserrat font-medium text-[18px] md:text-[33.94px] text-white'>
          Order Our Smart Incubator
        </p>
        <button className='bg-[#ffd4d4] rounded-[40px] font-montserrat text-[16px] md:text-[24px] text-[#3f2013] px-6 py-3 md:px-8 md:py-4 font-semibold w-fit'>
          Order Now
        </button>
      </div>
      <div className='flex flex-col items-center gap-4 md:gap-6 mt-8 md:mt-12'>
        <p className='font-montserrat font-semibold text-[16px] md:text-[24px] text-white'>
          Trusted and Funded by Incube
        </p>
        <div className='w-full md:w-[934px] h-[100px] md:h-[125px] rounded-[19px] bg-white shadow-[0_11px_15px_2px_rgba(0,0,0,0.11)]'></div>
      </div>
    </div>
  )
}

export default Landingpage
