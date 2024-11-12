// // workerkycroutes.js
// const express = require('express');
// const router = express.Router();
// const { getWorkerDetails } = require('../controllers/workerkyccontroller');

// // Route to get worker details by workerId
// router.get('/worker/:workerId', getWorkerDetails);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { getWorkerKYCDetails } = require('../controllers/workerkyccontroller'); // Update the function name to match the controller

// Route to get worker details by workerId
router.get('/worker/:workerId', getWorkerKYCDetails);

module.exports = router;
