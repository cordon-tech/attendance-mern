// const express = require('express');
// const router = express.Router();
// const { getAllWorkers } = require('../controllers/workerFetchController');

// // Route to fetch all workers from workerMaster
// router.get('/all', getAllWorkers);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { getAllWorkers,updateWorker,deleteWorker } = require('../controllers/workerFetchController');

// Route to fetch all workers from workerMaster
router.get('/all', getAllWorkers);

// Route to update a worker
router.put('/update', updateWorker);

// Route to delete a worker
router.delete('/delete/:workerId', deleteWorker);


module.exports = router;