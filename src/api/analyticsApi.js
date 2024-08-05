// const API_URL = 'https://mcq-portal-vercel.vercel.app/api/analytics';
const API_URL = `${import.meta.env.REACT_APP_BACKEND_URL}/api/analytics`;

export const getUserAnalytics = async (token, page = 0) => {
    const response = await fetch(`${API_URL}/user?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user analytics');
    }

    return await response.json();
};



export const getSubcategoryAnalytics = async (token, page = 0) => {
    const response = await fetch(`${API_URL}/subcategory?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    console.log("getSubcategoryAnalytics ",response)

    if (!response.ok) {
        throw new Error('Failed to fetch subcategory analytics');
    }

    return await response.json();
};
