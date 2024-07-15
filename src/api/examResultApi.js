const API_URL = 'https://mcq-portal-backend.onrender.com/api/examResults';

export const addExamResult = async (resultData, token) => {
    console.log(resultData, token)
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(resultData),
    });
    console.log(response)
    if (!response.ok) {
        throw new Error('Failed to save exam result');
    }

    return await response.json();
};

export const getUserExamResults = async (token) => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    console.log(response)

    if (!response.ok) {
        throw new Error('Failed to fetch exam results');
    }

    return await response.json();
};
