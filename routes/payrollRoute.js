const express = require('express');
const router = express.Router();
const { getContractors , getWorkersByContractor, generateAttendanceColumns, getAttendanceData, savePayrollData} = require('../controllers/payrollController');

// Route to get all contractor names
router.get('/contractors', getContractors);

router.get('/workers/:contractorName', getWorkersByContractor);

// Route to generate attendance columns
router.post('/generate-attendance', (req, res) => {
    const { fromDate, toDate } = req.body;
    const attendanceColumns = generateAttendanceColumns(fromDate, toDate);
    res.status(200).json(attendanceColumns);
  });

router.post('/get-attendance', getAttendanceData);
router.post('/save', savePayrollData);


module.exports = router;