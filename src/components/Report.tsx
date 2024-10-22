'use client'
import React, { useEffect, useState } from 'react'
import Chart from './Chart';

const Reports = () => {
    const [openall, setOpenall] = useState(false);

    return (
        <div className='p-12 flex flex-col md:flex-row gap-[50px] items-start'>
            <div
                className={`card w-full md:w-[1354px] ${openall ? 'h-auto' : 'h-[96px]'} bg-[#ffff] drop-shadow-xl p-2 ms-2 transition-all duration-300 ease-in-out`}>
                <div className='grid grid-rows-3 grid-flow-col p-4 relative'>
                    <button
                        className='absolute top-2 right-2 p-1 bg-transparent hover:bg-gray-200 rounded'
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenall(!openall);
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 8 7">
                            <path fill="#000" fill-opacity="1" fill-rule="evenodd" stroke="none" d="m3.646 5.354-3-3 .708-.708L4 4.293l2.646-2.647.708.708-3 3L4 5.707z"></path>
                        </svg>
                    </button>
                    <div className='col-span-11 p-1 m-1 text-3xl font-bold font-montserrat text-black '>InCube#1</div>
                    <div className='row-span-12 col-span-12 text-black text-s font-bold font-montserrat mt-6'></div>
                </div>
                {openall && (
                    <div className='p-4'>
                        <Chart />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Reports;
