// ok  ocde-----------------------------------

// // routes/attendanceRoutes.js
// const express = require('express');
// const router = express.Router();
// const attendanceController = require('../controllers/attendanceController');

// router.post('/', attendanceController.createAttendance);


// module.exports = router;

// Ok code Running-------------------
// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Route to get attendance for a specific workerId and date (GET request)
router.get('/:workerId/:date', attendanceController.getAttendance);

// Route to create attendance (POST request)
router.post('/', attendanceController.createAttendance);

// Route to update only outTime for a specific workerId and date (PUT request)
router.put('/:workerId/:date', attendanceController.updateOutTime);

module.exports = router;

