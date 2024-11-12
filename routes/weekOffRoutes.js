
// routes/weekOffRoutes.js
const express = require('express');
const { addWeekOffDay } = require('../controllers/weekOffController');
const router = express.Router();

// POST request to add a new weekly off day
router.post('/add', addWeekOffDay);

module.exports = router;
