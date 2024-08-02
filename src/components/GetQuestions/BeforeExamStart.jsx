import React from 'react';
import Slider from '@mui/material/Slider'; // Import Slider from Material-UI

function valuetext(value) {
    return `${value} minutes`;
}
const BeforeExamStart = ({
    totalQuestions,
    selectedCategory,
    selectedSubcategory,
    onCategoryChange,
    onSubcategoryChange,
    onTotalQuestionsChange,
    onStartExam,
    subcategories,
    examTime, // Add examTime to props
    onTimeChange, // Add handler for time change
}) => {
    return (
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-4">Start Exam</h2>

            <div className="mb-4">
                <label htmlFor="totalQuestions" className="block text-lg font-semibold text-gray-700 dark:text-white mb-2">
                    Number of Questions:
                </label>
                <select
                    id="totalQuestions"
                    name="totalQuestions"
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-gray-900"
                    value={totalQuestions}
                    onChange={onTotalQuestionsChange} // Add this line
                >
                    <option value="1">1</option>
                    <option value="10" defaultChecked>10</option>
                    <option value="20">20</option>
                    <option value="40">40</option>
                    <option value="80">80</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="category" className="block text-lg font-semibold text-gray-700 dark:text-white mb-2">
                    Choose Exam Category:
                </label>
                <select
                    id="category"
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-gray-900"
                    value={selectedCategory}
                    onChange={onCategoryChange} // Add this line
                >
                    <option value="">Select Category</option>
                    <option value="Aptitude">Aptitude</option>
                    <option value="Reasoning">Reasoning</option>
                    <option value="Campus Placement">Campus Placement</option>
                    <option value="JECA">JECA Exam</option>
                </select>
            </div>

            {selectedCategory && (
                <div className="mb-4">
                    <label htmlFor="subcategory" className="block text-lg font-semibold text-gray-700 dark:text-white mb-2">
                        Choose Subcategory:
                    </label>
                    <select
                        id="subcategory"
                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-gray-900"
                        value={selectedSubcategory}
                        onChange={onSubcategoryChange} // Add this line
                    >
                        {subcategories[selectedCategory].map((subcategory) => (
                            <option key={subcategory} value={subcategory}>
                                {subcategory}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="mb-4">
                <label className="block text-lg font-semibold text-gray-700 dark:text-white mb-2">
                    Total Time (Minutes):
                </label>
                <Slider
                    aria-label="Exam Time"
                    value={examTime} // Bind slider to examTime
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={10}
                    min={10}
                    max={100}
                    onChange={onTimeChange} // Add this line
                />
            </div>

            <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
                onClick={onStartExam}
                disabled={!selectedCategory} // Disable button if category is not selected
            >
                Start Exam
            </button>
        </div>
    );
};

export default BeforeExamStart;
