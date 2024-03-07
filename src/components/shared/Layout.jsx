import React from 'react'
import { Outlet } from 'react-router-dom'
import SideNav from '../SideNav'
import TopNav from '../TopNav'

function Layout({ setIsDarkMode }) {
    return (
        <div className='flex h-screen w-screen overflow-hidden dark:bg-slate-900'>
            <div className='dark:bg-slate-900'>
                <SideNav />
            </div>
            <div className='p-5 w-full overflow-y-scroll'>
                <div className=''>
                    <TopNav setIsDarkMode={setIsDarkMode} />
                </div>
                <div>{<Outlet />}</div>
            </div>
        </div>
    )
}

export default Layout