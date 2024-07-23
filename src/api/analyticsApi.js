// const API_URL = 'https://mcq-portal-vercel.vercel.app/api/analytics';
const API_URL = `${import.meta.env.REACT_APP_BACKEND_URL}/api/analytics`;

export const getUserAnalytics = async (token) => {
    const response = await fetch(`${API_URL}/user`, {
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
