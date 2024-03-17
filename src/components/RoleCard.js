import React from 'react'
import GroupAvatars from './GroupAvatars'

function RoleCard({ total_users, role, images }) {
    return (
        <div className='w-full max-w-96 p-5 border border-gray-600 rounded-lg'>
            <div className='w-full flex justify-between items-center'>
                <span className='text-gray-600 dark:text-gray-300'>Total {total_users ? total_users : '0'} users</span>
                <GroupAvatars images={images} />
            </div>
            <div className='w-full flex justify-between items-center mt-10'>
                <span className='text-xl font-medium text-gray-700 dark:text-gray-300'>{role}</span>
                <i className='bx bx-copy text-xl dark:text-gray-400 cursor-pointer' title='copy'></i>
            </div>
        </div>
    )
}

export default RoleCard