// const API_URL = 'https://mcq-portal-vercel.vercel.app/api/auth/exams';
const API_URL = `${import.meta.env.REACT_APP_BACKEND_URL}/api/auth/exams`;

export const createExam = async (examData, token) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(examData),
    });

    if (!response.ok) {
        throw new Error('Failed to create exam');
    }

    return await response.json();
};

export const getExams = async (token) => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch exams');
    }

    return await response.json();
};

export const getExamById = async (examId, token) => {
    const response = await fetch(`${API_URL}/${examId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch exam');
    }

    return await response.json();
};

export const deleteExam = async (examId, token) => {
    const response = await fetch(`${API_URL}/${examId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete exam');
    }

    return await response.json();
};

function convertAnswers(data) {
    // Extract answers from the original structure
    const originalAnswers = data.answers.answers;
    
    // Map original answers to the desired format
    const convertedAnswers = originalAnswers.map(answer => {
        return {
            question: answer.question,
            selectedAnswer: answer.selectedAnswer - 1 // Adjusting selectedAnswer as per your example (assuming it's 1-based in original)
        };
    });

    // Create the final object in the desired format
    const convertedData = {
        answers: convertedAnswers
    };

    return convertedData;
}


export const submitExam = async (examId, answers, token) => {
    console.log({examId, answers, token})
    console.log(JSON.stringify({ answers }))
    console.log(convertAnswers({answers}))
    const response = await fetch(`${API_URL}/${examId}/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(convertAnswers({answers})),
    });
    console.log(response)

    if (!response.ok) {
        throw new Error('Failed to submit exam');
    }

    return await response.json();
};

export const getUserExams = async (userId, token) => {
    console.log(userId, token)
    const response = await fetch(`${API_URL}/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    console.log(response)
    

    if (!response.ok) {
        throw new Error('Failed to fetch user exams');
    }
    console.log(response)

    return await response.json();
};

export const getAvailableExams = async (token) => {
    const response = await fetch(`${API_URL}/available`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch available exams');
    }

    return await response.json();
};


export const getUserExamAttemptsByDate = async (userId, token) => {
    const response = await fetch(`${API_URL}/user/${userId}/attempts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    // console.log(response)

    if (!response.ok) {
        throw new Error('Failed to fetch user exam attempts');
    }

    return await response.json();
};



export const updateExam = async (examId, examData, token) => {
    const response = await fetch(`${API_URL}/${examId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(examData),
    });

    if (!response.ok) {
        throw new Error('Failed to update exam');
    }

    return await response.json();
};



export const getAllUsersResults = async (token) => {
    const response = await fetch(`${API_URL}/results`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    console.log(response)

    if (!response.ok) {
        throw new Error('Failed to fetch all users results');
    }

    return await response.json();
};




export const getAllUserExamResults = async (token) => {
    const response = await fetch(`${API_URL}/results/mock`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch all users exam results');
    }

    return await response.json();
};