import React, { useEffect, useState } from 'react';
import { getUserAnalytics } from '../api/analyticsApi';
import { useAuth } from '../hooks/useAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
    const [analytics, setAnalytics] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const data = await getUserAnalytics(user.token);
                setAnalytics(data);
            } catch (error) {
                console.error('Failed to fetch analytics data');
            }
        };

        fetchAnalytics();
    }, [user.token]);

    // <div>
    //     <h2>Exam Performance Analytics</h2>
    //     <BarChart
    //         width={600}
    //         height={300}
    //         data={analytics}
    //         margin={{
    //             top: 20, right: 30, left: 20, bottom: 5,
    //         }}
    //     >
    //         <CartesianGrid strokeDasharray="3 3" />
    //         <XAxis dataKey="examDate" />
    //         <YAxis />
    //         <Tooltip />
    //         <Legend />
    //         <Bar dataKey="scorePercentage" fill="#8884d8" />
    //     </BarChart>
    // </div>
    const formatDate = (dateStr) => {
        // Assuming dateStr is in ISO format, e.g., "2024-07-16T00:00:00.000Z"
        const date = new Date(dateStr);
        return date.toLocaleDateString(); // Format date as per browser's locale
      };
    return (   <div className="max-w-screen-lg mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Exam Performance Analytics</h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          <BarChart
            width={600}
            height={300}
            data={analytics}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="examDate"  tickFormatter={formatDate} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="scorePercentage" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    );
};

export default Dashboard;
