import { useState } from 'react';
import api from '@/utils/api';

const AddTransactionForm = ({ setTransactions }) => {
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/transactions', { type, category, amount });
      setTransactions((prev) => [...prev, res.data]);
      setCategory('');
      setAmount('');
    } catch (err) {
      alert('Failed to add transaction: ' + err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 bg-gray-800 text-white rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
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
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 bg-gray-800 text-white rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded hover:from-blue-600 hover:to-purple-600 transition-all"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default AddTransactionForm;