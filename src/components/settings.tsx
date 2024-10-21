import React from 'react'

const settings = () => {
    return (
        <div >
            <div className='p-12 flex flex-col md:flex-row gap-[50px] items-start'>
                <div className='card w-full md:w-[597px] h-[168px] bg-[#ffff] drop-shadow-xl p-2 ms-2 '>
                    <div className='grid grid-rows-3 grid-flow-col p-2'>
                        <div className='col-span-11 p-1 m-1 text-base font-bold font-montserrat text-black '>InCube Active</div>
                        <div className='row-span-12 col-span-12 text-black text-s font-bold font-montserrat  mt-6'></div>
                    </div>
                </div>

                <div className='card w-full md:w-[597px] h-[168px] bg-[#ffff] drop-shadow-xl p-2 ms-2 '>
                    <div className='grid grid-rows-3 grid-flow-col p-2'>
                        <div className='col-span-11 p-1 m-1 text-base font-bold font-montserrat text-black '>InCube Active</div>
                        <div className='row-span-12 col-span-12 text-black text-s font-bold font-montserrat  mt-6'></div>
                    </div>
                </div>
            </div>
            <div className='p-12 flex flex-col md:flex-row gap-[50px] items-start' >
                <div className='card w-full md:w-[597px] h-[456px] bg-[#ffff] drop-shadow-xl p-2 ms-2'>
                    <div className='grid grid-rows-3 grid-flow-col p-2'>
                        <div className='col-span-11 p-1 m-1 text-base font-bold font-montserrat text-black '>Your Profile</div>
                    </div>
                </div>

                <div className='card w-full md:w-[696px] h-[600px] bg-[#ffff] drop-shadow-xl p-2 ms-2'>
                    <div className='grid grid-rows-3 grid-flow-col p-2'>
                        <div className='col-span-11 p-1 m-1 text-base font-bold font-montserrat text-black '>Your Address</div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default settings