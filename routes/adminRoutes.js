const express = require('express');
const { registerAdmin } = require('../controllers/adminController');
const router = express.Router();

// POST request to register an admin
router.post('/registerAdmin', registerAdmin);

module.exports = router;
