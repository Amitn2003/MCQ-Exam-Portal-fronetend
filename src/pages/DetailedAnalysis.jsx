import React, { useEffect, useState } from 'react';
import { getUserExamResults } from '../api/examResultApi';
import { useAuth } from '../hooks/useAuth';
import { useParams } from 'react-router-dom';

const DetailedAnalysis = () => {
    const { resultId } = useParams();
    const [result, setResult] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const data = await getUserExamResults(user.token);
                const specificResult = data.find(res => res._id === resultId);
                setResult(specificResult);
            } catch (error) {
                console.error('Failed to fetch exam result');
            }
        };

        fetchResult();
    }, [resultId, user.token]);

    if (!result) {
        return <div>Loading...</div>;
    }

    // <div>
    //     <h2>Detailed Analysis</h2>
    //     <p>Exam taken on {new Date(result.createdAt).toLocaleDateString()}</p>
    //     <p>Score: {result.score}/{result.totalQuestions}</p>
    //     <p>Accuracy: {result.accuracy.toFixed(2)}%</p>
    //     <ul>
    //         {result.questions.map((questionResult, index) => (
    //             <li key={index}>
    //                 <h4>{questionResult.question.question}</h4>
    //                 <p>Your Answer: {questionResult.question.options[questionResult.selectedAnswer]}</p>
    //                 <p>Correct Answer: {questionResult.question.options[questionResult.question.correctAnswer]}</p>
    //                 {questionResult.question.explanation && (
    //                     <p>Explanation: {questionResult.question.explanation}</p>
    //                 )}
    //             </li>
    //         ))}
    //     </ul>
    // </div>
    //         <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-6">
    //     <h2 className="text-2xl font-bold mb-4">Detailed Analysis</h2>
    //     <p className="text-gray-600 dark:text-gray-300 mb-2">Exam taken on {new Date(result.createdAt).toLocaleDateString()}</p>
    //     <p className="text-gray-600 dark:text-gray-300 mb-2">Score: {result.score}/{result.totalQuestions}</p>
    //     <p className="text-gray-600 dark:text-gray-300 mb-4">Accuracy: {result.accuracy.toFixed(2)}%</p>
    //     <ul>
    //         {result.questions.map((questionResult, index) => (
    //             <li key={index} className="mb-4">
    //                 <h4 className="font-semibold mb-2">{questionResult.question.question}</h4>
    //                 <p className="text-gray-600 dark:text-gray-300 mb-1">Your Answer: {questionResult.question.options[questionResult.selectedAnswer]}</p>
    //                 <p className="text-gray-600 dark:text-gray-300 mb-1">Correct Answer: {questionResult.question.options[questionResult.question.correctAnswer]}</p>
    //                 {questionResult.question.explanation && (
    //                     <p className="text-gray-600 dark:text-gray-300 mb-1">Explanation: {questionResult.question.explanation}</p>
    //                 )}
    //             </li>
    //         ))}
    //     </ul>
    // </div>
    // <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-6">
    //     <h2 className="text-2xl font-bold mb-4">Detailed Analysis</h2>
    //     <p className="text-gray-600 dark:text-gray-300 mb-2">Exam taken on {new Date(result.createdAt).toLocaleDateString()}</p>
    //     <p className="text-gray-600 dark:text-gray-300 mb-2">Score: {result.score}/{result.totalQuestions}</p>
    //     <p className="text-gray-600 dark:text-gray-300 mb-4">Accuracy: {result.accuracy.toFixed(2)}%</p>
    //     <ul>
    //         {result.questions.map((questionResult, index) => {
    //             if (!questionResult || !questionResult.question) {
    //                 return null; // or handle this case appropriately
    //             }
    //             const isCorrect = questionResult.selectedAnswer === questionResult.question.correctAnswer;
    //             const answerColor = isCorrect ? 'text-green-500' : 'text-red-500';

    //             return (
    //                 <li key={index} className="mb-4">
    //                     <h4 className="font-semibold mb-2">{questionResult.question.question}</h4>
    //                     <p className={`mb-1 ${answerColor}`}>Your Answer: {questionResult.question.options[questionResult.selectedAnswer]}</p>
    //                     <p className="text-gray-600 dark:text-gray-300 mb-1">Correct Answer: {questionResult.question.options[questionResult.question.correctAnswer]}</p>
    //                     {questionResult.question.explanation && (
    //                         <p className="text-gray-600 dark:text-gray-300 mb-1">Explanation: {questionResult.question.explanation}</p>
    //                     )}
    //                 </li>
    //             );
    //         })}
    //     </ul>
    // </div>
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-6">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Detailed Analysis</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">Exam taken on {new Date(result.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">Score: {result.score}/{result.totalQuestions}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Accuracy:
                {result.accuracy.toFixed(2)}%</p>
                <div className="bg-gray-200 w-full h-8 rounded-lg overflow-hidden">
                    <div className="bg-green-500 h-full text-center text-white font-bold" style={{ width: `${result.accuracy.toFixed(2)}%` }}>
                        {result.accuracy.toFixed(2)}%
                    </div>
                </div>
                <br />


            <ul>
                {result.questions.map((questionResult, index) => {
                    if (!questionResult || !questionResult.question) {
                        return null; // or handle this case appropriately
                    }
                    const isCorrect = questionResult.selectedAnswer === questionResult.question.correctAnswer;
                    const answerColor = isCorrect ? 'text-green-500' : 'text-red-500';

                    return (
                        <li key={index} className="mb-4">
                            <h4 className="font-semibold mb-2 dark:text-white"> {index + 1}. {questionResult.question.question}</h4>
                            <p className={`mb-1 ${answerColor}`}>Your Answer: {questionResult.question.options[questionResult.selectedAnswer]}</p>
                            <p className="text-gray-600 dark:text-gray-300 mb-1">
                                Correct Answer: {questionResult.question.options[questionResult.question.correctAnswer]}</p>
                            {questionResult.question.explanation && (
                                <p className="text-gray-600 dark:text-gray-300 mb-1">Explanation: {questionResult.question.explanation}</p>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default DetailedAnalysis;
