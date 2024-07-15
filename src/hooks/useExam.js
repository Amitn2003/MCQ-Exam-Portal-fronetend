import { useState, useEffect } from 'react';
import { getQuestions } from '../api/questionApi';
import { toast } from 'react-toastify';

const useExam = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getQuestions();
                setQuestions(data);
            } catch (error) {
                toast.error('Failed to load questions');
            }
        };

        fetchQuestions();
    }, []);

    const submitAnswer = (selectedOption) => {
        const currentQuestion = questions[currentQuestionIndex];

        setAnswers([...answers, selectedOption]);

        if (selectedOption === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }

        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setCompleted(true);
        }
    };

    const resetExam = () => {
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setScore(0);
        setCompleted(false);
    };

    return {
        questions,
        currentQuestionIndex,
        answers,
        score,
        completed,
        submitAnswer,
        resetExam,
    };
};

export default useExam;
