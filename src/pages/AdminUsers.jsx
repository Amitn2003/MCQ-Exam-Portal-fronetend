import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../api/userApi';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
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

    return (
        <div>
            <h2>Admin - Manage Users</h2>
            {users.length === 0 ? (
                <p>No users available.</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                            <p>{user.name} - {user.email} - {user.isAdmin ? 'Admin' : 'User'}</p>
                            <Link to={`/admin/users/${user._id}`}>Edit</Link>
                            <button onClick={() => handleDelete(user._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminUsers;
