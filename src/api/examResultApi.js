// const API_URL = 'https://mcq-portal-vercel.vercel.app/api/examResults';
const API_URL = `${import.meta.env.REACT_APP_BACKEND_URL}`;

export const addExamResult = async (resultData, token) => {
    console.log(resultData, token)
    const response = await fetch(API_URL + "/api/examResults", {
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
    const response = await fetch(API_URL + "/api/examResults", {
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



export const getAverageTimePerQuestion = async (token, page=0) => {
    const response = await fetch(`${API_URL}/api/examResults/averageTimePerQuestion?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    // console.log("getAverageTimePerQuestion : ",response)

    if (!response.ok) {
        throw new Error('Failed to fetch average time per question');
    }

    return await response.json();
};


