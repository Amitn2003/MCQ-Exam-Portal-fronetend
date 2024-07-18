import React, { useEffect, useState } from 'react';
import { getUserById, updateUser } from '../api/userApi';
import { useAuth } from '../hooks/useAuth';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
    const { userId } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserById(userId, user.token);
                setName(data.name);
                setEmail(data.email);
                setIsAdmin(data.isAdmin);
            } catch (error) {
                console.error('Failed to fetch user');
            }
        };

        fetchUser();
    }, [userId, user.token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(userId, { name, email, isAdmin }, user.token);
            navigate('/admin/users');
        } catch (error) {
            console.error('Failed to update user');
        }
    };

    //     <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
    //   <h2 className="text-2xl font-bold text-gray-800 p-4 bg-gray-200">Edit User</h2>
    //   <form className="p-4" onSubmit={handleSubmit}>
    //     <div className="mb-4">
    //       <label className="block text-gray-700 font-bold mb-2">Name</label>
    //       <input
    //         type="text"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //         className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    //         required
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label className="block text-gray-700 font-bold mb-2">Email</label>
    //       <input
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    //         required
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label className="block text-gray-700 font-bold mb-2">
    //         <input
    //           type="checkbox"
    //           checked={isAdmin}
    //           onChange={(e) => setIsAdmin(e.target.checked)}
    //           className="mr-2 leading-tight"
    //         />
    //         Admin
    //       </label>
    //     </div>
    //     <button
    //       type="submit"
    //       className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
    //     >
    //       Update User
    //     </button>
    //   </form>
    // </div>
    return (
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white p-4 bg-gray-200 dark:bg-gray-700">
        Edit User
    </h2>
    <form className="p-4" onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Name
            </label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-black focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Email
            </label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-black focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    className="mr-2 leading-tight"
                />
                Admin
            </label>
        </div>
        <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline dark:bg-blue-700 dark:hover:bg-blue-800"
        >
            Update User
        </button>
    </form>
</div>

    );
};

export default EditUser;
