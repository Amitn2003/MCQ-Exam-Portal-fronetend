import React, { useEffect, useState } from 'react';
import { getReportedQuestions, updateReportedQuestionStatus } from '../api/reportedQuestionApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

const ReportedQuestions = () => {
    const { user } = useAuth();
    const [reportedQuestions, setReportedQuestions] = useState([]);

    useEffect(() => {
        const fetchReportedQuestions = async () => {
            try {
                const data = await getReportedQuestions(user.token);
                setReportedQuestions(data);
            } catch (error) {
                toast.error('Failed to fetch reported questions');
            }
        };

        fetchReportedQuestions();
    }, [user.token]);

    const handleStatusChange = async (id, status) => {
        try {
            await updateReportedQuestionStatus(id, status, user.token);
            setReportedQuestions((prevQuestions) =>
                prevQuestions.map((q) => (q._id === id ? { ...q, status } : q))
            );
            toast.success('Status updated successfully');
        } catch (error) {
            toast.error('Failed to update status');
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
    return (
      <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Reported Questions</h2>
    {reportedQuestions.length === 0 ? (
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
                    </div>
                </li>
            ))}
        </ul>
    )}
</div>

    );
};

export default ReportedQuestions;
