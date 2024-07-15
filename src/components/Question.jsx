import { useState } from 'react';

const Question = ({ question, onSubmit }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (index) => {
        setSelectedOption(index);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(selectedOption);
    };

    return (
        <div>
            <h3>{question.question}</h3>
            <form onSubmit={handleSubmit}>
                {question.options.map((option, index) => (
                    <div key={index}>
                        <label>
                            <input
                                type="radio"
                                name="option"
                                value={index}
                                onChange={() => handleOptionChange(index)}
                            />
                            {option}
                        </label>
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Question;
