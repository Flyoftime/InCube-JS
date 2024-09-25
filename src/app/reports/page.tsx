import Report from '@/components/Report'
import Sidebar from '@/components/sidebar'
import React from 'react'

const ReportsPage = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <Report />
        </div>
    )
}

export default ReportsPage