import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideNav from '../SideNav'
import TopNav from '../TopNav'

function Layout({ setIsDarkMode }) {
    const [isMenu, setIsMenu] = useState(false)
    return (
        <div className='flex h-screen w-screen overflow-hidden dark:bg-slate-900'>
            <div className='dark:bg-slate-900'>
                <SideNav isMenu={isMenu} setIsMenu={setIsMenu} />
            </div>
            <div className='w-full overflow-y-scroll'>
                <div className='w-full pt-5 px-5 bg-white dark:bg-slate-900 fixed'>
                    <TopNav setIsDarkMode={setIsDarkMode} setIsMenu={setIsMenu} />
                </div>
                <div className='mt-24'>{<Outlet />}</div>
            </div>
        </div>
    )
}

export default Layout