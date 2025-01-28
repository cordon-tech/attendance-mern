const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  workerId: Number, // Unique worker ID
  firstName: String,
  middleName: String,
  lastName: String,
  dateOfBirth: Date, // Changed from `dob` to `dateOfBirth`
  gender: String,
  phoneNumber: String, // Changed from `mobileNo` to `phoneNumber`
  maritalStatus: String,
  permanentAddress: String,
  permanentPinCode: String, // Changed from `pincode` to `permanentPinCode`
  permanentCity: String, // Changed from `city` to `permanentCity`
  permanentDistrict: String, // Changed from `district` to `permanentDistrict`
  permanentState: String, // Changed from `state` to `permanentState`
  currentAddress: String,
  idType: String,
  aadharNumber: String, // Changed from `aadharNo` to `aadharNumber`
  aadharFront: String, // Changed from `documentFiles` to `aadharFront`
  aadharBack: String,
  bankPhoto: String, // Changed from `bankPassbook` to `bankPhoto`
  contractorName: String,
  designation: String, // Changed from `designationName` to `designation`
  labourType: String,
  dateOfJoining: Date, // Changed from `joinDate` to `dateOfJoining`
  issueDate: Date,
  validDate: Date,
  bocwReg: String, // Changed from `bocwRegistration` to `bocwReg`
  pfNumber: String,
  uanNumber: String,
  esicNumber: String,
  panNumber: String,
  ipNumber: String,
  policeVerification: String, // Changed from `policeVerify` to `policeVerification`
  bankName: String,
  branchName: String, // Changed from `branch` to `branchName`
  accountNumber: String, // Changed from `accountNo` to `accountNumber`
  ifscCode: String,
  nominee: String,
  nomineeContactNumber: String, // Changed from `nomineeNo` to `nomineeContactNumber`
  children: String,
  qualification: String,
  sector: String,
  qrCode: String, // Added qrCode field
  capturedPhoto: String,
}, { collection: 'workerMaster' });

module.exports = mongoose.model('Worker', workerSchema);