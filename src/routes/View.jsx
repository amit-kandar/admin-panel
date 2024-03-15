import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

function View() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();

    useEffect(() => {
        fetchUser();
    });

    const fetchUser = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div className='w-full h-screen grid place-items-center'>

            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>;
    }

    if (!user) {
        return <div className='w-full h-96 xl:h-[500px] flex justify-center items-center'>
            <div id="toast-danger" className="flex items-center w-full max-w-xs md:max-w-sm p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 md:w-16 md:h-16 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                    <svg class="w-5 h-5 md:w-8 md:h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                    </svg>
                    <span className="sr-only">Error icon</span>
                </div>
                <div className="ms-3 text-base md:text-xl font-normal">User with ID {userId} Not Found</div>
            </div>
        </div>
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-800">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
                    {user.name}
                </h1>
                <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                        <span className="font-semibold mr-2">Username:</span>
                        <span>{user.username}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold mr-2">Name:</span>
                        <span>{user.name}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold mr-2">Email:</span>
                        <span>{user.email}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold mr-2">Phone:</span>
                        <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold mr-2">Company Name:</span>
                        <span>{user.company.name}</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center bg-blue-100 dark:bg-blue-800 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-checkbox text-blue-500 dark:text-blue-300" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 11l3 3l8 -8" />
                            <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                        </svg>
                        <div className="ml-2 text-blue-500 dark:text-blue-300">
                            12
                            services
                        </div>
                    </div>
                    <div className="flex items-center bg-green-100 dark:bg-green-800 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-briefcase text-green-500 dark:text-green-300" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                            <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
                            <path d="M12 12l0 .01" />
                            <path d="M3 13a20 20 0 0 0 18 0" />
                        </svg>
                        <div className="ml-2 text-green-500 dark:text-green-300">
                            3
                            Done
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default View;
