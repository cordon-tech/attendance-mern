const mongoose = require('mongoose');

// Define the schema for Designation
const designationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  designationName: {
    type: String,
    required: true
  }
});

// Create the model for Designation
const Designation = mongoose.model('Designation', designationSchema);

module.exports = Designation;
