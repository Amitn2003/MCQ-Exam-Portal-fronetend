import React from 'react';
import InstallPromptComponent from '../InstallPromptComponent';
// import { Navigate } from 'react-router-dom';
const ExamReport = ({ questions, userAnswers, score, accuracy, resetExam, navigate }) => {
    return (
        <div className='px-2'>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Exam Report</h2>
            <div className="mt-4 px-3">
                <p className="text-lg font-medium text-gray-800 dark:text-gray-100">Score: {score}/{questions.length}</p>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-100">Accuracy: {accuracy.toFixed(2)}%</p>
            </div> 
            <br />
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
                            <p className="text-gray-500 dark:text-gray-400">
                                <span className='font-bold'>Explanation: </span>{question.explanation}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
            
            <div className="mt-4">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
                    onClick={() => navigate('/results')}
                >
                    View Results
                </button>
                <button
                    className="bg-blue-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                    onClick={resetExam}
                >
                    Retake Exam
                </button>
            </div>
            <InstallPromptComponent/>
        </div>
    );
};

export default ExamReport;
