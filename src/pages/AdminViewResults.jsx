import React, { useEffect, useState } from 'react';
import { getAllUsersResults } from '../api/examApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import ExamResults from '../components/ExamResults';
const AdminViewResults = () => {
    const { user } = useAuth();
    const [results, setResults] = useState([]);
    const [calculatedResults, setCalculatedResults] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    const [expandedResultId, setExpandedResultId] = useState(null);
    const [examData, setExamData] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await getAllUsersResults(user.token);
                console.log(data)
                // const calculatedResults = data.map(result => calculateResultMetrics(result));
                setResults(data);
                setExamData(data)
                console.log(results)
                setLoading(false); // Set loading to false after data is fetched
                console.log(data)
            } catch (error) {
                toast.error('Failed to fetch results');
                console.log(error)
            }
        };

        fetchResults();
    }, [user.token]);

    const findQuestionById = (questions, questionId) => {
        return questions.find(q => q._id === questionId);
    };



    const calculateResultMetrics = (result) => {
        let score = 0;
        const totalQuestions = result.exam.questions.length;

        result.answers.forEach(answer => {
            const question = result.exam.questions.find(q => q._id === answer.question);
            if (question && answer.selectedAnswer === question.correctAnswer) {
                score += 1;
            }
        });

        const accuracy = (score / totalQuestions) * 100;
        return { ...result, score, totalQuestions, accuracy };
    };
    

    
    const toggleExpand = (resultId) => {
        setExpandedResultId(prevId => prevId === resultId ? null : resultId);
    };





    
    return ( <div>

        <ExamResults exams={examData}/>
    </div>
    );
};

export default AdminViewResults;
