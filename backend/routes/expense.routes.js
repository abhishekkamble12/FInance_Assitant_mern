const express = require('express');
const {
  createExpense,
  getExpenses,
  // getExpense, // TEMPORARILY COMMENTING OUT TO SEE IF THIS IS THE ISSUE
  // updateExpense,
  deleteExpense,
} = require('../controller/Expense.controller');
const protect = require('../middleware/protect');

const router = express.Router();

// Add logging middleware for debugging
router.use((req, res, next) => {
  console.log(`Expense Route Hit: ${req.method} ${req.originalUrl} Path: ${req.path}`);
  next();
});

// Test route to verify routing
router.get('/test-route', (req, res) => {
  res.json({ message: 'Expense routes are working', path: req.path });
});

// IMPORTANT: Specific routes must come BEFORE parameterized routes
router.post('/add-expense', protect, createExpense);
router.get('/get-all-expenses', protect, getExpenses); // Renamed from /get-expenses to avoid conflict

// Make absolutely sure we're not accidentally registering a catch-all route
// DO NOT UNCOMMENT THE LINE BELOW - IT WILL BREAK /get-expenses
// router.get('/:id', protect, getExpense);

router.delete('/delete-expense/:id', protect, deleteExpense);

module.exports = router;
