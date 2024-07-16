const API_URL = 'https://mcq-portal-backend.onrender.com/api/reportedQuestions';

export const reportQuestion = async (questionId, reason, token) => {
    console.log(JSON.stringify({ questionId, reason }))
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ questionId, reason }),
    });
    console.log(response)

    if (!response.ok) {
        throw new Error('Failed to report question');
    }

    return await response.json();
};




export const getReportedQuestions = async (token) => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch reported questions');
    }

    return await response.json();
};

export const updateReportedQuestionStatus = async (questionId, status, token) => {
    const response = await fetch(`${API_URL}/${questionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
    });

    if (!response.ok) {
        throw new Error('Failed to update reported question status');
    }

    return await response.json();
};