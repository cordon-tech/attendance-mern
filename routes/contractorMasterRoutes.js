const express = require('express');
const router = express.Router();
const contractorMasterController = require('../controllers/contractorMasterController');

// Define routes for contractor master
router.get('/', contractorMasterController.getAllContractors);
router.put('/:id', contractorMasterController.updateContractor);
router.delete('/:id', contractorMasterController.deleteContractor);

module.exports = router;
