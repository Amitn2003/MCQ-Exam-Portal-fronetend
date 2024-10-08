import React, { useState , useEffect} from 'react';
import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getUserAnalytics } from '../api/analyticsApi';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


const  AnalyticsCharts = ({user, formatDate}) => {
  const [analytics, setAnalytics] = useState([]);
  const [page, setPage] = useState(0); // Pagination state
  const [lastPage, setLastPage] = useState(false); 
  const [examBtn, setExamBtn] = useState(true);
  



  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserAnalytics(user.token, page);
        if (data.length === 0) {
          setLastPage(true); // Mark as last page if no data is returned
          setExamBtn(true);
        } else {
          setExamBtn(false)
          setAnalytics(data);
          setLastPage(false); // Reset last page flag when data is returned
        }
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } 
    };

    fetchData();
  }, [ page]);

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    } else {
      toast.error('You are already on the first page');
    }
  };

  const handleNextPage = () => {
    if (!lastPage) {
      setPage(page + 1);
    } else {
      toast.error('No more pages available');
    }
  };












  // if (loading) {
  //   return (
  //     <div className="px-2 py-8 bg-white dark:bg-slate-900 dark:text-white">
  //       <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
  //         <Skeleton width={250} />
  //       </h2>
        
  //       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-1 overflow-hidden">
  //         <div className="min-w-full" style={{ height: '300px' }}>
  //           <Skeleton height="100%" width="100%" />
  //         </div>
  //       </div>

        
  //     </div>
  //   );
  // }
  return (
    <div className="px-2 py-8 bg-white dark:bg-slate-900 dark:text-white">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Exam Performance Analytics</h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-1 overflow-hidden cursor-help">
      
        <div className="min-w-full cursor-help" style={{ height: '300px' }}>
          <ResponsiveContainer  width="100%">
            <BarChart
              data={analytics}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              barCategoryGap="20%"
              barGap={4}
            >
              <CartesianGrid strokeDasharray="5 8" />
              <XAxis dataKey="examDate" tickFormatter={formatDate} />
              <YAxis />
              <Tooltip
                content={({ payload, label }) => (
                  <div className="bg-white border border-gray-300 rounded-lg p-2 shadow-md">
                    <p className="font-bold">{label}</p>
                    {payload && payload.length > 0 && (
                      <>
                        <p className="text-gray-600">Percentage: {payload[0].value}%</p>
                      </>
                    )}
                  </div>
                )} />
              <Legend />
              <Bar dataKey="scorePercentage" fill="#4A90E2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
{/* 
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mt-8 overflow-hidden">
        <div className="min-w-full" style={{ height: '300px' }}>
          <ResponsiveContainer>
            <LineChart
              data={analytics}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="5 8" stroke="#2980b9" />
              <XAxis dataKey="examDate" tickFormatter={formatDate} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="scorePercentage" stroke="#2980b9" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
       */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={page === 0}
            className={`flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md transition-transform duration-300 transform ${page === 0 ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'}`}
          >
            <ArrowBackIosIcon />
            <span className="ml-2">Previous</span>
          </button>

          {
            (examBtn || page === 0) && 
            <Link
            to="/questions"
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:bg-green-600 transition-all duration-300 font-sans font-semibold tracking-wider transform hover:scale-105"
            >
            Start Exam
        </Link>
        }

          <button
            onClick={handleNextPage}
            disabled={lastPage}
            className={`flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md transition-transform duration-300 transform ${lastPage ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'}`}
          >
            <span className="mr-2">Next</span>
            <ArrowForwardIosIcon />
          </button>
        </div>
      <br />
      
    </div>
  );
};

export default AnalyticsCharts;
