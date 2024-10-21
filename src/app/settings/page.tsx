import Settings from '@/components/settings'
import Sidebar from '@/components/sidebar'
import React from 'react'

const Settingspage = () => {
    return (
        <div className='flex  ' id='settings'>
            <Sidebar/>
            <Settings/>
        </div>
    )
}

export default Settingspage