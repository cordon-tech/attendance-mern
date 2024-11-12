const express = require('express');
const router = express.Router();
const { createPaidLeave } = require('../controllers/paidLeaveController');

// Route to create a new paid leave entry
router.post('/', createPaidLeave);

module.exports = router;
