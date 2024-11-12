const express = require('express');
const router = express.Router();
const { createFine } = require('../controllers/fineController');

// POST route for creating fine
router.post('/', createFine);

module.exports = router;
