import React from 'react'
import RoleCard from '../components/RoleCard'

function Role() {
    const role_images = [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ]
    return (
        <div className='border border-gray-600 rounded-md p-3'>
            <div className='space-y-2'>
                <h1 className='text-gray-700 dark:text-gray-300 font-bold text-2xl'>Roles List</h1>
                <h3 className='text-sm text-gray-500/90 dark:text-gray-400/70'>A role provided access to predefined menus and features so that depending on assigned role an administrator can have access to what he need.</h3>
            </div>
            <div className='w-full grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                <RoleCard total_users={4} images={role_images} role="Administrator" />
                <RoleCard total_users={4} images={role_images} role="Administrator" />
                <RoleCard total_users={4} images={role_images} role="Administrator" />
                <RoleCard total_users={4} images={role_images} role="Administrator" />
                <RoleCard total_users={4} images={role_images} role="Administrator" />
            </div>
        </div>
    )
}

export default Role