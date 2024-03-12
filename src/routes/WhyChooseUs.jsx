import React, { useState, useEffect } from 'react'

const initialFormData = {
    title: "",
    sub_title: "",
    description: "",
    image: {},
    feature1: {
        title: "",
        sub_title: ""
    },
    feature2: {
        title: "",
        sub_title: ""
    },
    feature3: {
        title: "",
        sub_title: ""
    }
};

function WhyChooseUs() {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [data, setData] = useState(initialFormData)

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        const file = e.target.files?.[0];
        if (!file) {
            setSelectedFile(undefined)
            return
        }
        console.log();

        setData((prevData) => ({
            ...prevData,
            image: file
        }));

        setSelectedFile(e.target.files[0])
    }

    const handleOnChange = (e) => {
        e.preventDefault();

        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    const handleFeatureChange = (featureNumber, property, value) => {
        setData((prevData) => ({
            ...prevData,
            [`feature${featureNumber}`]: {
                ...prevData[`feature${featureNumber}`],
                [property]: value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data);
        setData(initialFormData)
    }

    return (
        <div className='w-full flex justify-center'>
            <div className='container w-full py-5 bg-white dark:bg-slate-900 text-gray-500 border border-gray-500 rounded-md dark:text-gray-300'>
                <div className='w-full flex justify-start p-3 pt-0'>
                    <span className='text-xl lg:text-3xl font-medium text-black dark:text-gray-50'>Edit About Us Section</span>
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

                        <div className="flex flex-col gap-1">
                            <label htmlFor="sub_title" className="font-medium text-gray-700 dark:text-gray-300">
                                Sub Title
                            </label>
                            <input
                                type="text"
                                id="sub_title"
                                name="sub_title"
                                value={data.sub_title}
                                onChange={handleOnChange}
                                placeholder="Enter your subtitle"
                                className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                            />
                        </div>

                        <div className='w-full flex flex-col gap-2'>
                            <div className='w-full'>
                                <span className='text-lg font-medium'>Feature 1</span>
                                <div className='border border-gray-600 rounded-md p-3 space-y-3'>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="feature1_title" className="font-medium text-gray-700 dark:text-gray-300">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            id="feature1_title"
                                            name="feature1_title"
                                            placeholder="Enter your title"
                                            value={data.feature1.title}
                                            onChange={(e) => handleFeatureChange("1", "title", e.target.value)}
                                            className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="feature1_sub_title" className="font-medium text-gray-700 dark:text-gray-300">
                                            Sub Title
                                        </label>
                                        <input
                                            type="text"
                                            id="feature1_sub_title"
                                            name="feature1_sub_title"
                                            placeholder="Enter your subtitle"
                                            value={data.feature1.sub_title}
                                            onChange={(e) => handleFeatureChange("2", "sub_title", e.target.value)}
                                            className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <span className='text-lg font-medium'>Feature 2</span>
                                <div className='border border-gray-600 rounded-md p-3 space-y-3'>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="feature2_title" className="font-medium text-gray-700 dark:text-gray-300">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            id="feature2_title"
                                            name="feature2_title"
                                            placeholder="Enter your title"
                                            value={data.feature2.title}
                                            onChange={(e) => handleFeatureChange("2", "title", e.target.value)}
                                            className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="feature2_sub_title" className="font-medium text-gray-700 dark:text-gray-300">
                                            Sub Title
                                        </label>
                                        <input
                                            type="text"
                                            id="feature2_sub_title"
                                            name="feature2_sub_title"
                                            placeholder="Enter your subtitle"
                                            value={data.feature2.sub_title}
                                            onChange={(e) => handleFeatureChange("2", "sub_title", e.target.value)}
                                            className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <span className='text-lg font-medium'>Feature 3</span>
                                <div className='border border-gray-600 rounded-md p-3 space-y-3'>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="feature3_title" className="font-medium text-gray-700 dark:text-gray-300">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            id="feature3_title"
                                            name="feature3_title"
                                            placeholder="Enter your title"
                                            value={data.feature3.title}
                                            onChange={(e) => handleFeatureChange("3", "title", e.target.value)}
                                            className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="feature3_sub_title" className="font-medium text-gray-700 dark:text-gray-300">
                                            Sub Title
                                        </label>
                                        <input
                                            type="text"
                                            id="feature3_sub_title"
                                            name="feature3_sub_title"
                                            placeholder="Enter your subtitle"
                                            value={data.feature3.sub_title}
                                            onChange={(e) => handleFeatureChange("3", "sub_title", e.target.value)}
                                            className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-3">
                            <label className="border border-gray-300 p-2 rounded-md cursor-pointer">
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept=".jpg, .jpeg, .png, .webp"
                                    onChange={onSelectFile}
                                />
                            </label>
                            <div className="w-full h-66 md:h-80 border rounded-md flex items-center justify-center bg-gray-100 dark:bg-gray-600">
                                {
                                    !selectedFile
                                        ? <span className="text-gray-500 dark:text-gray-300">Preview here</span>
                                        : <img src={preview} alt="preview" className='w-full h-full rounded-md' />
                                }
                            </div>
                        </div>
                        <button className='w-24 h-10 border border-gray-600 rounded cursor-pointer hover:bg-blue-500 hover:text-white hover:border-none'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default WhyChooseUs