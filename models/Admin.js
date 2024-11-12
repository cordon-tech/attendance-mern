const mongoose = require('mongoose');

const AdminMasterSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = mongoose.model('AdminMaster', AdminMasterSchema, 'ams');