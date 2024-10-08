// const API_URL = 'https://mcq-portal-vercel.vercel.app/api/users';
const API_URL = `${import.meta.env.REACT_APP_BACKEND_URL}/api/users`;

export const getUsers = async (token) => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    console.log(response)

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
    console.log(response)

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
    console.log(response)

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


// Profile ...............................

// Get Profile
export const getProfile = async (token) => {
    const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/users/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    // console.log(response)

    if (!response.ok) {
        throw new Error('Failed to fetch profile');
    }

    return await response.json();
};

// Update Profile
export const updateProfile = async (profileData, token) => {
    console.log(profileData)
    const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
    });
    // console.log(response)

    if (!response.ok) {
        throw new Error('Failed to update profile');
    }

    return await response.json();
};