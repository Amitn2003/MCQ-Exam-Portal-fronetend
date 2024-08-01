import React, { useEffect, useState } from 'react';
import { getQuestionsSearch, addQuestion, updateQuestion, deleteQuestion } from '../api/questionApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';

const AdminQuestionManagement = () => {
    const { user } = useAuth();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('All');
    const [newQuestion, setNewQuestion] = useState({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        category: '',
        subcategory: '',
        explanation: ''
    });
    // Manage editing state
    const [editingQuestion, setEditingQuestion] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedSearchTerm.length > 2 || category || subcategory !== 'All') {
            fetchQuestions();
        } else {
            setQuestions([]); // Clear questions if search term is too short
        }
    }, [debouncedSearchTerm, category, subcategory]);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            // Handle empty category or subcategory values by passing null or undefined
            const fetchCategory = category === 'All' ? '' : category;
            const fetchSubcategory = subcategory === 'All' ? '' : subcategory;
            const data = await getQuestionsSearch(fetchCategory, fetchSubcategory, debouncedSearchTerm, user.token);
            console.log(data)
            setQuestions(data);
        } catch (error) {
            toast.error('Failed to fetch questions');
        } finally {
            setLoading(false);
        }
    };

    const handleAddQuestion = async () => {
        try {
            await addQuestion(newQuestion, user.token);
            fetchQuestions();
            toast.success('Question added successfully');
            setNewQuestion({ question: '', options: ['', '', '', ''], correctAnswer: 0, category: '', subcategory: '', explanation: '' });
        } catch (error) {
            toast.error('Failed to add question');
        }
    };

    const handleUpdateQuestion = async (id, updatedQuestion) => {
        try {
            await updateQuestion(id, updatedQuestion, user.token);
            fetchQuestions();
            toast.success('Question updated successfully');
            setEditingQuestion(null);
        } catch (error) {
            toast.error('Failed to update question');
        }
    };

    const handleDeleteQuestion = async (id) => {
        try {
            await deleteQuestion(id, user.token);
            fetchQuestions();
            toast.success('Question deleted successfully');
        } catch (error) {
            toast.error('Failed to delete question');
        }
    };

    const handleEditChange = (e, field) => {
        setEditingQuestion({
            ...editingQuestion,
            [field]: e.target.value
        });
    };

    const startEdit = (question) => {
        setEditingQuestion(question);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 text-black bg-gray-100 dark:bg-gray-800 dark:text-white ">
            <h2 className="text-2xl font-bold mb-4">Manage Questions</h2>

            <div className="filters mb-4">
                <input
                    type="text"
                    placeholder="Search by question"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded mb-2 text-black"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border border-gray-300 rounded mb-2 text-black"
                >
                    <option value="All">All Categories</option>
                    <option value="Aptitude">Aptitude</option>
                    <option value="Reasoning">Reasoning</option>
                    <option value="Campus Placement">Campus Placement</option>
                    <option value="JECA">JECA Exam</option>
                </select>

                {category && (
                    <select
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                        className="p-2 border border-gray-300 rounded mb-2 text-black"
                    >
                        <option value="All">All Subcategories</option>
                        {subcategoryOptions[category].map(sub => (
                            <option key={sub} value={sub}>{sub}</option>
                        ))}
                    </select>
                )}
            </div>

            <div className="question-list">
                {loading ? (
                    <Skeleton count={8} height={60}  />
                ) : (
                    questions.map(q => (
                        <div key={q._id} className="question-item p-4 mb-2 border border-gray-300 rounded shadow">
                            {editingQuestion && editingQuestion._id === q._id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editingQuestion.question}
                                        onChange={(e) => handleEditChange(e, 'question')}
                                        className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
                                    />
                                    {editingQuestion.options.map((option, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            value={option}
                                            onChange={(e) => {
                                                const options = [...editingQuestion.options];
                                                options[index] = e.target.value;
                                                setEditingQuestion({ ...editingQuestion, options });
                                            }}
                                            className="p-2 border border-gray-300 rounded mb-2 w-full  text-black"
                                        />
                                    ))}
                                    <input
                                        type="number"
                                        value={editingQuestion.correctAnswer}
                                        onChange={(e) => handleEditChange(e, 'correctAnswer')}
                                        className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
                                    />
                                    <input
                                        type="text"
                                        value={editingQuestion.category}
                                        onChange={(e) => handleEditChange(e, 'category')}
                                        className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
                                    />
                                    <input
                                        type="text"
                                        value={editingQuestion.subcategory}
                                        onChange={(e) => handleEditChange(e, 'subcategory')}
                                        className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
                                    />
                                    <textarea
                                     rows="5"  
                                        value={editingQuestion.explanation}
                                        onChange={(e) => handleEditChange(e, 'explanation')}
                                        className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
                                    />
                                    <button
                                        onClick={() => handleUpdateQuestion(editingQuestion._id, editingQuestion)}
                                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded mr-2"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingQuestion(null)}
                                        className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <p>{q.question}</p>
                                    <button
                                        onClick={() => startEdit(q)}
                                        className="text-blue-500 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteQuestion(q._id)}
                                        className="text-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div className="add-question mt-6">
                <h3 className="text-lg font-bold mb-2">Add New Question</h3>
                <input
                    type="text"
                    placeholder="Question"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
                />
                {newQuestion.options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                            const options = [...newQuestion.options];
                            options[index] = e.target.value;
                            setNewQuestion({ ...newQuestion, options });
                        }}
                        className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
                    />
                ))}
                <input
                    type="number"
                    placeholder="Correct Answer Index"
                    value={newQuestion.correctAnswer}
                    onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: Number(e.target.value) })}
                    className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={newQuestion.category}
                    onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                    className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
                />
                <input
                    type="text"
                    placeholder="Subcategory"
                    value={newQuestion.subcategory}
                    onChange={(e) => setNewQuestion({ ...newQuestion, subcategory: e.target.value })}
                    className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
                />
                <textarea
                    placeholder="Explanation"
                    value={newQuestion.explanation}
                    onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                    className="p-2 border border-gray-300 rounded mb-2 w-full text-black"
                />
                <button
                    onClick={handleAddQuestion}
                    className="bg-blue-500 hover:bg-blue-600  text-black  dark:text-white p-2 rounded"
                >
                    Add Question
                </button>
            </div>
        </div>
    );
};


const subcategoryOptions = {
    Aptitude: ['Average', 'Algebra', 'Profit and Loss', "LCM and HCF", "Work and Wages", "Pipes and Cisterns", "Time Speed Distance", "Trains, Boats and Streams", "Percentages", "Ratio Proportion and Partnership", "Age", 'All'],
    Reasoning: ['Logical', 'Verbal', 'Non-Verbal',
        "Fill in the Blanks", "Comprehension Passages", "Series: Missing Numbers", "Odd One Out", 'All'],
    'Campus Placement': ['All'],
    JECA: ['DSA', 'C', 'C++', 'OOPS', 'Networking', 'OS', 'Machine Learning', 'DBMS', 'Software Engineering', 'UNIX', "All"],
};

export default AdminQuestionManagement;
