// "use client";
// import { useState, useEffect } from 'react';
// import api from '@/utils/api';
// import AnalyticsDashboard from '@/app/components/AnalyticsDashboard';
// import BudgetList from '@/app/components/BudgetList';
// import TransactionList from '@/app/components/TransactionList';
// import AddTransactionForm from '@/app/components/AddTransactionForm';
// import AddBudgetForm from '@/app/components/AddBudgetForm';

// export default function Dashboard() {
//   const [transactions, setTransactions] = useState([]);
//   const [budgets, setBudgets] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [transactionsRes, budgetsRes] = await Promise.all([
//           api.get('/transactions'),
//           api.get('/budgets'),
//         ]);
//         setTransactions(transactionsRes.data);
//         setBudgets(budgetsRes.data);
//       } catch (err) {
//         alert('Failed to fetch data: ' + err.response?.data?.error || 'Something went wrong');
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="min-h-screen p-6">
//       <h1 className="text-4xl font-bold mb-8 text-white">Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Analytics Section */}
//         <div className="md:col-span-2 lg:col-span-1 glassmorphism p-6">
//           <h2 className="text-2xl font-bold mb-4 text-white">Analytics</h2>
//           <AnalyticsDashboard />
//         </div>

//         {/* Budgets Section */}
//         <div className="glassmorphism p-6">
//           <h2 className="text-2xl font-bold mb-4 text-white">Budgets</h2>
//           <AddBudgetForm setBudgets={setBudgets} />
//           <BudgetList budgets={budgets} />
//         </div>

//         {/* Transactions Section */}
//         <div className="glassmorphism p-6">
//           <h2 className="text-2xl font-bold mb-4 text-white">Transactions</h2>
//           <AddTransactionForm setTransactions={setTransactions} />
//           <TransactionList transactions={transactions} />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "@/app/components/ThemeToggle";

export default function Dashboard() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-gray-600">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>

      {/* Content */}
      <main className="p-6">
        <p>Welcome to your dashboard!</p>
        {/* Add other dashboard content here */}
      </main>
    </div>
  );
}
