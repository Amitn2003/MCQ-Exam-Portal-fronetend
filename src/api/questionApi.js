// const API_URL = 'https://mcq-portal-vercel.vercel.app/api/questions';
const API_URL = `${import.meta.env.REACT_APP_BACKEND_URL}/api/questions`;

export const getQuestions = async (token, category = null, totalQs=10) => {
    let url = API_URL;
    if (category) {
        url += `?category=${category}`;
        if (totalQs) {
            url += `&totalQuestions=${totalQs}`;
        }
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    console.log(response)

    if (!response.ok) {
        if (response.status === 403) {
            throw new Error('Normal users can only take 5 exams per day. Upgrade to premium for unlimited exams.');
    }
    throw new Error('Failed to fetch questions');
    }

    return await response.json();
};

export const addQuestion = async (questionData, token) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(questionData),
    });

    if (!response.ok) {
        throw new Error('Failed to add question');
    }

    return await response.json();
};

export const getRandomQuestions = async (totalQs, token) => {
    const response = await fetch(`${API_URL}/random/${totalQs}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch random questions');
    }

    return await response.json();
};




export const getQuestionsByCategory = async (selectedCategory,  token, totalQs = 10) => {
    try {
        console.log(selectedCategory, token, totalQs)
        // Call getQuestions function with the selectedCategory and token
        const data = await getQuestions(token, selectedCategory, totalQs);
        
        // If totalQs is specified, slice the array to return only the required number of questions
        return totalQs ? data.slice(0, totalQs) : data;
    } catch (error) {
        console.error('Failed to fetch questions by category:', error.message);
        throw error; // Re-throw the error to handle it further up the call stack if needed
    }
};





export const updateQuestion = async (questionId, questionData, token) => {
    const response = await fetch(`${API_URL}/${questionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(questionData),
    });

    if (!response.ok) {
        throw new Error('Failed to update question');
    }

    return await response.json();
};






export const deleteQuestion = async (questionId, token) => {
    const response = await fetch(`${API_URL}/${questionId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete question');
    }

    return await response.json();
};
