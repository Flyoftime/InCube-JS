import React from 'react'

const Dashboard = () => {
  return (
   <div className='p-2'>
    <div className="card w-96 shadow-xl bg-[DDDDDD]"> 
       <div className="card-body">
         <h2 className="font-bold text-[#000]">InCube #1</h2>
          <p className='text-[#000] font-thin text-xs'>(+49)Eggs</p>
            <div className='card w-75 h-18 bg-[rgb(221,221,221)] p-2'>
              <div className='grid grid-rows-3 grid-flow-col p-2'>
      <div className=' col-span-8 text-xs font-bold '>Temperature</div>
    <div className='  row-span-2 col-span-1 text-black text-s font-bold  '>38.1</div>
        <div className='row-end row-span-3 bg-[#ffb800] w-12 h-12 rounded-md p-2'>
          <img src='/assets/outline.png' width={30} height={30} ></img>
          </div>       
      </div>
        </div>
          </div>
            </div>
          </div>
          
      
  )
}

export default Dashboard