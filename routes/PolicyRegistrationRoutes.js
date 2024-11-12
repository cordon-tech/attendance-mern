// backend/routes/policyFormRoutes.js
const express = require("express");
const multer = require("multer");
const { addPolicy } = require("../controllers/PolicyRegistrationController");

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

// Route to add a new policy with file upload support
router.post("/policies", upload.single("fileUpload"), addPolicy);

module.exports = router;
