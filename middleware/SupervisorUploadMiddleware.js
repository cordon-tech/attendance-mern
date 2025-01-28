// // const multer = require('multer');

// // // Multer Storage Configuration for Buffering Files
// // const storage = multer.memoryStorage(); // Store files in memory to process them before uploading to Firebase

// // const upload = multer({ storage }).fields([
// //   { name: 'aadharFrontUpload', maxCount: 1 },
// //   { name: 'aadharBackUpload', maxCount: 1 },
// // ]);


// // module.exports = upload; 


// const multer = require('multer');

// const storage = multer.memoryStorage(); // Use memory storage to process files

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
// }).fields([
//   { name: 'aadharFrontUpload', maxCount: 1 },
//   { name: 'aadharBackUpload', maxCount: 1 },
// ]);

// module.exports = upload;
const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Multer instance
const upload = multer({ storage });

module.exports = upload;
