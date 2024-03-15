import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({ columns, filteredUsers, selectedUsers, handleCheckboxChange, deleteUser }) => {
    return (
        <table className="w-full table-auto border-collapse border border-gray-800 dark:border-gray-100">
            <thead>
                <tr className='text-gray-700 dark:text-gray-200'>
                    <th className="border border-gray-800 px-4 py-2"></th>
                    {Object.keys(columns).map(columnName => columns[columnName] &&
                        <th key={columnName} className="border border-gray-800 px-4 py-2">{columnName}</th>
                    )}
                    <th className="border border-gray-800 px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody>
                {filteredUsers.map(user => (
                    <tr key={user.id} className='text-gray-700 dark:text-gray-400'>
                        <td className="border border-gray-800 px-4 py-2">
                            <input
                                type="checkbox"
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleCheckboxChange(user.id)}
                            />
                        </td>
                        {Object.keys(columns).map(columnName => columns[columnName] && (
                            <td key={columnName} className="border border-gray-800 px-4 py-2">
                                {columnName === 'company' ? user.company.name : user[columnName]}
                            </td>
                        ))}
                        <td className="border border-gray-800 px-4 py-2">
                            <div className='flex'>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded mr-2"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>

                                <Link to={`/user/view/${user.id}`} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded mr-2">
                                    <i className="fa-regular fa-eye"></i>
                                </Link>
                                {/* <button
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded mr-2"
                                    onClick={() => deleteUser(user.id)}
                                >
                                </button> */}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;