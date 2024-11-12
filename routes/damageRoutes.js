const express = require('express');
const { saveDamageData } = require('../controllers/damageController');

const router = express.Router();

router.post('/', saveDamageData); // This matches '/api/damage' in server.js

module.exports = router;
