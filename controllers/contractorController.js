// const mongoose = require('mongoose');
// const Ams = require('../models/contractorModel');
// const dotenv = require('dotenv');

// dotenv.config();
// const AMS_ID = new mongoose.Types.ObjectId(process.env._id); // Fetch AMS_ID from environment variables

// // Controller to handle contractor registration
// const registerContractor = async (req, res) => {
//     try {
//         const formData = req.body;

//         // Fetch the AMS document
//         const amsCollection = mongoose.connection.collection('ams');
//         const mainDocument = await amsCollection.findOne({ _id: AMS_ID });

//         if (!mainDocument) {
//             return res.status(404).json({ error: 'Main document not found' });
//         }

//         // Generate a new ID for the contractor
//         const contractorMaster = mainDocument.contractorMaster || {};
//         const lastId = Math.max(...Object.keys(contractorMaster).map(Number), 30000); // Start from 30000
//         const newId = lastId + 1;

//         // Add contractorID to the form data
//         formData.contractorID = newId;

//         // Add new contractor data
//         contractorMaster[newId] = formData;

//         // Update the document in the database
//         await amsCollection.updateOne(
//             { _id: AMS_ID },
//             { $set: { contractorMaster } }
//         );

//         res.status(201).json({ message: 'Contractor registered successfully', contractorID: newId });
//     } catch (error) {
//         console.error('Error in registerContractor:', error);
//         res.status(500).json({ error: 'Failed to register contractor', details: error.message });
//     }
// };

// // Export the controller
// module.exports = {
//     registerContractor,
// };

//working for the storing document
// const mongoose = require('mongoose');
// const Ams = require('../models/contractorModel');
// const dotenv = require('dotenv');

// dotenv.config();
// const AMS_ID = new mongoose.Types.ObjectId(process.env._id);

// const registerContractor = async (req, res) => {
//     try {
//         const formData = req.body;

//         const amsCollection = mongoose.connection.collection('ams');
//         const mainDocument = await amsCollection.findOne({ _id: AMS_ID });

//         if (!mainDocument) {
//             return res.status(404).json({ error: 'Main document not found' });
//         }

//         const contractorMaster = mainDocument.contractorMaster || {};
//         const lastId = Math.max(...Object.keys(contractorMaster).map(Number), 30000);
//         const newId = lastId + 1;

//         formData.contractorID = newId;

//         contractorMaster[newId] = formData;

//         await amsCollection.updateOne(
//             { _id: AMS_ID },
//             { $set: { contractorMaster } }
//         );

//         res.status(201).json({ message: 'Contractor registered successfully', contractorID: newId });
//     } catch (error) {
//         console.error('Error in registerContractor:', error);
//         res.status(500).json({ error: 'Failed to register contractor', details: error.message });
//     }
// };

// module.exports = { registerContractor };


//sakshi code
// const mongoose = require("mongoose");
// const Ams = require("../models/contractorModel");
// const { storage } = require('../config/firebaseConfiguration'); // Firebase Storage
// const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");

// const path = require("path");
// const fs = require("fs");
// const multer = require("multer");
// const { v4: uuidv4 } = require("uuid");

// // Set up multer to handle file uploads temporarily on the server
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads/"); // Temporary folder for storing files before sending to Firebase
//     },
//     filename: (req, file, cb) => {
//       cb(null, uuidv4() + path.extname(file.originalname)); // Generate unique filenames for the uploaded files
//     },
//   }),
// });

// // Controller to handle contractor registration
// const registerContractor = async (req, res) => {
//   try {
//     // Check if files are present
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).json({ error: "No files uploaded" });
//     }

//     const formData = req.body;
//     console.log("Received form data:", formData); // Debugging

//     // Handle file uploads to Firebase Storage
//     const filePromises = Object.keys(req.files || {}).map(async (key) => {
//       const file = req.files[key][0]; // Assume single file upload per field
//       if (file) {
//         const filePath = file.path; // Local path of the uploaded file
        
//         // Store the image under the contractor ID in Firebase Storage, using the field name for the file name
//         const storageRef = ref(storage, `contractors/${formData.contractorID}/${key}${path.extname(file.originalname)}`);
        
//         // Read the file content
//         const fileBuffer = fs.readFileSync(filePath);

//         // Upload the file to Firebase Storage
//         const snapshot = await uploadBytesResumable(storageRef, fileBuffer, { contentType: file.mimetype });
        
//         // Get the download URL for the uploaded file
//         const fileUrl = await getDownloadURL(snapshot.ref);

//         // Remove the temporary file from server after upload
//         fs.unlinkSync(filePath);

//         // Add the image URL to the form data under the same field name
//         formData[key] = fileUrl;
//       }
//     });

//     // Wait for all file uploads to finish
//     await Promise.all(filePromises);

//     // Fetch the AMS document
//     const amsCollection = mongoose.connection.collection("ams");
//     const mainDocument = await amsCollection.findOne({ _id: new mongoose.Types.ObjectId(process.env._id) });

//     if (!mainDocument) {
//       return res.status(404).json({ error: "Main document not found" });
//     }

//     // Generate a new ID for the contractor
//     const contractorMaster = mainDocument.contractorMaster || {};
//     const lastId = Math.max(...Object.keys(contractorMaster).map(Number), 30000); // Start from 30000
//     const newId = lastId + 1;

//     // Add contractorID to the form data
//     formData.contractorID = newId;

//     // Add new contractor data to contractorMaster
//     contractorMaster[newId] = formData;

//     // Update the document in the database
//     await amsCollection.updateOne(
//       { _id: new mongoose.Types.ObjectId(process.env._id) },
//       { $set: { contractorMaster } }
//     );

//     // Send success response
//     res.status(201).json({ message: "Contractor registered successfully", contractorID: newId });
//   } catch (error) {
//     console.error("Error in registerContractor:", error);
//     res.status(500).json({ error: "Failed to register contractor", details: error.message });
//   }
// };

// module.exports = { registerContractor, upload };


//working by sakshi
// const mongoose = require("mongoose");
// const Ams = require("../models/contractorModel");
// const { storage } = require('../config/firebaseConfiguration'); // Firebase Storage
// const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");

// const path = require("path");
// const fs = require("fs");
// const multer = require("multer");
// const { v4: uuidv4 } = require("uuid");

// // Set up multer to handle file uploads temporarily on the server
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads/"); // Temporary folder for storing files before sending to Firebase
//     },
//     filename: (req, file, cb) => {
//       cb(null, uuidv4() + path.extname(file.originalname)); // Generate unique filenames for the uploaded files
//     },
//   }),
// });

// // Controller to handle contractor registration
// const registerContractor = async (req, res) => {
//   try {
//     // Check if files are present
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).json({ error: "No files uploaded" });
//     }

//     const formData = req.body;
//     console.log("Received form data:", formData); // Debugging

//     // Generate a new ID for the contractor first, before uploading the images
//     const amsCollection = mongoose.connection.collection("ams");
//     const mainDocument = await amsCollection.findOne({ _id: new mongoose.Types.ObjectId(process.env._id) });

//     if (!mainDocument) {
//       return res.status(404).json({ error: "Main document not found" });
//     }

//     // Generate a new contractor ID
//     const contractorMaster = mainDocument.contractorMaster || {};
//     const lastId = Math.max(...Object.keys(contractorMaster).map(Number), 30000); // Start from 30000
//     const newId = lastId + 1;

//     // Add contractorID to the form data
//     formData.contractorID = newId;

//     // Add new contractor data to contractorMaster
//     contractorMaster[newId] = formData;

//     // Update the document in the database
//     await amsCollection.updateOne(
//       { _id: new mongoose.Types.ObjectId(process.env._id) },
//       { $set: { contractorMaster } }
//     );

//     // Handle file uploads to Firebase Storage
//     const filePromises = Object.keys(req.files || {}).map(async (key) => {
//       const file = req.files[key][0]; // Assume single file upload per field
//       if (file) {
//         const filePath = file.path;  // Local path of the uploaded file
        
//         // Store the image under the contractor's ID in Firebase Storage, using the field name for the file name
//         const storageRef = ref(storage, `contractors/${newId}/${key}${path.extname(file.originalname)}`);
        
//         // Read the file content
//         const fileBuffer = fs.readFileSync(filePath);

//         // Upload the file to Firebase Storage
//         const snapshot = await uploadBytesResumable(storageRef, fileBuffer, { contentType: file.mimetype });
        
//         // Get the download URL for the uploaded file
//         const fileUrl = await getDownloadURL(snapshot.ref);

//         // Remove the temporary file from server after upload
//         fs.unlinkSync(filePath);

//         // Add the image URL to the form data
//         formData[key] = fileUrl;
//       }
//     });

//     // Wait for all file uploads to finish
//     await Promise.all(filePromises);

//     // Send success response
//     res.status(201).json({ message: "Contractor registered successfully", contractorID: newId });
//   } catch (error) {
//     console.error("Error in registerContractor:", error);
//     res.status(500).json({ error: "Failed to register contractor", details: error.message });
//   }
// };

// module.exports = { registerContractor, upload };


const mongoose = require("mongoose");
const Ams = require("../models/contractorModel");
const { storage } = require('../config/firebase'); // Firebase Storage
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");

const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Set up multer to handle file uploads temporarily on the server
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Temporary folder for storing files before sending to Firebase
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + path.extname(file.originalname)); // Generate unique filenames for the uploaded files
    },
  }),
});

// Controller to handle contractor registration
const registerContractor = async (req, res) => {
  try {
    // Check if files are present
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const formData = req.body;
    console.log("Received form data:", formData); // Debugging

    // Generate a new ID for the contractor first, before uploading the images
    const amsCollection = mongoose.connection.collection("ams");
    const mainDocument = await amsCollection.findOne({ _id: new mongoose.Types.ObjectId(process.env._id) });

    if (!mainDocument) {
      return res.status(404).json({ error: "Main document not found" });
    }

    // Generate a new contractor ID
    const contractorMaster = mainDocument.contractorMaster || {};
    const lastId = Math.max(...Object.keys(contractorMaster).map(Number), 30000); // Start from 30000
    const newId = lastId + 1;

    // Add contractorID to the form data
    formData.contractorID = newId;

    // Add new contractor data to contractorMaster
    contractorMaster[newId] = formData;

    // Update the document in the database with the contractor data
    await amsCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(process.env._id) },
      { $set: { contractorMaster } }
    );

    // Handle file uploads to Firebase Storage and retrieve download URLs
    const filePromises = Object.keys(req.files || {}).map(async (key) => {
      const file = req.files[key][0]; // Assume single file upload per field
      if (file) {
        const filePath = file.path;  // Local path of the uploaded file
        
        // Store the image under the contractor's ID in Firebase Storage, using the field name for the file name
        const storageRef = ref(storage, `contractors/${newId}/${key}${path.extname(file.originalname)}`);
        
        // Read the file content
        const fileBuffer = fs.readFileSync(filePath);

        // Upload the file to Firebase Storage
        const snapshot = await uploadBytesResumable(storageRef, fileBuffer, { contentType: file.mimetype });
        
        // Get the download URL for the uploaded file
        const fileUrl = await getDownloadURL(snapshot.ref);

        // Remove the temporary file from server after upload
        fs.unlinkSync(filePath);

        // Store the download URL in the form data
        formData[key] = fileUrl;
      }
    });

    // Wait for all file uploads to finish
    await Promise.all(filePromises);

    // Now that all files have been uploaded and their URLs are in formData, update the contractor record
    await amsCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(process.env._id) },
      { 
        $set: { 
          [`contractorMaster.${newId}`]: formData
        }
      }
    );

    // Send success response
    res.status(201).json({ message: "Contractor registered successfully", contractorID: newId });
  } catch (error) {
    console.error("Error in registerContractor:", error);
    res.status(500).json({ error: "Failed to register contractor", details: error.message });
  }
};

module.exports = { registerContractor, upload };
