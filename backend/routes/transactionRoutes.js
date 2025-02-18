const express = require('express');
const { createTransaction, getTransactions, updateTransaction, deleteTransaction, getTransactionAnalytics } = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware.js'); 
const { body, validationResult } = require('express-validator'); 

const router = express.Router();

router.post('/', authMiddleware, 
    [
    body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
    body('category').notEmpty().withMessage('Category is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
  ],
  createTransaction
);

router.get('/', authMiddleware, getTransactions);
router.put('/:id', authMiddleware, updateTransaction);
router.delete('/:id', authMiddleware, deleteTransaction);
router.get('/analytics', authMiddleware, getTransactionAnalytics);

module.exports = router;