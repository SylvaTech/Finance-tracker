"use client";
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import AnalyticsDashboard from '@/app/components/AnalyticsDashboard';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const router = useRouter();
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');

    const handleAddTransaction = async () => {
        try {
          const res = await api.post('/transactions', { type, category, amount });
          setTransactions([...transactions, res.data]); // Add the new transaction to the list
          setCategory('');
          setAmount('');
        } catch (err) {
          alert('Failed to add transaction: ' + err.response?.data?.error || 'Something went wrong');
        }
      };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get('/transactions');
        setTransactions(res.data);
      } catch (err) {
        alert('Failed to fetch transactions: ' + err.response?.data?.error || 'Something went wrong');
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <AnalyticsDashboard />
      <div className="w-full max-w-2xl">
        <div className="bg-white p-4 mb-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Add Transaction</h2>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mb-2 p-2 border rounded"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-2 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mb-2 p-2 border rounded"
          />
          <button
            onClick={handleAddTransaction}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Transaction
          </button>
        </div>
        {transactions.map((transaction) => (
          <div key={transaction._id} className="bg-white p-4 mb-2 rounded shadow">
            <p><strong>Type:</strong> {transaction.type}</p>
            <p><strong>Category:</strong> {transaction.category}</p>
            <p><strong>Amount:</strong> ${transaction.amount}</p>
            <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}