const express = require('express');
const router = express.Router();
const { registerContractor } = require('../controllers/contractorController');
const upload = require('../middleware/uploadMiddleware');

router.post('/register', upload.array('documents', 10), registerContractor);

module.exports = router;
