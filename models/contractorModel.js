// const mongoose = require('mongoose');

// // Define the contractor schema without the documents field
// const contractorSchema = new mongoose.Schema({
//   contractorName: { type: String, required: true },
//   contactPerson: { type: String, required: true },
//   phoneNo: { type: String, required: true },
//   email: { type: String, required: true },
//   secondemail: { type: String, required: true },
//   thirdemail: { type: String, required: true },
//   fourthemail: { type: String, required: true },
//   address: { type: String, required: true },
//   aadhaarNo: { type: String, required: true },
//   pancardNo: { type: String, required: true },
//   wcPolicyNo: { type: String, required: true },
//   wcDate: { type: Date },
//   wcValidDate: { type: Date },
//   serviceType: { type: String },
//   serviceTaxNo: { type: String },
//   shopactLicence: { type: String },
//   shopactValidDate: { type: Date },
//   labourLicenceNo: { type: String },
//   llIssueDate: { type: Date },
//   llValidDate: { type: Date },
//   bocwNo: { type: String },
//   bocwDate: { type: Date },
//   bocwValidDate: { type: Date },
//   rc: { type: String },
//   rcCount: { type: String },
//   pfNo: { type: String },
//   esicNo: { type: String },
//   mlwfNo: { type: String },
//   ptecNo: { type: String },
//   ptrcNo: { type: String },
//   buildingName: { type: String },
//   password: { type: String },
// }, { _id: false }); 

// // Define the ams schema, using an array for contractorMaster instead of Map
// const amsSchema = new mongoose.Schema({
//   contractorMaster: {
//     type: [contractorSchema], // Changed from Map to Array
//   },
// }, {
//   collection: 'ams',  // Store data in the 'ams' collection
//   timestamps: true  // Optional: add timestamps for createdAt and updatedAt
// });

// // Create the model
// const Ams = mongoose.models.Ams || mongoose.model('Ams', amsSchema);

// module.exports = Ams;


/////////testing////////


const mongoose = require('mongoose');

const contractorSchema = new mongoose.Schema({
  aadhaarNo: { type: String },
  address: { type: String, required: true },
  bocwDate: { type: Date },
  bocwNo: { type: String },
  bocwValidDate: { type: Date },
  buildingName: { type: String },
  contactPerson: { type: String, required: true },
  
  contractorName: { type: String, required: true },
  email: { type: String, required: true },
  esicNo: { type: String },
  fourthemail: { type: String },
  labourLicenceNo: { type: String },
  llIssueDate: { type: Date },
  llValidDate: { type: Date },
  mlwfNo: { type: String },
  pancardNo: { type: String, required: true },
  password: { type: String },
  pfNo: { type: String },
  phoneNo: { type: String, required: true },
  ptecNo: { type: String },
  ptrcNo: { type: String },
  rc: { type: String },
  rcCount: { type: Number },
  secondemail: { type: String },
  serviceTaxNo: { type: String },
  serviceType: { type: String },
  shopactLicense: { type: String },
  shopactValidDate: { type: Date },
  thirdemail: { type: String },
  wcDate: { type: Date },
  wcPolicyNo: { type: String },
  wcValidDate: { type: Date },
  wcPolicy: { type: String },
  shopActLicense: { type: String },
  aadharCardFront: { type: String },
  aadharCardBack: { type: String },
  bocwLicense: { type: String },
  esicCodeLetter: { type: String },
  labourLicense: { type: String },
  mlwfCodeLetter: { type: String },
  providentFundCode: { type: String },
  ptecPtrcCode: { type: String }
}, { _id: false }); // Disable _id for nested contractor entries

const amsSchema = new mongoose.Schema({
  contractorMaster: {
    type: Map,
    of: contractorSchema,
  },
}, {
  collection: 'ams', // Store in the 'ams' collection
});

// Check if the model is already compiled, and use it if it exists
const Ams = mongoose.models.Ams || mongoose.model('Ams', amsSchema);

module.exports = Ams;
