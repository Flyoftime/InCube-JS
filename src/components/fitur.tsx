import React from 'react'

const Fitur = () => {
  return (
    <div>
        <div className=''>
            <h1 className='text-lg text-[#000] text-center'>Features</h1>
            <h1 className='text-xl text-[#000] text-center font-bold'>What We Offer</h1>
            <p className='text text-[#000] text-center'>We Create Features That Helps You To Hatch Your 
            Egg Faster 
            </p>
            <p className='text text-[#000] text-center'>And Easier,Wherever You Are</p>
            <div className="card w-96 bg-base-100 shadow-xl bg-white">
                <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-[#000] font-bold">Internet Of Things</h2>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Fitur