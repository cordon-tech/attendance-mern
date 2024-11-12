// const express = require('express');
// const router = express.Router();
// const { getContractors, getContractorDetails , getOvertimeRecords } = require('../controllers/overtimeMasterController');

// // Route to fetch all contractors
// router.get('/contractors', getContractors);

// // Route to fetch details of a specific contractor
// router.get('/contractor/:id', getContractorDetails);

// // Route to fetch overtime records by contractorName and overtimeMonth
// router.get('/overtime/records', getOvertimeRecords);


// module.exports = router;


const express = require('express');
const router = express.Router();
const { getContractors, getContractorDetails, getOvertimeRecords } = require('../controllers/overtimeMasterController');

// Route to fetch all contractors
router.get('/contractors', getContractors);

// Route to fetch details of a specific contractor
router.get('/contractor/contractorId', getContractorDetails);

// Route to fetch overtime records by contractorName and overtimeMonth
router.get('/records', getOvertimeRecords);

module.exports = router;
