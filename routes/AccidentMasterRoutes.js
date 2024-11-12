// backend/routes/accidentRoutes.js
const express = require("express");
const { getContractorNames, getAccidentsByContractorAndMonth } = require("../controllers/AccidentMasterController");
const router = express.Router();

// Route to fetch unique contractor names


// Route to fetch accident data by contractor and month
router.get("/accidents", getAccidentsByContractorAndMonth);
router.get("/contractors", getContractorNames);

module.exports = router;
