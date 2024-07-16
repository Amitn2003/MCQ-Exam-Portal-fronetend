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

    return (
        <div>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Admin</label>
                    <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                </div>
                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default EditUser;
