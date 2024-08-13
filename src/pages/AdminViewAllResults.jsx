import React, { useEffect, useState } from 'react';
import { getAllUserExamResults } from '../api/examApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack'; // If you are using Material-UI


const AdminViewAllResults = () => {
    const { user } = useAuth();
    const [results, setResults] = useState([]);
    const [visibleDetails, setVisibleDetails] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const resultsPerPage = 10; // Set this according to your needs
    const [loading, setLoading] = useState(true); // State to manage loading state


    // useEffect(() => {
    //     const fetchResults = async () => {
    //         try {
    //             const data = await getAllUserExamResults(user.token);
    //             setResults(data);
    //             setLoading(false);
    //         } catch (error) {
    //             toast.error('Failed to fetch all users exam results');
    //             setLoading(false);
    //         }
    //     };

    //     fetchResults();
    // }, [user.token]);
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    
    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const data = await getAllUserExamResults(user.token, currentPage, resultsPerPage);
                setResults(data.results); // Adjust based on the response structure
                setTotalPages(data.totalPages); // Adjust based on the response structure
            } catch (error) {
                toast.error('Failed to fetch all users exam results');
            } finally {
                setLoading(false);
            }
        };
    
        fetchResults();
    }, [user.token, currentPage]);
    
    const toggleDetails = (id) => {
        setVisibleDetails((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };



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

    // <div className="max-w-4xl mx-auto p-4 text-black bg-white dark:bg-gray-800 dark:text-gray-100">
    //     <h2 className="text-2xl font-bold mb-4">All Users' Exam Results</h2>
    //     {
    //         loading ? (
    //             <ul className="space-y-4">
    //                 {[1, 2, 3, 4, 5, 6].map((index) => (
    //                     <li key={index} className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-600">
    //                         <Skeleton height={50} width={300} />
    //                         <Skeleton height={10} width={200} style={{ marginTop: '8px' }} />
    //                         <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
    //                         <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
    //                     </li>
    //                 ))}
    //             </ul>
    //         )
    //             :
    //             results.length === 0 ? (
    //                 <p>No results found.</p>
    //             )
    //                 :
    //                 (
    //                     <ul className="space-y-4">
    //                         {results.map((result) => {
    //                             if (!result || !result.user) return;
    //                             let accuracy = (calculateScore(result.questions) / result.totalQuestions) * 100;
    //                             if (result && result.user)
    //                                 return (
    //                                     <li key={result._id} className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-600">
    //                                         <div className="flex justify-between items-center">
    //                                             <div>
    //                                                 <p className='font-bold'>User: {result.user.name}</p>
    //                                                 <p>Email: {result.user.email}</p>
    //                                                 <p>Score: {calculateScore(result.questions)}/{result.totalQuestions}</p>
    //                                                 <p>Accuracy: {accuracy.toFixed(2)}%</p>
    //                                                 {result.timeTaken ? <p>Time : {result.timeTaken.toFixed(2)} seconds</p> : ""}
    //                                             </div>
    //                                             <button
    //                                                 className="text-blue-500"
    //                                                 onClick={() => toggleDetails(result._id)}
    //                                             >
    //                                                 {visibleDetails[result._id] ? 'Hide Details' : 'Show Details'}
    //                                             </button>
    //                                         </div>
    //                                         {visibleDetails[result._id] && (
    //                                             <div className="mt-4 border-t border-gray-200 pt-4">
    //                                                 <ul className="list-disc pl-5 mt-2">
    //                                                     {result.questions.map((q) => (
    //                                                         <li key={q.question._id} className="mt-1 list-none">
    //                                                             <p><strong>Question:</strong> {q.question.question}</p>
    //                                                             <p><strong>Options:</strong> {q.question.options.join(', ')}</p>
    //                                                             <p><strong>Correct Answer:</strong> {q.question.options[q.question.correctAnswer]}</p>
    //                                                             <p className={q.selectedAnswer === q.question.correctAnswer ? 'text-green-500' : 'text-red-500'}>
    //                                                                 <strong>Selected Answer:</strong> {q.question.options[q.selectedAnswer]}
    //                                                             </p>
    //                                                             {q.question.explanation && (
    //                                                                 <p className="text-gray-600  dark:text-gray-300"><strong>Explanation:</strong> {q.question.explanation}</p>
    //                                                             )}
    //                                                         </li>
    //                                                     ))}
    //                                                 </ul>
    //                                             </div>
    //                                         )}
    //                                     </li>
    //                                 )
    //                         })}
    //                     </ul>
    //                 )}
    // </div>
    return (
        <div className="max-w-4xl mx-auto p-4 text-black bg-white dark:bg-gray-800 dark:text-gray-100">
        <h2 className="text-2xl font-bold mb-4">All Users' Exam Results</h2>
        {
            loading ? (
                <ul className="space-y-4">
                    {[1, 2, 3, 4, 5, 6,7,8,9,10].map((index) => (
                        <li key={index} className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-600">
                            <Skeleton height={50} width={300} />
                            <Skeleton height={10} width={200} style={{ marginTop: '8px' }} />
                            <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
                            <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
                        </li>
                    ))}
                </ul>
            )
            :
            results.length === 0 ? (
                <p>No results found.</p>
            )
            :
            (
                <>
                    <ul className="space-y-4">
                        {results.map((result) => {
                            if (!result || !result.user) return null;
                            let accuracy = (calculateScore(result.questions) / result.totalQuestions) * 100;
                            return (
                                <li key={result._id} className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-600">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className='font-bold'>User: {result.user.name}</p>
                                            <p>Email: {result.user.email}</p>
                                            <p>Score: {calculateScore(result.questions)}/{result.totalQuestions}</p>
                                            <p>Accuracy: {accuracy.toFixed(2)}%</p>
                                            {result.timeTaken ? <p>Time : {result.timeTaken.toFixed(2)} seconds</p> : ""}
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
                            );
                        })}
                    </ul>
                    <Stack spacing={2} className="mt-4">
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            variant="outlined"
                            onChange={handlePageChange}
                            siblingCount={1}
                            color='primary'
                            className="text-black dark:text-white"
                        />
                    </Stack>
                </>
            )
        }
    </div>
    );
};

export default AdminViewAllResults;
