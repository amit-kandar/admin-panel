import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className='w-full h-20 flex items-center border border-gray-500 mt-5 px-10 rounded-md text-gray-600 dark:text-gray-400'>
            <div className='w-full flex items-center justify-between'>
                <span className=''>Designed By <Link to="https://metawebtx.com/">@Metawebtx</Link>. All rights reserved.</span>
                <span className='space-x-5'>
                    <Link to="/terms">Terms</Link>
                    <Link to="/privacy">Privacy</Link>
                </span>
            </div>
        </footer>
    )
}

export default Footer