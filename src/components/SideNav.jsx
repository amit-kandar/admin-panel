import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

function SideNav({ isMenu, setIsMenu }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isLocked, setIsLocked] = useState(true);
    const [isOpen, setIsOpen] = useState({
        page: false,
        user: false,
        role: false
    });
    // const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isLargeView = useMediaQuery({ query: '(min-width: 1024px)' })

    const handleMenuOpen = () => {
        setIsMenu(false)
    }

    const handleCollapsed = () => {
        setIsLocked(prev => !prev);
    };

    const handleDropdown = useCallback((type) => {
        setIsOpen(prev => ({ ...prev, [type]: !prev[type] }));
    }, []);

    useEffect(() => {
        const handleMouseOver = () => {
            setIsCollapsed(false);
        };

        if (isCollapsed) {
            setIsOpen({
                page: false,
                user: false,
                role: false
            });
        }

        const handleMouseOut = () => {
            setIsCollapsed(true);
        };

        const sidebar = document.getElementById('sidebar');

        if (!isLocked && sidebar) {
            sidebar.addEventListener('mouseover', handleMouseOver);
            sidebar.addEventListener('mouseout', handleMouseOut);

            return () => {
                sidebar.removeEventListener('mouseover', handleMouseOver);
                sidebar.removeEventListener('mouseout', handleMouseOut);
            };
        }
    }, [isLocked, isCollapsed]);

    // setIsMenu(isMenuOpen)

    return (
        <div
            className={`${isCollapsed ? 'w-20 duration-200 transition-all ease-in' : 'w-64 transition-all duration-200 ease-out'} h-screen bg-white border-r dark:bg-slate-900 dark:text-white ${!isMenu && !isLargeView && 'hidden'} absolute z-50 lg:static lg:z-0 overflow-y-auto`}
            id='sidebar'
        >
            <div className='flex justify-between items-center gap-16 pt-6 pb-3 px-4 fixed bg-white dark:bg-slate-900'>
                <div className='flex items-center gap-2'>
                    <img src={`https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} alt="" className='w-10 h-10 rounded-full' />
                    <span className={`${isCollapsed && 'hidden'} text-xl font-bold`}>Velocity</span>
                </div>
                {
                    isLargeView
                        ? <div className={`${isCollapsed && 'hidden transition-all duration-200'} cursor-pointer`} onClick={handleCollapsed}>
                            {
                                isLocked
                                    ? <i className='bx bx-radio-circle-marked text-3xl'></i>
                                    : <i className='bx bx-radio-circle text-3xl'></i>
                            }
                        </div>
                        : <div className='lg:hidden ' onClick={handleMenuOpen}>
                            {
                                isMenu && <i className='bx bx-x text-2xl dark:text-white'></i>
                            }
                        </div>
                }
            </div>
            <div className='flex flex-col gap-4 mt-20 px-6 w-full'>
                <div className='flex items-center gap-3'>
                    <i className='bx bx-home-smile text-2xl'></i>
                    <Link to="/" className={`${isCollapsed && 'hidden'}`}>Dashboard</Link>
                </div>
                <div className='flex items-center gap-3'>
                    <i className='bx bxs-analyse text-2xl' ></i>
                    <Link to="/" className={`${isCollapsed && 'hidden'}`}>Analytics</Link>
                </div>
                <div className='flex flex-col gap-3 w-full'>
                    <span className={`${isCollapsed && 'hidden'} text-sm text-gray-500`}>Pages</span>
                    <div className='flex flex-col gap-3 cursor-pointer' onClick={(e) => { handleDropdown("page") }}>
                        <div className='flex items-center gap-3'>
                            <i className='bx bx-copy-alt text-2xl'></i>
                            <div className={`${isCollapsed && 'hidden'} w-full flex items-center justify-between`}>
                                <span>Pages</span>
                                <div className='cursor-pointer' >
                                    {
                                        isOpen.page
                                            ? <i className='bx bx-chevron-down text-xl delay-0 duration-100' ></i>
                                            : <i className='bx bx-chevron-right text-xl delay-0 duration-100' ></i>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={`${!isOpen.page && 'hidden'} pl-10`}>
                            <ul className='list-disc space-y-2'>
                                <li><Link to="/pages/landing-page">Landing Page</Link></li>
                                <li><Link to="/pages/testimonials-page">Testimonials Page</Link></li>
                                <li><Link to="/pages/services-page">Services Page</Link></li>
                                <li><Link to="/page/contactus-page">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <i className='bx bx-calendar text-2xl' ></i>
                        <Link to="/pages/calender" className={`${isCollapsed && 'hidden'}`}>Calender</Link>
                    </div>
                    <div className='flex flex-col gap-3 cursor-pointer' onClick={(e) => { handleDropdown("user") }}>
                        <div className='flex items-center gap-3'>
                            <i className='bx bx-user text-2xl'></i>
                            <div className={`${isCollapsed && 'hidden'} w-full flex items-center justify-between`}>
                                <span>User</span>
                                <div className='cursor-pointer'>
                                    {
                                        isOpen.user
                                            ? <i className='bx bx-chevron-down text-xl delay-0 duration-100' ></i>
                                            : <i className='bx bx-chevron-right text-xl delay-0 duration-100' ></i>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={`${!isOpen.user && 'hidden'} pl-10`}>
                            <ul className='list-disc space-y-2'>
                                <li><Link to="/users/list">List</Link></li>
                                <li><Link to="/users/view">View</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-3 w-full'>
                    <span className={`${isCollapsed && 'hidden'} text-sm text-gray-500`}>Roles & Permissions</span>
                    <div className='flex items-center gap-3'>
                        <i className='bx bx-check-shield text-2xl'></i>
                        <Link to="/roles" className={`${isCollapsed && 'hidden'}`}>Roles</Link>
                    </div>
                    <div className='flex items-center gap-3'>
                        <i className='bx bx-lock-alt text-2xl' ></i>
                        <Link to="/permissions" className={`${isCollapsed && 'hidden'}`}>Permissions</Link>
                    </div>
                </div>
                <div className='flex flex-col gap-3 w-full'>
                    <span className={`${isCollapsed && 'hidden'} text-sm text-gray-500`}>Charts</span>
                    <div className='flex items-center gap-3'>
                        <i className='bx bx-pie-chart-alt-2 text-2xl' ></i>
                        <Link to="/charts/pie-chart" className={`${isCollapsed && 'hidden'}`}>Pie Chart</Link>
                    </div>
                    <div className='flex items-center gap-3'>
                        <i className='bx bx-bar-chart-alt-2 text-2xl' ></i>
                        <Link to="/charts/bar-chart" className={`${isCollapsed && 'hidden'}`}>Bar Chart</Link>
                    </div>
                    <div className='flex items-center gap-3'>
                        <i className='bx bx-line-chart text-2xl' ></i>
                        <Link to="/charts/line-chart" className={`${isCollapsed && 'hidden'}`}>Line Chart</Link>
                    </div>
                    <div className='flex items-center gap-3'>
                        <i className='bx bxl-graphql text-2xl'></i>
                        <Link to="/charts/radar-chart" className={`${isCollapsed && 'hidden'}`}>Radar Chart</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideNav