

/////final testing

// workerRoutes.js

const express = require('express');
const router = express.Router();
const { registerWorker, getContractorNames,getDesignationNames,getLabourTypes  } = require('../controllers/workerController');

// Route to register a worker
router.post('/register', registerWorker);

// Route to fetch contractor names
router.get("/contractors", getContractorNames);


// Route to fetch designation names
router.get("/designations", getDesignationNames);

// Route to fetch labour types
router.get("/labourTypes", getLabourTypes);

module.exports = router;

