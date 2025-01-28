

// const Ams = require('../models/supervisorModel'); // Import the Ams model
// const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
// const { storage } = require('../config/firebase'); // Import the storage from the new config

// // Upload file to Firebase
// const uploadToFirebase = async (file, supervisorId, fileName) => {
//   try {
//     const mimeType = file.mimetype || "application/octet-stream"; // Default MIME type
//     const fileRef = ref(storage, `SupervisorRegistration/${supervisorId}/${fileName}`);
//     const metadata = { contentType: mimeType };

//     const snapshot = await uploadBytes(fileRef, file.buffer, metadata);
//     return await getDownloadURL(snapshot.ref);
//   } catch (error) {
//     console.error(`Error uploading ${fileName}:`, error.message);
//     throw new Error("Failed to upload file to Firebase.");
//   }
// };

// // Register Supervisor
// const registerSupervisor = async (req, res) => {
//   try {
//     const {
//       fullName,
//       gender,
//       dob,
//       contactNumber,
//       emailAddress,
//       street,
//       city,
//       state,
//       zipCode,
//       aadharNumber,
//       password,
//     } = req.body;

//     if (!fullName || !gender || !dob || !contactNumber || !emailAddress || !street || !city || !state || !zipCode || !aadharNumber || !password) {
//       return res.status(400).json({ message: 'Please fill in all required fields' });
//     }

//     let ams = await Ams.findOne();
//     if (!ams) ams = new Ams({ supervisorMaster: new Map() });
//     if (!ams.supervisorMaster) ams.supervisorMaster = new Map();

//     const existingSupervisorIds = Array.from(ams.supervisorMaster.keys()).map((id) => parseInt(id));
//     const maxSupervisorId = existingSupervisorIds.length ? Math.max(...existingSupervisorIds) : 20000;
//     const supervisorId = maxSupervisorId + 1;

//     let aadharFrontURL = null;
//     let aadharBackURL = null;

//     if (req.files?.aadharFrontUpload) {
//       aadharFrontURL = await uploadToFirebase(req.files.aadharFrontUpload[0], supervisorId, 'aadharFront.jpg');
//     }
//     if (req.files?.aadharBackUpload) {
//       aadharBackURL = await uploadToFirebase(req.files.aadharBackUpload[0], supervisorId, 'aadharBack.jpg');
//     }

//     const newSupervisor = {
//       supervisorId,
//       aadharNumber,
//       address: { city, state, street, zipCode },
//       contactNumber,
//       dob,
//       emailAddress,
//       fullName,
//       gender,
//       password,
//       aadharFrontUpload: aadharFrontURL,
//       aadharBackUpload: aadharBackURL,
//     };

//     ams.supervisorMaster.set(supervisorId.toString(), newSupervisor);
//     await ams.save();

//     return res.status(201).json({ message: 'Supervisor registered successfully', supervisorId });
//   } catch (error) {
//     console.error('Error registering supervisor:', error.message);
//     return res.status(500).json({ message: 'Error registering supervisor', error: error.message });
//   }
// };

// module.exports = { registerSupervisor };




const Ams = require('../models/supervisorModel'); // Import the Ams model
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require('../config/firebase'); // Import the storage from the new config
const path = require('path');
const fs = require('fs').promises;

// Upload file to Firebase
const uploadToFirebase = async (file, supervisorId, fileName) => {
  try {
    const fileBuffer = Buffer.from(file, 'base64'); // Convert base64 to buffer
    const mimeType = fileName.includes('jpg') ? 'image/jpeg' : 'application/octet-stream';
    const fileRef = ref(storage, `SupervisorRegistration/${supervisorId}/${fileName}`);
    const metadata = { contentType: mimeType };

    const snapshot = await uploadBytes(fileRef, fileBuffer, metadata);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error(`Error uploading ${fileName}:`, error.message);
    throw new Error("Failed to upload file to Firebase.");
  }
};

// Register Supervisor
const registerSupervisor = async (req, res) => {
  try {
    const {
      fullName,
      gender,
      dob,
      contactNumber,
      emailAddress,
      street,
      city,
      state,
      zipCode,
      aadharNumber,
      password,
      aadharFrontUpload,
      aadharBackUpload,
    } = req.body;

    if (!fullName || !gender || !dob || !contactNumber || !emailAddress || !street || !city || !state || !zipCode || !aadharNumber || !password) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    let ams = await Ams.findOne();
    if (!ams) ams = new Ams({ supervisorMaster: new Map() });
    if (!ams.supervisorMaster) ams.supervisorMaster = new Map();

    const existingSupervisorIds = Array.from(ams.supervisorMaster.keys()).map((id) => parseInt(id));
    const maxSupervisorId = existingSupervisorIds.length ? Math.max(...existingSupervisorIds) : 20000;
    const supervisorId = maxSupervisorId + 1;

    let aadharFrontURL = null;
    let aadharBackURL = null;

    if (aadharFrontUpload) {
      aadharFrontURL = await uploadToFirebase(aadharFrontUpload, supervisorId, 'aadharFront.jpg');
    }
    if (aadharBackUpload) {
      aadharBackURL = await uploadToFirebase(aadharBackUpload, supervisorId, 'aadharBack.jpg');
    }

    const newSupervisor = {
      supervisorId,
      aadharNumber,
      address: { city, state, street, zipCode },
      contactNumber,
      dob,
      emailAddress,
      fullName,
      gender,
      password,
      aadharFrontUpload: aadharFrontURL,
      aadharBackUpload: aadharBackURL,
    };

    ams.supervisorMaster.set(supervisorId.toString(), newSupervisor);
    await ams.save();

    return res.status(201).json({ message: 'Supervisor registered successfully', supervisorId });
  } catch (error) {
    console.error('Error registering supervisor:', error.message);
    return res.status(500).json({ message: 'Error registering supervisor', error: error.message });
  }
};

module.exports = { registerSupervisor };
