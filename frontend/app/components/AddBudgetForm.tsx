"use client";
import { useState } from 'react';
import api from '@/utils/api';

const AddBudgetForm = ({ setBudgets }) => {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/budgets', { category, limit });
      setBudgets((prev) => [...prev, res.data]);
      setCategory('');
      setLimit('');
    } catch (err) {
      alert('Failed to create budget: ' + err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 bg-gray-800 text-white rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="number"
        placeholder="Limit"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        className="w-full p-2 bg-gray-800 text-white rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded hover:from-blue-600 hover:to-purple-600 transition-all"
      >
        Add Budget
      </button>
    </form>
  );
};

export default AddBudgetForm;