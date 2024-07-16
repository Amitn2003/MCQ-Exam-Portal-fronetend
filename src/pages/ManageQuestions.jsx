import React, { useEffect, useState } from 'react';
import { getQuestions, updateQuestion, deleteQuestion } from '../api/questionApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

const ManageQuestions = () => {
    const { user } = useAuth();
    const [questions, setQuestions] = useState([]);
    const [editingQuestion, setEditingQuestion] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getQuestions(user.token);
                console.log(data)
                setQuestions(data);
            } catch (error) {
                toast.error('Failed to fetch questions');
            }
        };

        fetchQuestions();
    }, []);

    const handleEdit = (question) => {
        setEditingQuestion({ ...question });
    };

    const handleUpdate = async () => {
        try {
            await updateQuestion(editingQuestion._id, editingQuestion, user.token);
            setQuestions((prevQuestions) =>
                prevQuestions.map((q) => (q._id === editingQuestion._id ? editingQuestion : q))
            );
            toast.success('Question updated successfully');
            setEditingQuestion(null);
        } catch (error) {
            toast.error('Failed to update question');
        }
    };

    const handleDelete = async (questionId) => {
        try {
            await deleteQuestion(questionId, user.token);
            setQuestions((prevQuestions) => prevQuestions.filter((q) => q._id !== questionId));
            toast.success('Question deleted successfully');
        } catch (error) {
            toast.error('Failed to delete question');
        }
    };

    return (
        <div>
            <h2>Manage Questions</h2>
            {questions.length === 0 ? (
                <p>No questions available</p>
            ) : (
                <ul>
                    {questions.map((question) => (
                        <li key={question._id}>
                            <h4>{question.question}</h4>
                            <p>Category: {question.category}</p>
                            <button onClick={() => handleEdit(question)}>Edit</button>
                            <button onClick={() => handleDelete(question._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            {editingQuestion && (
                <div>
                    <h3>Edit Question</h3>
                    <input
                        type="text"
                        value={editingQuestion.question}
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editingQuestion.category}
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, category: e.target.value })}
                    />
                    <textarea
                        value={editingQuestion.explanation}
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                    />
                    {editingQuestion.options.map((option, index) => (
                        <input
                            key={index}
                            type="text"
                            value={option}
                            onChange={(e) => {
                                const newOptions = [...editingQuestion.options];
                                newOptions[index] = e.target.value;
                                setEditingQuestion({ ...editingQuestion, options: newOptions });
                            }}
                        />
                    ))}
                    <button onClick={handleUpdate}>Update Question</button>
                    <button onClick={() => setEditingQuestion(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ManageQuestions;
