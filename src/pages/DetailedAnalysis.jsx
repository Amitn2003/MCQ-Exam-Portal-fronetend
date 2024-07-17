import React, { useEffect, useState } from 'react';
import { getUserExamResults } from '../api/examResultApi';
import { reportQuestion } from '../api/reportedQuestionApi';
import { useAuth } from '../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const DetailedAnalysis = () => {
    const { resultId } = useParams();
    const [result, setResult] = useState(null);
    const { user } = useAuth();
    const [reportReason, setReportReason] = useState('');
    // const [showReportInput, setShowReportInput] = useState(false);
    const [activeReportIndex, setActiveReportIndex] = useState(null);

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


    const handleReportQuestion = async (questionId) => {
        console.log(questionId)
        if (!reportReason) {
            toast.error('Please provide a reason for reporting the question');
            return;
        }

        try {
            await reportQuestion(questionId, reportReason, user.token);
            toast.success('Question reported successfully');
            setReportReason('');
            // setShowReportInput(false);
            setActiveReportIndex(null);
        } catch (error) {
            toast.error('Failed to report question');
        }
    };







    if (!result) {
        return <div>Loading...</div>;
    }


    return (
        <div className="bg-white text-black dark:bg-gray-800 shadow-md rounded-md p-6">
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
                                                         {activeReportIndex === index ? (
                                <div className="flex flex-col space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Reason for reporting this question"
                                        value={reportReason}
                                        onChange={(e) => setReportReason(e.target.value)}
                                        className="p-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
                                    />
                                    <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition' onClick={() => handleReportQuestion(questionResult.question._id)}>
                                        Report Question
                                    </button>
                                </div>
                            ) : (
                                <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition' onClick={() => setActiveReportIndex(index)}>
                                    Report Question
                                </button>
                            )}
                        </li>
                    );
                })}

                    );
                })}
            </ul>
        </div>
    );
};

export default DetailedAnalysis;
