import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { getAverageTimePerQuestion } from '../api/examResultApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);




const AverageTimeChart = () => {
    const { user } = useAuth();
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAverageTimePerQuestion(user.token);
                // const chartLabels = data.map(result => new Date(result.createdAt).toLocaleDateString());
                // Format the date to "D MMM" (e.g., "1 Sep")
                const chartLabels = data.map(result => 
                    new Date(result.createdAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short'
                    })
                );
                const chartValues = data.map(result => result.averageTime);

                setChartData({
                    labels: chartLabels,
                    datasets: [
                        {
                            label: 'Average Time per Question (seconds)',
                            data: chartValues,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                    ],
                });
            } catch (error) {
                toast.error('Failed to fetch average time data');
            }
        };

        fetchData();
        return () => {
            // Clean up chart instance if it exists
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [user.token]);



    return (
        <div className="w-full max-w-4xl mx-auto p-4 text-black bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg shadow-lg">
            <div className="w-full h-80 md:h-96 lg:h-[500px]">
                <h2 className="text-2xl font-bold mb-4 ">Average Time Per Question</h2>
                {chartData ? ( <>
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
                                    beginAtZero: true
                                },
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        }}
                        className="w-full h-full p-8" // Ensure the chart takes up full container size
                    />


      </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default AverageTimeChart;
