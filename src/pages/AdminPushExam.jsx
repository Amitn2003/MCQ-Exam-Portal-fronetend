import React, { useState, useEffect } from 'react';
import { getQuestionsByCategory } from '../api/questionApi';
import { createExam } from '../api/examApi';
import { useAuth } from '../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';

const AdminPushExam = () => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [dueDate, setDueDate] = useState('');
    // const [selectedCategory, setSelectedCategory] = useState('')
    useEffect(() => {
        const fetchQuestions = async () => {
            if (category) {
                try {
                    const data = await getQuestionsByCategory(category, user.token, 100);
                    setQuestions(data);
                } catch (error) {
                    toast.error('Failed to fetch questions');
                }
            }
        };

        fetchQuestions();
    }, [category, user.token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const examData = {
            title,
            category,
            questions: selectedQuestions,
            dueDate,
        };
        try {
            await createExam(examData, user.token);
            toast.success('Exam created successfully');
            setTitle('');
            setCategory('');
            setSelectedQuestions([]);
            setDueDate('');
        } catch (error) {
            toast.error('Failed to create exam');
        }
    };


    // const handleCategoryChange = (event) => {
    //     setSelectedCategory(event.target.value);
    // };


    const handleQuestionSelection = (questionId) => {
        setSelectedQuestions((prevSelected) => {
            if (prevSelected.includes(questionId)) {
                return prevSelected.filter((id) => id !== questionId);
            } else {
                return [...prevSelected, questionId];
            }
        });
    };

    // <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
    //     <h2 className="text-2xl font-bold text-gray-800 p-4 bg-gray-200">Create New Exam</h2>
    //     <form className="p-4" onSubmit={handleSubmit}>
    //         <div className="mb-4">
    //             <label className="block text-gray-700 font-bold mb-2">Title</label>
    //             <input
    //                 type="text"
    //                 value={title}
    //                 onChange={(e) => setTitle(e.target.value)}
    //                 className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
    //                 required
    //             />
    //         </div>
    //         <div className="mb-4">
    //             <label className="block text-gray-700 font-bold mb-2">Category</label>
    //             <input
    //                 type="text"
    //                 value={category}
    //                 onChange={(e) => setCategory(e.target.value)}
    //                 className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
    //                 required
    //             />
    //         </div>
    //         <select
    //                     id="category"
    //                     className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-gray-900"
    //                     value={category}
    //                     onChange={handleCategoryChange}
    //                 >
    //                     <option value="">Select Category</option>
    //                     <option value="Aptitude">Aptitude</option>
    //                     <option value="Reasoning">Reasoning</option>
    //                     <option value="Campus Placement">Campus Placement</option>
    //                     <option value="JECA">JECA Exam</option>
    //                 </select>
    //         <div className="mb-4">
    //             <label className="block text-gray-700 font-bold mb-2">Due Date</label>
    //             <input
    //                 type="datetime-local"
    //                 value={dueDate}
    //                 onChange={(e) => setDueDate(e.target.value)}
    //                 className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
    //                 required
    //             />
    //         </div>
    //         <span className='text-black'>{selectedQuestions.length}</span>
    //         <div className="mb-4">
    //             <label className="block text-gray-700 font-bold mb-2">Select Questions</label>
    //             <ul className="max-h-64 overflow-y-auto">
    //                 {questions.map((question) => (
    //                     <li key={question._id} className="mb-2">
    //                         <label className="flex items-center">
    //                             <input
    //                                 type="checkbox"
    //                                 checked={selectedQuestions.includes(question._id)}
    //                                 onChange={() => handleQuestionSelection(question._id)}
    //                                 className="mr-2 leading-tight"
    //                             />
    //                             <span className="text-gray-700">{question.question}</span>
    //                         </label>
    //                     </li>
    //                 ))}
    //             </ul>
    //         </div>
    //         <button
    //             type="submit"
    //             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
    //         >
    //             Create Exam
    //         </button>
    //     </form>
    // </div>
    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-800 p-4 bg-gray-200">Create New Exam</h2>
        <form className="p-4" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Category</label>
                <select
                    id="category"
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-gray-900"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="">Select Category</option>
                    <option value="Aptitude">Aptitude</option>
                    <option value="Reasoning">Reasoning</option>
                    <option value="Campus Placement">Campus Placement</option>
                    <option value="JECA">JECA Exam</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Due Date</label>
                <input
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Select Questions</label>
                <ul className="max-h-64 overflow-y-auto">
                    {questions.map((question) => (
                        <li key={question._id} className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedQuestions.includes(question._id)}
                                    onChange={() => handleQuestionSelection(question._id)}
                                    className="mr-2 leading-tight"
                                />
                                <span className="text-gray-700">{question.question}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            >
                Create Exam
            </button>
        </form>
    </div>
    );
};

export default AdminPushExam;
