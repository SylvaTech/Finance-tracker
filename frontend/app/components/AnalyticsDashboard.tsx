import { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import api from "@/utils/api";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

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
  const [analytics, setAnalytics] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    spendingByCategory: {},
  });

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/transactions/analytics");
        setAnalytics(res.data);
      } catch (err) {
        alert(
          "Failed to fetch analytics: " +
            (err.response?.data?.error || "Something went wrong")
        );
      }
    };

    fetchAnalytics();
  }, []);

  // Determine colors based on the theme set in the layout
  const getThemeColors = () => {
    const isDarkMode =
      document.documentElement.getAttribute("data-theme") === "dark";
    return {
      textColor: isDarkMode ? "#f8fafc" : "#1e293b", // Light mode: dark text, Dark mode: white text
      borderColor: isDarkMode ? "#0f172a" : "#e2e8f0", // Dark mode: navy, Light mode: gray
      gridColor: isDarkMode ? "#334155" : "#e5e7eb", // Darker in dark mode, lighter in light mode
      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff", // Dark mode: dark background, Light mode: white background
    };
  };

  // Get current theme colors
  const { textColor, borderColor, gridColor, backgroundColor } = getThemeColors();

  // Data for the doughnut chart (income vs. expenses)
  const incomeExpenseData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [analytics.totalIncome, analytics.totalExpenses],
        backgroundColor: ["#4ADE80", "#F87171"], // Green for income, red for expenses
        borderColor: borderColor,
        borderWidth: 2,
      },
    ],
  };

  // Data for the bar chart (spending by category)
  const spendingByCategoryData = {
    labels: Object.keys(analytics.spendingByCategory),
    datasets: [
      {
        label: "Spending by Category",
        data: Object.values(analytics.spendingByCategory),
        backgroundColor: "#60A5FA", // Blue bars
        borderColor: borderColor,
        borderWidth: 2,
      },
    ],
  };

  // Chart options for dynamic theme
  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: textColor, // Legend text color
        },
      },
      tooltip: {
        bodyColor: textColor, // Tooltip text color
        backgroundColor: backgroundColor, // Tooltip background color
        borderColor: borderColor, // Tooltip border color
      },
    },
    scales: {
      y: {
        ticks: {
          color: textColor, // Y-axis tick text color
        },
        grid: {
          color: gridColor, // Y-axis grid color
        },
      },
      x: {
        ticks: {
          color: textColor, // X-axis tick text color
        },
        grid: {
          color: gridColor, // X-axis grid color
        },
      },
    },
  };

  return (
    <div className="p-6 rounded-lg shadow-lg transition-all">
      <h3 className="text-xl font-bold mb-4" style={{ color: textColor }}>
        Income vs. Expenses
      </h3>
      <div className="mb-8">
        <Doughnut data={incomeExpenseData} options={chartOptions} />
      </div>
      <h3 className="text-xl font-bold mb-4" style={{ color: textColor }}>
        Spending by Category
      </h3>
      <div>
        <Bar data={spendingByCategoryData} options={chartOptions} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;