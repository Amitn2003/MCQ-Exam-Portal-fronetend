import React, { useEffect, useState } from 'react';
import { getReportedQuestions, updateReportedQuestion , deleteReportedQuestion } from '../api/reportedQuestionApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'



const ReportedQuestions = () => {
    const { user } = useAuth();
    const [reportedQuestions, setReportedQuestions] = useState([]);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [loading , setLoading] = useState(true)

    useEffect(() => {
        const fetchReportedQuestions = async () => {
            console.log("Fetching ")
            try {
                const data = await getReportedQuestions(user.token);
                setReportedQuestions(data);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch reported questions');
                setLoading(false);
            }
        };

        fetchReportedQuestions();
    }, [user.token]);

    const handleStatusChange = async (id, status) => {
        try {
            const updatedQuestion = await updateReportedQuestion(id, { status }, user.token);
            setReportedQuestions((prevQuestions) =>
                prevQuestions.map((q) => (q._id === id ? updatedQuestion : q))
            );
            toast.success('Status updated successfully');
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        console.log("deleting")
        try {
            await deleteReportedQuestion(id, user.token);
            setReportedQuestions((prevQuestions) => prevQuestions.filter((q) => q._id !== id));
            toast.success('Reported question deleted successfully');
        } catch (error) {
            toast.error('Failed to delete reported question');
        }
    };

    const handleEdit = (question) => {
        console.log("editing")
        setEditingQuestion({ ...question });
    };
    const handleUpdate = async () => {
        try {
            const updatedQuestion = await updateReportedQuestion(editingQuestion._id, {
                status: editingQuestion.status,
                question: editingQuestion.question.question,
                options: editingQuestion.question.options,
                correctAnswer: editingQuestion.question.correctAnswer,
                explanation: editingQuestion.question.explanation,
            }, user.token);

            setReportedQuestions((prevQuestions) =>
                prevQuestions.map((q) => (q._id === updatedQuestion._id ? updatedQuestion : q))
            );
            toast.success('Reported question updated successfully');
            setEditingQuestion(null);
        } catch (error) {
            toast.error('Failed to update reported question');
        }
    };



    // <div>
    //     <h2>Reported Questions</h2>
    //     {reportedQuestions.length === 0 ? (
    //         <p>No reported questions</p>
    //     ) : (
    //         <ul>
    //             {reportedQuestions.map((reportedQuestion) => (
    //                 <li key={reportedQuestion._id}>
    //                     <h4>{reportedQuestion.question.question}</h4>
    //                     <p>Reported by: {reportedQuestion.user.name} ({reportedQuestion.user.email})</p>
    //                     <p>Reason: {reportedQuestion.reason}</p>
    //                     <p>Status: {reportedQuestion.status}</p>
    //                     <button
    //                         onClick={() => handleStatusChange(reportedQuestion._id, 'resolved')}
    //                         disabled={reportedQuestion.status === 'resolved'}
    //                     >
    //                         Mark as Resolved
    //                     </button>
    //                     <button
    //                         onClick={() => handleStatusChange(reportedQuestion._id, 'pending')}
    //                         disabled={reportedQuestion.status === 'pending'}
    //                     >
    //                         Mark as Pending
    //                     </button>
    //                 </li>
    //             ))}
    //         </ul>
    //     )}
    // </div>
    //       <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
    //     <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Reported Questions</h2>
    //     {reportedQuestions.length === 0 ? (
    //         <p className="text-gray-600 dark:text-gray-400">No reported questions</p>
    //     ) : (
    //         <ul className="divide-y divide-gray-300 dark:divide-gray-700">
    //             {reportedQuestions.map((reportedQuestion) => (
    //                 <li key={reportedQuestion._id} className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between">
    //                     <div className="md:w-3/4">
    //                         <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{reportedQuestion.question.question}</h4>
    //                         <p className="text-gray-600 dark:text-gray-400">Reported by: {reportedQuestion.user.name} ({reportedQuestion.user.email})</p>
    //                         <p className="text-gray-600 dark:text-gray-400">Reason: {reportedQuestion.reason}</p>
    //                         <p className={`text-gray-600 dark:text-gray-400 ${reportedQuestion.status === 'resolved' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>Status: {reportedQuestion.status}</p>
    //                     </div>
    //                     <div className="flex mt-2 md:mt-0 space-x-2">
    //                         <button
    //                             onClick={() => handleStatusChange(reportedQuestion._id, 'resolved')}
    //                             className={`px-3 py-1 rounded-md text-sm font-semibold text-white ${reportedQuestion.status === 'resolved' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'} dark:bg-gray-700 dark:hover:bg-gray-600`}
    //                             disabled={reportedQuestion.status === 'resolved'}
    //                         >
    //                             Mark as Resolved
    //                         </button>
    //                         <button
    //                             onClick={() => handleStatusChange(reportedQuestion._id, 'pending')}
    //                             className={`px-3 py-1 rounded-md text-sm font-semibold text-white ${reportedQuestion.status === 'pending' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'} dark:bg-gray-700 dark:hover:bg-gray-600`}
    //                             disabled={reportedQuestion.status === 'pending'}
    //                         >
    //                             Mark as Pending
    //                         </button>
    //                     </div>
    //                 </li>
    //             ))}
    //         </ul>
    //     )}
    // </div>
    //     <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
    //     <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Reported Questions</h2>
    //     {reportedQuestions.length === 0 ? (
    //         <p className="text-gray-600 dark:text-gray-400">No reported questions</p>
    //     ) : (
    //         <ul className="divide-y divide-gray-300 dark:divide-gray-700">
    //             {reportedQuestions.map((reportedQuestion) => (
    //                 <li key={reportedQuestion._id} className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between">
    //                     <div className="md:w-3/4">
    //                         <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{reportedQuestion.question.question}</h4>
    //                         <p className="text-gray-600 dark:text-gray-400">Reported by: {reportedQuestion.user.name} ({reportedQuestion.user.email})</p>
    //                         <p className="text-gray-600 dark:text-gray-400">Reason: {reportedQuestion.reason}</p>
    //                         <p className={`text-gray-600 dark:text-gray-400 ${reportedQuestion.status === 'resolved' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>Status: {reportedQuestion.status}</p>
    //                     </div>
    //                     <div className="flex mt-2 md:mt-0 space-x-2">
    //                         <button
    //                             onClick={() => handleEdit(reportedQuestion)}
    //                             className="px-3 py-1 rounded-md text-sm font-semibold text-white bg-yellow-500 hover:bg-yellow-600"
    //                         >
    //                             Edit
    //                         </button>
    //                         <button
    //                             onClick={() => handleStatusChange(reportedQuestion._id, 'resolved')}
    //                             className={`px-3 py-1 rounded-md text-sm font-semibold text-white ${reportedQuestion.status === 'resolved' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'} dark:bg-gray-700 dark:hover:bg-gray-600`}
    //                             disabled={reportedQuestion.status === 'resolved'}
    //                         >
    //                             Mark as Resolved
    //                         </button>
    //                         <button
    //                             onClick={() => handleStatusChange(reportedQuestion._id, 'pending')}
    //                             className={`px-3 py-1 rounded-md text-sm font-semibold text-white ${reportedQuestion.status === 'pending' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'} dark:bg-gray-700 dark:hover:bg-gray-600`}
    //                             disabled={reportedQuestion.status === 'pending'}
    //                         >
    //                             Mark as Pending
    //                         </button>
    //                         <button
    //                             onClick={() => handleDelete(reportedQuestion._id)}
    //                             className="px-3 py-1 rounded-md text-sm font-semibold text-white bg-red-500 hover:bg-red-600"
    //                         >
    //                             Delete
    //                         </button>
    //                     </div>
    //                 </li>
    //             ))}
    //         </ul>
    //     )}
    //     {editingQuestion && (
    //         <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
    //             <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Edit Reported Question</h3>
    //             <textarea
    //                 className="w-full p-2 mb-2 border border-gray-300 rounded-md dark:border-gray-700"
    //                 value={editingQuestion.reason}
    //                 onChange={(e) => setEditingQuestion({ ...editingQuestion, reason: e.target.value })}
    //             />
    //             <div className="flex space-x-2">
    //                 <button
    //                     onClick={handleUpdate}
    //                     className="px-3 py-1 rounded-md text-sm font-semibold text-white bg-green-500 hover:bg-green-600"
    //                 >
    //                     Update
    //                 </button>
    //                 <button
    //                     onClick={() => setEditingQuestion(null)}
    //                     className="px-3 py-1 rounded-md text-sm font-semibold text-white bg-gray-500 hover:bg-gray-600"
    //                 >
    //                     Cancel
    //                 </button>
    //             </div>
    //         </div>
    //     )}
    // </div>
    return (
        <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Reported Questions</h2>
        {
            loading ? (
                <ul className="divide-y divide-gray-300 dark:divide-gray-600">
                    {/* Render 5 skeleton items */}
                    {[1, 2, 3, 4, 5 ,6].map((index) => (
                        <li key={index} className="py-4">
                            <Skeleton height={30}  />
                            <Skeleton height={10} width={200}  style={{ marginTop: '8px' }} />
                            <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
                            <Skeleton height={10} width={150} style={{ marginTop: '4px' }} />
                        </li>
                    ))}
                </ul>
            ) :
        
        reportedQuestions.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No reported questions</p>
        ) : (
            <ul className="divide-y divide-gray-300 dark:divide-gray-700">
                {reportedQuestions.map((reportedQuestion) => (
                    <li key={reportedQuestion._id} className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div className="md:w-3/4">
                            <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{reportedQuestion.question.question}</h4>
                            <p className="text-gray-600 dark:text-gray-400">Reported by: {reportedQuestion.user.name} ({reportedQuestion.user.email})</p>
                            <p className="text-gray-600 dark:text-gray-400">Reason: {reportedQuestion.reason}</p>
                            <p className={`text-gray-600 dark:text-gray-400 ${reportedQuestion.status === 'resolved' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>Status: {reportedQuestion.status}</p>
                        </div>
                        <div className="flex mt-2 md:mt-0 space-x-2">
                            <button
                                onClick={() => handleEdit(reportedQuestion)}
                                className="px-3 py-1 rounded-md text-sm font-semibold text-white bg-yellow-500 hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleStatusChange(reportedQuestion._id, 'resolved')}
                                className={`px-3 py-1 rounded-md text-sm font-semibold text-white ${reportedQuestion.status === 'resolved' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'} dark:bg-gray-700 dark:hover:bg-gray-600`}
                                disabled={reportedQuestion.status === 'resolved'}
                            >
                                Mark as Resolved
                            </button>
                            <button
                                onClick={() => handleStatusChange(reportedQuestion._id, 'pending')}
                                className={`px-3 py-1 rounded-md text-sm font-semibold text-white ${reportedQuestion.status === 'pending' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'} dark:bg-gray-700 dark:hover:bg-gray-600`}
                                disabled={reportedQuestion.status === 'pending'}
                            >
                                Mark as Pending
                            </button>
                            <button
                                onClick={() => handleDelete(reportedQuestion._id)}
                                className="px-3 py-1 rounded-md text-sm font-semibold text-white bg-red-500 hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        )}
        {editingQuestion && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Edit Reported Question</h3>
                <textarea
                    className="w-full p-2 mb-2 border border-gray-300 rounded-md dark:border-gray-700"
                    value={editingQuestion.reason}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, reason: e.target.value })}
                />
                <input
                    type="text"
                    className="w-full p-2 mb-2 border border-gray-300 rounded-md dark:border-gray-700"
                    value={editingQuestion.question.question}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, question: { ...editingQuestion.question, question: e.target.value } })}
                />
                {editingQuestion.question.options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        className="w-full p-2 mb-2 border border-gray-300 rounded-md dark:border-gray-700"
                        value={option}
                        onChange={(e) => {
                            const newOptions = [...editingQuestion.question.options];
                            newOptions[index] = e.target.value;
                            setEditingQuestion({ ...editingQuestion, question: { ...editingQuestion.question, options: newOptions } });
                        }}
                    />
                ))}
                <input
                    type="text"
                    className="w-full p-2 mb-2 border border-gray-300 rounded-md dark:border-gray-700"
                    value={editingQuestion.question.correctAnswer}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, question: { ...editingQuestion.question, correctAnswer: e.target.value } })}
                />
                <textarea
                    className="w-full p-2 mb-2 border border-gray-300 rounded-md dark:border-gray-700"
                    value={editingQuestion.question.explanation}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, question: { ...editingQuestion.question, explanation: e.target.value } })}
                />
                <div className="flex space-x-2">
                    <button
                        onClick={handleUpdate}
                        className="px-3 py-1 rounded-md text-sm font-semibold text-white bg-green-500 hover:bg-green-600"
                    >
                        Update
                    </button>
                    <button
                        onClick={() => setEditingQuestion(null)}
                        className="px-3 py-1 rounded-md text-sm font-semibold text-white bg-gray-500 hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        )}
    </div>
    );
};

export default ReportedQuestions;
