// models/attendanceModel.js
const mongoose = require('mongoose');

const editAttendanceSchema = new mongoose.Schema({
  workerId: String,
  firstName: String,
  lastName: String,
  contractorName: String,
  inTime: String,
  outTime: String,
  date: String,
  day: String,
  buildingNumber: String,
});

module.exports = mongoose.model('Attendance', editAttendanceSchema);