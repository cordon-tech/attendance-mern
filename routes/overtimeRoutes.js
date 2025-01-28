
// const express = require('express');
// const router = express.Router();
// const { createOvertime, getAllOvertimeEntries, getOvertimeById } = require('../controllers/overtimeController');

// // Route to create overtime entry
// router.post('/create', createOvertime);

// // Route to get all overtime entries
// router.get('/', getAllOvertimeEntries);

// // Route to get a specific overtime entry by ID
// router.get('/:id', getOvertimeById);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { createOvertime, getAllOvertimeEntries, getOvertimeById,getWorkerDetails} = require('../controllers/overtimeController');


// Route to create overtime entry
router.post('/create', createOvertime);

// Route to get all overtime entries
router.get('/', getAllOvertimeEntries);

// Route to get a specific overtime entry by ID
router.get('/:id', getOvertimeById);


// New route to get worker details based on workerId
router.get('/worker/:workerId', getWorkerDetails);


module.exports = router;