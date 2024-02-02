import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
const Sidebar = () => {
  return (
    <div className='flex'>
        <div className='bg-[#FFB800] h-screen p-5 pt-8 w-52'>
        <div className="avatar">
            <div className="w-24 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
        </div>
       <div>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            
        </svg> 
        <a href="" className=''>Dashboard</a>
       </div>

        
        </div>
    </div>
  )
  
}

export default Sidebar