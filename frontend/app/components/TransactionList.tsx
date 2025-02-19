const TransactionList = ({ transactions }) => {
  return (
    <div className="mt-4">
      {transactions.map((transaction) => (
        <div key={transaction._id} className="mb-4 p-4 glassmorphism rounded-lg">
          <p className="text-white"><strong>Type:</strong> {transaction.type}</p>
          <p className="text-white"><strong>Category:</strong> {transaction.category}</p>
          <p className="text-white"><strong>Amount:</strong> ${transaction.amount}</p>
          <p className="text-white"><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;