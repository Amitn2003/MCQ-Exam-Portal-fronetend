import React, { useEffect, useState } from 'react';
import { getUserAnalytics } from '../api/analyticsApi';
import { useAuth } from '../hooks/useAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LineChart, Line } from 'recharts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const Dashboard = () => {
  const [analytics, setAnalytics] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        toast.warn('Wait! It could take few seconds');
        const data = await getUserAnalytics(user.token);
        setAnalytics(data);
      } catch (error) {
        toast.error('Failed to load data');
        console.error('Failed to fetch analytics data');
      }
    };

    fetchAnalytics();
  }, [user.token]);


  const formatDate = (dateStr) => {
    // Assuming dateStr is in ISO format, e.g., "2024-07-16T00:00:00.000Z"
    const date = new Date(dateStr);
    return date.toLocaleDateString(); // Format date as per browser's locale
  };
  return (
    <>
     <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Exam Performance Analytics</h2>
      <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
        <div className="inline-block min-w-full">
          <LineChart
            width={600}
            height={300}
            data={analytics}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="examDate" tickFormatter={formatDate} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="scorePercentage" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </div>

      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Exam Performance Analytics</h2>
        <div className="bg-white rounded-lg shadow-md p-4">
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


    </>

  );
};

export default Dashboard;
