// const API_URL = 'https://mcq-portal-vercel.vercel.app/api/users/notifications';
const API_URL = `${import.meta.env.REACT_APP_BACKEND_URL}/api/users/notifications`;

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
