import React, { useEffect, useState } from 'react';
import { getUserExamResults } from '../api/examResultApi';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'



const ExamResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading state
    const { user } = useAuth();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                toast.warn('Wait! It could take few seconds');
                const data = await getUserExamResults(user.token);
                setResults(data);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) { 
                console.error('Failed to fetch exam results');
                setLoading(false); // Set loading to false on error as well
            }
        };

        fetchResults();
    }, [user.token]);



    let options = {     // Date format
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    };






    // <div className="bg-white text-black dark:bg-gray-800 shadow-md rounded-md p-6">
    //     <h2 className="text-2xl font-bold mb-4 dark:text-white">Your Exam Results</h2>
    //     {results.length === 0 ? (
    //         <p className="text-gray-600 dark:text-white">No exam results available.</p>
    //     ) : (
    //         <ul className="divide-y divide-gray-300 dark:divide-gray-600">
    //             {results.map((result) => {
    //                 let options = {
    //                     day: '2-digit',
    //                     month: 'long',
    //                     year: 'numeric'
    //                   };
    //                 return(
    //                 <li key={result._id} className="py-4">
    //                     <h3 className="text-xl font-semibold mb-2 dark:text-white">Exam taken on {new Date(result.createdAt).toLocaleDateString('en-GB', options)}</h3>
    //                     <p className="text-gray-600 dark:text-gray-400">Score: {result.score}/{result.totalQuestions}</p>
    //                     <p className="text-gray-600 dark:text-gray-400">Accuracy: {result.accuracy.toFixed(2)}%</p>
    //                     <Link
    //                         to={`/results/${result._id}`}
    //                         className="text-blue-500 hover:text-blue-600 transition duration-300"
    //                     >
    //                         View Detailed Analysis
    //                     </Link>
    //                 </li>
    //             )})}
    //         </ul>
    //     )}
    // </div>
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
                                    Score: {result.score}/{result.totalQuestions}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Accuracy: {result.accuracy.toFixed(2)}%
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
