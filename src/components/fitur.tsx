import React from 'react'

const Fitur = () => {
    return (
        <div className='py-16 md:py-32 flex flex-col gap-16 md:gap-[100px]'>
            <div className='flex flex-col items-center text-center'>
                <p className='font-montserrat font-medium text-3xl md:text-[43.2px] text-black'>Features</p>
                <p className='font-montserrat font-bold text-4xl md:text-[48px] text-black'>What we offer</p>
                <p className='font-montserrat font-medium text-lg md:text-[28.8px] text-black'>
                    We Create Features That Helps You To Hatch Your Egg Faster<br />
                    and Easier, Wherever You Are.
                </p>
            </div>
            <div className='flex flex-wrap justify-center gap-8 md:gap-[51.6px]'>
                <div className='px-6 md:px-[30px] w-full md:w-auto flex flex-col items-center justify-between pb-8 md:pb-[40px] rounded-[18px] bg-[#d9d9d9] bg-opacity-20 shadow-md md:shadow-[0_18px_40.8px_2.4px_rgba(0,0,0,0.18)]'>
                    <img src="/assets/wifi.png" alt="Internet of Things" className='w-16 h-16 md:w-auto md:h-auto'/>
                    <p className='font-montserrat font-semibold text-xl md:text-[28.8px] text-black text-center mt-4'>Internet of Things</p>
                </div>
                <div className='px-6 md:px-[30px] w-full md:w-auto flex flex-col items-center justify-between pb-8 md:pb-[40px] rounded-[18px] bg-[#d9d9d9] bg-opacity-20 shadow-md md:shadow-[0_18px_40.8px_2.4px_rgba(0,0,0,0.18)]'>
                    <img src="/assets/realtime.png" alt="Real-Time Dashboard" className='w-16 h-16 md:w-auto md:h-auto'/>
                    <p className='font-montserrat font-semibold text-xl md:text-[28.8px] text-black text-center mt-4'>Real-Time Dashboard</p>
                </div>
                <div className='px-6 md:px-[30px] w-full md:w-auto flex flex-col items-center justify-between pb-8 md:pb-[40px] rounded-[18px] bg-[#d9d9d9] bg-opacity-20 shadow-md md:shadow-[0_18px_40.8px_2.4px_rgba(0,0,0,0.18)]'>
                    <img src="/assets/reports.png" alt="Full Reports" className='w-16 h-16 md:w-auto md:h-auto'/>
                    <p className='font-montserrat font-semibold text-xl md:text-[28.8px] text-black text-center mt-4'>Full Reports</p>
                </div>
                <div className='px-6 md:px-[30px] w-full md:w-auto flex flex-col items-center justify-between pb-8 md:pb-[40px] rounded-[18px] bg-[#d9d9d9] bg-opacity-20 shadow-md md:shadow-[0_18px_40.8px_2.4px_rgba(0,0,0,0.18)]'>
                    <img src="/assets/notif.png" alt="Notification" className='w-16 h-16 md:w-auto md:h-auto'/>
                    <p className='font-montserrat font-semibold text-xl md:text-[28.8px] text-black text-center mt-4'>Notification</p>
                </div>
            </div>
        </div>
    )
}

export default Fitur
