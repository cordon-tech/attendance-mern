// server/routes/supervisorRoutes.js
const express = require('express');
const {getSupervisorById } = require('../controllers/KYCSupervisorController');
const router = express.Router();

// router.post('/add', registerSupervisor);
router.get('/:supervisorId', getSupervisorById);  // New route to get supervisor by ID

module.exports = router;
