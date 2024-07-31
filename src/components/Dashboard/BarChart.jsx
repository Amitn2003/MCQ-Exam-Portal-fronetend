import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from '@mui/x-charts/BarChart';
import { ResponsiveContainer } from 'recharts'; // Import from recharts if using Recharts

const BarChartComponent = ({analytics, formatDate}) => {
  return (<>
  
  
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
  
  </>
  )
}

export default BarChartComponent