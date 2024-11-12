// const mongoose = require('mongoose');

// const workerSchema = new mongoose.Schema({
//   firstName: String,
//   middleName: String,
//   lastName: String,
//   dob: Date,
//   gender: String,
//   mobileNo: String,
//   maritalStatus: String,
//   permanentAddress: String,
//   city: String,
//   district: String,
//   state: String,
//   pincode: String,
//   currentAddress: String,
//   idType: String,
//   aadharNo: String,
//   documentFiles: [String], // URLs or paths of files
//   contractorName: String,
//   designationName: String,
//   labourType: String,
//   joinDate: Date,
//   pfNumber: String,
//   uanNumber: String,
//   bankName: String,
//   branch: String,
//   accountNo: String,
//   ifscCode: String,
// }, { collection: 'workerMaster' });

// module.exports = mongoose.model('Worker', workerSchema);


/////
const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  workerId: Number, // Unique worker ID
  firstName: String,
  middleName: String,
  lastName: String,
  dob: Date,
  gender: String,
  mobileNo: String,
  maritalStatus: String,
  permanentAddress: String,
  city: String,
  district: String,
  state: String,
  pincode: String,
  currentAddress: String,
  idType: String,
  aadharNo: String,
  documentFiles: String, // URLs or paths of files as string (assuming single file upload)
  aadharBack: String,    // Text data for the back of Aadhar card
  bankPassbook: String,  // Text data for bank passbook
  contractorName: String,
  designationName: String,
  labourType: String,
  joinDate: Date,
  issueDate: Date,
  validDate: Date,
  bocwRegistration: String,
  pfNumber: String,
  uanNumber: String,
  esicNumber: String,
  panNumber: String,
  ipNumber: String,
  policeVerify: String,
  bankName: String,
  branch: String,
  accountNo: String,
  ifscCode: String,
  nominee: String,
  relation: String,   
  nomineeNo: String,
  children: String,
  qualification: String,
  sector: String,
}, { collection: 'workerMaster' });

module.exports = mongoose.model('Worker', workerSchema);
