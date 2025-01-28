const express = require('express');
const router = express.Router();
const { getWorkerData, saveWorkerData } = require('../controllers/NinetyDaysFormControlle');
const workerController = require('../controllers/NinetyDaysFormControlle');
const labourRateController = require('../controllers/NinetyDaysFormControlle');
// Route to fetch worker data by worker ID
//router.get('/:workerId', getWorkerData);
router.get('/:workerId', getWorkerData); 

// Route to fetch worker data
router.get('/worker/:workerId', workerController.getWorkerData);

// Route to fetch labour rate by labourType
router.get('/labourRate/:labourType', labourRateController.getLabourRate);
// Route to save new worker data
router.post('/', saveWorkerData);

module.exports = router;