const Budget = require('../models/Budget');

exports.createBudget = async (req, res) => {
  const { category, limit } = req.body;
  try {
    const budget = new Budget({
      userId: req.user.id,
      category,
      limit,
    });
    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBudget = async (req, res) => {
  const { id } = req.params;
  try {
    const budget = await Budget.findByIdAndUpdate(id, req.body, { new: true });
    res.json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBudget = async (req, res) => {
  const { id } = req.params;
  try {
    await Budget.findByIdAndDelete(id);
    res.json({ message: 'Budget deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};