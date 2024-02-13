import React from 'react'

const Fitur = () => {
  return (
    <div>
        <div className='py-32 flex flex-col gap-[100px]'>
            <div className='flex flex-col items-center'>
                <p className='font-montserrat font-medium text-[43.2px] text-black'>Features</p>
                <p className='font-montserrat font-bold text-[48px] text-black'>What we offer</p>
                <p className='font-montserrat font-medium text-[28.8px] text-black text-center'>We Create Features That Helps You To Hatch Your Egg Faster<br/>and Easier, Wherever You Are.</p>
            </div>
            <div className='flex justify-center gap-[51.6px]'>
                <div className='px-[30px] w-fit flex flex-col items-center justify-between pb-[40px] rounded-[18px] bg-[#d9d9d9] bg-opacity-20 shadow-[0_18px_40.8px_2.4px_rgba(0,0,0,0.18)]'>
                    <img src="/assets/wifi.png" alt="" />
                    <p className='font-montserrat font-semibold text-[28.8px] text-black text-center'>Internet of Things</p>
                </div>
                <div className='px-[30px] w-fit flex flex-col items-center justify-between pb-[40px] rounded-[18px] bg-[#d9d9d9] bg-opacity-20 shadow-[0_18px_40.8px_2.4px_rgba(0,0,0,0.18)]'>
                    <img src="/assets/realtime.png" alt="" />
                    <p className='font-montserrat font-semibold text-[28.8px] text-black text-center'>Real-Time Dashboard</p>
                </div>
                <div className='px-[30px] w-fit flex flex-col items-center justify-between pb-[40px] rounded-[18px] bg-[#d9d9d9] bg-opacity-20 shadow-[0_18px_40.8px_2.4px_rgba(0,0,0,0.18)]'>
                    <img src="/assets/reports.png" alt="" />
                    <p className='font-montserrat font-semibold text-[28.8px] text-black text-center'>Full Reports</p>
                </div>
                <div className='px-[30px] w-fit flex flex-col items-center justify-between pb-[40px] rounded-[18px] bg-[#d9d9d9] bg-opacity-20 shadow-[0_18px_40.8px_2.4px_rgba(0,0,0,0.18)]'>
                    <img src="/assets/notif.png" alt="" />
                    <p className='font-montserrat font-semibold text-[28.8px] text-black text-center'>Notification</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Fitur