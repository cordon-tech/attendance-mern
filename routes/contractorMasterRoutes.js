// const express = require('express');
// const router = express.Router();
// const contractorMasterController = require('../controllers/contractorMasterController');

// // Add a log to confirm that the route is being hit
// router.get('/', (req, res) => {
//   console.log("Received GET request for contractors"); // Log when the request is received
//   contractorMasterController.getAllContractors(req, res); // Call the controller function
// });

// // Other routes if needed for POST, PUT, DELETE can go here

// module.exports = router;





const express = require('express');
const router = express.Router();
const contractorMasterController = require('../controllers/contractorMasterController');

// Define routes for contractor master
router.get('/', contractorMasterController.getAllContractors);
router.put('/:id', contractorMasterController.updateContractor);  // Ensure this line correctly references the update function
router.delete('/:id', contractorMasterController.deleteContractor);

module.exports = router;
