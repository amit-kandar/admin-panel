import React, { useState, useEffect } from 'react'

function Hero() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [data, setData] = useState({
        title: "",
        sub_title: "",
        description: "",
        image: {},
        isCTAOn: true,
        CTA_text: ""
    })

    const onSelectFiles = (e) => {
        const files = e.target.files;

        if (!files || files.length === 0) {
            setSelectedFiles([]);
            setPreviews([]);
            return;
        }

        const selectedFilesArray = Array.from(files);
        setSelectedFiles(selectedFilesArray);

        const previewsArray = selectedFilesArray.map((file) => URL.createObjectURL(file));
        setPreviews(previewsArray);
    };

    useEffect(() => {
        return () => {
            previews.forEach((preview) => URL.revokeObjectURL(preview));
        };
    }, [previews]);

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

    const handleCheckboxChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            isCTAOn: e.target.checked,
        }));
    };
    return (
        <div className='w-full flex justify-center'>
            <div className='container w-full py-5 bg-white dark:bg-slate-900 text-gray-500 border border-gray-500 rounded-md dark:text-gray-300'>
                <div className='w-full flex justify-start p-3 pt-0'>
                    <span className='text-xl lg:text-3xl font-medium text-black dark:text-gray-50'>Edit Hero Section</span>
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

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="title" className="font-medium text-gray-700 dark:text-gray-300">
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                cols="30"
                                rows="10"
                                value={data.description}
                                onChange={handleOnChange}
                                className='resize-none outline-none rounded-md text-black dark:bg-slate-900 dark:text-gray-300 border border-gray-500 pl-2 pt-2 placeholder:text-gray-500 focus:ring focus:ring-indigo-500'
                                placeholder='Description'
                            ></textarea>
                        </div>
                        <div className="w-full flex flex-col gap-3">
                            <label className="border border-gray-300 p-2 rounded-md cursor-pointer">
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept=".jpg, .jpeg, .png, .webp"
                                    onChange={onSelectFiles}
                                    multiple
                                />
                            </label>
                            <div className="w-full h-auto border rounded-md">
                                {selectedFiles.length === 0 ? (
                                    <div className='w-full h-full grid place-items-center bg-gray-100 dark:bg-gray-600'>
                                        <span className="text-gray-500 dark:text-gray-300">Preview here</span>
                                    </div>
                                ) : (
                                    <div className='w-full h-auto grid place-items-center gap-2 grid-cols-1 md:grid-cols-2'>
                                        {
                                            selectedFiles.map((file, index) => (
                                                <img key={index} src={previews[index]} alt={`preview-${index}`} className='w-full h-full rounded-md' />
                                            ))
                                        }
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input
                                type="checkbox"
                                id='cta'
                                name='cta'
                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                checked={data.isCTAOn}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="cta" className="cursor-pointer select-none">
                                Show CTA button
                            </label>
                        </div>
                        {
                            data.isCTAOn
                                ? <div className="flex flex-col gap-1">
                                    <label htmlFor="CTA_text" className="font-medium text-gray-700 dark:text-gray-300">
                                        CTA Text
                                    </label>
                                    <input
                                        type="text"
                                        id="CTA_text"
                                        name="CTA_text"
                                        placeholder="Enter your CTA text"
                                        value={data.CTA_text}
                                        onChange={handleOnChange}
                                        className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                    />
                                </div>
                                : null
                        }
                        <button className='w-24 h-10 border border-gray-600 rounded cursor-pointer hover:bg-blue-500 hover:text-white hover:border-none'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Hero