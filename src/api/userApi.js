const API_URL = 'https://mcq-portal-backend.onrender.com/api/users';

export const getUsers = async (token) => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return await response.json();
};

export const getUserById = async (userId, token) => {
    const response = await fetch(`${API_URL}/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    return await response.json();
};

export const updateUser = async (userId, userData, token) => {
    const response = await fetch(`${API_URL}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Failed to update user');
    }

    return await response.json();
};

export const deleteUser = async (userId, token) => {
    const response = await fetch(`${API_URL}/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete user');
    }

    return await response.json();
};
