import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../components/Pagination';

export default function List() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5);
    const [isShow, setIsShow] = useState(false);
    const users_on_page = [5, 10, 20, 50, 100];
    const dropdownRef = useRef(null);

    const columns = [
        'name', 'assigned_to', 'created_date'
    ];

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsShow(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3033/permission');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleShow = () => {
        setIsShow(!isShow);
    };

    const handleSelect = (value) => {
        return () => {
            setUsersPerPage(value);
            setIsShow(false);
        };
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < Math.ceil(users.length / usersPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    const goToLastPage = () => {
        setCurrentPage(Math.ceil(users.length / usersPerPage));
    };


    return (
        <div className="container mx-auto">
            <div className="flex flex-col gap-3 md:flex-row items-start justify-between md:items-center mb-4">
                <div className='flex flex-col items-start sm:flex-row gap-2'>
                    <div className='flex gap-2'>
                        <div className='relative' ref={dropdownRef}>
                            <div className='py-2 px-4 w-20 sm:w-28 flex justify-between items-center border dark:text-gray-300 border-gray-500' onClick={handleShow}>
                                {usersPerPage}
                                {
                                    isShow ? <i className='bx bx-chevron-down cursor-pointer'></i> : <i className='bx bx-chevron-up cursor-pointer'></i>
                                }
                            </div>
                            <div className={`absolute left-0 mt-2 w-20 sm:w-28 flex flex-col items-center bg-white dark:bg-gray-700 border border-gray-300 rounded-lg shadow-lg z-10 px-4 py-2 space-y-3 ${isShow ? 'block' : 'hidden'}`}>
                                {
                                    users_on_page.map((item, index) => <span key={index} className='px-6 py-1 rounded-md cursor-pointer text-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500 duration-200 hover:scale-125' onClick={handleSelect(item)}>{item}</span>)
                                }
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-gray-400 rounded px-2 py-2 sm:px-4 mr-2 outline-none dark:bg-gray-600 dark:text-gray-200"
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </div>
            <div className='w-full overflow-x-scroll xl:overflow-hidden'>
                <table className="w-full table-auto border-collapse border border-gray-800 dark:border-gray-100">
                    <thead>
                        <tr className='text-gray-700 dark:text-gray-200'>
                            {columns.map((columnName, index) =>
                                <th key={index} className="border border-gray-800 px-4 py-2">
                                    {
                                        (columnName === 'assigned_to' && 'Assigned To') ||
                                        (columnName === 'created_date' && 'Created Date') ||
                                        (columnName === 'name' && 'Name')
                                    }
                                </th>
                            )}
                            <th className="border border-gray-800 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id} className='text-gray-700 dark:text-gray-400'>
                                {columns.map((columnName, index) => {
                                    return (
                                        <td key={index} className="border border-gray-800 px-4 py-2">
                                            {
                                                user[columnName.toLowerCase()]
                                            }
                                        </td>
                                    )
                                })}
                                <td className="border border-gray-800 px-4 py-2">
                                    <div className='flex'>
                                        <Link to={`/user/view/${user.id}`} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded mr-2">
                                            <i className="fa-regular fa-eye"></i>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={currentPage} usersPerPage={usersPerPage} users={users} paginate={paginate} nextPage={nextPage} prevPage={prevPage} goToFirstPage={goToFirstPage} goToLastPage={goToLastPage} />
        </div>
    );
};