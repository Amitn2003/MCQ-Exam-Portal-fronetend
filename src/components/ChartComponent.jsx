import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 
import { getAverageTimePerQuestion } from '../api/examResultApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);




const AverageTimeChart = () => {
    const { user } = useAuth();
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const chartRef = useRef(null);



    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getAverageTimePerQuestion(user.token);
          // Prepare chart data
          setLoading(true)
          const labels = data.map((item) => new Date(item.createdAt).toLocaleDateString());
          const averageTimes = data.map((item) => item.averageTime);
          const scores = data.map((item) => item.score);
  
          setChartData({
            labels,
            datasets: [
              {
                label: 'Average Time per Question (seconds)',
                data: averageTimes,
                backgroundColor: '#4A90E2',
              },
              {
                label: 'Marks',
                data: scores,
                backgroundColor: '#FF6F61',
              },
            ],
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }finally {
          setLoading(false); // Set loading to false after fetching data
      }
      };
  
      fetchData();
    }, [user.token]);






  



    return (
      <div className="w-full h-full relative">
      {loading ? (
                    <Skeleton height={400} /> 
                ) : (
                    chartData && (
                        <div className="w-full h-full">
                            <Bar
                                data={chartData}
                                options={{
                                    maintainAspectRatio: false,
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display: true,
                                        },
                                    },
                                    scales: {
                                        x: {
                                            beginAtZero: true,
                                        },
                                        y: {
                                            beginAtZero: true,
                                        },
                                    },
                                }}
                                className="w-full h-full"
                            />
                        </div>
                    )
                )}
    </div>
    );
};

export default AverageTimeChart;
