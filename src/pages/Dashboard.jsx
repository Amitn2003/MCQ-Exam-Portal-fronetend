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
        console.log("Fetch exam attempts ", data)
        setExamAttempts(data);
      } catch (error) {
        toast.error('Failed to fetch exam attempts');
      }
    };
    const fetchAnalytics = async () => {
      try {
        // toast('Please wait!', {
        //   icon: '👏',
        // });
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
    previousDate.setDate(currentDate.getDate() + 1); // Subtract 1 day
    return previousDate.toISOString().split('T')[0];
  }

  const tileClassName = ({ date, view }) => {
    const LOW_CONSISTENCY_CLASS = 'bg-gray-200 text-gray-600 hover:text-black';
const MEDIUM_CONSISTENCY_CLASS = 'bg-blue-200 text-blue-600 hover:text-black';
const HIGH_CONSISTENCY_CLASS = 'bg-green-400 text-white dark:text-gray-200 dark:bg-cyan-600 underline hover:text-black';
const DEFAULT_CLASS = 'bg-gray-400 text-gray-200 dark:text-black dark:bg-red-200 rounded-full hover:text-black';

    // Example Tailwind CSS classes for consistency levels

    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];

      // console.log(typeof dateString)
      const yesterdayDate = getYesterdayDate(dateString);
      if (examAttempts && examAttempts[yesterdayDate]) {
        const consistencyLevel = examAttempts[yesterdayDate]; // Adjust based on your data structure
  
        if (consistencyLevel < 2 ) {
          return LOW_CONSISTENCY_CLASS;
        } else if (consistencyLevel == 3) {
          return MEDIUM_CONSISTENCY_CLASS;
        } else if (consistencyLevel > 3) {
          return HIGH_CONSISTENCY_CLASS;
        } else {
          return DEFAULT_CLASS; // Fallback to default class if consistency level is not recognized
        }
      } else {
        return DEFAULT_CLASS; // Return default class if no data found
      }

      // Assuming examAttempts is accessible in your component
      // if (examAttempts && examAttempts[yesterdayDate]) {
      //   return 'bg-green-400 rounded-full text-white dark:text-gray-200 dark:bg-cyan-600 underline';
      // } else {
      //   return 'bg-gray-400 text-gray-200 dark:text-black dark:bg-red-200 rounded-full';
      // }
    }
    return '';
  };




  const formatDate = (dateStr) => {
    // Assuming dateStr is in ISO format, e.g., "2024-07-16T00:00:00.000Z"
    const date = new Date(dateStr);
    return date.toLocaleDateString(); // Format date as per browser's locale
  };

  return (
    <>

      <div className='w-full h-full  text-blue-800 mb-4 dark:text-white '>
        <div className="px-4 py-8 bg-white dark:bg-gray-800 dark:text-white">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 dark:text-white">Exam Performance Analytics</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4  overflow-x-auto">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <BarChart
                  width={600}
                  height={300}
                  data={analytics}
                  margin={{ top: 20, right: 20, left: 0, bottom: 5 }} // Adjusted margin for better responsiveness
                // style={{ minWidth: '100%' }} // Ensures the chart fills the container
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

        <div className="px-4 py-8 bg-white dark:bg-slate-900 dark:text-white">
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
      <div className='bg-white text-black dark:bg-gray-800 rounded-lg shadow-md p-4 overflow-x-auto flex flex-col justify-center items-center'>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Daily Stick:
        </h2>
        <p className=" text-gray-800 dark:text-white mb-4">
          Consistency is the <span className='font-bold'>KEY 🗝️</span>
        </p>
          <Calendar tileClassName={tileClassName} />
      </div>

    </>

  );
};

export default Dashboard;
