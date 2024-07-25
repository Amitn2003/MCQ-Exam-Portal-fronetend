import React, { useEffect, useState } from 'react';
import { getUserExamResults } from '../api/examResultApi';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'



const ExamResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);  
    const { user } = useAuth();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await getUserExamResults(user.token);
                setResults(data);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) { 
                console.error('Failed to fetch exam results');
                toast.error('Failed to fetch exam results');
                setLoading(false); // Set loading to false on error as well
            }
        };

        fetchResults();
    }, [user.token]);


    // Function to calculate score based on questions array
    const calculateScore = (questions) => {
        let score = 0;

        if (!questions) return score; // Handle cases where questions is null or undefined

        questions.forEach(q => {
            // Ensure q.question and q.question.correctAnswer exist before accessing
            if (q.question && typeof q.question.correctAnswer === 'number') {
                if (q.selectedAnswer === q.question.correctAnswer) {
                    score++;
                }
            }
        });

        return score;
    };  

    // Function to calculate accuracy based on questions array
    const calculateAccuracy = (questions) => {
        if (questions.length === 0) return 0;
        const score = calculateScore(questions);
        return (score / questions.length) * 100;
    };


    let options = {    
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    };


    
    return (
        <div className="bg-white text-black dark:bg-gray-800 shadow-md rounded-md p-6">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Your Exam Results</h2>
            {loading ? (
                <ul className="divide-y divide-gray-300 dark:divide-gray-600">
                    {/* Render 5 skeleton items */}
                    {[1, 2, 3, 4, 5 ,6,7].map((index) => (
                        <li key={index} className="py-4">
                            <Skeleton height={30}  />
                            <Skeleton height={10} width={200}  style={{ marginTop: '8px' }} />
                            <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
                            <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
                        </li>
                    ))}
                </ul>
            ) : results.length === 0 ? (
                <p className="text-gray-600 dark:text-white">No exam results available.</p>
            ) : (
                <ul className="divide-y divide-gray-300 dark:divide-gray-600">
                    {results.map((result) => {
                        
                        return (
                            <li key={result._id} className="py-4">
                                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                                    Exam taken on {new Date(result.createdAt).toLocaleDateString('en-GB', options)}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Score: {calculateScore(result.questions)}/{result.totalQuestions}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Accuracy: {calculateAccuracy(result.questions).toFixed(2)}%
                                </p>
                                <Link
                                    to={`/results/${result._id}`}
                                    className="text-blue-500 hover:text-blue-600 transition duration-300"
                                >
                                    View Detailed Analysis
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default ExamResults;
