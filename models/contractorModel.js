const mongoose = require('mongoose');

// Define the contractor schema
const contractorSchema = new mongoose.Schema({
  contractorName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  phoneNo: { type: String, required: true },
  email: { type: String, required: true },
  secondemail: { type: String, required: true },
  thirdemail: { type: String, required: true },
  fourthemail: { type: String, required: true },
  address: { type: String, required: true },
  aadhaarNo: { type: String, required: true },
  pancardNo: { type: String, required: true },
  wcPolicyNo: { type: String, required: true },
  wcDate: { type: Date },
  wcValidDate: { type: Date },
  serviceType: { type: String },
  serviceTaxNo: { type: String },
  shopactLicence: { type: String },
  shopactValidDate: { type: Date },
  labourLicenceNo: { type: String },
  llIssueDate: { type: Date },
  llValidDate: { type: Date },
  bocwNo: { type: String },
  bocwDate: { type: Date },
  bocwValidDate: { type: Date },
  rc: { type: String },
  rcCount: { type: Number },
  pfNo: { type: String },
  esicNo: { type: String },
  mlwfNo: { type: String },
  ptecNo: { type: String },
  ptrcNo: { type: String },
  buildingName: { type: String },
  password: { type: String },
  documents: {
    aadharFront: { type: String, required: false },
    aadharBack: { type: String, required: false },
    esicCodeLetter: { type: String },
    ptecPtrcCode: { type: String },
    mlwfCodeLetter: { type: String },
    bocwLicense: { type: String },
    labourLicense: { type: String },
    wcPolicy: { type: String },
    shopActLicense: { type: String },
    providentFundCode: { type: String },
  },
},{ _id: false }); 

// Define the ams schema, using a Map for contractorMaster
const amsSchema = new mongoose.Schema({
  contractorMaster: {
    type: Map,  // Use a Map for key-value storage, where keys will be contractorIds
    of: contractorSchema, // Each value in the map will follow the contractorSchema
  },
}, {
  collection: 'ams',  // Store data in the 'ams' collection
  timestamps: true  // Optional: add timestamps for createdAt and updatedAt
});

// Create the model
// const Ams = mongoose.model('Ams', amsSchema);
const Ams = mongoose.models.Ams || mongoose.model('Ams', amsSchema);

module.exports = Ams;
