import React, { useState } from 'react'

function ContactUs() {
    const [data, setData] = useState({
        title: ""
    })

    const handleOnChange = (e) => {
        e.preventDefault();

        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data);
    }

    return (
        <div className='w-full flex justify-center'>
            <div className='container w-full py-5 bg-white dark:bg-slate-900 text-gray-500 border border-gray-500 rounded-md dark:text-gray-300'>
                <div className='w-full flex justify-start p-3 pt-0'>
                    <span className='text-xl lg:text-3xl font-medium text-black dark:text-gray-50'>Edit Contact Us Section</span>
                </div>
                <div className='w-full px-3'>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="font-medium text-gray-700 dark:text-gray-300">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter your title"
                                value={data.title}
                                onChange={handleOnChange}
                                className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                            />
                        </div>

                        <div className=''>


                        </div>

                        <button className='w-24 h-10 border border-gray-600 rounded cursor-pointer hover:bg-blue-500 hover:text-white hover:border-none'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactUs