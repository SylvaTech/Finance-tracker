"use client";
const BudgetList = ({ budgets }) => {
  return (
    <div className="mt-4">
      {budgets.map((budget) => (
        <div key={budget._id} className="mb-4 p-4 glassmorphism rounded-lg">
          <h3 className="font-bold text-white">{budget.category}</h3>
          <p className="text-gray-300">Limit: ${budget.limit}</p>
          <p className="text-gray-300">Spent: ${budget.spent || 0}</p>
          <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              style={{ width: `${(budget.spent / budget.limit) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BudgetList;