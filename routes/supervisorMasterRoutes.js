// supervisorMasterRoutes.js
const express = require('express');
// const { getSupervisors,  } = require('../controllers/supervisorMasterController');
const { getSupervisors,updateSupervisor} = require('../controllers/supervisorMasterController');
const router = express.Router();


router.get('/', getSupervisors);

// // Route to update a supervisor
router.put('/:id', updateSupervisor);



module.exports = router;
