import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { services } from '../util/services';

const initial_values = {
    title: "",
    summary: "",
    description: "",
    image: {},
    isCTAOn: true,
    service_points: [],
    CTA_text: ""
}

const add_service_initial_values = {
    title: "",
    summary: "",
    service: "",
    description: "",
    image: {},
    isCTAOn: true,
    service_points: [],
    CTA_text: ""
}

const options = services.map((item) => ({
    label: `${item.service_id} - ${item.title}`,
    value: item.service_id,
    service: item.title
}));

function Service() {
    const [selectedService, setSelectedService] = useState(null);
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [data, setData] = useState(initial_values);
    const [point, setPoint] = useState('');
    const [addData, setAddData] = useState(add_service_initial_values);

    const handleServiceChange = selectedOption => {
        setSelectedService(selectedOption);
    };

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

        setData((prevData) => ({
            ...prevData,
            image: file
        }));

        setAddData((prevData) => ({
            ...prevData,
            image: file
        }));

        setSelectedFile(e.target.files[0])
    }

    const handleOnChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;

        setData((prevData) => ({
            ...prevData,
            [name]: name === "service_points" ? value.split(', ').map(point => point.trim()) : value,
        }));

        setAddData((prevData) => ({
            ...prevData,
            [name]: name === "service_points" ? value.split(', ').map(point => point.trim()) : value,
        }));
    };

    const handleCheckboxChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            isCTAOn: e.target.checked,
        }));

        setAddData((prevData) => ({
            ...prevData,
            isCTAOn: e.target.checked,
        }));
    };

    const handleServicePointsChange = e => {
        setPoint(e.target.value);
    }

    const addServicePoint = (e) => {
        if (point.trim() !== '') {
            setData((prev) => ({
                ...prev,
                service_points: [...prev.service_points, point.trim()],
            }));
            setPoint('');
        }
    };

    const removePoint = (index) => {
        setData((prev) => ({
            ...prev,
            service_points: [
                ...prev.service_points.slice(0, index),
                ...prev.service_points.slice(index + 1),
            ],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data);
        setData(initial_values);
    }

    const handleAddServiceFormSubmit = (e) => {
        e.preventDefault()
        console.log(addData);
        setData(add_service_initial_values);
    }

    return (
        <div className='w-full flex justify-center'>
            <div className='container w-full py-5 bg-white dark:bg-slate-900 text-gray-500 border border-gray-500 rounded-md dark:text-gray-300'>
                <div className='w-full flex justify-start p-3 pt-0'>
                    <span className='text-xl lg:text-3xl font-medium text-black dark:text-gray-50'>Edit Service Section</span>
                </div>

                <div className='w-full p-3 space-y-4'>
                    <div className='mt-5 space-y-2'>
                        <span className='text-lg lg:text-2xl font-medium'>Edit Service</span>
                        <Dropdown
                            options={options}
                            value={selectedService}
                            placeholder="Select an service"
                            className='max-w-60'
                            controlClassName='dark:bg-slate-900 dark:text-gray-300 rounded-md'
                            menuClassName="dark:bg-slate-900 text-gray-300"
                            onChange={handleServiceChange}
                        />
                    </div>
                    <div className='w-full'>
                        {
                            selectedService && <form className='flex flex-col gap-5' onSubmit={handleSubmit}>

                                {/* service id */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="service_id" className="font-medium text-gray-700 dark:text-gray-300">
                                        Service ID
                                    </label>
                                    <input
                                        type="text"
                                        id="service_id"
                                        name="service_id"
                                        value={options.find(item => item.value === selectedService.value).value}
                                        disabled={true}
                                        className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500 bg-gray-400/20 dark:bg-gray-600/20 backdrop-blur-3xl"
                                    />
                                </div>

                                {/* title */}
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

                                {/* service */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="service" className="font-medium text-gray-700 dark:text-gray-300">
                                        Service
                                    </label>
                                    <input
                                        type="text"
                                        id="service"
                                        name="service"
                                        value={options.find(item => item.value === selectedService.value).service}
                                        disabled={true}
                                        className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500 bg-gray-400/20 dark:bg-gray-600/20 backdrop-blur-3xl"
                                    />
                                </div>

                                {/* summary */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="summary" className="font-medium text-gray-700 dark:text-gray-300">
                                        Summary
                                    </label>
                                    <input
                                        type="text"
                                        id="summary"
                                        name="summary"
                                        value={data.summary}
                                        onChange={handleOnChange}
                                        placeholder="Enter your summary"
                                        className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                    />
                                </div>

                                {/* Description */}
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

                                {/* service_points */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="service_points" className="font-medium text-gray-700 dark:text-gray-300">
                                        Service Points
                                    </label>
                                    <div className='w-full flex gap-2'>
                                        <input
                                            type="text"
                                            id="service_points"
                                            name="service_points"
                                            placeholder="Enter your service points"
                                            value={point}
                                            onChange={handleServicePointsChange}
                                            className="w-full py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                        />
                                        <button type='button' className='px-5 py-2 rounded-md grid place-items-center bg-blue-400 text-white hover:bg-blue-500' onClick={addServicePoint}>Add</button>
                                    </div>
                                    {
                                        data.service_points.length > 0 && <div className='flex flex-wrap gap-2 mt-3 border border-gray-500 rounded-md px-3 py-3'>
                                            {
                                                data.service_points.map((e, i) => {
                                                    return (
                                                        <span key={i} className='w-fit flex items-center justify-between'>
                                                            <span>{e}</span>
                                                            <i className='bx bx-x text-2xl cursor-pointer' onClick={() => removePoint(i)}></i>
                                                        </span>
                                                    )
                                                })
                                            }
                                        </div>
                                    }
                                </div>

                                {/* image */}
                                <div className="w-full flex flex-col gap-3">
                                    <label className="border border-gray-300 p-2 rounded-md cursor-pointer">
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            accept=".jpg, .jpeg, .png, .webp"
                                            onChange={onSelectFile}
                                            className='text-sm md:text-lg'
                                        />
                                    </label>
                                    <div className="w-full h-60 md:h-80 border rounded-md flex items-center justify-center bg-gray-100 dark:bg-gray-600">
                                        {
                                            !selectedFile
                                                ? <span className="text-gray-500 dark:text-gray-300">Preview here</span>
                                                : <img src={preview} alt="preview" className='w-full h-full rounded-md' />
                                        }
                                    </div>
                                </div>

                                {/* CTA checkbox */}
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
                        }
                    </div>
                </div>

                <div className='w-full h-[2px] bg-black dark:bg-gray-200'></div>

                <div className='w-full px-3 space-y-4'>
                    <div className='mt-5 space-y-2'>
                        <span className='text-lg lg:text-2xl font-medium'>Add Service</span>
                    </div>
                    <div className='w-full'>
                        <form className='flex flex-col gap-5' onSubmit={handleAddServiceFormSubmit}>

                            {/* title */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="title" className="font-medium text-gray-700 dark:text-gray-300">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter your title"
                                    value={addData.title}
                                    onChange={handleOnChange}
                                    className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                />
                            </div>

                            {/* service */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="service" className="font-medium text-gray-700 dark:text-gray-300">
                                    Service
                                </label>
                                <input
                                    type="text"
                                    id="service"
                                    name="service"
                                    placeholder='Enter service name'
                                    value={addData.service}
                                    onChange={handleOnChange}
                                    className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                />
                            </div>

                            {/* summary */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="summary" className="font-medium text-gray-700 dark:text-gray-300">
                                    Summary
                                </label>
                                <input
                                    type="text"
                                    id="summary"
                                    name="summary"
                                    value={addData.summary}
                                    onChange={handleOnChange}
                                    placeholder="Enter your summary"
                                    className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                />
                            </div>

                            {/* Description */}
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="description" className="font-medium text-gray-700 dark:text-gray-300">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    cols="30"
                                    rows="10"
                                    value={addData.description}
                                    onChange={handleOnChange}
                                    className='resize-none outline-none rounded-md text-black dark:bg-slate-900 dark:text-gray-300 border border-gray-500 pl-2 pt-2 placeholder:text-gray-500 focus:ring focus:ring-indigo-500'
                                    placeholder='Description'
                                ></textarea>
                            </div>

                            {/* service_points */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="service_points" className="font-medium text-gray-700 dark:text-gray-300">
                                    Service Points
                                </label>
                                <div className='w-full flex gap-2'>
                                    <input
                                        type="text"
                                        id="service_points"
                                        name="service_points"
                                        placeholder="Enter your service points"
                                        value={point}
                                        onChange={handleServicePointsChange}
                                        className="w-full py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                    />
                                    <button type='button' className='px-5 py-2 rounded-md grid place-items-center bg-blue-400 text-white hover:bg-blue-500' onClick={addServicePoint}>Add</button>
                                </div>
                                {
                                    data.service_points.length > 0 && <div className='flex flex-wrap gap-2 mt-3 border border-gray-500 rounded-md px-3 py-3'>
                                        {
                                            data.service_points.map((e, i) => {
                                                return (
                                                    <span key={i} className='w-fit flex items-center justify-between'>
                                                        <span>{e}</span>
                                                        <i className='bx bx-x text-2xl cursor-pointer' onClick={() => removePoint(i)}></i>
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </div>

                            {/* image */}
                            <div className="w-full flex flex-col gap-3">
                                <label className="border border-gray-300 p-2 rounded-md cursor-pointer">
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        accept=".jpg, .jpeg, .png, .webp"
                                        onChange={onSelectFile}
                                        className='text-sm md:text-lg'
                                    />
                                </label>
                                <div className="w-full h-60 md:h-80 border rounded-md flex items-center justify-center bg-gray-100 dark:bg-gray-600">
                                    {
                                        !selectedFile
                                            ? <span className="text-gray-500 dark:text-gray-300">Preview here</span>
                                            : <img src={preview} alt="preview" className='w-full h-full rounded-md' />
                                    }
                                </div>
                            </div>

                            {/* CTA checkbox */}
                            <div className='flex items-center gap-2'>
                                <input
                                    type="checkbox"
                                    id='cta'
                                    name='cta'
                                    className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                    checked={addData.isCTAOn}
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
                                            value={addData.CTA_text}
                                            onChange={handleOnChange}
                                            className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                        />
                                    </div>
                                    : null
                            }

                            <button className='w-28 h-10 border border-gray-600 rounded cursor-pointer hover:bg-blue-500 hover:text-white hover:border-none'>Add Service</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Service;
