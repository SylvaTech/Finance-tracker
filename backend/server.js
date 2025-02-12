const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes')

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/finance_tracker_db')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.send('Finance Tracker API');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
