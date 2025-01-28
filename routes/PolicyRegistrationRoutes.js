// // backend/routes/policyFormRoutes.js
// const express = require("express");
// const multer = require("multer");
// const { addPolicy } = require("../controllers/PolicyRegistrationController");

// const router = express.Router();

// // Configure multer for file upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });
// const upload = multer({ storage });

// // Route to add a new policy with file upload support
// router.post("/policies", upload.single("fileUpload"), addPolicy);

// module.exports = router;




const express = require("express");
const multer = require("multer");
const { addPolicy } = require("../controllers/PolicyRegistrationController");

const router = express.Router();

// Configure multer for memory storage (needed for Firebase upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to add a new policy with file upload support
router.post("/policies", upload.single("fileUpload"), addPolicy);

module.exports = router;
