import React, { useEffect, useState } from 'react';
import { getUserExams } from '../api/examApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'



const Results = () => {
    const { user } = useAuth();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await getUserExams(user._id, user.token);
                const resultsWithScore = calculateScoreAndAccuracy(data);
                setResults(resultsWithScore);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch exam results');
                setLoading(false);
            }
        };

        fetchResults();
    }, [user.token]);


    const calculateScoreAndAccuracy = (data) => {
        return data.map((result) => {
            const exam = result.exam;
            const answers = result.answers;
            let score = 0;

            answers.forEach((answer) => {
                const question = exam.questions.find(q => q._id === answer.question);
                if (question && answer.selectedAnswer === question.correctAnswer) {
                    score++;
                }
            });

            const totalQuestions = exam.questions.length;
            const accuracy = (score / totalQuestions) * 100;

            return {
                ...result,
                score,
                accuracy,
            };
        });
    };

    const toggleDetails = (index) => {
        const updatedResults = [...results];
        updatedResults[index].expanded = !updatedResults[index].expanded;
        setResults(updatedResults);
    };

    //     <div className="max-w-3xl mx-auto p-4">
    //     <h2 className="text-2xl font-bold mb-4">Your Exam Results</h2>
    //     {results.length === 0 ? (
    //         <p>No results found.</p>
    //     ) : (
    //         <div className="space-y-4">
    //             {results.map((result) => (
    //                 <div key={result._id} className="bg-white p-4 rounded-lg shadow-md text-black">
    //                     <h3 className="text-xl font-bold mb-2">{result.exam.title}</h3>
    //                     <p>Category: {result.exam.category}</p>
    //                     <p>Score: {result.score}/{result.exam.questions.length}</p>
    //                     <p>Accuracy: {(result.accuracy * 100).toFixed(2)}%</p>
    //                     <div className="mt-4">
    //                         <h4 className="font-bold">Answers:</h4>
    //                         <ul className="list-disc pl-5">
    //                             {result.exam.questions.map((question) => {
    //                                 const answer = result.answers.find(ans => ans.question === question._id);
    //                                 const isCorrect = answer.selectedAnswer === question.correctAnswer;

    //                                 return (
    //                                     <li key={question._id} className={`mt-1 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
    //                                         Question: {question.question}
    //                                         <br />
    //                                         Your Answer: {question.options[answer.selectedAnswer]}
    //                                         <br />
    //                                         Correct Answer: {question.options[question.correctAnswer]}
    //                                         {question.explanation && (
    //                                             <p className="text-gray-600">Explanation: {question.explanation}</p>
    //                                         )}
    //                                     </li>
    //                                 );
    //                             })}
    //                         </ul>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     )}
    // </div>
    //     <div className="max-w-3xl mx-auto p-4">
    //     <h2 className="text-2xl font-bold mb-4">Your Exam Results</h2>
    //     {results.length === 0 ? (
    //         <p>No results found.</p>
    //     ) : (
    //         <div className="space-y-4">
    //             {results.map((result, index) => (
    //                 <div key={result._id} className="bg-white p-4 rounded-lg shadow-md">
    //                     <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleDetails(index)}>
    //                         <div>
    //                             <h3 className="text-xl font-bold">{result.exam.title}</h3>
    //                             <p>Category: {result.exam.category}</p>
    //                             <p>Accuracy: {(result.accuracy * 100).toFixed(2)}%</p>
    //                         </div>
    //                         <div className="text-gray-500">
    //                             {result.expanded ? '-' : '+'}
    //                         </div>
    //                     </div>
    //                     {result.expanded && (
    //                         <div className="mt-4">
    //                             <p>Score: {result.score}/{result.exam.questions.length}</p>
    //                             <h4 className="font-bold">Answers:</h4>
    //                             <ul className="list-disc pl-5">
    //                                 {result.exam.questions.map((question) => {
    //                                     const answer = result.answers.find(ans => ans.question === question._id);
    //                                     const isCorrect = answer.selectedAnswer === question.correctAnswer;

    //                                     return (
    //                                         <li key={question._id} className={`mt-1 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
    //                                             Question: {question.question}
    //                                             <br />
    //                                             Your Answer: {question.options[answer.selectedAnswer]}
    //                                             <br />
    //                                             Correct Answer: {question.options[question.correctAnswer]}
    //                                             {question.explanation && (
    //                                                 <p className="text-gray-600">Explanation: {question.explanation}</p>
    //                                             )}
    //                                         </li>
    //                                     );
    //                                 })}
    //                             </ul>
    //                         </div>
    //                     )}
    //                 </div>
    //             ))}
    //         </div>
    //     )}
    // </div>
    //     <div className="max-w-3xl mx-auto p-4">
    //     <h2 className="text-2xl font-bold mb-4">Your Exam Results</h2>
    //     {loading ? ( // Check loading state to show Skeleton loading indicators
    //         <div className="space-y-4">
    //             <Skeleton height={40} count={8} /> {/* Example of using Skeleton */}
    //             <Skeleton height={40} count={8} /> {/* Example of using Skeleton */}
    //         </div>
    //     ) : (
    //         <div className="space-y-4">
    //             {results.length === 0 ? (
    //                 <p>No results found.</p>
    //             ) : (
    //                 results.map((result, index) => (
    //                     <div key={result._id} className="bg-white p-4 rounded-lg shadow-md text-black">
    //                         <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleDetails(index)}>
    //                             <div>
    //                                 <h3 className="text-xl font-bold">{result.exam.title}</h3>
    //                                 <p>Category: {result.exam.category}</p>
    //                                 <p>Accuracy: {(result.accuracy * 100).toFixed(2)}%</p>
    //                             </div>
    //                             <div className="text-gray-500">
    //                                 {result.expanded ? '-' : '+'}
    //                             </div>
    //                         </div>
    //                         {result.expanded && (
    //                             <div className="mt-4">
    //                                 <p>Score: {result.score}/{result.exam.questions.length}</p>
    //                                 <h4 className="font-bold">Answers:</h4>
    //                                 <ul className="list-disc pl-5">
    //                                     {result.exam.questions.map((question) => {
    //                                         const answer = result.answers.find(ans => ans.question === question._id);
    //                                         const isCorrect = answer.selectedAnswer === question.correctAnswer;

    //                                         return (
    //                                             <li key={question._id} className={`mt-1 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
    //                                                 Question: {question.question}
    //                                                 <br />
    //                                                 Your Answer: {question.options[answer.selectedAnswer]}
    //                                                 <br />
    //                                                 Correct Answer: {question.options[question.correctAnswer]}
    //                                                 {question.explanation && (
    //                                                     <p className="text-gray-600">Explanation: {question.explanation}</p>
    //                                                 )}
    //                                             </li>
    //                                         );
    //                                     })}
    //                                 </ul>
    //                             </div>
    //                         )}
    //                     </div>
    //                 ))
    //             )}
    //         </div>
    //     )}
    // </div>
    return (
        <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Your Exam Results</h2>
        {loading ? ( // Check loading state to show Skeleton loading indicators
            <div className="space-y-4">
                <Skeleton height={50} count={5} /> {/* Example of using Skeleton */}
            </div>
        ) : (
            <div className="space-y-4">
                {results.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    results.map((result, index) => (
                        <div key={result._id} className="bg-white p-4 rounded-lg shadow-md text-black">
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleDetails(index)}>
                                <div>
                                    <h3 className="text-xl font-bold">{result.exam.title}</h3>
                                    <p>Category: {result.exam.category}</p>
                                    <p>Accuracy: {(result.accuracy || 0).toFixed(2)}%</p>
                                </div>
                                <div className="text-gray-500">
                                    {result.expanded ? '-' : '+'}
                                </div>
                            </div>
                            {result.expanded && (
                                <div className="mt-4">
                                    <p>Score: {result.score}/{result.exam.questions.length}</p>
                                    <h4 className="font-bold">Answers:</h4>
                                    <ul className="list-disc pl-5">
                                        {result.exam.questions.map((question) => {
                                            const answer = result.answers.find(ans => ans.question === question._id);
                                            const isCorrect = answer.selectedAnswer === question.correctAnswer;

                                            return (
                                                <li key={question._id} className={`mt-1 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                                    Question: {question.question}
                                                    <br />
                                                    Your Answer: {question.options[answer.selectedAnswer]}
                                                    <br />
                                                    Correct Answer: {question.options[question.correctAnswer]}
                                                    {question.explanation && (
                                                        <p className="text-gray-600">Explanation: {question.explanation}</p>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        )}
    </div>
    );
};

export default Results;
