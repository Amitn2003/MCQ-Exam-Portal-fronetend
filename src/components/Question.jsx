import { useState } from 'react';
import { Container, Typography, Radio, RadioGroup, FormControlLabel, Button, FormControl, FormLabel } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const Question = ({ question, userAnswer, handleOptionChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  // const onAnswerSelection = (event) => {
  //   const selectedIndex = parseInt(event.target.value, 10);
  //   onAnswerSelection(selectedIndex); // Notify parent of the selection
  // };

  // Handle the change event of the radio button
  const onOptionChange = (event) => {
    const selectedIndex = parseInt(event.target.value, 10);
    handleOptionChange(selectedIndex); // Notify parent of the selection
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit(question._id, selectedOption);
  // };

  // <div>
  //     <h3>{question.question}</h3>
  //     <form onSubmit={handleSubmit}>
  //         {question.options.map((option, index) => (
  //             <div key={index}>
  //                 <label>
  //                     <input
  //                         type="radio"
  //                         name="option"
  //                         value={index}
  //                         onChange={() => handleOptionChange(index)}
  //                     />
  //                     {option}
  //                 </label>
  //             </div>
  //         ))}
  //         <button type="submit">Submit</button>
  //     </form>
  // </div>
  // <div>
  //   <h3>{question.question}</h3>
  //   <form onSubmit={handleSubmit}>
  //     {question.options.map((option, index) => (
  //       <div key={index}>
  //         <label>
  //           <input
  //             type="radio"
  //             name="option"
  //             value={index}
  //             onChange={() => handleOptionChange(index)}
  //           />
  //           {option}
  //         </label>
  //       </div>
  //     ))}
  //     {/* <button type="submit">Submit</button> */}
  //   </form>
  // </div>
  // <pre className="text-gray-600 dark:text-white font-sans whitespace-pre-wrap">{questions[currentQuestionIndex].question}</pre>

  //                                     <p className="text-sm text-gray-400 dark:text-gray-200">Category: {questions[currentQuestionIndex].category}</p>
  //                                     <span className="text-sm text-gray-300 dark:text-gray-500">{questions[currentQuestionIndex].subcategory}</span>
  return (
    <div>
      {/* <Typography variant="pre" gutterBottom>
      <pre>{question.question}</pre></Typography>
      <br /> */}


<pre className="text-gray-600 dark:text-white font-sans whitespace-pre-wrap text-xl">{question.question}</pre>
<p className="text-sm text-gray-400 dark:text-gray-200">Category: {question.category}</p>
  <span className="text-sm text-gray-300 dark:text-gray-500">{question.subcategory}</span>
  {/* <span className="text-sm text-gray-300 dark:text-gray-500">{question.topic}</span> */}
{
  question.topic ? <span className="text-sm text-gray-200 dark:text-gray-600">({question.topic})</span> : ""
}
<br />
      <FormControl component="fieldset" variant="standard">
        {/* <FormLabel component="legend">Options</FormLabel> */}
        <RadioGroup
          value={userAnswer !== null ? userAnswer : ''}
          onChange={onOptionChange}
        >
          {question.options.map((option, index) => (
            <FormControlLabel
            className='p-1 m-1 '
              key={index}
              value={index}
              control={<Radio />}
              label={<span className="text-md" >{option}</span>} 
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Question;
