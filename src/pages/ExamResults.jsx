import React, { useEffect, useState } from 'react';
import { getUserExamResults } from '../api/examResultApi';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const ExamResults = () => {
    const [results, setResults] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                toast.warn('Wait! It could take few seconds');
                const data = await getUserExamResults(user.token);
                setResults(data);
            } catch (error) {
                console.error('Failed to fetch exam results');
            }
        };

        fetchResults();
    }, [user.token]);

    // <div>
    //     <h2>Your Exam Results</h2>
    //     {results.length === 0 ? (
    //         <p>No exam results available.</p>
    //     ) : (
    //         <ul>
    //             {results.map((result) => (
    //                 <li key={result._id}>
    //                     <h3>Exam taken on {new Date(result.createdAt).toLocaleDateString()}</h3>
    //                     <p>Score: {result.score}/{result.totalQuestions}</p>
    //                     <p>Accuracy: {result.accuracy.toFixed(2)}%</p>
    //                     <Link to={`/results/${result._id}`}>View Detailed Analysis</Link>
    //                 </li>
    //             ))}
    //         </ul>
    //     )}
    // </div>
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-6">
            <h2 className="text-2xl font-bold mb-4">Your Exam Results</h2>
            {results.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No exam results available.</p>
            ) : (
                <ul className="divide-y divide-gray-300 dark:divide-gray-600">
                    {results.map((result) => (
                        <li key={result._id} className="py-4">
                            <h3 className="text-xl font-semibold mb-2">Exam taken on {new Date(result.createdAt).toLocaleDateString()}</h3>
                            <p className="text-gray-600 dark:text-gray-400">Score: {result.score}/{result.totalQuestions}</p>
                            <p className="text-gray-600 dark:text-gray-400">Accuracy: {result.accuracy.toFixed(2)}%</p>
                            <Link
                                to={`/results/${result._id}`}
                                className="text-blue-500 hover:text-blue-600 transition duration-300"
                            >
                                View Detailed Analysis
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>

    );
};

export default ExamResults;
