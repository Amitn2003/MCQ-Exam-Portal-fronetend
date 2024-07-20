import React, { useEffect } from 'react';
import useExam from '../hooks/useExam';
import Question from '../components/Question';
import { Navigate } from 'react-router-dom';

const Exam = () => {
    const { questions, currentQuestionIndex, submitAnswer, completed, score, resetExam } = useExam();
    // const history = useHistory();
    const answers = []
    
    const handleSubmitAnswer = (questionId, selectedAnswer) => {
        answers.push({ question: questionId, selectedAnswer });
        submitAnswer(selectedAnswer); // Submit the selected answer to the exam logic
    };

    useEffect(() => {
        if (completed) {
            console.log("Answers: ", answers)
            // return <Navigate to="/dashboard" />
        }
    }, [completed,  score, questions.length]);


    if (questions.length === 0) return <div>Loading...</div>;

    return (
        <div>
            <h2>Exam</h2>
            {!completed && questions[currentQuestionIndex] && (
                <Question
                    question={questions[currentQuestionIndex]}
                    onSubmit={submitAnswer}
                />
            )}
            {completed && (
                <div>
                    <h3>Exam Completed!</h3>
                    <p>Your score: {score} / {questions.length}</p>
                    <button onClick={resetExam}>Retry</button>
                </div>
            )}
        </div>
    );
};

export default Exam;
