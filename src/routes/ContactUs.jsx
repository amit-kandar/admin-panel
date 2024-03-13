import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import { url } from '../constant';
import axios from 'axios';
import useFetch from '../hooks/useFetch';

const initial_values = {
    title: "",
    address: "",
    email: "",
    phone: "",
    g_address: ""
};

const initial_field_values = {
    id: undefined,
    field_name: "",
    type: "",
    placeholder_text: "",
    required: ""
}

function ContactUs() {
    const [pageData, setPageData] = useState(initial_values);
    const [fieldValue, setFieldValue] = useState(initial_field_values);
    const [addFieldValue, setAddFieldValue] = useState(initial_field_values);
    const [selectedField, setSelectedField] = useState();
    const { data, loading, error } = useFetch(url);

    const handleDropdownChange = (e) => {
        setSelectedField(e);
    }

    let options;
    if (data) {
        options = data.map((item) => ({
            label: item.field_name,
            value: item.field_name
        }));
    }

    useEffect(() => {
        if (selectedField && data) {
            const previous_data = data.find(item => item.field_name === selectedField.value);
            setFieldValue(previous_data);
        }
    }, [setFieldValue, selectedField, data])

    const handleOnChange = (e) => {
        e.preventDefault();

        setPageData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    const handleCheckboxChange = (e) => {
        setFieldValue((prevData) => ({
            ...prevData,
            required: e.target.checked,
        }));
    };

    const handleAddFieldFormCheckboxChange = e => {
        setAddFieldValue(prev => ({
            ...prev,
            required: e.target.checked
        }))
    }

    const handleEditFormFieldChange = e => {
        e.preventDefault();

        setFieldValue(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleAddFormFieldChange = e => {
        e.preventDefault();

        setAddFieldValue(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data);
        resetForm();
    }

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`${url}/${fieldValue.id}`, fieldValue);
    }

    const handleAddFormSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(url, addFieldValue)
        console.log(res);
        resetForm()
    }

    const resetForm = () => {
        setPageData(initial_values);
        setFieldValue(initial_field_values);
    }

    return (
        <div className='w-full flex justify-center'>
            <div className='container w-full py-5 bg-white dark:bg-slate-900 text-gray-500 border border-gray-500 rounded-md dark:text-gray-300'>
                <div className='w-full flex justify-start p-3 pt-0'>
                    <span className='text-xl lg:text-3xl font-medium text-black dark:text-gray-50'>Edit Contact Us Section</span>
                </div>
                <div className='w-full px-3'>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>

                        {/* title */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="font-medium text-gray-700 dark:text-gray-300">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter conatct us title"
                                value={pageData.title}
                                onChange={handleOnChange}
                                className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                            />
                        </div>

                        {/* change address */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="address" className="font-medium text-gray-700 dark:text-gray-300">
                                Change Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={pageData.address}
                                onChange={handleOnChange}
                                placeholder="Enter new address"
                                className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                            />
                        </div>

                        {/* email */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={pageData.email}
                                onChange={handleOnChange}
                                placeholder="Enter your email"
                                className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                            />
                        </div>

                        {/* phone */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="phone" className="font-medium text-gray-700 dark:text-gray-300">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={pageData.phone}
                                onChange={handleOnChange}
                                placeholder="Enter your phone"
                                className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                            />
                        </div>

                        {/* google address */}
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="g_address" className="font-medium text-gray-700 dark:text-gray-300">
                                Update Google Address
                            </label>
                            <textarea
                                name="g_address"
                                id="g_address"
                                cols="20"
                                rows="5"
                                value={pageData.g_address}
                                onChange={handleOnChange}
                                className='resize-none outline-none rounded-md text-black dark:bg-slate-900 dark:text-gray-300 border border-gray-500 pl-2 pt-2 placeholder:text-gray-500 focus:ring focus:ring-indigo-500'
                                placeholder='Update google address'
                            ></textarea>
                        </div>

                        <button className='w-24 h-10 border border-gray-600 rounded cursor-pointer hover:bg-blue-500 hover:text-white hover:border-none'>Update</button>
                    </form>
                </div>

                <div className='w-full h-[1px] bg-gray-500 my-5'></div>

                <div className='w-full px-3 space-y-4'>
                    <div className='mt-5 space-y-2'>
                        <span className='text-lg lg:text-2xl font-medium'>Edit Form Field</span>
                        <Dropdown
                            options={options}
                            value={selectedField}
                            placeholder="Select an option"
                            className='max-w-60'
                            controlClassName='dark:bg-slate-900 dark:text-gray-300 rounded-md'
                            menuClassName="dark:bg-slate-900 text-gray-300"
                            onChange={handleDropdownChange}
                        />
                    </div>
                    <div className='w-full'>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        {
                            selectedField && !loading && !error && <form className='flex flex-col gap-5' onSubmit={handleEditFormSubmit}>

                                {/* Field Name */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="field_name" className="font-medium text-gray-700 dark:text-gray-300">
                                        Field Name
                                    </label>
                                    <input
                                        type="text"
                                        id="field_name"
                                        name="field_name"
                                        placeholder="Enter your field name"
                                        value={fieldValue.field_name}
                                        onChange={handleEditFormFieldChange}
                                        className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                    />
                                </div>

                                {/* type */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="type" className="font-medium text-gray-700 dark:text-gray-300">
                                        Type
                                    </label>
                                    <input
                                        type="text"
                                        id="type"
                                        name="type"
                                        placeholder="Enter your type"
                                        value={fieldValue.type}
                                        onChange={handleEditFormFieldChange}
                                        className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                    />
                                </div>

                                {/* Placeholder Text  */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="placeholder_text" className="font-medium text-gray-700 dark:text-gray-300">
                                        Placeholder Text
                                    </label>
                                    <input
                                        type="text"
                                        id="placeholder_text"
                                        name="placeholder_text"
                                        placeholder="Enter placeholder text"
                                        value={fieldValue.placeholder_text}
                                        onChange={handleEditFormFieldChange}
                                        className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                    />
                                </div>

                                {/* required */}
                                <div className='flex items-center gap-2'>
                                    <input
                                        type="checkbox"
                                        id='required'
                                        name='required'
                                        className="font-medium text-gray-900 dark:text-gray-300 w-[14px] h-[14px]"
                                        checked={fieldValue.required}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label htmlFor="required" className="cursor-pointer select-none text-lg">
                                        Is it a required field?
                                    </label>
                                </div>

                                <button className='w-24 h-10 border border-gray-600 rounded cursor-pointer hover:bg-blue-500 hover:text-white hover:border-none'>Update</button>
                            </form>
                        }
                    </div>
                </div>

                <div className='w-full h-[1px] bg-gray-500 my-5'></div>

                <div className='w-full px-3 space-y-4'>
                    <div className='mt-5 space-y-2'>
                        <span className='text-lg lg:text-2xl font-medium'>Add Form Field</span>
                    </div>
                    <div className='w-full'>
                        <form className='flex flex-col gap-5' onSubmit={handleAddFormSubmit}>

                            {/* Field Name */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="field_name" className="font-medium text-gray-700 dark:text-gray-300">
                                    Field Name
                                </label>
                                <input
                                    type="text"
                                    id="field_name"
                                    name="field_name"
                                    placeholder="Enter your field name"
                                    value={addFieldValue.field_name}
                                    onChange={handleAddFormFieldChange}
                                    className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                />
                            </div>

                            {/* type */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="type" className="font-medium text-gray-700 dark:text-gray-300">
                                    Type
                                </label>
                                <input
                                    type="text"
                                    id="type"
                                    name="type"
                                    placeholder="Enter your type"
                                    value={addFieldValue.type}
                                    onChange={handleAddFormFieldChange}
                                    className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                />
                            </div>

                            {/* Placeholder Text  */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="placeholder_text" className="font-medium text-gray-700 dark:text-gray-300">
                                    Placeholder Text
                                </label>
                                <input
                                    type="text"
                                    id="placeholder_text"
                                    name="placeholder_text"
                                    placeholder="Enter placeholder text"
                                    value={addFieldValue.placeholder_text}
                                    onChange={handleAddFormFieldChange}
                                    className="py-2 pl-2 border rounded-md border-gray-500 outline-none text-black dark:bg-slate-900 dark:text-gray-200 placeholder:text-gray-500 focus:ring focus:ring-indigo-500"
                                />
                            </div>

                            {/* required */}
                            <div className='flex items-center gap-2'>
                                <input
                                    type="checkbox"
                                    id='required'
                                    name='required'
                                    className="font-medium text-gray-900 dark:text-gray-300 w-[14px] h-[14px]"
                                    checked={addFieldValue.required}
                                    onChange={handleAddFieldFormCheckboxChange}
                                />
                                <label htmlFor="required" className="cursor-pointer select-none text-lg">
                                    Is it a required field?
                                </label>
                            </div>

                            <button className='w-24 h-10 border border-gray-600 rounded cursor-pointer hover:bg-blue-500 hover:text-white hover:border-none'>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs