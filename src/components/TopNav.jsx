import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function TopNav({ setIsDarkMode, setIsMenu }) {
    const [darkMode, setDarkMode] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setIsDarkMode(darkMode)
    }, [darkMode, setIsDarkMode])

    const handleDarkMode = () => {
        setDarkMode(prev => !prev)
    }

    return (
        <nav className='w-full h-16 shadow-md border rounded-md px-5 md:px-10'>
            <div className='w-full h-full flex justify-between items-center'>
                <div className='w-fit h-full flex items-center gap-3'>
                    <div className='dark:text-white lg:hidden' onClick={() => { setIsMenu(true) }}>
                        <i className='bx bx-menu text-3xl cursor-pointer' ></i>
                    </div>
                    <Button onClick={handleOpen} className='space-x-2'>
                        <i className='bx bx-search-alt-2 text-2xl text-gray-400 dark:text-gray-400 font-extralight'></i>
                        <span className='text-sm text-gray-500 dark:text-gray-300 capitalize hidden md:block'>Search</span>
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Text in a modal
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                        </Box>
                    </Modal>
                </div>
                <div className='flex items-center gap-10 md:gap-5'>
                    <div className='cursor-pointer'>
                        <i className='bx bx-category dark:text-gray-300'></i>
                    </div>
                    <div className='cursor-pointer' onClick={handleDarkMode}>
                        {
                            darkMode
                                ? <i className='bx bx-moon text-gray-300' ></i>
                                : <i className='bx bx-sun text-xl'></i>
                        }
                    </div>
                    <div className='cursor-pointer'>
                        <i className='bx bxs-user-circle text-lg dark:text-gray-300'></i>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default TopNav