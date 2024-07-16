import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../api/userApi';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {              
                toast.warn('Wait! It could take few seconds');
                const data = await getUsers(user.token);
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users');
            }
        };

        fetchUsers();
    }, [user.token]);

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId, user.token);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Failed to delete user');
        }
    };

    // <div>
    //     <h2>Admin - Manage Users</h2>
    //     {users.length === 0 ? (
    //         <p>No users available.</p>
    //     ) : (
    //         <ul>
    //             {users.map((user) => (
    //                 <li key={user._id}>
    //                     <p>{user.name} - {user.email} - {user.isAdmin ? 'Admin' : 'User'}</p>
    //                     <Link to={`/admin/users/${user._id}`}>Edit</Link>
    //                     <button onClick={() => handleDelete(user._id)}>Delete</button>
    //                 </li>
    //             ))}
    //         </ul>
    //     )}
    // </div>
    // <div className="max-w-screen-lg mx-auto px-4 py-8">
    //     <h2 className="text-3xl font-bold text-gray-800 mb-4">Admin - Manage Users</h2>
    //     {users.length === 0 ? (
    //       <p className="text-gray-600">No users available.</p>
    //     ) : (
    //       <ul className="divide-y divide-gray-200">
    //         {users.map((user) => (
    //           <li key={user._id} className="py-4 flex items-center justify-between">
    //             <div className="flex-1">
    //               <p className="text-lg text-gray-800">{user.name}</p>
    //               <p className="text-sm text-gray-600">{user.email} - {user.isAdmin ? 'Admin' : 'User'}</p>
    //             </div>
    //             <div className="flex items-center space-x-4">
    //               <Link
    //                 to={`/admin/users/${user._id}`}
    //                 className="text-blue-500 hover:text-blue-600"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 onClick={() => handleDelete(user._id)}
    //                 className="text-red-500 hover:text-red-600"
    //               >
    //                 Delete
    //               </button>
    //             </div>
    //           </li>
    //         ))}
    //       </ul>
    //     )}
    //   </div>
    return (
      <div className="max-w-screen-lg mx-auto px-4 py-8 dark:bg-gray-800 dark:text-white">
    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Admin - Manage Users</h2>
    {users.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No users available.</p>
    ) : (
        <ul className="divide-y divide-gray-600 dark:divide-gray-700">
            {users.map((user) => (
                <li key={user._id} className="py-4 flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex-1 mb-2 sm:mb-0">
                        <p className="text-lg text-gray-800 dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.email} - {user.isAdmin ? 'Admin' : 'User'}</p>
                    </div>
                    <div className="flex items-center sm:space-x-4">
                        <Link
                            to={`/admin/users/${user._id}`}
                            className="text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400 mr-4"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => handleDelete(user._id)}
                            className="text-red-500 hover:text-red-600 dark:text-red-300 dark:hover:text-red-400"
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
