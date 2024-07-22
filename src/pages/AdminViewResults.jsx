import React, { useEffect, useState } from 'react';
import { getAllUsersResults } from '../api/examApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';

const AdminViewResults = () => {
    const { user } = useAuth();
    const [results, setResults] = useState([]);
    const [calculatedResults, setCalculatedResults] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await getAllUsersResults(user.token);
                console.log(data)
                const calculatedResults = data.map(result => calculateResultMetrics(result));
                setResults(data);
                setLoading(false); // Set loading to false after data is fetched
                console.log(data)
            } catch (error) {
                toast.error('Failed to fetch results');
                console.log(error)
            }
        };

        fetchResults();
    }, [user.token]);

    const findQuestionById = (questions, questionId) => {
        return questions.find(q => q._id === questionId);
    };



    const calculateResultMetrics = (result) => {
        let score = 0;
        const totalQuestions = result.exam.questions.length;
        
        result.answers.forEach(answer => {
            const question = result.exam.questions.find(q => q._id === answer.question);
            if (question && answer.selectedAnswer === question.correctAnswer) {
                score += 1;
            }
        });

        const accuracy = (score / totalQuestions) * 100;
        return { ...result, score, totalQuestions, accuracy };
    };
    

    // Toggle detailed view
    const [expandedResultId, setExpandedResultId] = useState(null);

    const toggleExpand = (resultId) => {
        if (expandedResultId === resultId) {
            setExpandedResultId(null); // Collapse if already expanded
        } else {
            setExpandedResultId(resultId); // Expand if not expanded
        }
    };





    // <div className="max-w-3xl mx-auto p-4 text-black">
    //     <h2 className="text-2xl font-bold mb-4 text-white">All Users' Exam Results</h2>
    //     {results.length === 0 ? (
    //         <p>No results found.</p>
    //     ) : (
    //         <ul className="space-y-4">
    //             {results.map((result) => (
    //                 <li key={result._id} className="bg-white p-4 rounded-lg shadow-md">
    //                     <h3 className="text-xl font-bold mb-2">{result.exam.title}</h3>
    //                     <p>User: {result.user.name} ({result.user.email})</p>
    //                     <p>Score: {result.score}/{result.totalQuestions}</p>
    //                     <p>Accuracy: {result.accuracy}%</p>
    //                     <p>Date: {new Date(result.createdAt).toLocaleDateString()}</p>
    //                     <div className="mt-4">
    //                         <h4 className="font-bold">Answers:</h4>
    //                         <ul className="list-disc pl-5">
    //                             {result.answers.map((answer, index) => {
    //                                 const question = findQuestionById(result.exam.questions, answer.question);
    //                                 return (
    //                                     <li key={index} className={`mt-1 ${answer.selectedAnswer === question.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
    //                                         <p>Question: {question.question}</p>
    //                                         <p>Your Answer: {question.options[answer.selectedAnswer] || 'N/A'}</p>
    //                                         <p>Correct Answer: {question.options[question.correctAnswer] || 'N/A'}</p>
    //                                         {question.explanation && (
    //                                             <p className="text-gray-600">Explanation: {question.explanation}</p>
    //                                         )}
    //                                     </li>
    //                                 );
    //                             })}
    //                         </ul>
    //                     </div>
    //                 </li>
    //             ))}
    //         </ul>
    //     )}
    // </div>
    return ( <>
        {loading ?
                <ul className="divide-y divide-gray-300 dark:divide-gray-600">
                    {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                        <li key={index} className="py-4">
                            {/* Skeleton loading items */}
                            <p>Loading...</p>
                        </li>
                    ))}
                </ul>
            :  (results.length === 0)  ? <>
            <p className="text-gray-600 dark:text-white">No exam results available.</p></> :<div>
            { 


                


                
                (<ul className="divide-y divide-gray-300 dark:divide-gray-600">
                    {results.map((result) => {
                        const calculatedResult = calculateResultMetrics(result);
                        console.log(results)
                        const isExpanded = expandedResultId === result._id;

                        return (
                            <li key={result._id} className="py-4">
                                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                                    Exam taken on {new Date(result.createdAt).toLocaleDateString('en-GB')}
                                </h3>
                                <h2 className="text-xl font-semibold mb-2 dark:text-white">
                                    Name: {result.user.name}
                                </h2>
                                <h2 className="text-xl font-semibold mb-2 dark:text-white">
                                    Email: {result.user.email}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Score: {calculatedResult.score}/{calculatedResult.totalQuestions}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Accuracy: {calculatedResult.accuracy.toFixed(2)}%
                                </p>
                                <button
                                    onClick={() => toggleExpand(result._id)}
                                    className="text-blue-500 hover:text-blue-600 transition duration-300"
                                >
                                    {isExpanded ? 'Hide Detailed Analysis' : 'View Detailed Analysis'}
                                </button>

                                {/* Detailed view */}
                                {isExpanded && (
                                    <div className="mt-4">
                                        <h4 className="font-bold">Detailed Analysis:</h4>
                                        <ul className="list-disc pl-5">
                                            {result.answers.map((answer, index) => {
                                                const question = findQuestionById(result.exam.questions, answer.question);
                                                return (
                                                    <li key={index} className={`mt-1 ${answer.selectedAnswer === question.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
                                                        <p>Question: {question.question}</p>
                                                        <p>Your Answer: {question.options[answer.selectedAnswer] || 'N/A'}</p>
                                                        <p>Correct Answer: {question.options[question.correctAnswer] || 'N/A'}</p>
                                                        {question.explanation && (
                                                            <p className="text-gray-600">Explanation: {question.explanation}</p>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>)}
                </div> } </>
    );
};

export default AdminViewResults;
