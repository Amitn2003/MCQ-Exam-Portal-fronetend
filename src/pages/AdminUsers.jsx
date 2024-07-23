import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, updateUser } from '../api/userApi';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'




const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading , setLoading] = useState(true)

    useEffect(() => {
        const fetchUsers = async () => {
            try { 
                const data = await getUsers(user.token);
                console.log(data)
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, [user.token]);

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId, user.token);
            toast.success("User deleted successfully")
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Failed to delete user');
            toast.error("Something went wrong!")
        }
    };


    const handleUpdateUser = async (userId, updatedData) => {
        try {
            await updateUser(userId, updatedData, user.token);
            setUsers((prevUsers) =>
                prevUsers.map((u) => (u._id === userId ? { ...u, ...updatedData } : u))
            );
            toast.success('User updated successfully');
        } catch (error) {
            toast.error('Failed to update user');
        }
    };



    

   
    return (
      <div className="max-w-full mx-auto px-4  py-8  bg-white dark:bg-gray-800 dark:text-white">
    <h2 className="text-3xl font-bold text-black dark:text-gray-200 mb-4">Admin - Manage Users</h2>
    {
        loading ? (
            <ul className="divide-y divide-gray-300 dark:divide-gray-600">
                {/* Render 5 skeleton items */}
                {[1, 2, 3, 4, 5 ,6].map((index) => (
                    <li key={index} className="py-4">
                        <Skeleton height={30}  />
                        <Skeleton height={10} width={200}  style={{ marginTop: '6px' }} />
                        <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
                    </li>
                ))}
            </ul>
        ) :
        
    users.length === 0 ? (
        <p className="text-gray-800 dark:text-gray-400">No users available.</p>
    ) : (
        <ul className="divide-y divide-gray-600 dark:divide-gray-700">
            {users.map((user) => (
                <li key={user._id} className="py-4 px-2 flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex-1 mb-2 sm:mb-0">
                        <p className="text-lg text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-800 dark:text-gray-400">{user.email} - {user.isAdmin ? 'Admin' : 'User'} - {user.isPremium ? 'Premium' : 'Not Premium'}</p>
                    </div>
                    <div className="flex items-center sm:space-x-4">
                        <Link
                            to={`/admin/users/${user._id}`}
                            className="inline-block px-4 py-2 leading-none border rounded text-blue-500 border-blue-500 hover:border-transparent hover:text-white hover:bg-blue-500 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-blue-400 dark:hover:text-white mr-4"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => handleDelete(user._id)}
                            className="inline-block px-4 py-2 leading-none border rounded text-red-500 border-red-500 hover:border-transparent hover:text-white hover:bg-red-500 dark:text-red-300 dark:border-red-300 dark:hover:bg-red-400 dark:hover:text-white"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )}
</div>

    );
};

export default AdminUsers;
