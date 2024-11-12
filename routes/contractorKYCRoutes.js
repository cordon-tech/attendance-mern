const express = require('express');
const router = express.Router();
const { getContractorById } = require('../controllers/contractorKYCController');

// Route to get contractor data by contractorId
router.get('/:id', getContractorById);

module.exports = router;
