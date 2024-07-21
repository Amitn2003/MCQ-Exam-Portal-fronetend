import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExamById, submitExam } from '../api/examApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';

const StartExam = () => {
    const { examId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(0);
    const [examStarted, setExamStarted] = useState(false);

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const data = await getExamById(examId, user.token);
                setQuestions(data.questions);
                setUserAnswers(new Array(data.questions.length).fill(-1));
                setTimeLeft(data.questions.length * 2 * 60); // Assuming 2 minutes per question
                setExamStarted(true);
            } catch (error) {
                toast.error('Failed to fetch exam');
                navigate('/exams');
            }
        };

        fetchExam();
    }, [examId, user.token, navigate]);

    useEffect(() => {
        if (examStarted) {
            const timer = setInterval(() => {
                setTimeLeft((prevTimeLeft) => {
                    if (prevTimeLeft <= 1) {
                        clearInterval(timer);
                        handleSubmitClick();
                        return 0;
                    }
                    return prevTimeLeft - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [examStarted]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleAnswerSelection = (selectedOptionIndex) => {
        setUserAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[currentQuestionIndex] = selectedOptionIndex;
            return newAnswers;
        });
    };

    const moveToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
    };

    const moveToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        }
    };

    const calculateScoreAndAccuracy = () => {
        const correctAnswers = questions.reduce((acc, question, index) => {
            return question.correctAnswer === userAnswers[index] ? acc + 1 : acc;
        }, 0);

        const totalQuestions = questions.length;
        const userScore = correctAnswers;
        const userAccuracy = (correctAnswers / totalQuestions) * 100;

        return { userScore, userAccuracy };
    };

    const saveExamResult = async (score, accuracy) => {
        const resultData = {
            answers: questions.map((q, index) => ({
                question: q._id,
                selectedAnswer: userAnswers[index],
            })),
            score,
            totalQuestions: questions.length,
            accuracy,
        };

        try {
            await submitExam(examId, resultData, user.token);
            toast.success('Exam submitted successfully');
        } catch (error) {
            toast.error('Failed to submit exam');
        }
    };

    const handleSubmitClick = () => {
        const { userScore, userAccuracy } = calculateScoreAndAccuracy();
        saveExamResult(userScore, userAccuracy);
        navigate('/exam-results');
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Exam Questions</h2>
                {questions.length === 0 ? (
                    <p className="text-red-500">No questions available.</p>
                ) : (
                    <div>
                        <div className="mb-4 text-gray-400">
                            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-100">
                                Question {currentQuestionIndex + 1}
                            </h3>
                            <div className="mb-4">
                                <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-100">
                                    Time Left: {formatTime(timeLeft)}
                                </h3>
                            </div>
                            <p className="text-gray-600 dark:text-white">{questions[currentQuestionIndex].question}</p>
                            <p className="text-sm text-gray-400 dark:text-gray-200">Category: {questions[currentQuestionIndex].category}</p>
                            <span className="text-sm text-gray-300 dark:text-gray-500">{questions[currentQuestionIndex].subcategory}</span>
                        </div>
                        <ul>
                            {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                                <li key={optionIndex} className="mb-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio h-5 w-5 text-indigo-600"
                                            name={`question-${currentQuestionIndex}`}
                                            value={optionIndex}
                                            checked={userAnswers[currentQuestionIndex] === optionIndex}
                                            onChange={() => handleAnswerSelection(optionIndex)}
                                        />
                                        <span className="ml-2 text-gray-700 dark:text-gray-200">{option}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 flex justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                                onClick={moveToPreviousQuestion}
                                disabled={currentQuestionIndex === 0}
                            >
                                Previous
                            </button>
                            {currentQuestionIndex < questions.length - 1 ? (
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                                    onClick={moveToNextQuestion}
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                                    onClick={handleSubmitClick}
                                >
                                    Submit Exam
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StartExam;
