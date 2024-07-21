import { useState } from 'react';
import { addQuestion } from '../api/questionApi';
import { useAuth } from '../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';

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
            let addQsResponce = await addQuestion(questionData, user.token);
            console.log(addQsResponce)
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

    // <div>
    //     <h2>Add Question</h2>
    //     <form onSubmit={handleSubmit}>
    //         <div>
    //             <label>Category</label>
    //             <input
    //                 type="text"
    //                 value={category}
    //                 onChange={(e) => setCategory(e.target.value)}
    //             />
    //         </div>
    //         <div>
    //             <label>Question</label>
    //             <input
    //                 type="text"
    //                 value={question}
    //                 onChange={(e) => setQuestion(e.target.value)}
    //             />
    //         </div>
    //         {options.map((option, index) => (
    //             <div key={index}>
    //                 <label>Option {index + 1}</label>
    //                 <input
    //                     type="text"
    //                     value={option}
    //                     onChange={(e) => handleOptionChange(index, e.target.value)}
    //                 />
    //             </div>
    //         ))}
    //         <div>
    //             <label>Correct Answer (0-3)</label>
    //             <input
    //                 type="number"
    //                 value={correctAnswer}
    //                 onChange={(e) => setCorrectAnswer(e.target.value)}
    //             />
    //         </div>
    //         <div>
    //             <label>Explanation</label>
    //             <input
    //                 type="text"
    //                 value={explanation}
    //                 onChange={(e) => setExplanation(e.target.value)}
    //             />
    //         </div>
    //         <button type="submit">Add Question</button>
    //     </form>
    // </div>
    return (<div className="max-w-md mx-auto bg-white text-black dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-6 my-4">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Add Question</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <input
                    id="category"
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block w-full mt-1 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Question</label>
                <input
                    id="question"
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="block w-full mt-1 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            {options.map((option, index) => (
                <div key={index}>
                    <label htmlFor={`option-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Option {index + 1}</label>
                    <input
                        id={`option-${index}`}
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="block w-full mt-1 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            ))}
            <div>
                <label htmlFor="correctAnswer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Correct Answer (0-3)</label>
                <input
                    id="correctAnswer"
                    type="number"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    className="block w-full mt-1 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Explanation</label>
                <input
                    id="explanation"
                    type="text"
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    className="block w-full mt-1 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-700 dark:hover:bg-indigo-600 dark:text-white m-auto"
                >
                    Add Question
                </button>
            </div>
        </form>
    </div>
    
    );
};

export default AddQuestion;
