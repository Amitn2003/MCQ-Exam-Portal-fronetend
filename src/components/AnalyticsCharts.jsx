import React from 'react';
import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalyticsCharts = ({ analytics, formatDate }) => {
  return (
    <div className="px-2 py-8 bg-white dark:bg-slate-900 dark:text-white">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Exam Performance Analytics</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-1 overflow-hidden">
        <div className="min-w-full" style={{ height: '300px' }}>
          <ResponsiveContainer>
            <BarChart
              data={analytics}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="examDate" tickFormatter={formatDate} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="scorePercentage" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mt-8 overflow-hidden">
        <div className="min-w-full" style={{ height: '300px' }}>
          <ResponsiveContainer>
            <LineChart
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
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
