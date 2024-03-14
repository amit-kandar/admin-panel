import React, { useState, useEffect, useRef } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import useFetch from '../hooks/useFetch'
import axios from 'axios';

const edit_initial_values = {
    id: 0,
    title: "",
    summary: "",
    description: "",
    image: {},
    isCTAOn: false,
    points: [],
    CTA: ""
}

const add_initial_values = {
    title: "",
    summary: "",
    service: "",
    description: "",
    image: '',
    isCTAOn: false,
    points: [],
    CTA: ""
}

const url = 'http://localhost:3032/services'

function Service() {
    const [selectedService, setSelectedService] = useState(null);
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [editData, setEditData] = useState(edit_initial_values);
    const [point, setPoint] = useState('');
    const [addData, setAddData] = useState(add_initial_values);
    const { data, loading, error } = useFetch(url);

    const fileInputRef = useRef(null);

    let options;
    if (data) {
        options = data.map(item => ({
            label: `${item.id} - ${item.title}`,
            value: item.id,
            service: item.title
        }));
    }

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
    }, [selectedFile, selectedService, data, editData]);

    useEffect(() => {
        if (selectedService && data) {
            const previous_data = data.find(item => item.id === selectedService.value);
            setEditData(previous_data)
        }
    }, [selectedService, data, setSelectedService])

    const onSelectFile = e => {
        const file = e.target.files?.[0];
        if (!file) {
            setSelectedFile(undefined)
            return
        }

        setEditData((prevData) => ({
            ...prevData,
            image: file
        }));

        setAddData((prevData) => ({
            ...prevData,
            image: file
        }));

        setSelectedFile(e.target.files[0])
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAddData(prev => ({
                    ...prev,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOnChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;

        setEditData((prevData) => ({
            ...prevData,
            [name]: name === "points" ? value.split(', ').map(point => point.trim()) : value,
        }));

        setAddData((prevData) => ({
            ...prevData,
            [name]: name === "points" ? value.split(', ').map(point => point.trim()) : value,
        }));
    };

    const handleAddCheckboxChange = (e) => {
        setAddData((prevData) => ({
            ...prevData,
            isCTAOn: e.target.checked,
        }));
    };

    const handleEditCheckBoxChange = e => {
        setEditData(prev => ({
            ...prev,
            isCTAOn: e.target.checked,
        }));
    }

    const handleServicePointsChange = e => {
        setPoint(e.target.value);
    }

    const addServicePointForEditForm = (e) => {
        if (point.trim() !== '') {
            setEditData((prev) => ({
                ...prev,
                points: [...prev.points, point.trim()],
            }));
            setPoint('');
        }
    };

    const addServicePointForAddForm = e => {
        if (point.trim() !== '') {
            setAddData(prev => ({
                ...prev,
                points: [...prev.points, point.trim()]
            }))
            setPoint('')
        }
    }

    const removePoint = (index) => {
        setEditData((prev) => ({
            ...prev,
            points: [
                ...prev.points.slice(0, index),
                ...prev.points.slice(index + 1),
            ],
        }));
    };

    const handleEditFormSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.put(`${url}/${editData.id}`, editData);
        console.log(res);
        setEditData(edit_initial_values);
    }

    const handleAddFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(url, addData);
            console.log(res.data);

            setAddData(add_initial_values);
            fileInputRef.current.value = '';
        } catch (error) {
            console.error('Error:', error);
        }
    };


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
                            selectedService && <form className='flex flex-col gap-5' onSubmit={handleEditFormSubmit}>

                                {/* service id */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="id" className="font-medium text-gray-700 dark:text-gray-300">
                                        Service ID
                                    </label>
                                    <input
                                        type="text"
                                        id="id"
                                        name="id"
                                        value={editData.id}
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
                                        value={editData.title}
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
                                        value={editData.title}
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
                                        value={editData.summary}
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
                                        value={editData.description}
                                        onChange={handleOnChange}
                                        className='resize-none outline-none rounded-md text-black dark:bg-slate-900 dark:text-gray-300 border border-gray-500 pl-2 pt-2 placeholder:text-gray-500 focus:ring focus:ring-indigo-500'
                                        placeholder='Description'
                                    ></textarea>
                                </div>

                                {/* points */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="points" className="font-medium text-gray-700 dark:text-gray-300">
                                        Service Points
                                    </label>
                                    <div className='w-full flex gap-2'>
                                        <input
                                            type="text"
                                            id="points"
                                            name="points"
                                            placeholder="Enter your service points"
                                            value={point}
                                            onChange={handleServicePointsChange}
                                            className="w-full py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                        />
                                        <button type='button' className='px-5 py-2 rounded-md grid place-items-center bg-blue-400 text-white hover:bg-blue-500' onClick={addServicePointForEditForm}>Add</button>
                                    </div>
                                    {
                                        editData.points.length > 0 && <div className='flex flex-wrap gap-2 mt-3 border border-gray-500 rounded-md px-3 py-3'>
                                            {
                                                editData.points.map((e, i) => {
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
                                        value={editData.isCTAOn}
                                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                        checked={editData.isCTAOn}
                                        onChange={handleEditCheckBoxChange}
                                    />
                                    <label htmlFor="cta" className="cursor-pointer select-none">
                                        Show CTA button
                                    </label>
                                </div>
                                {
                                    editData.isCTAOn && <div className="flex flex-col gap-1">
                                        <label htmlFor="CTA" className="font-medium text-gray-700 dark:text-gray-300">
                                            CTA Text
                                        </label>
                                        <input
                                            type="text"
                                            id="CTA"
                                            name="CTA"
                                            placeholder="Enter your CTA text"
                                            value={editData.CTA}
                                            onChange={handleOnChange}
                                            className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                        />
                                    </div>
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
                        <form className='flex flex-col gap-5' onSubmit={handleAddFormSubmit}>

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

                            {/* points */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="points" className="font-medium text-gray-700 dark:text-gray-300">
                                    Service Points
                                </label>
                                <div className='w-full flex gap-2'>
                                    <input
                                        type="text"
                                        id="points"
                                        name="points"
                                        placeholder="Enter your service points"
                                        value={point}
                                        onChange={handleServicePointsChange}
                                        className="w-full py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                    />
                                    <button type='button' className='px-5 py-2 rounded-md grid place-items-center bg-blue-400 text-white hover:bg-blue-500' onClick={addServicePointForAddForm}>Add</button>
                                </div>
                                {
                                    addData.points.length > 0 && <div className='flex flex-wrap gap-2 mt-3 border border-gray-500 rounded-md px-3 py-3'>
                                        {
                                            addData.points.map((e, i) => {
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
                                        ref={fileInputRef}
                                        accept=".jpg, .jpeg, .png, .webp"
                                        onChange={handleImageChange}
                                        className='text-sm md:text-lg'
                                    />
                                </label>
                                <div className="w-full h-60 md:h-80 border rounded-md flex items-center justify-center bg-gray-100 dark:bg-gray-600">
                                    {
                                        Object.keys(addData.image).length <= 0
                                            ? <span className="text-gray-500 dark:text-gray-300">Preview here</span>
                                            : <img src={addData.image} alt="preview" className='w-full h-full rounded-md' />
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
                                    onChange={handleAddCheckboxChange}
                                />
                                <label htmlFor="cta" className="cursor-pointer select-none">
                                    Show CTA button
                                </label>
                            </div>
                            {
                                addData.isCTAOn
                                    ? <div className="flex flex-col gap-1">
                                        <label htmlFor="cta_text" className="font-medium text-gray-700 dark:text-gray-300">
                                            CTA Text
                                        </label>
                                        <input
                                            type="text"
                                            id="cta_text"
                                            name="CTA"
                                            placeholder="Enter your CTA text"
                                            value={addData.CTA}
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
