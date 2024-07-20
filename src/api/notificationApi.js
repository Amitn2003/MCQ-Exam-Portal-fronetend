const API_URL = 'https://mcq-portal-backend.onrender.com/api/users/notifications';

export const getNotifications = async (token) => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch notifications');
    }

    return await response.json();
};
