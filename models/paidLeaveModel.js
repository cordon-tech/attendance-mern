const mongoose = require('mongoose');

const paidLeaveSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  leaveDay: {
    type: String,
    required: true,
  },
  leaveValue: {
    type: String,
    required: true,
  }
});

// Create the model from the schema
const PaidLeave = mongoose.model('paidLeaveDays', paidLeaveSchema);

module.exports = PaidLeave;
