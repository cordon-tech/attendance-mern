// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const editAttendanceController = require('../controllers/editAttendanceController');

// Route to get attendance for a specific workerId and date (GET request)
router.get('/:workerId/:date', editAttendanceController.getAttendance);

// Route to create attendance (POST request)
router.post('/', editAttendanceController.createAttendance);

// Route to update only outTime for a specific workerId and date (PUT request)
router.put('/:workerId/:date', editAttendanceController.updateOutTime);

module.exports = router;

