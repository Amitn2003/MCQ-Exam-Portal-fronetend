import React, { useEffect, useState } from 'react';
import { getAvailableExams } from '../api/examApi';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AvailableExams = () => {
    const { user } = useAuth();
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const data = await getAvailableExams(user.token);
                setExams(data);
            } catch (error) {
                toast.error('Failed to fetch exams');
            }
        };

        fetchExams();
    }, [user.token]);

    const handleStartExam = (examId) => {
        navigate(`/exam/${examId}`);
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-800 p-4 bg-gray-200">Available Exams</h2>
            <ul className="p-4">
                {exams.map((exam) => (
                    <li key={exam._id} className="mb-2 text-gray-700">
                        <h3 className="text-xl font-bold">{exam.title}</h3>
                        <p>Category: {exam.category}</p>
                        <p>Due Date: {new Date(exam.dueDate).toLocaleString()}</p>
                        <button
                            onClick={() => handleStartExam(exam._id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-2"
                        >
                            Start Exam
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AvailableExams;
