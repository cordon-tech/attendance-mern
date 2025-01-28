const express = require('express');
const router = express.Router();
const {
  getDesignations,
  addDesignation,
  updateDesignation,
  deleteDesignation

  
} = require('../controllers/designationController');

// Get all designations
router.get('/', getDesignations);
router.delete('/:id', deleteDesignation);

// Add a new designation
router.post('/', addDesignation);

// Update designation by ID
router.put('/:id', updateDesignation);

module.exports = router;
