import { useState } from 'react';
import { addQuestion } from '../api/questionApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

const AddQuestion = () => {
    const [category, setCategory] = useState('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [explanation, setExplanation] = useState('');
    const { user } = useAuth();

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const questionData = {
            category,
            question,
            options,
            correctAnswer: parseInt(correctAnswer, 10),
            explanation,
        };

        try {
            await addQuestion(questionData, user.token);
            toast.success('Question added successfully!');
            // Clear form after submission
            setCategory('');
            setQuestion('');
            setOptions(['', '', '', '']);
            setCorrectAnswer('');
            setExplanation('');
        } catch (error) {
            toast.error('Failed to add question');
        }
    };

    return (
        <div>
            <h2>Add Question</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div>
                    <label>Question</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>
                {options.map((option, index) => (
                    <div key={index}>
                        <label>Option {index + 1}</label>
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                    </div>
                ))}
                <div>
                    <label>Correct Answer (0-3)</label>
                    <input
                        type="number"
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                    />
                </div>
                <div>
                    <label>Explanation</label>
                    <input
                        type="text"
                        value={explanation}
                        onChange={(e) => setExplanation(e.target.value)}
                    />
                </div>
                <button type="submit">Add Question</button>
            </form>
        </div>
    );
};

export default AddQuestion;
