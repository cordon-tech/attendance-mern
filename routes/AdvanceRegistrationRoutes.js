// backend/routes/advanceRoutes.js
const express = require("express");
const { saveAdvanceData } = require("../controllers/AdvanveRegisterController");
const router = express.Router();

// Route to save advance data
router.post("/advance", saveAdvanceData);

module.exports = router;
