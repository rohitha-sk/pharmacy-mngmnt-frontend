import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  // Pie chart data
  const data = {
    labels: ['In Stock', 'Low Stock', 'Out of Stock'],
    datasets: [
      {
        data: [70, 20, 10], // Percentage data for In Stock, Low Stock, and Out of Stock
        backgroundColor: ['#4CAF50', '#FFEB3B', '#F44336'], // Colors for each section
        hoverBackgroundColor: ['#45A049', '#FFCD33', '#E53935'],
      },
    ],
  };

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <h2>Stock Status Distribution</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
