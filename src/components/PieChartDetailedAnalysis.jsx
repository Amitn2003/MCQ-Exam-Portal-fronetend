// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { ClassNames } from '@emotion/react';

// Register components required for the Pie chart
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChartDetailedAnalysis = ({ data }) => {
    console.log(data)
  // Count the number of correct, wrong, and unattempted answers
  const correctAnswers = data.questions.filter(q => q.selectedAnswer === q.question.correctAnswer).length;
  const wrongAnswers = data.questions.filter(q => q.selectedAnswer !== -1 && q.selectedAnswer !== q.question.correctAnswer).length;
  const unattempted = data.questions.filter(q => q.selectedAnswer === -1).length;

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