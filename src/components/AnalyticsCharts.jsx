import React from 'react';
import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import BarChartComponent from './Dashboard/BarChart';
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
              <CartesianGrid strokeDasharray="5 8" />
              <XAxis dataKey="examDate" tickFormatter={formatDate} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="scorePercentage" fill="#2980b9" />
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
              <CartesianGrid strokeDasharray="5 8" stroke="#2980b9" />
              <XAxis dataKey="examDate" tickFormatter={formatDate} />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* <Line type="monotone" dataKey="scorePercentage" stroke="#2ecc71" /> */}
              <Line type="monotone" dataKey="scorePercentage" stroke="#2980b9" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <br />
      
    </div>
  );
};

export default AnalyticsCharts;
