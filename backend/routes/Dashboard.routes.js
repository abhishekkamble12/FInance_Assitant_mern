const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controller/Dashboard.controller');
const protect = require('../middleware/protect');

// Make the route more specific to avoid conflicts
router.get('/dashboard/:id', protect, getDashboardData);

module.exports = router;
