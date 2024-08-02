import React, {useEffect} from 'react';
import Question from '../Question';
import Timer from './Timer';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';

const DuringExam = ({
    questions,
    currentQuestionIndex,
    userAnswers,
    handleAnswerSelection,
    handleNextClick,
    handlePreviousClick,
    handleSubmitClick,
    loading,
    limitExhaust,
    formatTime,
    timeLeft
}) => {

    const progress = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            // Customize your condition and message here
            const message = 'You have unsaved changes. Are you sure you want to leave?';
            event.returnValue = message; // Standard way to show the dialog
            return message; // For some browsers
        };

        // Attach the event listener
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // console.log("handleNextClick:", handleNextClick); // Added this line to check if function is received
    return (
        <div className="max-w-lg mx-auto bg-white text-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            {limitExhaust && (
                <>
                    <p className='text-red-900 font-bold dark:text-red-300'>
                        Daily limit exhausted!! Please upgrade to premium plan.
                        <span className='text-gray-500 '> Or wait for tomorrow 🙂</span>
                    </p>
                    <Link to="/subscription">
                        <span className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md border border-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
                            Check out our premium pricing
                        </span>
                    </Link>
                </>
            )}
            {questions.length === 0 ? (
                loading && (
                    <div className="py-4">
                        <Skeleton height={40} />
                        <Skeleton height={10} width={200} style={{ marginTop: '8px' }} />
                        <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
                        <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
                        <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
                        <Skeleton height={10} width={40} style={{ marginTop: '4px' }} />
                    </div>
                )
            ) : (
                <div className="relative mb-4  text-black dark:text-white">
                    <Timer timeLeft={timeLeft} formatTime={formatTime} />
                    <div className="absolute top-0 right-0 mt-2 mr-2 cursor-help	  ">
                            <CircularProgressWithLabel value={progress} />
                        </div>
                        <br />
                    <Question
                        question={questions[currentQuestionIndex]}
                        userAnswer={userAnswers[currentQuestionIndex]}
                        handleOptionChange={handleAnswerSelection}
                    />
                    <div className="mt-4 flex justify-around">
                        {
                            currentQuestionIndex != 0 ? <button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                            onClick={handlePreviousClick}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button> :<button
                            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md cursor-no-drop	"
                            onClick={handlePreviousClick}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>
                        }
                        {/* <button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                            onClick={handlePreviousClick}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button> */}
                        {currentQuestionIndex < questions.length - 1 ? (
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
                                onClick={handleNextClick}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mr-2"
                                onClick={handleSubmitClick}
                            >
                                Submit Exam
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DuringExam;
