import React, { useState, useEffect, useRef } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { testimonials } from '../util/Testimonials';

const initial_values = {
    name: "",
    address: "",
    message: "",
    rating: "",
    image: {},
}

const options = testimonials.map((item) => ({
    label: `${item.testimonial_id} - ${item.name}`,
    value: item.testimonial_id
}));

export default function Testimonials() {
    const [selectTestimonial, setSelectTestimonial] = useState(null);
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [data, setData] = useState(initial_values);

    const fileInputRef = useRef(null);

    const handleDropdownChange = selectedOption => {
        setSelectTestimonial(selectedOption)
    }

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

        setSelectedFile(e.target.files[0])
    }

    const handleOnChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;

        let newValue;
        if (name === 'rating' && value !== '') {
            newValue = Math.min(parseInt(value), 5);
        } else {
            newValue = value;
        }

        setData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };

    const handleEditTestimonialFormSubmit = (e) => {
        e.preventDefault()
        console.log(data);
        resetForm();
    }

    const handleAddTestimonialFormSubmit = (e) => {
        e.preventDefault()
        console.log(data);
        resetForm();
    }

    const resetForm = () => {
        setData(initial_values);
        fileInputRef.current.value = '';
        setSelectedFile();
    }

    return (
        <div className='w-full flex justify-center'>
            <div className='container w-full py-5 bg-white dark:bg-slate-900 text-gray-500 border border-gray-500 rounded-md dark:text-gray-300'>
                <div className='w-full flex justify-start p-3 pt-0'>
                    <span className='text-xl lg:text-3xl font-medium text-black dark:text-gray-50'>Edit Testimonial Section</span>
                </div>

                <div className='w-full p-3 space-y-4'>
                    <div className='mt-5 space-y-2'>
                        <span className='text-lg lg:text-2xl font-medium'>Edit Testimonial</span>
                        <Dropdown
                            options={options}
                            value={selectTestimonial}
                            placeholder="Select an option"
                            className='max-w-60'
                            controlClassName='dark:bg-slate-900 dark:text-gray-300 rounded-md'
                            menuClassName="dark:bg-slate-900 text-gray-300"
                            onChange={handleDropdownChange}
                        />
                    </div>
                    <div className='w-full'>
                        {
                            selectTestimonial && <form className='flex flex-col gap-5' onSubmit={handleEditTestimonialFormSubmit}>

                                {/* Testimonial id */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="testimonial_id" className="font-medium text-gray-700 dark:text-gray-300">
                                        Testimonial ID
                                    </label>
                                    <input
                                        type="text"
                                        id="testimonial_id"
                                        name="testimonial_id"
                                        value={options.find(item => item.value === selectTestimonial.value).value}
                                        disabled={true}
                                        className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500 bg-gray-400/20 dark:bg-gray-600/20 backdrop-blur-3xl"
                                    />
                                </div>

                                {/* name */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name" className="font-medium text-gray-700 dark:text-gray-300">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter name"
                                        value={data.name}
                                        onChange={handleOnChange}
                                        className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                    />
                                </div>

                                {/* address */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="address" className="font-medium text-gray-700 dark:text-gray-300">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={data.address}
                                        onChange={handleOnChange}
                                        placeholder="Enter address"
                                        className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                    />
                                </div>

                                {/* message */}
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="message" className="font-medium text-gray-700 dark:text-gray-300">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        cols="30"
                                        rows="10"
                                        value={data.message}
                                        onChange={handleOnChange}
                                        className='resize-none outline-none rounded-md text-black dark:bg-slate-900 dark:text-gray-300 border border-gray-500 pl-2 pt-2 placeholder:text-gray-500 focus:ring focus:ring-indigo-500'
                                        placeholder='Message'
                                    ></textarea>
                                </div>

                                {/* rating */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="rating" className="font-medium text-gray-700 dark:text-gray-300">
                                        Rating <span className='text-xs font-light'>(0 to 5)</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="rating"
                                        name="rating"
                                        placeholder="Enter rating"
                                        value={data.rating}
                                        onChange={handleOnChange}
                                        min={0}
                                        max={5}
                                        maxLength={1}
                                        className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                    />
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
                        <form className='flex flex-col gap-5' onSubmit={handleAddTestimonialFormSubmit}>

                            {/* name */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="name" className="font-medium text-gray-700 dark:text-gray-300">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter name"
                                    value={data.name}
                                    onChange={handleOnChange}
                                    className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                />
                            </div>

                            {/* address */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="address" className="font-medium text-gray-700 dark:text-gray-300">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={data.address}
                                    onChange={handleOnChange}
                                    placeholder="Enter address"
                                    className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                />
                            </div>

                            {/* message */}
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="message" className="font-medium text-gray-700 dark:text-gray-300">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    cols="30"
                                    rows="10"
                                    value={data.message}
                                    onChange={handleOnChange}
                                    className='resize-none outline-none rounded-md text-black dark:bg-slate-900 dark:text-gray-300 border border-gray-500 pl-2 pt-2 placeholder:text-gray-500 focus:ring focus:ring-indigo-500'
                                    placeholder='Message'
                                ></textarea>
                            </div>

                            {/* rating */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="rating" className="font-medium text-gray-700 dark:text-gray-300">
                                    Rating <span className='text-xs font-light'>(0 to 5)</span>
                                </label>
                                <input
                                    type="number"
                                    id="rating"
                                    name="rating"
                                    placeholder="Enter rating"
                                    value={data.rating}
                                    onChange={handleOnChange}
                                    min={0}
                                    max={5}
                                    maxLength={1}
                                    className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                />
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

                            <button className='w-24 h-10 border border-gray-600 rounded cursor-pointer hover:bg-blue-500 hover:text-white hover:border-none'>Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}