import React, { useEffect, useState } from 'react';
import { getExamResultById  } from '../api/examResultApi';
import { reportQuestion } from '../api/reportedQuestionApi';
import { useAuth } from '../hooks/useAuth';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PieChartDetailedAnalysis from '../components/PieChartDetailedAnalysis';

const DetailedAnalysis = () => {
    const { resultId } = useParams();
    const [result, setResult] = useState(null);
    const { user } = useAuth();
    const [reportReason, setReportReason] = useState('');
    const [activeReportIndex, setActiveReportIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [correctAnswers, setCorrectAnswers] = useState(0);
    // const [accuracy, setAccuracy] = useState(0);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const data = await  getExamResultById(resultId, user.token); 
                console.log(data)
                // console.log(specificResult)
                setResult(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch exam result', error);
                toast.error(error.message);
                setLoading(false);
            }
        };

        fetchResult();
    }, [resultId, user.token]);
    // useEffect(() => {
    //     if (!result) return;

    //     // Calculate correct answers and accuracy
    //     let correctCount = 0;
    //     result.questions.forEach(questionResult => {
    //         if (questionResult.selectedAnswer === questionResult.question.correctAnswer) {
    //             correctCount++;
    //         }
    //     });

    //     const calculatedAccuracy = (correctCount / result.questions.length) * 100;
    //     setCorrectAnswers(correctCount);
    //     setAccuracy(calculatedAccuracy.toFixed(2));
    // }, [result]);
    const calculateScore = (questions) => {
        if (!questions) return 0;

        let score = 0;
        questions.forEach(questionResult => {
            if (questionResult.selectedAnswer === questionResult.question.correctAnswer) {
                score++;
            }
        });

        return score;
    };

    const calculateAccuracy = (score, totalQuestions) => {
        if (totalQuestions === 0) return 0;
        return ((score / totalQuestions) * 100).toFixed(2);
    };


    const handleReportQuestion = async (questionId) => {
        if (!reportReason) {
            toast.error('Please provide a reason for reporting the question');
            return;
        }

        try {
            await reportQuestion(questionId, reportReason, user.token);
            toast.success('Question reported successfully');
            setReportReason('');
            setActiveReportIndex(null);
        } catch (error) {
            toast.error('Failed to report question');
        }
    };

    if (loading || !result) {
        return (
            <div className="bg-white text-black dark:bg-gray-800 shadow-md rounded-md p-6">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Detailed Analysis</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Exam taken on <Skeleton height={15} width={120} /></p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Score: <Skeleton height={15} width={80} /></p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Accuracy: <Skeleton height={15} width={80} /></p>
                
                {/* Skeleton for question list */}
                <ul className="divide-y divide-gray-300 dark:divide-gray-600">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <li key={index} className="py-4">
                            <Skeleton height={30} />
                            <Skeleton height={10} style={{ marginTop: '6px' }} />
                            <Skeleton height={15} style={{ marginTop: '4px' }} />
                            <Skeleton height={30} style={{ marginTop: '4px' }} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    const score = calculateScore(result.questions);
    const accuracy = calculateAccuracy(score, result.totalQuestions);


    return (
        <div className="bg-white text-black dark:bg-gray-800 shadow-md rounded-md p-6">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Detailed Analysis</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">Exam taken on {new Date(result.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">Score: {score}/{result.totalQuestions}</p>
            {result.timeTaken ? <p className="text-gray-600 dark:text-gray-300 mb-2">Time taken: {result.timeTaken.toFixed(2)} Seconds</p> : "" }
            <p className="text-gray-600 dark:text-gray-300 mb-4">Accuracy: {accuracy}%</p>
            <PieChartDetailedAnalysis data={result} />
            <div className="bg-gray-200 w-full h-8 rounded-lg overflow-hidden">
                <div className="bg-green-500 h-full text-center text-white font-bold" style={{ width: `${result.accuracy.toFixed(2)}%` }}>
                    {accuracy}%
                </div>
            </div>
            <br />

            <ul className="divide-y divide-gray-300 dark:divide-gray-600">
                {result.questions.map((questionResult, index) => {
                    if (!questionResult || !questionResult.question) {
                        return null; // or handle this case appropriately
                    }
                    const isCorrect = questionResult.selectedAnswer === questionResult.question.correctAnswer;
                    const answerColor = isCorrect ? 'text-green-500' : 'text-red-500';

                    return (
                        <li key={index} className="mb-4">
                            <h4 className="font-semibold mb-2 dark:text-white">{index + 1}. {questionResult.question.question}</h4>
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
                                        value={reportReason} autoFocus
                                        onChange={(e) => setReportReason(e.target.value)}
                                        className="p-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
                                    />
                                    <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition' onClick={() => handleReportQuestion(questionResult.question._id)}>
                                        Report Question
                                    </button>
                                </div>
                            ) : (
                                <button className=' text-blue-500 border border-blue-400 px-4 py-1 rounded-lg hover:bg-blue-600 hover:text-white transition' onClick={() => setActiveReportIndex(index)}>
                                    Report Question
                                </button>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default DetailedAnalysis;
