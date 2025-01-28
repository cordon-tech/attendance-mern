
// const express = require('express');
// const { registerSupervisor } = require('../controllers/supervisorController'); // Import the controller
// const upload = require('../middleware/SupervisorUploadMiddleware'); // Import the middleware

// const router = express.Router();

// // Route to register a supervisor
// router.post('/', upload, registerSupervisor);

// module.exports = router;



const express = require('express');
const { registerSupervisor } = require('../controllers/supervisorController');

const router = express.Router();

// Route to register a supervisor
router.post('/', registerSupervisor);

module.exports = router;
