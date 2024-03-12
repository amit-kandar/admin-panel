import React from 'react'
import Area from '../components/charts/Area'
import PieChart from '../components/charts/Pie'
import ApexRadial from '../components/charts/ApexRadial'

function Dashboard() {

    return (
        <div className='w-full h-full grid place-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 p-3 dark:text-white'>
            <div className='relative w-full h-60 flex justify-start flex-col items-center border rounded-md'>
                <div className='w-full flex flex-col justify-start p-5 pb-0'>
                    <span className='text-xl font-medium text-gray-500 dark:text-gray-200'>Sales</span>
                    <p className='text-sm font-medium text-gray-400'>Last Year</p>
                </div>
                <Area />
                <div className='absolute w-full flex justify-between px-6 bottom-5'>
                    <span className='text-xl font-semibold text-gray-500 dark:text-gray-200'>175k</span>
                    <span className='text-red-500 text-sm pt-1'>-16.2%</span>
                </div>
            </div>
            <div className='w-full h-60 flex gap-3 flex-col p-6 border rounded-md'>
                <div className='w-10 h-10 flex justify-center items-center rounded-md bg-red-100'>
                    <i className='bx bx-dollar text-xl text-red-600' ></i>
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-xl font-medium text-gray-500 dark:text-gray-400'>Total Profit</span>
                    <span className='text-sm font-medium text-gray-400 dark:text-gray-500'>Last Week</span>
                    <span className='text-sm font-medium text-gray-400 dark:text-gray-500'>1.28k</span>
                    <div className='w-fit px-2 rounded-md bg-gray-200 dark:bg-gray-400'>
                        <span className='text-gray-800 font-medium text-sm'>-12.2%</span>
                    </div>
                </div>
            </div>
            <div className='w-full h-60 flex gap-3 flex-col p-6 border rounded-md'>
                <div className='w-10 h-10 flex justify-center items-center rounded-md bg-green-100'>
                    <i className='bx bx-bar-chart-alt-2 text-xl text-green-600'></i>
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-xl font-medium text-gray-500 dark:text-gray-400'>Total Sales</span>
                    <span className='text-sm font-medium text-gray-400 dark:text-gray-500'>Last Week</span>
                    <span className='text-sm font-medium text-gray-400 dark:text-gray-500'>$4,320</span>
                    <div className='w-fit px-2 rounded-md bg-gray-200 dark:bg-gray-400'>
                        <span className='text-gray-800 font-medium text-sm'>+25.5%</span>
                    </div>
                </div>
            </div>
            <div className='w-full h-60 xl:col-span-2 flex gap-3 p-5 flex-row border rounded-md'>
                <div className='h-full w-fit flex flex-col justify-between'>
                    <div className='flex flex-col gap-1'>
                        <span className='text-xl font-medium text-gray-500 dark:text-gray-400'>Revenue Growth</span>
                        <span className='text-sm font-medium text-gray-400 dark:text-gray-500'>Weekly Report</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-xl font-medium text-gray-400 dark:text-gray-500'>$4,320</span>
                        <div className='w-fit px-2 rounded-md bg-green-100 dark:bg-gray-400'>
                            <span className='text-gray-800 text-sm font-medium'>+12.2%</span>
                        </div>
                    </div>
                </div>
                <PieChart />
            </div>
            <div className="w-full h-60 lg:col-span-2 xl:col-span-4 flex gap-14 p-5 flex-col border rounded-md">
                <div className='w-full flex justify-between items-center lg:px-5'>
                    <span className='font-semibold text-gray-600 dark:text-gray-400 text-xl'>Statistics</span>
                    <span className='text-gray-400 dark:text-gray-600'>Updated 1 month ago</span>
                </div>
                <div className='w-full grid grid-cols-2 lg:grid-cols-4 place-items-center'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 flex justify-center items-center rounded-full bg-violet-200'>
                            <i className='bx bx-pie-chart-alt-2 text-violet-700 text-xl'></i>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-lg font-medium text-gray-500 dark:text-gray-400'>230K</span>
                            <span className='text-sm font-medium text-gray-400 dark:text-gray-500'>Sales</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 flex justify-center items-center rounded-full bg-violet-200'>
                            <span className="material-symbols-outlined text-violet-700 text-xl">
                                group
                            </span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-lg font-medium text-gray-500 dark:text-gray-400'>230K</span>
                            <span className='text-sm font-medium text-gray-400 dark:text-gray-500'>Sales</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 flex justify-center items-center rounded-full bg-violet-200'>
                            <span className="material-symbols-outlined text-violet-700 text-xl">
                                gavel
                            </span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-lg font-medium text-gray-500 dark:text-gray-400'>230K</span>
                            <span className='text-sm font-medium text-gray-400 dark:text-gray-500'>Sales</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 flex justify-center items-center rounded-full bg-violet-200'>
                            <span className="material-symbols-outlined text-violet-700 text-xl">
                                attach_money
                            </span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-lg font-medium text-gray-500 dark:text-gray-400'>230K</span>
                            <span className='text-sm font-medium text-gray-400 dark:text-gray-500'>Sales</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-60 flex gap-3 flex-col p-6 border rounded-md'>
                <div className='w-full flex flex-col justify-start'>
                    <span className='text-xl font-medium text-gray-500 dark:text-gray-200'>Repeat Customer</span>
                    <p className='text-sm font-medium text-gray-400'>Last Year</p>
                </div>
                <ApexRadial />
                <span></span>
            </div>
        </div>
    )
}

export default Dashboard