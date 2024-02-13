import React from 'react'

const Dashboard = () => {
  return (
    <div className='p-2 '>
      <div className=" card w-[1354px] h-[234px] shadow-xl bg-[#ffffff]  ">
        <div className="card-body p-4">
          <h2 className="font-bold text-[#2d3748] text-[32px] font-montserrat">InCube #1</h2>
          <p className='text-[#000] font-thin text-xs font-montserrat text-[22px] '>(+49)Eggs</p>
          <div className='flex gap-7'>
          <div className='card w-[405px] h-[80px] bg-[rgb(221,221,221)] p-2 '>
            <div className='grid grid-rows-3 grid-flow-col p-2'>
              <div className=' col-span-8 text-xs font-bold font-montserrat'>Temperature</div>
              <div className='  row-span-2 col-span-1 text-black text-s font-bold font-montserrat '>38.1</div>
              <div className='row-end row-span-3 bg-[#ffb800] w-[48px] h-[45px] valo rounded-md p-2'>
                <img src='/assets/outline.png' width={30} height={30} ></img>
              </div>
            </div>
          </div>
          <div className='card w-[405px] h-[80px] bg-[rgb(221,221,221)] p-2'>
            <div className='grid grid-rows-3 grid-flow-col p-2'>
              <div className=' col-span-8 text-xs font-bold font-montserrat'>Temperature</div>
              <div className='  row-span-2 col-span-1 text-black text-s font-bold font-montserrat '>38.1</div>
              <div className='row-end row-span-3 bg-[#ffb800] w-[48px] h-[45px] valo rounded-md p-2'>
                <img src='/assets/outline.png' width={30} height={30} ></img>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Dashboard