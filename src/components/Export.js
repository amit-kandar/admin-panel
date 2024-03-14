import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Export({ users }) {
    const [isShow, setIsShow] = useState(false);
    const dropdownRef = useRef(null);

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
    }, [])

    const convertToCSV = () => {
        const csvData = [
            ['ID', 'Name', 'Username', 'Email', 'Phone', 'Website', 'Company']
        ];

        users.forEach(user => {
            csvData.push([
                user.id,
                user.name,
                user.username,
                user.email,
                user.phone,
                user.website,
                user.company.name
            ]);
        });

        return csvData;
    };

    const handleCSVDownload = () => {
        const csvData = convertToCSV();
        const csvFileName = 'users.csv';
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', csvFileName);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error('Anchor element download attribute is not supported in this browser.');
        }
    };

    const handleXLSXDownload = () => {
        const ws = XLSX.utils.aoa_to_sheet(convertToCSV());
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Users');
        XLSX.writeFile(wb, 'users.xlsx');
    };

    const handlePDFDownload = () => {
        const doc = new jsPDF();
        doc.text('Users List', 10, 10);
        doc.autoTable({
            head: [['ID', 'Name', 'Username', 'Email', 'Phone', 'Website', 'Company']],
            body: users.map(user => [user.id, user.name, user.username, user.email, user.phone, user.website, user.company.name])
        });
        doc.save('users.pdf');
    };

    const handleShow = () => {
        setIsShow(!isShow);
    };

    return (
        <div className='relative' ref={dropdownRef}>
            <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleShow}
            >
                Export
            </button>
            <div className={`absolute right-0 mt-2 w-40 flex flex-col items-center bg-white border border-gray-300 rounded-lg shadow-lg z-10 px-4 py-2 space-y-3 ${isShow ? 'block' : 'hidden'} dark:bg-gray-700`}>
                <button onClick={handleCSVDownload} className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 w-28 rounded space-x-2'>
                    <span>CSV</span>
                    <i className="fa-solid fa-file-csv text-white"></i>
                </button>
                <button onClick={handleXLSXDownload} className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 w-28 rounded space-x-2'>
                    <span>XLSX</span>
                    <i className="fa-regular fa-file-excel text-white"></i>
                </button>
                <button onClick={handlePDFDownload} className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 w-28 rounded space-x-2'>
                    <span>PDF</span>
                    <i className="fa-solid fa-file-pdf text-white"></i>
                </button>
            </div>
        </div>
    );
}

export default Export;
