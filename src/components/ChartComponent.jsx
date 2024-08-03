import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getAverageTimePerQuestion } from '../api/examResultApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);




const AverageTimeChart = () => {
  const { user } = useAuth();
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // Track the current page
  // const chartRef = useRef(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAverageTimePerQuestion(user.token, page);
        console.log("data ", data)
        setChartData(prepareChartData(data));
        console.log("Chart data", chartData)
        // const labels = data.map((item) => new Date(item.createdAt).toLocaleDateString());
        // const averageTimes = data.map((item) => item.averageTime);
        // const scores = data.map((item) => item.score);

        // setChartData({
        //   labels,
        //   datasets: [
        //     {
        //       label: 'Average Time per Question (seconds)',
        //       data: averageTimes,
        //       backgroundColor: '#4A90E2',
        //     },
        //     {
        //       label: 'Marks',
        //       data: scores,
        //       backgroundColor: '#FF6F61',
        //     },
        //   ],
        // });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, [user.token, page]);


  // Function to prepare chart data
  const prepareChartData = (data) => {
    // Map data to required format
    const labels = data.map((item) => {
      const date = new Date(item.createdAt);
      return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
    }).reverse();
    const averageTimes = data.map((item) => item.averageTime).reverse();
    const scores = data.map((item) => item.score).reverse();

    // Construct chart data object
    return {
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
    };
  };


  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 0)); // Ensure page doesn't go negative
  };

  const handleNextPage = async () => {
    // Temporarily increment the page to check if there's data available
    const nextPage = page + 1;
    try {
      // Fetch data for the next page
      const response = await getAverageTimePerQuestion(user.token, nextPage);

      // Check if there is any data for the next page
      if (response.length > 0) {
        setPage(nextPage);
        console.log("Page ", nextPage);
      } else {
        // No more data available, maybe disable the button or show a message
        toast('No more data available');
      }
    } catch (error) {
      console.error('Error fetching next page:', error);
      toast.error('Error fetching next page');
    }
  };







  return (
    <div className="w-full h-full relative px-2 bg-gray-300 dark:bg-gray-800">
      <div className="flex justify-between mb-4">
        <button onClick={handlePreviousPage} disabled={page === 0} className="px-4 py-2 bg-blue-500 text-white rounded">
          <ArrowBackIosIcon />
        </button>
        <button onClick={handleNextPage} className="px-4 py-2 bg-blue-500 text-white rounded">
          <ArrowForwardIosIcon />
        </button>
      </div>
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
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      drawOnChartArea: false,
                    },
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
