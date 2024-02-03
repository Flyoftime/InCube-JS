import React from 'react'

const Fitur = () => {
  return (
    <div>
        <div className=''>
            <h1 className='text-lg text-[#000] text-center font-semibold'>Features</h1>
            <h1 className='text-xl text-[#000] text-center font-bold'>What We Offer</h1>
            <p className='text text-[#000] text-center'>We Create Features That Helps You To Hatch Your 
            Egg Faster 
            </p>
            <p className='text text-[#000] text-center'>And Easier,Wherever You Are</p>
            <div className='grid grid-flow-col justify-stretch p-20 py-32 '>
                <div className="card card-compact w-[20vw] h-[40vh]  shadow-xl">
                    <figure><img src="/assets/wifi.png" alt="wifi" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-[#000] font-bold">Internet Of Things</h2>
                    </div>
                </div>
                <div className="card card-compact w-[20vw] h-[40vh] shadow-xl ">
                    <figure><img src="assets/realtime.png" alt="" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-[#000]">Real-Time</h2>
                    </div>
                </div>
                <div className="card card-compact w-[20vw] h-[40vh] shadow-xl">
                    <figure><img src="assets/reports.png" alt="" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-[#000]">Full Reports </h2>
                    </div>
                </div>
                <div className="card card-compact w-[20vw] h-[40vh] shadow-xl">
                    <figure><img src="assets/notif.png" alt="" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-[#000]">Notification</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Fitur