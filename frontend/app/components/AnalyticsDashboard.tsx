import { useEffect, useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend, 
    CategoryScale, 
    LinearScale, 
    BarElement 
  } from 'chart.js';
  import api from '@/utils/api';
  
  // Register required Chart.js components
  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

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
        backgroundColor: ['#4CAF50', '#F44336'],
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
        backgroundColor: '#2196F3',
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Income vs. Expenses</h3>
          <Doughnut data={incomeExpenseData} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Spending by Category</h3>
          <Bar data={spendingByCategoryData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;