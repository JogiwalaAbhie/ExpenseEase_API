const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

// Controllers
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getAllExpenses // Added this for the /all route
} = require('../controllers/expenseController');

// Routes

// Create a new expense (authenticated user)
router.post('/', auth, createExpense);

// Get current user's expenses (authenticated user)
router.get('/', auth, getExpenses);

// Get all users' expenses (admin only)
router.get('/all', auth, isAdmin, getAllExpenses);

// Update an expense (authenticated user)
router.put('/:id', auth, updateExpense);

// Delete an expense (authenticated user)
router.delete('/:id', auth, deleteExpense);

module.exports = router;
