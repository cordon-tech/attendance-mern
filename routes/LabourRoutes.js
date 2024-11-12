// routes/LabourRoutes.js

const express = require('express');
const router = express.Router();
const { getLabours, addLabour, updateLabour, exportLabours, getNextLabourId } = require('../controllers/labourController');

// Route to get all labour rates
router.get('/', getLabours);

// Route to add a new labour rate
router.post('/add', addLabour);

// Route to update a labour rate by ID
router.put('/:id', updateLabour);

// Route to export labour rates to Excel
router.get('/export', exportLabours);

// Route to get the next labour ID
router.get('/next-id', getNextLabourId);

module.exports = router;
