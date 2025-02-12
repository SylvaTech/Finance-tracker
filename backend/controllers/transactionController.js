const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
  const { type, category, amount, description } = req.body;
  try {
    const transaction = new Transaction({
      userId: req.user.id, // Assuming user ID is available from authentication middleware
      type,
      category,
      amount,
      description,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    await Transaction.findByIdAndDelete(id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};