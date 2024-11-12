const mongoose = require('mongoose');

// Define contractor schema
const contractorSchema = new mongoose.Schema({
  contractorId: String,
  contractorName: String,
  contactPerson: String,
  phoneNo: String,
  email: String,
  secondemail: String,
  thirdemail: String,
  fourthEmail: String,
  address: String,
  aadhaarNo: String,
  pancardNo: String,
  wcPolicyNo: String,
  wcDate: String,
  wcValidDate: String,
  serviceType: String,
  serviceTaxNo: String,
  shopactLicence: String,
  shopactValidDate: String,
  labourLicenceNo: String,
  llIssueDate: String,
  llValidDate: String,
  bocwNo: String,
  bocwDate: String,
  bocwValidDate: String,
  rc: String,
  rcCount: String,
  pfNo: String,
  esicNo: String,
  mlwfNo: String,
  ptecNo: String,
  ptrcNo: String,
  buildingName: String,
  password: String,
}, { _id: false });

// Define the ams schema with contractorMaster as a Map
const amsSchema = new mongoose.Schema({
  contractorMaster: {
    type: Map,  // Use a Map for contractorMaster
    of: contractorSchema,
  }
}, {
  collection: 'ams',  // Store data in the 'ams' collection
  timestamps: true  // Optional timestamps
});

const Ams = mongoose.models.Ams || mongoose.model('Ams', amsSchema);

module.exports = Ams;
