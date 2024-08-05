// PieChart.js
import React , { useState, useEffect }  from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import { ClassNames } from '@emotion/react';

// Register components required for the Pie chart
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChartDetailedAnalysis = ({ data }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [unattempted, setUnattempted] = useState(0);

    // console.log(data)
    const { questions, userAnswers } = data;
    // console.log({ questions, userAnswers })
    // let correctAnswers, wrongAnswers, unattempted;

    useEffect(() => {
    if (questions != undefined && userAnswers != undefined) {
      setCorrectAnswers(questions.reduce((count, question, index) => {
        return count + (userAnswers[index] === question.correctAnswer ? 1 : 0);
      }, 0))
      setWrongAnswers(questions.reduce((count, question, index) => {
        return count + (userAnswers[index] !== -1 && userAnswers[index] !== question.correctAnswer ? 1 : 0);
      }, 0))
      setUnattempted(questions.reduce((count, question, index) => {
        return count + (userAnswers[index] === -1 ? 1 : 0);
      }, 0))
    }else {
      setCorrectAnswers(data.questions.filter(q => q.selectedAnswer === q.question.correctAnswer).length)
      
      setWrongAnswers(data.questions.filter(q => q.selectedAnswer !== -1 && q.selectedAnswer !== q.question.correctAnswer).length)
      setUnattempted(data.questions.filter(q => q.selectedAnswer === -1).length)
    }
  }, [data]); // Dependencies: recalculates if questions or userAnswers change

  // Count the number of correct, wrong, and unattempted answers
  console.log(correctAnswers, wrongAnswers, unattempted)
  const chartData = {
    labels: ['Correct', 'Wrong', 'Unattempted'],
    datasets: [
      {
        data: [correctAnswers, wrongAnswers, unattempted],
        backgroundColor: ['#4BB543', '#ED4337', '#3c697e'],
      },
    ],
  };

  return (
    <div  style={{ width: '300px', height: '300px', margin:'3rem' , cursor: 'help'} }>
      {/* <h2>Quiz Results</h2> */}
      <Pie data={chartData} />
    </div>
  );
};

export default PieChartDetailedAnalysis;