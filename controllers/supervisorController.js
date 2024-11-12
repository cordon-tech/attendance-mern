
// const Ams = require('../models/amsModel');  // Import the Ams model
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Ensure the uploads directory exists
// if (!fs.existsSync('uploads')) {
//   fs.mkdirSync('uploads');
// }

// // Configure multer for file upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage }).fields([
//   { name: 'aadharFrontUpload', maxCount: 1 },
//   { name: 'aadharBackUpload', maxCount: 1 }
// ]);

// // Register Supervisor
// const registerSupervisor = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       console.error('File upload error:', err.message);
//       return res.status(500).json({ message: 'Error uploading files', error: err.message });
//     }

//     try {
//       const {
//         fullName, gender, dob, contactNumber, emailAddress, street, city, state, zipCode, aadharNumber, password
//       } = req.body;

//       // Validation check for required fields
//       if (!fullName || !gender || !dob || !contactNumber || !emailAddress || !street || !city || !state || !zipCode || !aadharNumber || !password) {
//         return res.status(400).json({ message: 'Please fill in all required fields' });
//       }

//       // Handle file uploads
//       const aadharFrontUpload = req.files?.aadharFrontUpload ? req.files.aadharFrontUpload[0].filename : null;
//       const aadharBackUpload = req.files?.aadharBackUpload ? req.files.aadharBackUpload[0].filename : null;

//       // Fetch the existing AMS entry (assuming there is only one document in the collection)
//       let ams = await Ams.findOne();
      
//       // If no AMS entry exists, create one
//       if (!ams) {
//         ams = new Ams({ supervisorMaster: [] });
//       }

//       // Calculate the new supervisorId
//       const latestSupervisor = ams.supervisorMaster.length ? ams.supervisorMaster[ams.supervisorMaster.length - 1] : null;
//       const supervisorId = latestSupervisor ? latestSupervisor.supervisorId + 1 : 20001;

//       // Create the new supervisor object
//       const newSupervisor = {
//         supervisorId,
//         fullName,
//         gender,
//         dob,
//         contactNumber,
//         emailAddress,
//         address: {
//           street,
//           city,
//           state,
//           zipCode
//         },
//         aadharDetails: {
//           aadharNumber,
//           aadharFrontUpload,
//           aadharBackUpload
//         },
//         password
//       };

//       // Append the new supervisor to the supervisorMaster array inside ams
//       ams.supervisorMaster.push(newSupervisor);

//       // Save the updated AMS document
//       await ams.save();

//       return res.status(201).json({ message: 'Supervisor registered successfully', supervisorId });
//     } catch (error) {
//       console.error('Error registering supervisor:', error.message);
//       return res.status(500).json({ message: 'Error registering supervisor', error: error.message });
//     }
//   });
// };

// module.exports = { registerSupervisor };
const Ams = require('../models/amsModel');  // Import the Ams model
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

      // Fetch the existing AMS entry (assuming there is only one document in the collection)
      let ams = await Ams.findOne();
      
      // If no AMS entry exists, create one and initialize supervisorMaster as an empty map
      if (!ams) {
        ams = new Ams({ supervisorMaster: new Map() });
      }

      // Ensure supervisorMaster is initialized as a map (if it's not already)
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

      // Store the new supervisor in the supervisorMaster object using supervisorId as the key
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

module.exports = { registerSupervisor };
