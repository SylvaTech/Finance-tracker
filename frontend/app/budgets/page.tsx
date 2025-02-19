const [category, setCategory] = useState('');
const [limit, setLimit] = useState('');

const handleCreateBudget = async () => {
  try {
    const res = await api.post('/budgets', { category, limit });
    alert('Budget created successfully!');
  } catch (err) {
    alert('Failed to create budget: ' + err.response?.data?.error || 'Something went wrong');
  }
};

return (
  <div className="bg-white p-4 mb-4 rounded shadow">
    <h2 className="text-xl font-bold mb-2">Create Budget</h2>
    <input
      type="text"
      placeholder="Category"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="mb-2 p-2 border rounded"
    />
    <input
      type="number"
      placeholder="Limit"
      value={limit}
      onChange={(e) => setLimit(e.target.value)}
      className="mb-2 p-2 border rounded"
    />
    <button
      onClick={handleCreateBudget}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Create Budget
    </button>
  </div>
);