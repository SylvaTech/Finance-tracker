import { useEffect, useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import api from '@/utils/api';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({ totalIncome: 0, totalExpenses: 0, spendingByCategory: {} });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/transactions/analytics');
        setAnalytics(res.data);
      } catch (err) {
        alert('Failed to fetch analytics: ' + err.response?.data?.error || 'Something went wrong');
      }
    };

    fetchAnalytics();
  }, []);

  // Data for the doughnut chart (income vs. expenses)
  const incomeExpenseData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [analytics.totalIncome, analytics.totalExpenses],
        backgroundColor: ['#4ADE80', '#F87171'], // Green for income, red for expenses
        borderColor: ['#0f172a', '#0f172a'], // Dark border to match the theme
        borderWidth: 2,
      },
    ],
  };

  // Data for the bar chart (spending by category)
  const spendingByCategoryData = {
    labels: Object.keys(analytics.spendingByCategory),
    datasets: [
      {
        label: 'Spending by Category',
        data: Object.values(analytics.spendingByCategory),
        backgroundColor: '#60A5FA', // Blue bars
        borderColor: '#0f172a', // Dark border to match the theme
        borderWidth: 2,
      },
    ],
  };

  // Chart options for dark theme
  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#f8fafc', // White text for legends
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: '#f8fafc', // White text for y-axis
        },
        grid: {
          color: '#334155', // Dark grid lines
        },
      },
      x: {
        ticks: {
          color: '#f8fafc', // White text for x-axis
        },
        grid: {
          color: '#334155', // Dark grid lines
        },
      },
    },
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-white">Income vs. Expenses</h3>
      <div className="mb-8">
        <Doughnut data={incomeExpenseData} options={chartOptions} />
      </div>
      <h3 className="text-xl font-bold mb-4 text-white">Spending by Category</h3>
      <div>
        <Bar data={spendingByCategoryData} options={chartOptions} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;