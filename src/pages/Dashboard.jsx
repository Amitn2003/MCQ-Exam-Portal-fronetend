import React, { useEffect, useState } from 'react';
import { getUserAnalytics } from '../api/analyticsApi';
import { getUserExamAttemptsByDate } from '../api/examApi';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAuth } from '../hooks/useAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LineChart, Line } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';





const Dashboard = () => {
  const [analytics, setAnalytics] = useState([]);
  const { user } = useAuth();
  const [examAttempts, setExamAttempts] = useState({});

  useEffect(() => {
    const fetchExamAttempts = async () => {
      try {
        const data = await getUserExamAttemptsByDate(user._id, user.token);
        console.log("Fetch exam attempts ",data)
        setExamAttempts(data);
      } catch (error) {
        toast.error('Failed to fetch exam attempts');
      }
    };
    const fetchAnalytics = async () => {
      try {
        toast('Please wait!', {
          icon: '👏',
        });
        const data = await getUserAnalytics(user.token);
        // console.log(data)
        setAnalytics(data);
      } catch (error) {
        toast.error('Failed to load data');
        console.error('Failed to fetch analytics data');
      }
    };

    fetchAnalytics();
    fetchExamAttempts();
  }, [user.token]);

  function getYesterdayDate(dateString) {
    const currentDate = new Date(dateString);
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() +1); // Subtract 1 day
    return previousDate.toISOString().split('T')[0];
}
  
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      
      // console.log(typeof dateString)
      const yesterdayDate = getYesterdayDate(dateString);
      
      return examAttempts[yesterdayDate] ? 'bg-green-400 rounded-full text-white' : 'bg-gray-200';
    }
  };




  const formatDate = (dateStr) => {
    // Assuming dateStr is in ISO format, e.g., "2024-07-16T00:00:00.000Z"
    const date = new Date(dateStr);
    return date.toLocaleDateString(); // Format date as per browser's locale
  };

  return (
    <>

      <div className='w-full h-full text-blue-800 mb-4 dark:text-white '>
        <div className="px-4 py-8 bg-white dark:bg-gray-800 dark:text-white">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 dark:text-white">Exam Performance Analytics</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <BarChart
                  width={600}
                  height={300}
                  data={analytics}
                  margin={{ top: 20, right: 20, left: 0, bottom: 5 }} // Adjusted margin for better responsiveness
                  style={{ minWidth: '100%' }} // Ensures the chart fills the container
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="examDate" tickFormatter={formatDate} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="scorePercentage" fill="#8884d8" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-8 bg-white dark:bg-slate-900">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Exam Performance Analytics</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 overflow-x-auto">
            <div className="inline-block min-w-full">
              <LineChart
                width={600}
                height={300}
                data={analytics}
                margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="examDate" tickFormatter={formatDate} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="scorePercentage" stroke="#8884d8" />
              </LineChart>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white text-black dark:bg-gray-800 rounded-lg shadow-md p-4 overflow-x-auto'>
        
      <Calendar tileClassName={tileClassName} />
      </div>

    </>

  );
};

export default Dashboard;
