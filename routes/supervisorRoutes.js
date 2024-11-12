
const express = require('express');

const { registerSupervisor } = require('../controllers/supervisorController');
const router = express.Router();

// Route to register a supervisor
router.post('/', registerSupervisor);



module.exports = router;
