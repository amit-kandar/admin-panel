import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className='w-full flex items-center border border-gray-500 mt-5 p-3 sm:p-5 rounded-md text-gray-600 dark:text-gray-400 mb-5'>
            <div className='w-full flex items-center justify-between flex-col gap-3 sm:flex-row'>
                <span className='text-sm'>Designed & Developed By <Link to="https://metawebtx.com/">@Metawebtx</Link>. All rights reserved.</span>
                <span className='space-x-5 w-fit flex justify-between'>
                    <Link to="/terms">Terms</Link>
                    <Link to="/privacy">Privacy</Link>
                </span>
            </div>
        </footer>
    )
}

export default Footer