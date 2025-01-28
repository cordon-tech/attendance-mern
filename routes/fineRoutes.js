const express = require('express');
const router = express.Router();
const { createFine , getWorkerDetails } = require('../controllers/fineController');

// POST route for creating fine
router.post('/', createFine);


router.get('/worker/:workerId', getWorkerDetails);



module.exports = router;
