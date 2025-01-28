const mongoose = require('mongoose');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadString, getDownloadURL } = require('firebase/storage');
const {storage} = require('../config/firebase');

const AMS = mongoose.connection.collection('ams');

const isValidDataUrl = (string) => {
  const regex = /^data:[\w.+-]+\/[\w.+-]+(;[\w.+-]+=[\w.+-]+)*;base64,/;
  return regex.test(string);
};
// Helper function to upload files to Firebase
const uploadToFirebase = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    await uploadString(storageRef, file, 'data_url'); // Upload Base64 string
    return await getDownloadURL(storageRef); // Get the file's download URL
  } catch (error) {
    console.error('Error uploading to Firebase:', error);
    throw new Error('Failed to upload file to Firebase');
  }
};

// Fetch all contractor names
exports.getContractorNames = async (req, res) => {
  try {
    const amsData = await AMS.findOne({}, { projection: { contractorMaster: 1 } });
    if (!amsData || !amsData.contractorMaster) {
      return res.status(404).json({ message: 'No contractors found.' });
    }
    const contractors = Object.values(amsData.contractorMaster);
    const contractorNames = contractors.map((contractor) => contractor.contractorName);
    res.json(contractorNames);
  } catch (error) {
    console.error('Error fetching contractor names:', error);
    res.status(500).json({ message: 'Failed to fetch contractor names', error });
  }
};

// Fetch all designation names
exports.getDesignationNames = async (req, res) => {
  try {
    const amsData = await AMS.findOne({}, { projection: { designation: 1 } });
    if (!amsData || !amsData.designation) {
      return res.status(404).json({ message: 'No designations found.' });
    }
    const designations = Object.values(amsData.designation);
    const designationNames = designations.map((designation) => designation.designationName);
    res.json(designationNames);
  } catch (error) {
    console.error('Error fetching designation names:', error);
    res.status(500).json({ message: 'Failed to fetch designation names', error });
  }
};

// Fetch all labour types
exports.getLabourTypes = async (req, res) => {
  try {
    const amsData = await AMS.findOne({}, { projection: { labourRate: 1 } });
    if (!amsData || !amsData.labourRate) {
      return res.status(404).json({ message: 'No labour types found.' });
    }
    const labourEntries = Object.values(amsData.labourRate);
    const labourTypes = labourEntries.map((entry) => entry.labourType).filter(Boolean);
    res.json(labourTypes);
  } catch (error) {
    console.error('Error fetching labour types:', error);
    res.status(500).json({ message: 'Failed to fetch labour types', error });
  }
};

// Register a new worker
// Register a new worker
exports.registerWorker = async (req, res) => {
  try {
    console.log(req.body); // Log the incoming data for debugging

    // Fetch the latest worker entry to determine the next workerId
    const latestWorker = await AMS.findOne({
      workerMaster: { $exists: true },
    });

    let newWorkerId = 40001; // Default starting workerId
    if (latestWorker && latestWorker.workerMaster) {
      const workerIds = Object.keys(latestWorker.workerMaster);
      const maxWorkerId = Math.max(...workerIds.map((id) => parseInt(id)));
      newWorkerId = maxWorkerId + 1; // Increment to get the new ID
    }

    // Prepare file upload paths
    const workerFolderPath = `worker/${newWorkerId}/`;

    // Upload files to Firebase
    const aadharFrontUrl = req.body.aadharFront
      ? await uploadToFirebase(req.body.aadharFront, `${workerFolderPath}aadharFront.png`)
      : '';
    const aadharBackUrl = req.body.aadharBack
      ? await uploadToFirebase(req.body.aadharBack, `${workerFolderPath}aadharBack.png`)
      : '';
    const bankPhotoUrl = req.body.bankPhoto
      ? await uploadToFirebase(req.body.bankPhoto, `${workerFolderPath}bankPhoto.png`)
      : '';
    const capturedPhotoUrl = req.body.capturedPhoto
      ? await uploadToFirebase(req.body.capturedPhoto, `${workerFolderPath}capturedPhoto.png`)
      : '';

    // Prepare worker data
    const newWorkerData = {
      workerId: newWorkerId,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      dateOfJoining: req.body.dateOfJoining,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      maritalStatus: req.body.maritalStatus,
      permanentAddress: req.body.permanentAddress,
      permanentPinCode: req.body.permanentPinCode,
      permanentCity: req.body.permanentCity,
      permanentDistrict: req.body.permanentDistrict,
      permanentState: req.body.permanentState,
      currentAddress: req.body.currentAddress,
      idType: req.body.idType,
      policeVerification: req.body.policeVerification,
      aadharNumber: req.body.aadharNumber,
      aadharFront: aadharFrontUrl,
      aadharBack: aadharBackUrl,
      accountNumber: req.body.accountNumber,
      bankName: req.body.bankName,
      bankPhoto: bankPhotoUrl,
      bocwReg: req.body.bocwReg,
      pfNumber: req.body.pfNumber,
      branchName: req.body.branchName,
      capturedPhoto: capturedPhotoUrl,
      qrCode: {
        buildingNumber: req.body.permanentAddress || 'N/A',
        contractorName: req.body.contractorName || 'N/A',
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        workerId: newWorkerId,
      },
      children: req.body.children || '',
      contractorName: req.body.contractorName,
      designation: req.body.designation,
      esicNumber: req.body.esicNumber || '',
      labourType: req.body.labourType,
      panNumber: req.body.panNumber || '',
      ipNumber: req.body.ipNumber || '',
      issueDate: req.body.issueDate || '',
      ifscCode: req.body.ifscCode || '',
      nominee: req.body.nominee || '',
      nomineeContactNumber: req.body.nomineeContactNumber || '',
      qualification: req.body.qualification || '',
      relation: req.body.relation || '',
      sector: req.body.sector || '',
      uanNumber: req.body.uanNumber || '',
      validDate: req.body.validDate || '',
    };

    // Store the new worker data in workerMaster
    await mongoose.connection.collection('ams').updateOne(
      {},
      { $set: { [`workerMaster.${newWorkerId}`]: newWorkerData } },
      { upsert: true }
    );

    // Now create a corresponding entry in the qrCodeMaster
    const qrCodeData = {
      buildingNumber: req.body.permanentAddress || 'N/A', // Permanent Address stored under buildingNumber
      contractorName: req.body.contractorName || 'N/A',
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      qrCode: {
        buildingNumber: req.body.permanentAddress || 'N/A', // Permanent Address stored under buildingNumber
        contractorName: req.body.contractorName || 'N/A',
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        workerId: newWorkerId,
      },
      workerId: newWorkerId,
    };

    // Insert or update qrCodeMaster with the worker's QR code data
    await mongoose.connection.collection('ams').updateOne(
      {},
      { $set: { [`qrCodeMaster.${newWorkerId}`]: qrCodeData } },
      { upsert: true }
    );

    res.status(201).json({ message: 'Worker registered successfully and qrCodeMaster updated', workerId: newWorkerId });
  } catch (error) {
    console.error('Error registering worker:', error); // Log the error for debugging
    res.status(500).json({ message: 'Failed to register worker', error: error.message });
  }
};