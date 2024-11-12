const express = require('express');
const { saveAccidentData } = require('../controllers/accidentController');

const router = express.Router();

router.post('/', saveAccidentData);

module.exports = router;
