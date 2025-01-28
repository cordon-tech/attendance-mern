// // workerRoutes.js
// const express = require('express');
// const router = express.Router();
// const { getWorkerDetails } = require('../controllers/workerController'); // Ensure this path is correct

// router.get('/:workerId', getWorkerDetails); // Make sure getWorkerDetails is defined

// module.exports = router;


const express = require('express');
const router = express.Router();
const { getWorkerDetails } = require('../controllers/editWorkerController'); // Correct path to editWorkerController

// Define route to fetch worker details by worker ID
router.get('/:workerId', getWorkerDetails);

module.exports = router;
