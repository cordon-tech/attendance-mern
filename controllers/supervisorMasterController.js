// supervisorMasterController.js
const Ams = require('../models/supervisorMasterModel');  // Import the Ams model

// Multer setup for file uploads
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).fields([
  { name: 'aadharFrontUpload', maxCount: 1 },
  { name: 'aadharBackUpload', maxCount: 1 }
]);

// Register Supervisor
const registerSupervisor = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('File upload error:', err.message);
      return res.status(500).json({ message: 'Error uploading files', error: err.message });
    }

    try {
      const {
        fullName, gender, dob, contactNumber, emailAddress, street, city, state, zipCode, aadharNumber, password
      } = req.body;

      // Validation check for required fields
      if (!fullName || !gender || !dob || !contactNumber || !emailAddress || !street || !city || !state || !zipCode || !aadharNumber || !password) {
        return res.status(400).json({ message: 'Please fill in all required fields' });
      }

      // Handle file uploads
      const aadharFrontUpload = req.files?.aadharFrontUpload ? req.files.aadharFrontUpload[0].filename : null;
      const aadharBackUpload = req.files?.aadharBackUpload ? req.files.aadharBackUpload[0].filename : null;

      // Fetch the existing AMS entry
      let ams = await Ams.findOne();

      // If no AMS entry exists, create one
      if (!ams) {
        ams = new Ams({ supervisorMaster: new Map() });
      }

      // Ensure supervisorMaster is initialized as a map
      if (!ams.supervisorMaster) {
        ams.supervisorMaster = new Map();
      }

      // Calculate the new supervisorId
      const existingSupervisorIds = Array.from(ams.supervisorMaster.keys()).map(id => parseInt(id));
      const maxSupervisorId = existingSupervisorIds.length ? Math.max(...existingSupervisorIds) : 20000;
      const supervisorId = maxSupervisorId + 1;

      // Create the new supervisor object
      const newSupervisor = {
        supervisorId,
        fullName,
        gender,
        dob,
        contactNumber,
        emailAddress,
        address: {
          street,
          city,
          state,
          zipCode
        },
        aadharDetails: {
          aadharNumber,
          aadharFrontUpload,
          aadharBackUpload
        },
        password
      };

      // Store the new supervisor in the supervisorMaster object
      ams.supervisorMaster.set(supervisorId.toString(), newSupervisor);

      // Save the updated AMS document
      await ams.save();

      return res.status(201).json({ message: 'Supervisor registered successfully', supervisorId });
    } catch (error) {
      console.error('Error registering supervisor:', error.message);
      return res.status(500).json({ message: 'Error registering supervisor', error: error.message });
    }
  });
};

// Fetch all supervisors
const getSupervisors = async (req, res) => {
  try {
    const ams = await Ams.findOne();  // Fetch the AMS document (assuming one document exists)

    if (!ams || !ams.supervisorMaster) {
      return res.status(404).json({ message: 'No supervisors found' });
    }

    // Convert the Map of supervisors to an array of objects
    const supervisorsArray = Array.from(ams.supervisorMaster.values());

    res.status(200).json(supervisorsArray);
  } catch (error) {
    console.error('Error fetching supervisors:', error.message);
    res.status(500).json({ message: 'Error fetching supervisors', error: error.message });
  }
};

// module.exports = { getSupervisors, registerSupervisor };



// Update Supervisor
const updateSupervisor = async (req, res) => {
  const supervisorId = req.params.id;

  try {
    const { fullName, gender, contactNumber, address } = req.body;

    // Find the AMS entry and update the supervisor data
    const ams = await Ams.findOne();
    if (!ams || !ams.supervisorMaster || !ams.supervisorMaster.has(supervisorId)) {
      return res.status(404).json({ message: 'Supervisor not found' });
    }

    // Update the supervisor data
    const supervisor = ams.supervisorMaster.get(supervisorId);
    supervisor.fullName = fullName;
    supervisor.gender = gender;
    supervisor.contactNumber = contactNumber;
    supervisor.address = address;

    // Save the updated AMS document
    await ams.save();

    return res.status(200).json(supervisor);
  } catch (error) {
    console.error('Error updating supervisor:', error.message);
    return res.status(500).json({ message: 'Error updating supervisor', error: error.message });
  }
};

module.exports = { getSupervisors, registerSupervisor, updateSupervisor };



