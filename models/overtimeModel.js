// overtimeModel.js
const mongoose = require('mongoose');

const OvertimeEntrySchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  employeeName: { type: String, required: true },
  fatherHusbandName: { type: String, required: true },
  gender: { type: String, required: true },
  designation: { type: String, required: true },
  dateOfOvertime: { type: Date, required: true },
  totalOvertimeWorked: { type: Number, required: true },
  normalRateOfWages: { type: Number, required: true },
  overtimeRateOfWages: { type: Number, required: true },
  overtimeEarnings: { type: Number, required: true },
  dateOfOvertimePaid: { type: Date, required: true },
  remarks: { type: String }
}, { timestamps: true });

// Define OvertimeSchema where `overtimeMaster` is an object
const OvertimeSchema = new mongoose.Schema({
  overtimeMaster: {
    type: Map,
    of: OvertimeEntrySchema // Each entry in `overtimeMaster` is an `OvertimeEntrySchema`
  }
}, { collection: 'ams' });

module.exports = mongoose.model('Overtime', OvertimeSchema);
