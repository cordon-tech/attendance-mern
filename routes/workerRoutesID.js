// // workerRoutes.js
// const express = require('express');
// const { getWorkerById, getWorkersByContractor, getAllContractors } = require('../controllers/workerController');

// const router = express.Router();

// router.get('/:workerId', getWorkerById); // Fetch worker by ID
// router.get('/contractor/:contractorName', getWorkersByContractor); // Fetch workers by contractor name
// router.get('/contractors', getAllContractors); // Fetch all contractor names

// module.exports = router;




// const express = require("express");
// const { getAllContractors, getWorkerById, getWorkersByContractor } = require("../controllers/workerController");

// const router = express.Router();

// // Route to fetch contractor names
// router.get("/contractors", getAllContractors);

// // Route to fetch worker by ID
// router.get("/:workerId", getWorkerById);

// // Route to fetch workers by contractor name
// router.get("/contractor/:contractorName", getWorkersByContractor);

// module.exports = router;



///zoya////



// const express = require("express");
// const { getAllContractors, getWorkerById, getWorkersByContractor } = require("../controllers/workerControllerID");

// const router = express.Router();

// // Route to fetch all contractor names and addresses
// router.get("/contractors", getAllContractors);

// // Route to fetch worker details by worker ID
// router.get("/worker/:workerId", getWorkerById);

// // Route to fetch workers by contractor name
// router.get("/contractor/:contractorName", getWorkersByContractor);

// module.exports = router;


const express = require("express");
const { getContractorNames, getWorkerById, getWorkersByContractor } = require("../controllers/workerControllerID");

const router = express.Router();

// Route to fetch all contractor names and addresses
router.get("/contractors", getContractorNames);

// Route to fetch worker details by worker ID
router.get("/worker/:workerId", getWorkerById);

// Route to fetch workers by contractor name
router.get("/contractor/:contractorName", getWorkersByContractor);

module.exports = router;

