import Dashboard from '@/components/dashboard'
import Sidebar from '@/components/sidebar'
import React from 'react'

const Dashboardpage = () => {
  return (
    <div className='flex '>
        <Sidebar/>
        <Dashboard/>
    </div>
  )
}

export default Dashboardpage