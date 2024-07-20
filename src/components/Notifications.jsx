import React, { useEffect, useState } from 'react';
import { getNotifications } from '../api/notificationApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

const Notifications = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await getNotifications(user.token);
                setNotifications(data);
            } catch (error) {
                toast.error('Failed to fetch notifications');
            }
        };

        fetchNotifications();
    }, [user.token]);

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-800 p-4 bg-gray-200">Notifications</h2>
            <ul className="p-4">
                {notifications.map((notification, index) => (
                    <li key={index} className="mb-2 text-gray-700">
                        {notification.message} - {new Date(notification.date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
