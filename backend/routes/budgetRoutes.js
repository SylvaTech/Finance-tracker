const express = require('express');
const { createBudget, getBudgets, updateBudget, deleteBudget } = require('../controllers/budgetController');
const authMiddleware = require('../middleware/authMiddleware');
const {body, validationResult } = require("express-validator");

const router = express.Router();

router.post('/', authMiddleware, 
    [
        body('category').notEmpty().withMessage("Category must not be empty"),
        body('limit').isNumeric().withMessage("Limit must be a number"),
    ],
    createBudget
);

router.get('/', authMiddleware, getBudgets);
router.put('/:id', authMiddleware, updateBudget);
router.delete('/:id', authMiddleware, deleteBudget);

module.exports = router;