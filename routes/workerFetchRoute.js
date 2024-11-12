// const express = require('express');
// const router = express.Router();
// const { getAllWorkers } = require('../controllers/workerFetchController');

// // Route to fetch all workers from workerMaster
// router.get('/all', getAllWorkers);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { getAllWorkers } = require('../controllers/workerFetchController');

// Route to fetch all workers from workerMaster
router.get('/all', getAllWorkers);

module.exports = router;