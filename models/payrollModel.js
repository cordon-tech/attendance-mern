const mongoose = require('mongoose');
// Define the schema for contractor data in payroll
const payrollSchema = new mongoose.Schema({
  contractorID: String,
  contractorName: String,
  // Define other fields as needed based on the MongoDB structure
}, { collection: 'contractorMaster' });
module.exports = mongoose.model('Payroll', payrollSchema);