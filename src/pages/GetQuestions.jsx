import React, { useEffect, useState } from 'react';
import { getQuestionsByCategory } from '../api/questionApi';
import { addExamResult } from '../api/examResultApi';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




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

    useEffect(() => {
        const fetchQuestions = async () => {
            if (selectedCategory && examStarted) {
                toast.success('Best of luck for your exam!');
                try {
                    const data = await getQuestionsByCategory(selectedCategory, user.token, totalQuestions);
                    setQuestions(data);
                    setUserAnswers(new Array(data.length).fill(null));
                    setExamStarted(true); // Start the exam once questions are fetched
                } catch (error) {
                    console.error('Failed to fetch questions by category:', error.message);
                }
            }
        };

        if (examStarted && selectedCategory) {
            fetchQuestions();
        }
    }, [selectedCategory, user.token, examStarted]);

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
        } catch (error) {
            console.error('Failed to save exam result');
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
        // Example fetch logic (replace with actual fetch or API call)
        fetchQuestions(selectedCategory, totalQuestions);
    };


    // <div>
    //     {!examStarted && (
    //         <div>
    //             <h2>Choose Exam Category</h2>
    //             <select value={selectedCategory} onChange={handleCategoryChange}>
    //                 <option value="">Select Category</option>
    //                 <option value="Aptitude">Aptitude</option>
    //                 <option value="Reasoning">Reasoning</option>
    //                 <option value="Campus Placement">Campus Placement</option>
    //             </select>
    //         </div>
    //     )}

    //     {examStarted && (
    //         <div>
    //             <h2>Exam Questions</h2>
    //             {questions.length === 0 ? (
    //                 <p>No questions available.</p>
    //             ) : (
    //                 <div>
    //                     {!showReport && (
    //                         <div>
    //                             <h3>Question {currentQuestionIndex + 1}</h3>
    //                             <h3>{questions[currentQuestionIndex].question}</h3>
    //                             <p>Category: {questions[currentQuestionIndex].category}</p>
    //                             <ul>
    //                                 {questions[currentQuestionIndex].options.map((option, optionIndex) => (
    //                                     <li key={optionIndex}>
    //                                         <label>
    //                                             <input
    //                                                 type="radio"
    //                                                 name={`question-${currentQuestionIndex}`}
    //                                                 value={optionIndex}
    //                                                 checked={userAnswers[currentQuestionIndex] === optionIndex}
    //                                                 onChange={() => handleAnswerSelection(optionIndex)}
    //                                             />
    //                                             {option}
    //                                         </label>
    //                                     </li>
    //                                 ))}
    //                             </ul>
    //                             {currentQuestionIndex < questions.length - 1 && (
    //                                 <button onClick={handleNextClick}>Next</button>
    //                             )}
    //                             {currentQuestionIndex === questions.length - 1 && (
    //                                 <button onClick={handleSubmitClick}>Submit Exam</button>
    //                             )}
    //                         </div>
    //                     )}

    //                     {showReport && (
    //                         <div>
    //                             <h2>Exam Report</h2>
    //                             <ul>
    //                                 {questions.map((question, index) => (
    //                                     <li key={question._id}>
    //                                         <h3>{question.question}</h3>
    //                                         <p>Your Answer: {question.options[userAnswers[index]]}</p>
    //                                         <p>Correct Answer: {question.options[question.correctAnswer]}</p>
    //                                         {question.explanation && (
    //                                             <p>Explanation: {question.explanation}</p>
    //                                         )}
    //                                     </li>
    //                                 ))}
    //                             </ul>
    //                             <p>Score: {score}/{questions.length}</p>
    //                             <p>Accuracy: {accuracy.toFixed(2)}%</p>
    //                             <button onClick={() => navigate('/results')}>View Results</button>
    //                             <button onClick={resetExam}>Retake Exam</button>
    //                         </div>
    //                     )}
    //                 </div>
    //             )}
    //         </div>
    //     )}
    // </div>



    //     <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    //     {!examStarted && (
    //         <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
    //             <h2 className="text-2xl font-bold mb-4">Choose Exam Category</h2>
    //             <select
    //                 className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                 value={selectedCategory}
    //                 onChange={handleCategoryChange}
    //             >
    //                 <option value="">Select Category</option>
    //                 <option value="Aptitude">Aptitude</option>
    //                 <option value="Reasoning">Reasoning</option>
    //                 <option value="Campus Placement">Campus Placement</option>
    //             </select>
    //         </div>
    //     )}

    //     {examStarted && (
    //         <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
    //             <h2 className="text-2xl font-bold mb-4">Exam Questions</h2>
    //             {questions.length === 0 ? (
    //                 <p className="text-red-500">No questions available.</p>
    //             ) : (
    //                 <div>
    //                     {!showReport && (
    //                         <div>
    //                             <div className="mb-4">
    //                                 <h3 className="text-lg font-medium mb-2">
    //                                     Question {currentQuestionIndex + 1}
    //                                 </h3>
    //                                 <p className="text-gray-600">{questions[currentQuestionIndex].question}</p>
    //                                 <p className="text-sm text-gray-500">Category: {questions[currentQuestionIndex].category}</p>
    //                             </div>
    //                             <ul>
    //                                 {questions[currentQuestionIndex].options.map((option, optionIndex) => (
    //                                     <li key={optionIndex} className="mb-2">
    //                                         <label className="flex items-center">
    //                                             <input
    //                                                 type="radio"
    //                                                 className="form-radio h-5 w-5 text-indigo-600"
    //                                                 name={`question-${currentQuestionIndex}`}
    //                                                 value={optionIndex}
    //                                                 checked={userAnswers[currentQuestionIndex] === optionIndex}
    //                                                 onChange={() => handleAnswerSelection(optionIndex)}
    //                                             />
    //                                             <span className="ml-2 text-gray-700">{option}</span>
    //                                         </label>
    //                                     </li>
    //                                 ))}
    //                             </ul>
    //                             <div className="mt-4">
    //                                 {currentQuestionIndex < questions.length - 1 ? (
    //                                     <button
    //                                         className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
    //                                         onClick={handleNextClick}
    //                                     >
    //                                         Next
    //                                     </button>
    //                                 ) : (
    //                                     <button
    //                                         className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
    //                                         onClick={handleSubmitClick}
    //                                     >
    //                                         Submit Exam
    //                                     </button>
    //                                 )}
    //                             </div>
    //                         </div>
    //                     )}

    //                     {showReport && (
    //                         <div>
    //                             <h2 className="text-2xl font-bold mb-4">Exam Report</h2>
    //                             <ul>
    //                                 {questions.map((question, index) => (
    //                                     <li key={index} className="mb-4">
    //                                         <h3 className="text-lg font-medium">{question.question}</h3>
    //                                         <p className="text-gray-600">
    //                                             Your Answer: {question.options[userAnswers[index]]}
    //                                         </p>
    //                                         <p className="text-gray-600">
    //                                             Correct Answer: {question.options[question.correctAnswer]}
    //                                         </p>
    //                                         {question.explanation && (
    //                                             <p className="text-gray-500">{question.explanation}</p>
    //                                         )}
    //                                     </li>
    //                                 ))}
    //                             </ul>
    //                             <div className="mt-4">
    //                                 <p className="text-lg font-medium">Score: {score}/{questions.length}</p>
    //                                 <p className="text-lg font-medium">Accuracy: {accuracy.toFixed(2)}%</p>
    //                             </div>
    //                             <div className="mt-4">
    //                                 <button
    //                                     className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
    //                                     onClick={() => navigate('/results')}
    //                                 >
    //                                     View Results
    //                                 </button>
    //                                 <button
    //                                     className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
    //                                     onClick={resetExam}
    //                                 >
    //                                     Retake Exam
    //                                 </button>
    //                             </div>
    //                         </div>
    //                     )}
    //                 </div>
    //             )}
    //         </div>
    //     )}
    // </div>
    //         <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    //     {!examStarted ? (
    //         <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
    //             <h2 className="text-2xl font-bold mb-4">Choose Exam Category</h2>
    //             <select
    //                 className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                 value={selectedCategory}
    //                 onChange={handleCategoryChange}
    //             >
    //                 <option value="">Select Category</option>
    //                 <option value="Aptitude">Aptitude</option>
    //                 <option value="Reasoning">Reasoning</option>
    //                 <option value="Campus Placement">Campus Placement</option>
    //             </select>
    //         </div>
    //     ) : (
    //         <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
    //             <h2 className="text-2xl font-bold mb-4">Exam Questions</h2>
    //             {questions.length === 0 ? (
    //                 <p className="text-red-500">No questions available.</p>
    //             ) : (
    //                 <div>
    //                     {!showReport ? (
    //                         <div>
    //                             <div className="mb-4">
    //                                 <h3 className="text-lg font-medium mb-2">
    //                                     Question {currentQuestionIndex + 1}
    //                                 </h3>
    //                                 <p className="text-gray-600">{questions[currentQuestionIndex].question}</p>
    //                                 <p className="text-sm text-gray-500">Category: {questions[currentQuestionIndex].category}</p>
    //                             </div>
    //                             <ul>
    //                                 {questions[currentQuestionIndex].options.map((option, optionIndex) => (
    //                                     <li key={optionIndex} className="mb-2">
    //                                         <label className="flex items-center">
    //                                             <input
    //                                                 type="radio"
    //                                                 className="form-radio h-5 w-5 text-indigo-600"
    //                                                 name={`question-${currentQuestionIndex}`}
    //                                                 value={optionIndex}
    //                                                 checked={userAnswers[currentQuestionIndex] === optionIndex}
    //                                                 onChange={() => handleAnswerSelection(optionIndex)}
    //                                             />
    //                                             <span className="ml-2 text-gray-700">{option}</span>
    //                                         </label>
    //                                     </li>
    //                                 ))}
    //                             </ul>
    //                             <div className="mt-4">
    //                                 {currentQuestionIndex < questions.length - 1 ? (
    //                                     <button
    //                                         className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
    //                                         onClick={handleNextClick}
    //                                     >
    //                                         Next
    //                                     </button>
    //                                 ) : (
    //                                     <button
    //                                         className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
    //                                         onClick={handleSubmitClick}
    //                                     >
    //                                         Submit Exam
    //                                     </button>
    //                                 )}
    //                             </div>
    //                         </div>
    //                     ) : (
    //                         <div>
    //                             <h2 className="text-2xl font-bold mb-4">Exam Report</h2>
    //                             <ul>
    //                                 {questions.map((question, index) => (
    //                                     <li key={index} className="mb-4">
    //                                         <h3 className="text-lg font-medium">{question.question}</h3>
    //                                         <p className={`text-gray-600 ${userAnswers[index] === question.correctAnswer ? 'text-green-500' : 'text-red-500'}`}>
    //                                             Your Answer: {question.options[userAnswers[index]]}
    //                                         </p>
    //                                         <p className="text-gray-600">
    //                                             Correct Answer: {question.options[question.correctAnswer]}
    //                                         </p>
    //                                         {question.explanation && (
    //                                             <p className="text-gray-500">{question.explanation}</p>
    //                                         )}
    //                                     </li>
    //                                 ))}
    //                             </ul>
    //                             <div className="mt-4">
    //                                 <p className="text-lg font-medium">Score: {score}/{questions.length}</p>
    //                                 <p className="text-lg font-medium">Accuracy: {accuracy.toFixed(2)}%</p>
    //                             </div>
    //                             <div className="mt-4">
    //                                 <button
    //                                     className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
    //                                     onClick={() => navigate('/results')}
    //                                 >
    //                                     View Results
    //                                 </button>
    //                                 <button
    //                                     className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
    //                                     onClick={resetExam}
    //                                 >
    //                                     Retake Exam
    //                                 </button>
    //                             </div>
    //                         </div>
    //                     )}
    //                 </div>
    //             )}
    //         </div>
    //     )}
    // </div>
    return (
        <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            {!examStarted ? (
                <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mb-4">
                    <h2>
                    <label htmlFor="totalQuestions" className="block text-2xl font-bold text-gray-700 mb-2">Number of Questions:</label> </h2>
                    <select
                        id="totalQuestions"
                        name="totalQuestions"
                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={totalQuestions}
                        onChange={handleTotalQuestionsChange}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="80">80</option>
                    </select>


                    <h2 className="text-2xl font-bold mb-4">Choose Exam Category:</h2>
                    <select
                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="">Select Category</option>
                        <option value="Aptitude">Aptitude</option>
                        <option value="Reasoning">Reasoning</option>
                        <option value="Campus Placement">Campus Placement</option>
                    </select>



                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
                        onClick={handleStartExam}
                        disabled={!selectedCategory} // Disable button if category is not selected
                    >
                        Start Exam
                    </button>
                </div>
            ) : (
                <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Exam Questions</h2>
                    {questions.length === 0 ? (
                        <p className="text-red-500">No questions available.</p>
                    ) : (
                        <div>
                            {!showReport ? (
                                <div>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-medium mb-2">
                                            Question {currentQuestionIndex + 1}
                                        </h3>
                                        <p className="text-gray-600">{questions[currentQuestionIndex].question}</p>
                                        <p className="text-sm text-gray-500">Category: {questions[currentQuestionIndex].category}</p>
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
                                                    <span className="ml-2 text-gray-700">{option}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-4">
                                        {currentQuestionIndex < questions.length - 1 ? (
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
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
                                    <h2 className="text-2xl font-bold mb-4">Exam Report</h2>
                                    <ul>
                                        {questions.map((question, index) => (
                                            <li key={index} className="mb-4">
                                                <h3 className="text-lg font-medium">{question.question}</h3>
                                                <p className={`text-gray-600 ${userAnswers[index] === question.correctAnswer ? 'text-green-500' : 'text-red-500'}`}>
                                                    Your Answer: {question.options[userAnswers[index]]}
                                                </p>
                                                <p className="text-gray-600">
                                                    Correct Answer: {question.options[question.correctAnswer]}
                                                </p>
                                                {question.explanation && (
                                                    <p className="text-gray-500">{question.explanation}</p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-4">
                                        <p className="text-lg font-medium">Score: {score}/{questions.length}</p>
                                        <p className="text-lg font-medium">Accuracy: {accuracy.toFixed(2)}%</p>
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

