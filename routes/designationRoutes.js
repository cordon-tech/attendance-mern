const express = require('express');
const router = express.Router();
const {
  getDesignations,
  addDesignation,
  updateDesignation
} = require('../controllers/designationController');

// Get all designations
router.get('/', getDesignations);

// Add a new designation
router.post('/', addDesignation);

// Update designation by ID
router.put('/:id', updateDesignation);

module.exports = router;
