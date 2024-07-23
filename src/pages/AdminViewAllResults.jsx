import React, { useEffect, useState } from 'react';
import { getAllUserExamResults } from '../api/examApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';

const AdminViewAllResults = () => {
    const { user } = useAuth();
    const [results, setResults] = useState([]);
    const [visibleDetails, setVisibleDetails] = useState({});

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await getAllUserExamResults(user.token);
                setResults(data);
            } catch (error) {
                toast.error('Failed to fetch all users exam results');
            }
        };

        fetchResults();
    }, [user.token]);

    const toggleDetails = (id) => {
        setVisibleDetails((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <div className="max-w-4xl mx-auto p-4 text-black bg-white dark:bg-gray-800 dark:text-gray-100">
            <h2 className="text-2xl font-bold mb-4">All Users' Exam Results</h2>
            {results.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <ul className="space-y-4">
                    {results.map((result) => {
                        if (result && result.user)
                        return(
                        <li key={result._id} className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-600">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className='font-bold'>User: {result.user.name}</p>
                                    <p>Email: {result.user.email}</p>
                                    <p>Score: {result.score}/{result.totalQuestions}</p>
                                    <p>Accuracy: {result.accuracy.toFixed(2)}%</p>
                                </div>
                                <button
                                    className="text-blue-500"
                                    onClick={() => toggleDetails(result._id)}
                                >
                                    {visibleDetails[result._id] ? 'Hide Details' : 'Show Details'}
                                </button>
                            </div>
                            {visibleDetails[result._id] && (
                                <div className="mt-4 border-t border-gray-200 pt-4">
                                    <ul className="list-disc pl-5 mt-2">
                                        {result.questions.map((q) => (
                                            <li key={q.question._id} className="mt-1 list-none">
                                                <p><strong>Question:</strong> {q.question.question}</p>
                                                <p><strong>Options:</strong> {q.question.options.join(', ')}</p>
                                                <p><strong>Correct Answer:</strong> {q.question.options[q.question.correctAnswer]}</p>
                                                <p className={q.selectedAnswer === q.question.correctAnswer ? 'text-green-500' : 'text-red-500'}>
                                                    <strong>Selected Answer:</strong> {q.question.options[q.selectedAnswer]}
                                                </p>
                                                {q.question.explanation && (
                                                    <p className="text-gray-600  dark:text-gray-300"><strong>Explanation:</strong> {q.question.explanation}</p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    )})}
                </ul>
            )}
        </div>
    );
};

export default AdminViewAllResults;
