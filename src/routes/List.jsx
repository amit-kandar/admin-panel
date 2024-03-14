import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import ColumnToggle from '../components/ColumnToggle';
import Export from '../components/Export';

const List = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5);
    const [columns, setColumns] = useState({
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        website: true,
        company: true
    })

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = (userId) => {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
    };

    const handleCheckboxChange = (userId) => {
        const selectedIndex = selectedUsers.indexOf(userId);
        let updatedSelectedUsers = [...selectedUsers];

        if (selectedIndex === -1) {
            updatedSelectedUsers.push(userId);
        } else {
            updatedSelectedUsers.splice(selectedIndex, 1);
        }

        setSelectedUsers(updatedSelectedUsers);

        if (updatedSelectedUsers.length > 0) {
            setShowDeleteButton(true);
        } else {
            setShowDeleteButton(false);
        }
    };

    const handleSelectAll = () => {
        const allUserIds = users.map(user => user.id);
        setSelectedUsers(allUserIds);
        setShowDeleteButton(true);
    };

    const handleDismiss = () => {
        setSelectedUsers([]);
        setShowDeleteButton(false);
    };

    const handleDeleteSelected = () => {
        const updatedUsers = users.filter(user => !selectedUsers.includes(user.id));
        setUsers(updatedUsers);
        setSelectedUsers([]);
        setShowDeleteButton(false);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleColumnToggle = (columnName) => {
        setColumns({
            ...columns,
            [columnName]: !columns[columnName]
        });
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <SearchBar handleSearch={handleSearch} handleSelectAll={handleSelectAll} handleDeleteSelected={handleDeleteSelected} showDeleteButton={showDeleteButton} handleDismiss={handleDismiss} setUsersPerPage={setUsersPerPage} usersPerPage={usersPerPage} />

                <div className="flex items-center">
                    <Export users={users} />
                    <ColumnToggle columns={columns} handleColumnToggle={handleColumnToggle} />
                </div>
            </div>
            <Table columns={columns} filteredUsers={filteredUsers} selectedUsers={selectedUsers} handleCheckboxChange={handleCheckboxChange} deleteUser={deleteUser} />

            <Pagination currentPage={currentPage} usersPerPage={usersPerPage} users={users} paginate={paginate} nextPage={nextPage} prevPage={prevPage} goToFirstPage={goToFirstPage} goToLastPage={goToLastPage} />
        </div>
    );
};

export default List;