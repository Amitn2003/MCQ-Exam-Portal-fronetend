import React, { useEffect, useState } from 'react';
import { getQuestionsByCategory } from '../api/questionApi';
import { addExamResult } from '../api/examResultApi';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'



const GetQuestions = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [questions, setQuestions] = useState([]);
    const [totalQuestions, setTotalQuestions] = useState(10)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showReport, setShowReport] = useState(false);
    const [score, setScore] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [examStarted, setExamStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(100);
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        const fetchQuestions = async () => {
            if (selectedCategory && examStarted) {
                toast.success('Best of luck for your exam!');
                try {
                    const data = await getQuestionsByCategory(selectedCategory, user.token, totalQuestions);
                    setQuestions(data);
                    setUserAnswers(new Array(data.length).fill(null));
                    setExamStarted(true); // Start the exam once questions are fetched
                    setLoading(false);
                    setTimeLeft(totalQuestions * 2 * 60); // Set timer (in seconds)
                } catch (error) {
                    console.error('Failed to fetch questions by category:', error.message);
                    toast.warn("Something went wrong!")
                    setLoading(false);
                }
            }
        };


        if (examStarted && selectedCategory) {
            setTimeLeft(totalQuestions * 2 * 60); 
            fetchQuestions();
        }
    }, [selectedCategory, user.token, examStarted]);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (examStarted) {
                handleSubmitClick();
                toast.info('Time is up! Submitting your exam...');
            }
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, examStarted]);




    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
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

    const calculateScoreAndAccuracy = () => {
        const correctAnswers = questions.reduce((acc, question, index) => {
            return question.correctAnswer === userAnswers[index] ? acc + 1 : acc;
        }, 0);

        const totalQuestions = questions.length;
        const userScore = correctAnswers;
        const userAccuracy = (correctAnswers / totalQuestions) * 100;

        setScore(userScore);
        setAccuracy(userAccuracy);
        setShowReport(true);

        saveExamResult(userScore, totalQuestions, userAccuracy);
    };

    const saveExamResult = async (score, totalQuestions, accuracy) => {
        const resultData = {
            questions: questions.map((q, index) => ({ question: q._id, selectedAnswer: userAnswers[index] })),
            score,
            totalQuestions,
            accuracy,
        };

        try {
            await addExamResult(resultData, user.token);
            toast.success("Exam completed😊")
        } catch (error) {
            console.error('Failed to save exam result');
            // toast.error("Failed to store your exam result😢")
        }
    };

    const resetExam = () => {
        setSelectedCategory('');
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setShowReport(false);
        setScore(0);
        setAccuracy(0);
        setExamStarted(false);
        setTimeLeft(0);
    };

    const handleNextClick = () => {
        moveToNextQuestion();
    };

    const handleSubmitClick = () => {
        calculateScoreAndAccuracy();
        toast.success('Hope your exam went well!');
    };
    const handleTotalQuestionsChange = (e) => {
        setTotalQuestions(parseInt(e.target.value, 10));
        // You can add additional logic here if needed
    };
    const handleStartExam = () => {
        // Logic to start the exam, fetch questions based on selectedCategory and totalQuestions
        setExamStarted(true);
        setTimeLeft(100);
        // Example fetch logic (replace with actual fetch or API call)
        fetchQuestions(selectedCategory, totalQuestions);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


    return (
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            {!examStarted ? (
                <div className="max-w-lg mx-auto bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-4">
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-4">Start Exam</h2>

                    <div className="mb-4">
                        <label htmlFor="totalQuestions" className="block text-lg font-semibold text-gray-700 dark:text-white mb-2">Number of Questions:</label>
                        <select
                            id="totalQuestions"
                            name="totalQuestions"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-gray-900"
                            value={totalQuestions}
                            onChange={handleTotalQuestionsChange}
                        >
                            <option value="1">1</option>
                            <option value="10" defaultChecked>10</option>
                            <option value="20">20</option>
                            <option value="40">40</option>
                            <option value="80">80</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="category" className="block text-lg font-semibold text-gray-700 dark:text-white mb-2">Choose Exam Category:</label>
                        <select
                            id="category"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-gray-900"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Select Category</option>
                            <option value="Aptitude">Aptitude</option>
                            <option value="Reasoning">Reasoning</option>
                            <option value="Campus Placement">Campus Placement</option>
                            <option value="JECA">JECA Exam</option>
                        </select>
                    </div>

                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
                        onClick={handleStartExam}
                        disabled={!selectedCategory} // Disable button if category is not selected
                    >
                        Start Exam
                    </button>
                </div>
            ) : (
                <div className="max-w-lg mx-auto bg-white text-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Exam Questions</h2>
                    {questions.length === 0 ? (<>
                        { loading && <>
                        <div  className="py-4">
                            <Skeleton height={40}  />
                            <Skeleton height={10} width={200}  style={{ marginTop: '8px' }} />
                            <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
                            <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
                            <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
                        </div>
                            <Skeleton height={10} width={40} style={{ marginTop: '4px' }} />
                        </>
                    }
                    </>
                    ) : (
                        <div>
                            {!showReport ? (
                                <div>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-100">
                                            Question {currentQuestionIndex + 1}
                                        </h3>
                                        <div className="mb-4">
                                            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-100">Time Left: {formatTime(timeLeft)}</h3>
                                        </div>
                                        <p className="text-gray-600 dark:text-white">{questions[currentQuestionIndex].question}</p>
                                        <p className="text-sm text-gray-400 dark:text-gray-200">Category: {questions[currentQuestionIndex].category}</p>
                                        {questions[currentQuestionIndex].subcategory }
                                    </div>
                                    <ul>
                                        {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                                            <li key={optionIndex} className="mb-2">
                                                <label className="flex items-center ">
                                                    <input
                                                        type="radio"
                                                        className="form-radio h-5 w-5 text-indigo-600 "
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
                                    <div className="mt-4">
                                        {currentQuestionIndex < questions.length - 1 ? (
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 "
                                                onClick={handleNextClick}
                                            >
                                                Next
                                            </button>
                                        ) : (
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
                                                onClick={handleSubmitClick}
                                            >
                                                Submit Exam
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Exam Report</h2>
                                    <ul>
                                        {questions.map((question, index) => (
                                            <li key={index} className="mb-4 text-gray-900">
                                                <h3 className="text-lg font-medium dark:text-gray-100">{question.question}</h3>
                                                <p className={`text-gray-600 ${userAnswers[index] === question.correctAnswer ? 'text-green-500' : 'text-red-500'}`}>
                                                    Your Answer: {question.options[userAnswers[index]]}
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-100">
                                                    Correct Answer: {question.options[question.correctAnswer]}
                                                </p>
                                                {question.explanation && (
                                                    <p className="text-gray-500 dark:text-gray-400"><span className='font-bold'>Explanation: </span>{question.explanation}</p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-4">
                                        <p className="text-lg font-medium text-gray-800 dark:text-gray-100">Score: {score}/{questions.length}</p>
                                        <p className="text-lg font-medium text-gray-800 dark:text-gray-100">Accuracy: {accuracy.toFixed(2)}%</p>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
                                            onClick={() => navigate('/results')}
                                        >
                                            View Results
                                        </button>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                                            onClick={resetExam}
                                        >
                                            Retake Exam
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GetQuestions;

